<template>
  <div class="dark-bg">
    <v-card min-height="500" flat color="transparent">
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
                <v-card
                  max-width="300"
                  class="art-card"
                  height="390"
                  @click="$store.commit('content/setDetailDialog', true)"
                >
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
                    item.title
                  }}</v-card-text>
                  <p class="mx-2 mt-n2 desc-text text-left">
                    {{ item.description }}
                  </p>
                  <v-card-actions class="mt-n10">
                    <v-spacer></v-spacer>
                    <v-chip class="ma-2 mt-5" color="#030537">
                      125
                      <v-icon class="ml-3">mdi-eye</v-icon>
                    </v-chip>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="loading == true" justify="center">
              <v-col align="center">
                <orbit-spinner
                  class="ma-10"
                  :animation-duration="1200"
                  :size="55"
                  color="#fff"
                  v-intersect.quiet="{
                    handler: onIntersect,
                    options: { threshold: [0, 0.5, 1.0] },
                  }"
                />
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
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
const web3 = require("@solana/web3.js");
const NFTs = require("@primenums/solana-nft-tools");

let OrbitSpinner = null;
if (process.client) {
  OrbitSpinner = require("epic-spinners").OrbitSpinner;
}

export default {
  components: {
    OrbitSpinner,
  },
  data() {
    return {
      nfts: [],
      loading: true,
      connect: "",
      isIntersecting: false,
      page:0
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
    this.connect = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    this.getAllNftData();
  },
  methods: {
    onIntersect(entries, observer, isIntersecting) {
      console.log("ok");
      this.getAllNftData();
    },
    async getAllNftData() {
      // axios.get('https://api-mainnet.magiceden.io/rpc/getNFTsByOwner/' + this.walletAddress)
      //     .then(res => {
      //       console.log(res.data)
      //         for (var x = 0; x < res.data.results.length; x++) {
      //             if (this.walletAddress == res.data.results[x].owner) {
      //                 this.nfts.push(res.data.results[x])
      //             }
      //         }
      //     })

      // let allMyNFTs = await NFTs.getNFTsByOwner(
      //   this.connect,
      //   this.walletAddress
      // );
      // console.log("allMyNFTs", allMyNFTs);
      // for (var x = 0; x < allMyNFTs.length; x++) {
      //   if (allMyNFTs[x].owner == this.walletAddress) {
      //     this.nfts.push(allMyNFTs[x]);
      //   }
      // }
      this.page++
      const perPage = 10;
      const cacheTtlMins = 1;
      let myNFTs = await NFTs.getNFTsByOwner(
        this.connect,
        this.walletAddress,
        this.page,
        perPage,
        cacheTtlMins
      );
      this.setNft(myNFTs);

      // while (more == true) {
      //   let myNFTs = await NFTs.getNFTsByOwner(
      //     this.connect,
      //     this.walletAddress,
      //     page,
      //     perPage,
      //     cacheTtlMins
      //   )
      //   for(var x=0;x < myNFTs.length;x++){
      //     this.nfts.push(myNFTs[x])
      //   }
      //   page++
      //   if (myNFTs.length== 0) {
      //       more=false
      //   }

      // }

      // fetchClient
      //   .getCollectibles({
      //     solWallets: [this.walletAddress],
      //   })
      //   .then((res) => {
      //       this.loading=false
      //       console.log(res.solCollectibles)
      //       for(var x=0;x<res.solCollectibles[this.walletAddress].length;x++){
      //           if(res.solCollectibles[this.walletAddress][x].isOwned==true){
      //               this.nfts.push(res.solCollectibles[this.walletAddress][x])
      //           }
      //       }
      //   });
    },
    setNft(item) {
      if (item.length == 0) {
        this.loading=false
      } else {
        for (var x = 0; x < item.length; x++) {
          this.nfts.push(item[x]);
        }
      }
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
