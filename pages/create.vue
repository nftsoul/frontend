<template>
  <div class="dark-bg py-16">
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" lg="3" md="3">
          <p class="caption dark-text mb-0">Featured Gallery Image</p>
          <p>
            <small class="text--disabled"
              >Drag or choose your file to upload</small
            >
          </p>
          <div class="upload-box pa-3">
            <!-- <div v-if="src == null">
              <p class="text-center mt-10 mb-0">
                <v-btn
                  x-large
                  icon
                  :loading="isSelecting"
                  @click="onButtonClick"
                >
                  <v-icon size="50" color="#1103A2">mdi-upload</v-icon>
                </v-btn>

                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileChanged"
                />
              </p>
              <p class="caption text-center dark-text">Choose a file</p>
              <p class="body-2 text--disabled text-center">
                JPG, GIF, WEBP, MP4 OR MP3 <br />MAX 3MB
              </p>
            </div> -->
            <v-img :src="src"></v-img>
          </div>
          <client-only>
            <VueSlickCarousel v-bind="slickSetting">
              <div
                v-for="(item, i) in collection"
                :key="i"
                class="pa-3"
                @click="selectImage(item)"
              >
                <v-img
                  :src="item.imageUrl"
                  class="mx-auto"
                  width="50"
                  height="50"
                ></v-img>
              </div>
            </VueSlickCarousel>
          </client-only>
          <p class="caption white--text mb-2">Note:</p>
          <small class="dark-text">Service fee:2.5%</small><br />
          <!-- <small class="dark-text" sty>You will receive: 25.00eth $50,00</small> -->
        </v-col>
        <v-col cols="12" lg="7">
          <div class="enclose-border">
            <v-form v-model="valid" ref="form">
              <label for="name" class="text--disabled">Gallery Name</label>
              <v-text-field
                v-model="name"
                :rules="[validRules.required]"
                id="name"
                height="10"
                filled
                background-color="#030537"
                dense
                outlined
                placeholder="e.g. 'My Best NFT'"
              ></v-text-field>

              <label for="about" class="text--disabled"
                >About the gallery short info</label
              >
              <v-textarea
                v-model="about"
                :rules="[validRules.required]"
                id="about"
                rows="3"
                auto-grow
                filled
                background-color="#030537"
                dense
                outlined
                placeholder="e.g.'After purchasing the item you can get the item....'"
              ></v-textarea>

              <label for="price" class="text--disabled">Price</label>
              <v-text-field
                v-model="price"
                type="number"
                :rules="[validRules.required, validRules.positive]"
                id="price"
                filled
                background-color="#030537"
                dense
                outlined
                placeholder="e.g. '250 SOL'"
              ></v-text-field>
              <v-row class="mt-2" no-gutters>
                <v-checkbox
                  class="mt-n2"
                  :rules="[validRules.required]"
                  color="white"
                  v-model="agree"
                ></v-checkbox>
                <small
                  >I understand that and I am ready to pay 0.01 SOL to create
                  this premium gallery.</small
                >
              </v-row>
              <!-- <v-row no-gutters>
                            <small class="mr-5">
                                <v-checkbox label="Put on sale" dense dark></v-checkbox>
                            </small>
                            <small>
                                <v-checkbox label="Free Listing" dark dense></v-checkbox>
                            </small>
                        </v-row> -->
            </v-form>
            <v-row>
              <v-btn
                class="mx-auto my-5 btn-exhibit"
                @click="createGallery()"
                :loading="creating"
                >Create Gallery</v-btn
              >
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import {
  getProvider,
  depositNativeToken,
  initNativeTransaction,
  withdrawNativeTransaction,
  cancelNativeTransaction,
  pauseNativeTransaction,
  resumeNativeTransaction,
  withdrawNativeTokenDeposit,
} from "zebecprotocol-sdk";
const web3 = require("@solana/web3.js");

