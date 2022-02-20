<template>
  <div class="dark-bg">
    <v-card :min-height="screenHeight()" flat color="transparent">
      <v-container class="py-16">
        <v-row class="py-16" justify="center">
          <v-col cols="12" lg="12" md="8" align="center">
            <v-row justify="center">
              <p class="title">Trending Collections</p>
            </v-row>
            <v-row v-if="nfts.length == 0" justify="center">
              <v-col align="center">
                <div class="spinner-box my-16">
                  <client-only>
                    <orbit-spinner
                      :animation-duration="1200"
                      :size="55"
                      color="#fff"
                    />
                  </client-only>
                </div>
                <p>Loading your Collections...</p>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col
                cols="12"
                lg="3"
                md="6"
                v-for="(item, i) in nfts"
                :key="i"
                align="center"
              >
                <v-card
                  color="transparent"
                  flat
                  class="pa-5"
                  max-width="300"
                  height="470"
                  @click="seeNft(item)"
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
              </v-col>
              <v-col align="center">
                <v-pagination
                  v-model="page"
                  dark
                  :length="total"
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                  :total-visible="10"
                  @input="input"
                  class="my-5"
                ></v-pagination>
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
let OrbitSpinner = null;
if (process.client) {
  OrbitSpinner = require("epic-spinners").OrbitSpinner;
}
export default {
  components: { OrbitSpinner },
  data() {
    return {
      nfts: [],
      page: 1,
      limit: 15,
      total: 0,
      loading: true,
    };
  },
  mounted() {
    this.getTrendingNfts();
  },
  methods: {
    screenHeight() {
      return window.innerHeight;
    },
    getTrendingNfts() {
      axios
        .get(
          "https://nft-soul.herokuapp.com/api/all-trending?page=" +
            this.page +
            "&limit=" +
            this.limit
        )
        .then((res) => {
          this.total = Math.floor(res.data.galleryCount / this.limit) + 1;
          this.nfts = res.data.trending;
          this.loading = false;
        })
        .catch((err) => console.log(err.response));
    },
    input(e) {
      this.page = e;
      this.getTrendingNfts();
    },
    seeNft(item) {
      this.$store.commit("content/setSelected", item);
      this.$router.push({
        name: "preview",
      });
    },
  },
};
</script>
