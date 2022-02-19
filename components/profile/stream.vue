<template>
  <div class="dark-bg">
    <v-container>
      <v-row justify="center">
        <h3>Item Preview</h3>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <client-only>
          <carousel-3d
            style="box-shadow: none;"
            :autoplay="false"
            :autoplay-timeout="10000"
            :controls-visible="true"
            :controls-width="40"
            :controls-height="40"
            perspective="0"
            inverseScaling="00"
            space="360"
            display="1"
            width="900"
            height="545"
            border="0"
          >
            <slide v-for="(item, i) in selected.nfts" :index="i" :key="i">
              <template
                slot-scope="{ index, isCurrent, leftIndex, rightIndex }"
              >
                <div class="enclose-border yo">
                  <v-container>
                    <v-row>
                      <v-col>
                        <p class="text-h6 mb-0">
                          {{ selected.gallery_name }}
                        </p>
                        <p class="mb-0">
                          <small
                            >{{ index + 1 }} of {{ selected.nfts.length }}

                            <v-tooltip
                              top
                              v-if="favourite.includes(selected._id)"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-chip dark x-small v-bind="attrs" v-on="on">
                                  <v-icon small class="mr-1">mdi-heart</v-icon
                                  >Added
                                </v-chip>
                              </template>
                              <span>Favourite</span>
                            </v-tooltip>

                            <v-tooltip top v-else>
                              <template v-slot:activator="{ on, attrs }">
                                <v-chip
                                  dark
                                  small
                                  @click="addToFavourite"
                                  v-bind="attrs"
                                  v-on="on"
                                  :loading="loading"
                                >
                                  <v-icon small class="mr-1">mdi-heart</v-icon
                                  >Add
                                </v-chip>
                              </template>
                              <span>Add to Favourite</span>
                            </v-tooltip>
                          </small>
                        </p>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" lg="5" md="6" align="center">
                        <div class="img-box pa-2">
                          <v-img
                            :src="item.image"
                            :lazy-src="item.image"
                            class="mx-auto rounded-lg"
                            max-width="350"
                            height="300"
                          >
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
                        </div>
                      </v-col>
                      <v-col cols="12" lg="7" md="6" class="mt-n5">
                        <v-card outlined class="rounded-lg pa-2">
                          <v-row no-gutters>
                            <v-chip
                              dark
                              small
                              color="#C202D3"
                              @click="active = 'details'"
                              >Details</v-chip
                            >
                            <v-chip
                              small
                              dark
                              class="mx-2"
                              @click="active = 'attributes'"
                              >Attributes</v-chip
                            >
                            <v-spacer></v-spacer>
                            <!-- <h3>Rank {{index+1}}</h3> -->
                          </v-row>
                          <v-divider class="mt-3"></v-divider>
                          <v-card-text class="caption">
                            <span v-if="active == 'details'">{{
                              item.description
                            }}</span>

                            <span v-if="active == 'attributes'">
                              <v-row>
                                <v-col
                                  class="py-0"
                                  cols="4"
                                  v-for="(attr, j) in item.attributes"
                                  :key="j"
                                >
                                  <div class="ma-1 attr-box">
                                    <p class="mb-0" v-if="attr.trait_type">
                                      {{ attr.trait_type }}
                                    </p>
                                    <span
                                      v-if="attr.value"
                                      class="text--white"
                                      >{{ attr.value }}</span
                                    >
                                  </div>
                                </v-col>
                              </v-row>
                            </span>
                          </v-card-text>
                        </v-card>
                        <v-row>
                          <v-col>
                            <p class="mb-0"><small>Countdown</small></p>
                            <p
                              class="text-h6 font-weight-bold"
                              style="color: #c202d3;"
                            >
                              {{ minuteLeft }}:{{ secondLeft }}
                            </p>
                          </v-col>
                          <!-- <v-col align="right">
                            <v-btn
                              small
                              rounded
                              class="btn-exhibit mt-3"
                              @click="viewNext"
                              >View Next NFT</v-btn
                            >
                          </v-col> -->
                        </v-row>

                        <v-divider class="mt-n3"></v-divider>

                        <v-list-item dense class="px-0">
                          <v-list-item-avatar size="30">
                            <v-icon>mdi-account-tie</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ selected.user_id.slice(0, 5) }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </template>
            </slide>
          </carousel-3d>
          </client-only>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      totalTime: 300,
      minuteLeft: 0,
      secondLeft: 0,
      active: "details",
      favourite: [],
      loading: false,
      index: 0,
      current: "",
      attributes: [],
    };
  },
  computed: {
    selected() {
      return this.$store.state.content.selected;
    },
    walletAddress() {
      return this.$store.state.wallet.walletAddress;
    },
  },

  mounted() {
    if(this.selected == ''){
      this.$router.push('/')
    }
    this.current = this.selected.nfts[this.index];
    this.getFavourite();
    window.setInterval(() => {
      this.minuteLeft = Math.floor(this.totalTime / 60);
      this.secondLeft = this.totalTime % 60;
      this.totalTime -= 1;
      if (this.totalTime == 0) {
        window.clearInterval();
        this.$router.push({
          name: "preview",
        });
      }
    }, 1000);
  },
  methods: {
    viewNext() {
      if (this.selected.nfts.length > this.index + 1) {
        this.index++;
      }
    },
    getFavourite() {
      axios
        .get(
          "http://nft-soul.herokuapp.com/api/get-favourite-gallery/" +
            this.walletAddress
        )
        .then((res) => {
          for (var x = 0; x < res.data.length; x++) {
            this.favourite.push(res.data[x].gallery_id);
          }
        })
        .catch((err) => console.log(err.response));
    },

    addToFavourite() {
      this.favourite.push(this.selected._id);
      axios
        .post("http://nft-soul.herokuapp.com/api/save-favourite", {
          user_id: this.walletAddress,
          gallery_id: this.selected._id,
        })
        .then((res) => {
          this.loading = false;
          this.$toast
            .success("Added to favourite.", {
              iconPack: "mdi",
              icon: "mdi-heart",
              theme: "outline",
            })
            .goAway(3000);
        })
        .catch((err) => console.log(err.response));
    },
  },
};
</script>

<style lang="css">
.carousel-3d-slide {
  background: #030537 !important;
  border-radius: 10px !important;
  box-shadow: none;
}
.img-box {
  box-shadow: none;
  height: 300px;
  width: 300px;
  border-radius: 10px;
  border: 2px solid #030537;
}
.attr-box {
  background-color: #0e103b;
  border-radius: 7px;
  padding: 10px;
  box-shadow: none !important;
}
.attr-box p {
  font-size: 14px;
  color: #f5f7f8;
}
</style>