export default {
  layout: "user",
  data() {
    return {
         connection: new web3.Connection(
          web3.clusterApiUrl("devnet"),
          "confirmed"
        ),
      agree: true,
      valid: true,
      name: "",
      about: "",
      price: "",
      src: null,
      public_id: "",
      creating: false,
      isSelecting: false,
      validRules: {
        required: (value) => !!value || "Required.",
        length10: (v) => (v && v.length == 10) || "Should be 10 characters.",
        positive: (v) => (v && v > -1) || "Price cannot be negative.",
      },
      slickSetting: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
      },
    };
  },
  computed: {
    collection() {
      return this.$store.state.nft.collection;
    },
    walletAddress() {
      return this.$store.state.wallet.walletAddress;
    },
  },
  mounted() {
    this.src = this.collection[0].imageUrl;
  },
  methods: {
    async createGallery() {
      if (this.$refs.form.validate()) {
        if (this.src != null) {
          this.creating = true;
          const depositData = {
            sender: this.walletAddress,
            amount: 0.01,
          };
          var total_charge = 0.01;
          var lamports = await this.connection.getBalance(
            new web3.PublicKey(this.walletAddress)
          );
          var available = parseFloat(lamports * 0.000000001).toFixed(5);

          if (total_charge < available) {
            try {
              let depositResponse = await depositNativeToken(depositData);
              try {
                let platformResponse = await initNativeTransaction({
                  sender: this.walletAddress,
                  receiver: "9wGdQtcHGiV16cqGfm6wsN5z9hmUTiDqN25zsnPu1SDv",
                  amount: 0.01,
                  start: Math.floor(Date.now()),
                  end: Math.floor(Date.now()),
                });
                axios
                  .post("https://nft-soul.herokuapp.com/api/create-gallery", {
                    user_id: this.walletAddress,
                    gallery_name: this.name,
                    nfts: this.collection,
                    image: this.src,
                    description: this.about,
                    price: this.price,
                  })
                  .then((res) => {
                    this.creating = false;
                    this.$toast
                      .success("Your gallery has been created successfully.", {
                        iconPack: "mdi",
                        icon: "mdi-image",
                        theme: "outline",
                      })
                      .goAway(3000);
                    this.$store.commit("content/setSelected", res.data);
                    this.$router.push({
                      name: "profile-preview",
                    });
                  })
                  .catch((err) => console.log(err.response));
              } catch (err) {
                if ((err.code = 4001)) {
                  this.$toast
                    .error(err.message, {
                      iconPack: "mdi",
                      icon: "mdi-cancel",
                      theme: "outline",
                    })
                    .goAway(3000);
                }
              }
            } catch (err) {
              if ((err.code = 4001)) {
                this.$toast
                  .error(err.message, {
                    iconPack: "mdi",
                    icon: "mdi-cancel",
                    theme: "outline",
                  })
                  .goAway(3000);
              }
            }
          } else {
            this.$toast
              .error("Insufficient fund.", {
                iconPack: "mdi",
                icon: "mdi-wallet",
                theme: "outline",
              })
              .goAway(3000);
          }
        } else {
          this.$toast
            .error("Please upload a featured image.", {
              iconPack: "mdi",
              icon: "mdi-image",
              theme: "outline",
            })
            .goAway(3000);
        }
      }
    },
    onButtonClick() {
      this.$refs.uploader.click();
    },
    async onFileChanged(e) {
      this.isSelecting = true;
      var file = e.target.files[0];

      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(f);
        });

      /* Read data */
      const data = await readData(file);

      /* upload the converted data */
      const instance = this.$cloudinary
        .upload(data, {
          folder: "nftsoul/collection-featured",
          uploadPreset: "jzzyk6rp",
        })
        .then((response) => {
          this.public_id = response.public_id;
          this.src = this.$cloudinary.image.url(response.public_id, {
            gravity: "auto:subject",
          });
          this.isSelecting = false;
          console.log(this.src);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectImage(item) {
      this.src = item.imageUrl;
    },
  },
};
</script>

<style lang="css">
.upload-box {
  width: 250px;
  min-height: 200px;
  border: 1px dashed #c202d3;
}

.dark-text {
  color: #1103a2;
}

.v-input__slot {
  box-shadow: none !important;
}
</style>
