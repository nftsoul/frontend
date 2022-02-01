<template>
  <div class="dark-bg">
    <v-container>
      <v-row justify="center" class="py-5">
        <div class="line-box mt-3"></div>
        <p class="grand-title-text mx-3">Our Top Collection</p>
        <div class="line-box mt-3"></div>
      </v-row>
      <div class="enclose-border">
        <v-row justify="center">
          <p class="title">Trending Collections</p>
        </v-row>
        <v-row v-if="trending.length > 0">
          <v-col cols="12" align="center">
            <client-only>
              <VueSlickCarousel v-bind="slickSetting">
                <div v-for="(item, i) in trending" :key="i">
                  <v-card
                    color="transparent"
                    flat
                    class="pa-5"
                    max-width="300"
                    height="470"
                    @click="seePremium(item)"
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
                </div>
              </VueSlickCarousel>
            </client-only>
          </v-col>
          <v-col cols="12" align="right">
            <v-row justify="end">
              <div class="outer-btn" @click="$router.push('/trending-nfts')">
                <div class="inner-btn">
                  <p class="mt-n1 mr-3" style="font-size: 14px">View All</p>
                </div>
              </div>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-else justify="center">
          <orbit-spinner
            :animation-duration="1200"
            :size="55"
            color="#fff"
            class="my-16"
          />
        </v-row>
        <v-row justify="center">
            <p class="title">Popular Collections</p>
          </v-row>
        <v-row justify="center" v-if="popular.length > 0">
          <v-col cols="12" align="center">
            <client-only>
              <VueSlickCarousel v-bind="slickSetting">
                <div v-for="(item, i) in popular" :key="i">
                  <v-card
                    color="transparent"
                    flat
                    class="pa-5"
                    max-width="300"
                    height="470"
                    @click="seePremium(item)"
                  >
                    <div class="outer-card">
                      <div class="inner-card">
                        <v-img
                          :src="item.image"
                          class="mx-auto"
                          width="220"
                          height="220"
                        ></v-img>

                        <v-card class="rounded-pill mt-n6" max-width="150">
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
                </div>
              </VueSlickCarousel>
            </client-only>
          </v-col>
          <v-col cols="12" align="right">
            <v-row justify="end">
              <div class="outer-btn" @click="$router.push('/popular-nfts')">
                <div class="inner-btn">
                  <p class="mt-n1 mr-3" style="font-size: 14px">View All</p>
                </div>
              </div>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-else justify="center">
            <orbit-spinner
                :animation-duration="1200"
                :size="55"
                color="#fff"
                class="my-16"
              />
        </v-row>
        <!-- <v-row justify="center">
                <v-col cols="12" align="center">
                    <p class="title">Free Collections</p>
                    <client-only>
                        <VueSlickCarousel v-bind="slickSetting">
                            <div>
                                <v-card color="transparent" flat class="pa-5" max-width="300" @click="seePremium()">
                                    <div class="outer-card">
                                        <div class="inner-card">
                                            <v-img :src="require('~/assets/images/1.png')" class="mx-auto" width="220" height="220"></v-img>

                                            <v-card class="rounded-pill mt-n6" max-width="150" style="">
                                                <v-list dense class="py-1">
                                                    <v-list-item dense class="pa-0">
                                                        <v-list-item-avatar class="my-0 ml-2">
                                                            <v-icon>mdi-account-tie</v-icon>
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title class="ml-n2">@Roy Reyna</v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                            <v-card-subtitle class="text-left">Lorem Ipsum Dolor</v-card-subtitle>
                                            <v-row>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko Kingdom</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Cat Series</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Stone Tail</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Eye</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Bunny Ear</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Triple Horn</span>
                                                </div>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-card>
                            </div>
                            <div>
                                <v-card color="transparent" flat class="pa-5" max-width="300" @click="seePremium()">
                                    <div class="outer-card">
                                        <div class="inner-card">
                                            <v-img :src="require('~/assets/images/2.png')" class="mx-auto" width="220" height="240"></v-img>
                                            <v-card class="rounded-pill mt-n6" max-width="150" style="">
                                                <v-list dense class="py-1">
                                                    <v-list-item dense class="pa-0">
                                                        <v-list-item-avatar class="my-0 ml-2">
                                                            <v-icon>mdi-account-tie</v-icon>
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title class="ml-n2">@Roy Reyna</v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                            <v-card-subtitle class="text-left">Lorem Ipsum Dolor</v-card-subtitle>
                                            <v-row>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko Kingdom</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Cat Series</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Stone Tail</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Eye</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Bunny Ear</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Triple Horn</span>
                                                </div>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-card>
                            </div>
                            <div>
                                <v-card color="transparent" flat class="pa-5" max-width="300" @click="seePremium()">
                                    <div class="outer-card">
                                        <div class="inner-card">
                                            <v-img :src="require('~/assets/images/3.png')" class="mx-auto" width="220" height="240"></v-img>
                                            <v-card class="rounded-pill mt-n6" max-width="150" style="">
                                                <v-list dense class="py-1">
                                                    <v-list-item dense class="pa-0">
                                                        <v-list-item-avatar class="my-0 ml-2">
                                                            <v-icon>mdi-account-tie</v-icon>
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title class="ml-n2">@Roy Reyna</v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                            <v-card-subtitle class="text-left">Lorem Ipsum Dolor</v-card-subtitle>
                                            <v-row>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko Kingdom</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Cat Series</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Stone Tail</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Eye</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Bunny Ear</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Triple Horn</span>
                                                </div>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-card>
                            </div>
                            <div>
                                <v-card color="transparent" flat class="pa-5" max-width="300" @click="seePremium()">
                                    <div class="outer-card">
                                        <div class="inner-card">
                                            <v-img :src="require('~/assets/images/4.png')" class="mx-auto" width="220" height="240"></v-img>
                                            <v-card class="rounded-pill mt-n6 prem" max-width="150" style="">
                                                <v-list dense class="py-1">
                                                    <v-list-item dense class="pa-0">
                                                        <v-list-item-avatar class="my-0 ml-2">
                                                            <v-icon>mdi-account-tie</v-icon>
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title class="ml-n2">@Roy Reyna</v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                            <v-card-subtitle class="text-left">Lorem Ipsum Dolor</v-card-subtitle>
                                            <v-row>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko Kingdom</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Cat Series</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Stone Tail</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Eye</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Bunny Ear</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Triple Horn</span>
                                                </div>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-card>
                            </div>
                            <div>
                                <v-card color="transparent" flat class="pa-5" max-width="300" @click="seePremium()">
                                    <div class="outer-card">
                                        <div class="inner-card">
                                            <v-img :src="require('~/assets/images/4.png')" class="mx-auto" width="220" height="240"></v-img>
                                            <v-card class="rounded-pill mt-n6" max-width="150" style="">
                                                <v-list dense class="py-1 prem">
                                                    <v-list-item dense class="pa-0">
                                                        <v-list-item-avatar class="my-0 ml-2">
                                                            <v-icon>mdi-account-tie</v-icon>
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title class="ml-n2">@Roy Reyna</v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                            <v-card-subtitle class="text-left">Lorem Ipsum Dolor</v-card-subtitle>
                                            <v-row>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko Kingdom</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Cat Series</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Stone Tail</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Eye</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Bunny Ear</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Triple Horn</span>
                                                </div>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-card>
                            </div>
                        </VueSlickCarousel>
                    </client-only>
                    
                </v-col>
                <v-col cols="12" align="right">
                    <v-row justify="end">
                        <div class="outer-btn">
                            <div class="inner-btn">
                                <p class="mt-n1 mr-3" style="font-size:14px">View All</p>
                            </div>
                        </div>
                    </v-row>
                </v-col>
            </v-row> -->
      </div>
    </v-container>
  </div>
