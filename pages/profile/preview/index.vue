<template>
  <div class="dark-bg">
    <v-card :min-height="screenHeight()" flat color="transparent">
    <v-container class="py-16">
      <v-row class="py-16">
        <v-col>
          <v-container>
            <v-row justify="center">
              <v-col cols="12" lg="11" md="11">
                <div class="enclose-border">
                  <v-container>
                    <v-row>
                      <v-col
                        v-if="selected.nfts.length > 0"
                        cols="12"
                        lg="4"
                        md="6"
                        align="center"
                        class="px-5"
                      >
                        <v-img
                          :src="selected.nfts[0].image"
                          :lazy-src="selected.nfts[0].image"
                          class="rounded-lg"
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
                      <v-col
                        v-if="selected.nfts.length > 1"
                        cols="12"
                        lg="4"
                        md="6"
                        align="center"
                        class="px-5"
                      >
                        <v-img
                          :src="selected.nfts[1].image"
                          :lazy-src="selected.nfts[1].image"
                          class="rounded-lg"
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
                      <v-col cols="12" lg="4" md="6" class="pr-0">
                        <p>{{ selected.gallery_name }}</p>
                        <v-list dense style="box-shadow: none !important;">
                          <v-list-item dense>
                            <v-list-item-avatar>
                              <v-icon>mdi-account-tie</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title>
                                <span v-if="profile.name">{{profile.name }}</span>
                                <span v-else>{{ profile.wallet_address.slice(0, 5) }}</span>
                                <!-- Roy Reyna -->
                              </v-list-item-title>
                              <!-- <v-list-item-subtitle>
                                                            @Rayna
                                                        </v-list-item-subtitle> -->
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                        <v-row class="mt-5">
                          <v-col cols="5">
                            <p class="mb-0 caption text--disabled">
                              start with
                            </p>
                            <p class="text-h5">{{ selected.price }} SOL</p>

                            <p class="mt-2 body-2">
                              Total Items: {{ selected.nfts.length }}
                            </p>
                          </v-col>
                          <v-col cols="7" class="px-0">
                            <p class="mb-0 caption text--disabled">
                              About This Gallery
                            </p>
                            <p style="line-height: 15px;">
                              <small>{{ selected.description }}</small>
                            </p>
                            <!-- <v-btn small rounded color="#A0A0A0">
                                                        <small>Add To Favourite</small>
                                                    </v-btn> -->
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <CommonProfile />
        </v-col>
      </v-row>
    </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "user",
  data() {
    return {};
  },
  computed: {
    selected() {
      return this.$store.state.content.selected;
    },
    profile(){
      return this.$store.state.wallet.profile
    }
  },
  mounted() {
    if (this.selected == "") {
      this.$router.push("/");
    }
  },
  methods: {
    screenHeight(){
        return window.innerHeight;
    },
  },
};
</script>
