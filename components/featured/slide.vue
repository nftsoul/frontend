<template>
  <div class="dark-bg pt-16">
    <v-card min-height="600" flat color="transparent">
      <v-container>
        <v-row justify="center" class="mt-5">
          <h3>Featured Collections</h3>
        </v-row>
        <v-row v-if="premium.length == 0" justify="center">
          <v-col align="center">
            <orbit-spinner
              class="ma-10"
              :animation-duration="1200"
              :size="55"
              color="#fff"
            />
            <p>Loading Premium Collections...</p>
          </v-col>
        </v-row>
        <v-row v-else justify="center">
          <v-col cols="12" class="px-5" align="center">
            <carousel-3d
              style="box-shadow: none"
              autoplay
              autoplayHoverPause
              :controls-visible="true"
              :controls-width="40"
              :controls-height="40"
              perspective="0"
              inverseScaling="00"
              space="360"
              display="3"
              width="320"
              height="545"
              border="0"
            >
              <slide v-for="(item, i) in premium" :index="i" :key="i">
                <template
                  slot-scope="{ index, isCurrent, leftIndex, rightIndex }"
                >
                  <v-card
                    color="transparent"
                    @click="seePremium(item)"
                    :data-index="index"
                    flat
                    class="slide-box pa-5"
                    max-width="320"
                    height="470"
                    :class="{
                      current: isCurrent,
                      onLeft: leftIndex >= 0,
                      onRight: rightIndex >= 0,
                    }"
                  >
                    <div class="outer-card">
                      <div class="inner-card">
                        <v-img
                          :src="item.image"
                          class="mx-auto"
                          width="220"
                          height="220"
                        ></v-img>

                        <v-card
                          class="rounded-pill mt-n6"
                          max-width="150"
                          style=""
                        >
                          <v-list dense class="py-1">
                            <v-list-item dense class="pa-0">
                              <v-list-item-avatar class="my-0 ml-2">
                                <v-icon>mdi-account-tie</v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title class="ml-n2">{{
                                  item.user_id.slice(0, 5)
                                }}</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                        <v-card-subtitle class="text-left">{{
                          item.gallery_name
                        }}</v-card-subtitle>
                        <v-row>
                          <div
                            class="prem-sup-card rounded-lg"
                            v-for="(nft, i) in item.nfts"
                            :key="i"
                          >
                            <span v-if="i < 4">{{ nft.name }}</span>
                          </div>
                        </v-row>
                      </div>
                    </div>
                  </v-card>
                  <!-- <v-card :data-index="index" class="slide-box pa-5" color="primary" max-width="320" height="545" :class="{current:isCurrent,onLeft:(leftIndex >=0),onRight:(rightIndex >= 0)}">
                                <v-img :src="require('~/assets/images/featured/'+item.src)" class="mx-auto" max-width="280"></v-img>
                                <div class="outer-avatar ml-10 mt-n7">
                                    <v-avatar>
                                        <img :src="require('~/assets/images/featured/'+item.avatar)" alt="img">
                                    </v-avatar>
                                </div>
                                <v-card-title>{{item.title}}</v-card-title>
                                <v-card-subtitle>{{item.subtitle}}</v-card-subtitle>
                                <v-card-actions>
                                    <div class="outer-btn mx-auto" @click="$store.commit('content/setDetailDialog',true)">
                                        <div class="inner-btn">
                                            <p class="ml-6 mt-n1" style="font-size:14px">View</p>
                                        </div>
                                    </div>
                                </v-card-actions>
                            </v-card> -->
                </template>
              </slide>
            </carousel-3d>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
let OrbitSpinner = null;
if (process.client) {
  OrbitSpinner = require("epic-spinners").OrbitSpinner;
}
export default {
  components: { OrbitSpinner },
  data() {
    return {
      premium: [],
    };
  },
  mounted() {
    this.getPremium()
  },
  methods: {
    getPremium() {
      axios
        .get("https://nft-soul.herokuapp.com/api/get-gallery")
        .then((res) => {
          this.premium = res.data.premium;
        })
        .catch((err) => console.log(err.response));
    },
    seePremium(item) {
      this.$store.commit("content/setSelected", item);
      this.$router.push({
        name: "preview",
      });
    },
  },
};
</script>

<style lang="css">
.outer-avatar {
  width: 50px;
  border-radius: 50px;
  background: linear-gradient(
    264.44deg,
    #fe87ff 2.87%,
    #c202d3 34.05%,
    #5e0fff 67.82%,
    #1905da 99.15%
  );
  padding: 1px;
}

.slide-box {
  border-radius: 50px !important;
}

.carousel-3d-slide {
  background: #030537 !important;
  border-radius: 50px !important;
}

.detail-card {
  border-radius: 7px;
  box-shadow: 0px 0px 5px #b0b0b0;
}

.dialog-card-title {
  font-weight: 600;
  font-size: 12px;
  color: #636262;
}

.dialog-card-subtitle {
  font-weight: 600;
  font-size: 14px;
  color: #f5f7f8;
}

a.next {
  border: 3px solid #c202d3;
  padding-right: 7px;
  border-radius: 50%;
  line-height: 28px !important;
}

a.prev {
  border: 3px solid white;
  border-radius: 50%;
  padding-left: 7px;
  line-height: 28px !important;
  border: 3px solid #c202d3;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

a.next span {
  background: linear-gradient(
    86.47deg,
    #fe87ff 1.47%,
    #fd2bff 21.9%,
    #c202d3 39.06%,
    #9208e8 57.62%,
    #5e0fff 84.84%,
    #1905da 96.24%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

a.prev span {
  background: linear-gradient(
    86.47deg,
    #fe87ff 1.47%,
    #fd2bff 21.9%,
    #c202d3 39.06%,
    #9208e8 57.62%,
    #5e0fff 84.84%,
    #1905da 96.24%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.slider {
  @media screen and (min-width: 769px) {
    height: 220px;
  }

  @media screen and (max-width: 440px) {
    height: 140px;
  }
}
</style>
