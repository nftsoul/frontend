<template>
  <div class="dark-bg">
    <v-card :min-height="screenHeight()" flat color="transparent">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-row v-if="nfts.length > 0" justify="center">
              <v-col
                cols="12"
                lg="4"
                md="6"
                v-for="(item, i) in nfts"
                :key="i"
                align="center"
              >
                <v-card max-width="300" class="art-card" height="390">
                  <v-img
                    :src="item.image"
                    :lazy-src="item.image"
                    width="270"
                    height="240"
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
                  <v-card-text class="ml-n2 white--text text-left">{{
                    item.name
                  }}</v-card-text>
                  <p class="mx-2 mt-n2 desc-text text-left">
                    {{ item.description }}
                  </p>
                  <!-- <v-card-actions class="mt-n10">
                    <v-spacer></v-spacer>
                    <v-chip class="ma-2 mt-5" color="#030537">
                      125
                      <v-icon class="ml-3">mdi-eye</v-icon>
                    </v-chip>
                  </v-card-actions> -->
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="loading == true" justify="center">
              <v-col align="center">
                <client-only>
                <spinner
                  :animation-duration="1200"
                  :size="55"
                  color="#fff"
                />
                </client-only>
                <p>Loading your NFTs...</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="nfts.length == 0 && loading == false" align="center">
                <v-img
                  :src="require('~/assets/images/sad.svg')"
                  max-width="300"
                ></v-img>
                <p>Yo do not have any NFTs. Get some and then come back.</p>
              </v-col>
            </v-row>
            <v-row> </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import NFTs from "@primenums/solana-nft-tools"
const web3 = require("@solana/web3.js");

let solrayz = null;
if (process.client) {
  solrayz = require("@nfteyez/sol-rayz");
}

export default {
  data() {
    return {
      nfts: [],
      loading: true,
      connect: "",
    };
  },
  computed: {
    walletAddress() {
      return this.$route.params.address;
    },
  },
  watch: {
    walletAddress(newValue, oldValue) {
      if (newValue != oldValue) {
        this.getAllNftData();
      }
    },
  },
  mounted() {
    this.getAllNftData();
  },
  methods: {
    screenHeight(){
        return window.innerHeight-350;
    },
    async getAllNftData() {
      // const conn = new web3.Connection(
      //   web3.clusterApiUrl("devnet"),
      //   "confirmed"
      // );
      // this.nfts = [];
      // // Get all mint tokens (NFTs) from your wallet
      // const walletAddr = this.walletAddress;
      // let mints = await NFTs.getMintTokensByOwner(conn, walletAddr);

      // let promises = [];
      // for (var x = 0; x < mints.length; x++) {
      //   let myNFT = await NFTs.getNFTByMintAddress(conn, mints[x]);
      //   this.nfts.push(myNFT)
      // }
      //audius
      // fetchClient
      //   .getCollectibles({
      //     solWallets: [this.walletAddress],
      //   })
      //   .then((res) => {
      //     this.loading = false;
      //     console.log(res.solCollectibles[this.walletAddress]);
      //     for (
      //       var x = 0;
      //       x < res.solCollectibles[this.walletAddress].length;
      //       x++
      //     ) {
      //       if (res.solCollectibles[this.walletAddress][x].isOwned == true) {
      //         this.nfts.push(res.solCollectibles[this.walletAddress][x]);
      //       }
      //     }
      //   });
      //solrayz
      const publicAddress = await solrayz.resolveToWalletAddress({
        text: this.walletAddress,
      });

      this.meta = await solrayz.getParsedNftAccountsByOwner({
        publicAddress,
      });
      let promises = [];
      for (var x = 0; x < this.meta.length; x++) {
        promises.push(
          await axios.get(this.meta[x].data.uri).then((response) => {
            this.nfts.push(response.data);
          })
        )
        // Promise.all(promises).then(() => console.log('nfts:',this.nfts));

      }

      this.loading = false;
    },
  },
};
</script>

<style lang="css">
.desc-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
