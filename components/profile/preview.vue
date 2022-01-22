<template>
  <div class="dark-bg">
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
                  <v-img :src="selected.nfts[0].img" class="rounded-lg">
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
                  <v-img :src="selected.nfts[1].img" class="rounded-lg">
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
                  <v-list dense style="box-shadow: none !important">
                    <v-list-item dense>
                      <v-list-item-avatar>
                        <v-icon>mdi-account-tie</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ selected.user_id.slice(0, 5) }}
                        </v-list-item-title>
                        <!-- <v-list-item-subtitle>
                                                @Rayna
                                            </v-list-item-subtitle> -->
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-row class="mt-5">
                    <v-col cols="5">
                      <p class="mb-0 caption text--disabled">start with</p>
                      <p class="text-h5">{{ selected.price }} SOL</p>
                      <v-btn
                        small
                        color="green"
                        class="mt-7"
                        rounded
                        x-small
                        @click="stream"
                        :loading="loading"
                      >
                        <small>Pay and View</small>
                      </v-btn>
                      <p class="mt-2 body-2">
                        Total Items: {{ selected.nfts.length }}
                      </p>
                    </v-col>
                    <v-col cols="7" class="px-0">
                      <p class="mb-0 caption text--disabled">
                        About This Gallery
                      </p>
                      <p style="line-height: 15px">
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
  </div>
</template>

<script>
// import {decode} from 'base58-universal';
import axios from "axios";

import {
  getProvider,
  depositNativeToken,
  initNativeTransaction,
  withdrawNativeTransaction,
  cancelNativeTransaction,
  pauseNativeTransaction,
  resumeNativeTransaction,
  withdrawNativeTokenDeposit,
} from "zebecprotocol-sdk";
const web3 = require("@solana/web3.js");

export default {
  data() {
    return {
      loading: false,
      connection: new web3.Connection(
        web3.clusterApiUrl("devnet"),
        "confirmed"
      ),
    };
  },
  computed: {
    walletAddress() {
      return this.$store.state.wallet.walletAddress;
    },
    selected() {
      return this.$store.state.content.selected;
    },
  },
  mounted() {
    this.increaseView();
  },
  methods: {
    async stream() {
      if (this.walletAddress == null) {
        this.$toast
          .error("Connect your phantom wallet first.", {
            iconPack: "mdi",
            icon: "mdi-cancel",
            theme: "outline",
          })
          .goAway(3000);
      } else {
        this.loading = true;
        const depositData = {
          sender: this.walletAddress,
          amount: this.selected.price + 0.02 * this.selected.price,
        };

        var total_charge = this.selected.price + 0.02 * this.selected.price;
        var lamports = await this.connection.getBalance(
          new web3.PublicKey(this.walletAddress)
        );
        var available = parseFloat(lamports * 0.000000001).toFixed(5);

        if (total_charge < available) {
          try {
            let depositResponse = await depositNativeToken(depositData);
            try {
              let creatorResponse = await initNativeTransaction({
                sender: this.walletAddress,
                receiver: "9wGdQtcHGiV16cqGfm6wsN5z9hmUTiDqN25zsnPu1SDv",
                amount: 0.02 * this.selected.price,
                start: Math.floor(Date.now() / 1000),
                end: Math.floor(Date.now() / 1000),
              });
              try {
                let platformResponse = await initNativeTransaction({
                  sender: this.walletAddress,
                  receiver: this.selected.user_id,
                  amount: this.selected.price,
                  start: Math.floor(Date.now() / 1000),
                  end: Math.floor(Date.now() / 1000) + 30,
                });
              } catch (err) {
                if ((err.code = 4001)) {
                  this.$toast
                    .error(err.message, {
                      iconPack: "mdi",
                      icon: "mdi-cancel",
                      theme: "outline",
                    })
                    .goAway(3000);
                }
              }
              this.loading = false;
              this.$router.push({ name: "profile-stream" });
            } catch {}
          } catch (err) {
            if ((err.code = 4001)) {
              this.$toast
                .error(err.message, {
                  iconPack: "mdi",
                  icon: "mdi-cancel",
                  theme: "outline",
                })
                .goAway(3000);
            }
          }
        } else {
          this.$toast
            .error("Insufficient fund.", {
              iconPack: "mdi",
              icon: "mdi-wallet",
              theme: "outline",
            })
            .goAway(3000);
        }
      }
    },
    increaseView() {
      axios.get(
        "http://nft-soul.herokuapp.com/api/single-gallery/" + this.selected._id
      );
    },
  },
};
</script>
