<template>
  <div class="dark-bg">
    <v-container>
      <div class="enclose-border">
        <v-row justify="center">
          <p class="title">Premium Collections</p>
        </v-row>
        <v-row v-if="premium.length > 0">
          <v-col cols="12" align="center">
            <client-only>
              <VueSlickCarousel v-bind="slickSetting">
                <div v-for="(item, i) in premium" :key="i">
                  <v-card
                    color="transparent"
                    flat
                    class="pa-5"
                    max-width="300"
                    height="470"
                    @click="seePremium()"
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
              <div class="outer-btn" @click="$router.push('/premium-nfts')">
                <div class="inner-btn">
                  <p class="mt-n1 mr-3" style="font-size: 14px">View All</p>
                </div>
              </div>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-else justify="center">
          <client-only>
            <spinner
              :animation-duration="1200"
              :size="55"
              color="#fff"
              class="my-16"
            />
          </client-only>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      premium: [],
    };
  },
  computed: {
    slickSetting() {
      return this.$store.state.plugins.slickSetting;
    },
  },
  mounted() {
    this.getPremium();
  },
  methods: {
    seePremium() {
      this.$router.push({
        name: "preview",
      });
    },
    getPremium() {
      axios
        .get(this.$auth.ctx.env.baseUrl+"/get-gallery")
        .then((res) => {
          this.premium = res.data.premium;
        })
        .catch((err) => console.log(err.response));
    },
  },
};
</script>

<style lang="css">
.theme--dark.v-list {
  background-color: #030537 !important;
  box-shadow: 2px 2px 4px 0px #c202d380 inset !important;
  box-shadow: -2px -2px 4px 0px #c202d380 inset !important;
}

.prem-sup-card {
  width: fit-content;
  background: linear-gradient(
    261.36deg,
    #c202d3 3.07%,
    #300253 64.08%,
    #16023c 82.04%,
    #000229 100%
  );
  margin: 5px;
}

.prem-sup-card span {
  padding: 0 10px;
  font-size: 12px;
}
</style>
