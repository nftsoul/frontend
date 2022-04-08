<template>
  <div class="dark-bg">
    <v-card :min-height="screenHeight()" flat color="transparent">
      <v-container class="py-lg-16 py-md-10 py-5">
        <v-row justify="center" class="py-5">
          <v-col cols="12" lg="8" md="10">
            <v-row v-if="nfts.length > 0" justify="center">
              <v-col cols="12" lg="6" md="6" v-for="(item, i) in nfts" :key="i">
                <div class="outer-card rounded-lg" style="height: 55px;">
                  <div class="inner-card pa-1 rounded-lg" style="height: 53px;">
                    <v-list
                      dense
                      style="
                        background-color: transparent;
                        box-shadow: none !important;
                      "
                      class="py-0"
                    >
                      <v-list-item class="px-0">
                        <v-list-item-avatar tile class="rounded-lg my-0">
                          <v-img :src="item.image" :lazy-src="item.image">
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular
                                  indeterminate
                                  color="grey lighten-5"
                                ></v-progress-circular>
                              </v-row>
                            </template>
                          </v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-tooltip top v-if="collected.includes(item.name)">
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon v-bind="attrs" v-on="on" color="red"
                                >mdi-stop-circle-outline</v-icon
                              >
                            </template>
                            <span class="caption"
                              >Already belongs to a collection</span
                            >
                          </v-tooltip>
                          <v-checkbox
                            v-else
                            @change="selectNft(item)"
                            color="green"
                            dark
                            value="red"
                            style="border-radius: 50% !important;"
                          ></v-checkbox>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </div>
                </div>
              </v-col>
              <v-col align="right">
                <v-btn
                  text
                  dark
                  class="btn-exhibit px-5"
                  @click="createGallery"
                >
                  Add To Gallery
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col v-if="loading == true" align="center">
                <div class="spinner-box my-16">
                  <client-only>
                    <spinner
                      :animation-duration="1200"
                      :size="55"
                      color="#fff"
                    />
                  </client-only>
                </div>
                <p>Loading your NFTs...</p>
              </v-col>
              <v-col v-else align="center">
                <v-img
                  :src="require('~/assets/images/sad.svg')"
                  max-width="300"
                ></v-img>
                <p>Yo do not have any NFTs. Get some and then come back.</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import NFTs from "@primenums/solana-nft-tools";
const web3 = require("@solana/web3.js");
let solrayz = null;
if (process.client) {
  solrayz = require("@nfteyez/sol-rayz");
}
export default {
  data() {
    return {
      connect: "",
      collected: [],
      selected: [],
      nfts: [],
      loading: true,
      color:
        "linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%)",
    };
  },
  computed: {
    walletAddress() {
            return this.$route.params.address
    },
  },
  watch: {
    walletAddress(newValue, oldValue) {
      if (newValue != oldValue) {
        this.getAllNftData();
      }
    },
  },
  mounted() {
    this.getAllNftData();
  },
  methods: {
    screenHeight() {
      return window.innerHeight - 250;
    },
    async getAllNftData() {
      await this.getCollected();
      // const publicAddress = await solrayz.resolveToWalletAddress({
      //   text: this.walletAddress,
      // });

      // this.meta = await solrayz.getParsedNftAccountsByOwner({
      //   publicAddress,
      // });
      // let promises = [];
      // for (var x = 0; x < this.meta.length; x++) {
      //   promises.push(
      //     await axios.get(this.meta[x].data.uri).then((response) => {
      //       this.nfts.push(response.data);
      //     })
      //   )
      // }
      const conn = new web3.Connection(
        web3.clusterApiUrl("devnet"),
        "confirmed"
      );
      this.nfts = [];
      // Get all mint tokens (NFTs) from your wallet
      const walletAddr = this.walletAddress;
      let mints = await NFTs.getMintTokensByOwner(conn, walletAddr);

      let promises = [];
      for (var x = 0; x < mints.length; x++) {
        let myNFT = await NFTs.getNFTByMintAddress(conn, mints[x]);
        this.nfts.push(myNFT);
      }
      this.loading = false;
    },
    getCollected() {
      axios
        .get(
          this.$auth.ctx.env.baseUrl+"/all-gallery/" + this.walletAddress
        )
        .then((res) => {
          for (var x = 0; x < res.data.length; x++) {
            for (var y = 0; y < res.data[x].nfts.length; y++) {
              this.collected.push(res.data[x].nfts[y].name);
            }
          }
        })
        .catch((err) => console.log(err.response));
    },
    createGallery() {
      if (this.selected.length == 0) {
        this.$toast
          .error("Please select some nfts to create gallery.", {
            iconPack: "mdi",
            icon: "mdi-image",
            theme: "outline",
          })
          .goAway(3000);
      } else {
        this.$store.commit("nft/setCollection", this.selected);
        this.$router.push({
          name: "create",
        });
      }
    },

    selectNft(item) {
      if (this.selected.includes(item)) {
        this.selected.splice(this.selected.indexOf(item), 1);
      } else {
        this.selected.push(item);
      }
    },
  },
};
</script>

<style lang="css">
.btn-plus {
  background: linear-gradient(
    264.75deg,
    #fe87ff 3.04%,
    #fd2bff 23.86%,
    #c202d3 41.34%,
    #5e0fff 68.89%,
    #1905da 99.63%
  ) !important;
  border-radius: 50%;
  padding: 0px 2px;
}
</style>
