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
                <p>You have no collection</p>
                <v-btn @click="createCol()" class="btn-exhibit"
                  >Create Now</v-btn
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
                <v-hover v-slot="{ hover }">
                  <v-card color="transparent" flat max-width="300" height="470">
                    <div class="outer-card">
                      <div class="inner-card">
                        <v-img
                          :src="item.image"
                          :lazy-src="item.image"
                          class="mx-auto"
                          width="220"
                          height="220"
                        >
                          <v-expand-transition
                            v-if="walletAddress == profile.wallet_address"
                          >
                            <div
                              v-if="hover"
                              class="
                                d-flex
                                transition-fast-in-fast-out
                                dark-bg
                                darken-2
                                v-card--reveal
                                white--text
                              "
                              style="height: 100%"
                            >
                              <v-btn
                                small
                                color="background"
                                class="mr-1"
                                @click="editItem(item)"
                                :loading="editing"
                              >
                                <v-icon x-small>mdi-pencil</v-icon>
                                Edit
                              </v-btn>
                              <v-btn
                                small
                                color="background"
                                @click="deleteItem(item)"
                              >
                                <v-icon x-small>mdi-delete</v-icon>
                                Delete
                              </v-btn>
                            </div>
                          </v-expand-transition>
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
                        <div
                          @click="
                            $router.push({
                              name: 'preview-id',
                              params: { id: item._id },
                            })
                          "
                        >
                          <v-card
                            class="rounded-pill mt-n6"
                            max-width="150"
                            style=""
                          >
                            <v-list dense class="py-1">
                              <v-list-item dense class="pa-0">
                                <v-list-item-avatar class="my-0 ml-2">
                                  <v-img
                                    v-if="item.created_by.image_link"
                                    :src="item.created_by.image_link"
                                  ></v-img>
                                  <v-icon v-else>mdi-account-tie</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title
                                    class="ml-n2"
                                    v-if="item.created_by.name"
                                    >{{
                                      item.created_by.name.slice(0, 10)
                                    }}</v-list-item-title
                                  >
                                  <v-list-item-title class="ml-n2" v-else>{{
                                    item.user_id.slice(0, 5)
                                  }}</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-card>
                          <v-card-subtitle class="text-left mx-n3"
                            >{{ item.gallery_name.slice(0, 20)
                            }}<span v-if="item.gallery_name.length > 20"
                              >..</span
                            ></v-card-subtitle
                          >

                          <v-row>
                            <div
                              class="prem-sup-card rounded-lg px-2"
                              v-for="(nft, i) in item.nfts.slice(0, 6)"
                              :key="i"
                            >
                              <small v-if="nft.name.length > 8"
                                >{{ nft.name.slice(0, 6) }}..</small
                              >
                              <small v-else>{{ nft.name }}</small>
                            </div>
                          </v-row>

                          <br />

                          <v-col class="pa-0">
                            <v-divider class="mb-1"></v-divider>
                            <v-row no-gutters>
                              <small class="mr-1">{{ item.views }}</small>
                              <v-icon small>mdi-eye</v-icon>
                              <v-spacer></v-spacer>
                              <small class="mr-1">{{ item.favourites }}</small>
                              <v-icon small>mdi-heart-outline</v-icon>
                            </v-row>
                          </v-col>
                        </div>
                      </div>
                    </div>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-dialog max-width="400" v-model="deleteDialog">
      <v-card color="background">
        <v-card-title>Delete Confirm</v-card-title>
        <v-card-text>
          Are you sure you want to delete this gallery?
        </v-card-text>
        <v-card-actions>
          <v-btn small outlined @click="deleteDialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn small outlined @click="deleteConfirm()" :loading="deleting"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collections: [],
      noData: false,
      editing: false,
      deleting: false,
      selected: "",
      deleteDialog: false,
    };
  },
  computed: {
    walletAddress() {
      return this.$store.state.wallet.walletAddress;
    },
    profile(){
      return this.$store.state.wallet.profile
    }
  },
  mounted() {
    this.getCollections();
  },
  methods: {
    screenHeight() {
      if (process.client) {
        return window.innerHeight - 350;
      } else {
        return 600;
      }
    },
    getCollections() {
      this.$axios
        .get("/gallery/all/" + this.$route.params.address)
        .then((res) => {
          this.collections = res.data.galleries;
          if (this.collections.length == 0) {
            this.noData = true;
          }
        })
        .catch((err) => console.log(err.response));
    },
    createCol() {
      this.$router.push({
        name: "profile-address-index-exhibit",
        params: this.walletAddress,
      });
    },
    deleteItem(item) {
      this.selected = item;
      this.deleteDialog = true;
    },
    deleteConfirm() {
      this.deleting = true;
      this.$axios.delete("/gallery/" + this.selected._id).then((res) => {
        this.collections.splice(this.collections.indexOf(this.selected), 1);
        this.deleteDialog = false;
        this.deleting = false;
        this.$toast
          .success("Gallery has been deleted successfully.", {
            iconPack: "mdi",
            icon: "mdi-image",
            theme: "outline",
          })
          .goAway(3000);
      });
    },
    editItem(item) {
      this.editing = true;
      this.$axios.get("/gallery/stream/" + item._id).then((res) => {
        this.$store.commit("content/setSelected", res.data[0]);
        this.$store.commit("content/setEditing", true);
        this.$store.commit("nft/setCollection", res.data[0].nfts);
        this.$router.push({
          name: "profile-address-create",
          params: {
            address: this.walletAddress,
          },
        });
      });
    },
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
