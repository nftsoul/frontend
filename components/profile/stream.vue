<template>
  <div class="dark-bg">
    <v-container>
      <v-row justify="center" class="mt-5">
        <h3>Item Preview</h3>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" align="center">
          <div class="enclose-border yo">
            <carousel-3d
              :controls-visible="true"
              :controls-width="40"
              :controls-height="40"
              perspective="0"
              inverseScaling="00"
              display="1"
              width="700"
              height="400"
              border="0"
            >
              <slide v-for="(item, i) in selected.nfts" :index="i" :key="i">
                <template
                  slot-scope="{ index, isCurrent, leftIndex, rightIndex }"
                >
                  <v-card
                    :data-index="index"
                    flat
                    style="border-radius: 10px"
                    color="transparent"
                    :class="{
                      current: isCurrent,
                      onLeft: leftIndex >= 0,
                      onRight: rightIndex >= 0,
                    }"
                  >
                    <v-container>
                      <v-row>
                        <v-col cols="12" lg="5" md="6">
                          <v-img
                            :src="item.img"
                            :lazy-src="item.img"
                            class="mx-auto rounded-lg"
                            height="375"
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
                        </v-col>
                        <v-col cols="12" lg="7" md="6">
                          <p class="text-h5 mb-0">
                            {{ selected.gallery_name }}
                          </p>
                          <p>
                            <small
                              >{{ i + 1 }} of {{ selected.nfts.length }}

                              <v-tooltip
                                top
                                v-if="favourite.includes(selected._id)"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-chip dark small v-bind="attrs" v-on="on">
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
                          <v-card light color="white" class="rounded-lg pa-2">
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
                              <!-- <v-chip small dark>History</v-chip> -->
                            </v-row>
                            <v-divider class="mt-3"></v-divider>
                            <v-card-text class="caption">
                              <span v-if="active == 'details'">{{
                                selected.description
                              }}</span>
                              <span v-if="active == 'attributes'">
                                <v-chip
                                  class="ma-1"
                                  small
                                  v-for="(attr, j) in selected.nfts[i]
                                    .attributes"
                                  :key="j"
                                  >{{ attr.trait_type }}</v-chip
                                >
                              </span>
                            </v-card-text>
                          </v-card>
                          <p class="mb-0"><small>Countdown</small></p>
                          <p
                            class="text-h6 font-weight-bold"
                            style="color: #c202d3"
                          >
                            {{ minuteLeft }}:{{ secondLeft }}
                          </p>
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
                          <!-- <v-btn rounded small class="btn-exhibit">
                                                    <small>View Next NFT</small>
                                                </v-btn> -->
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </template>
              </slide>
            </carousel-3d>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      totalTime: 300,
      minuteLeft: 0,
      secondLeft: 0,
      active: "details",
      favourite: [],
      loading:false
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
    getImg(item) {
      return this.$cloudinary.image.url(item.image, {
        gravity: "auto:subject",
      });
    },
    addToFavourite() {
      axios
        .post("http://nft-soul.herokuapp.com/api/save-favourite", {
          user_id: this.walletAddress,
          gallery_id: this.selected._id,
        })
        .then((res) => {
          this.favourite.push(this.selected._id);
          this.loading=false
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
</style>