</template>

<script>
let OrbitSpinner = null;
if (process.client) {
  OrbitSpinner = require("epic-spinners").OrbitSpinner;
}
import axios from "axios";
export default {
  components: { OrbitSpinner },
  data() {
    return {
      trending: [],
      popular: [],
    };
  },
  computed: {
    slickSetting() {
      return this.$store.state.plugins.slickSetting;
    },
  },
  mounted() {
    this.getCollections();
  },
  methods: {
    seePremium(item) {
      this.$store.commit("content/setSelected", item);
      this.$router.push({
        name: "preview",
      });
    },
    getCollections() {
      axios
        .get("https://nft-soul.herokuapp.com/api/get-gallery")
        .then((res) => {
          this.trending = res.data.trending;
          this.popular = res.data.premium;
        })
        .catch((err) => console.log(err.response));
    },
  },
};
</script>

<style lang="css">
.enclose-border {
  border: 1px solid #500083;
  box-sizing: border-box;
  filter: drop-shadow(0px 1px 10px #500083);
  border-radius: 10px;
  padding: 20px 40px;
}

.slider-card {
  background-color: transparent !important;
  border: 1px solid
    linear-gradient(
      264.75deg,
      #fe87ff 3.04%,
      #fd2bff 23.86%,
      #c202d3 41.34%,
      #5e0fff 68.89%,
      #1905da 99.63%
    );
}

.title {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #fe87ff;
  font-family: "Poppins", sans-serif !important;
}

.v-card {
  background-color: transparent !important;
}

.line-box {
  width: 80px;
  height: 1px;
  background: linear-gradient(
    264.75deg,
    #fe87ff 3.04%,
    #fd2bff 23.86%,
    #c202d3 41.34%,
    #5e0fff 68.89%,
    #1905da 99.63%
  );
}

.outer-card {
  max-width: 300px;
  height: 448px;
  background: linear-gradient(
    264.44deg,
    #fe87ff 2.87%,
    #c202d3 34.05%,
    #5e0fff 67.82%,
    #1905da 99.15%
  );
  padding: 1px;
}

.inner-card {
  background: #000229;
  width: 100%;
  padding: 20px;
  height: 446px;
  overflow: hidden;
}
</style>
