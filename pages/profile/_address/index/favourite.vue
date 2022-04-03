<template>
  <div>
    <v-card :min-height="screenHeight()" flat color="transparent">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="8" md="6">
            <v-row v-if="collections.length == 0" justify="center">
              <v-col v-if="!noData" align="center">
                <div class="spinner-box my-16">
                  <client-only>
                  <spinner
                    :animation-duration="1200"
                    :size="55"
                    color="#fff"
                  />
                  </client-only>
                </div>
                <p>Loading your Collections...</p>
              </v-col>
              <v-col v-else align="center">
                <v-img
                  :src="require('~/assets/images/sad.svg')"
                  max-width="300"
                ></v-img>
                <p>You do not have any favourite collection</p>
                <v-btn
                  @click="$router.push({ path: '/featured' })"
                  class="btn-exhibit"
                  >Explore Now</v-btn
                >
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col
                cols="12"
                lg="4"
                md="6"
                v-for="(item, i) in collections"
                :key="i"
                align="center"
              >
                <v-card
                  color="transparent"
                  flat
                  max-width="300"
                  height="470"
                  @click="seePremium(item)"
                >
                  <div class="outer-card">
                    <div class="inner-card">
                      <v-img
                        :src="item.gallery_id.image"
                        :lazy-src="item.gallery_id.image"
                        class="mx-auto"
                        width="220"
                        height="220"
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
                                item.gallery_id.user_id.slice(0, 5) + "...."
                              }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                      <v-card-subtitle class="text-left">{{
                        item.gallery_id.gallery_name
                      }}</v-card-subtitle>
                      <v-row>
                        <div
                          class="prem-sup-card rounded-lg"
                          v-for="(nft, i) in item.gallery_id.nfts"
                          :key="i"
                        >
                          <span v-if="i < 4">{{ nft.name }}</span>
                        </div>
                      </v-row>
                    </div>
                  </div>
                </v-card>
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
export default {
  data() {
    return {
      collections: [],
      noData: false,
    };
  },
  computed: {
    walletAddress() {
            return this.$route.params.address
    },
  },
  mounted() {
    this.getCollections();
  },
  methods: {
     screenHeight(){
        return window.innerHeight-350;
    },
    getCollections() {
      axios
        .get(
          this.$auth.ctx.env.baseUrl+"/get-favourite/" +
            this.walletAddress
        )
        .then((res) => {
          this.collections = res.data;
          if (res.data.length == 0) {
            this.noData = true;
          }
        })
        .catch((err) => console.log(err.response));
    },
    seePremium(item) {
      this.$store.commit("content/setSelected", item.gallery_id);
      this.$router.push({
        name: "preview",
      });
    },
  },
};
</script>
