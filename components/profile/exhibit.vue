<template>
<div class="dark-bg">
    <v-container class="py-lg-16 py-md-10 py-5">
        <v-row justify="center">
            <div class="outer-card rounded-lg">
                <div class="inner-card pa-1 rounded-lg">
                    <v-btn text dark class="px-5">
                        Create New Item
                        <div class="btn-plus ml-2">
                            <v-icon dark color="white" small>mdi-plus</v-icon>
                        </div>
                    </v-btn>
                </div>
            </div>
        </v-row>
        <v-row justify="center" class="py-5">
            <v-col cols="12" lg="8" md="10">
                <v-row v-if="nfts.length==0" justify="center">
                    <v-col align="center">
                        <orbit-spinner class="ma-10" :animation-duration="1200" :size="55" color="#fff" />
                        <p>Loading your NFTs...</p>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col cols="12" lg="6" md="6" v-for="(item,i) in nfts" :key="i">
                        <div class="outer-card rounded-lg">
                            <div class="inner-card pa-1 rounded-lg">
                                <v-list dense style="background-color:transparent" class="py-0">
                                    <v-list-item class="px-0">
                                        <v-list-item-avatar tile class="rounded-lg my-0">
                                            <v-img :src="item.img"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>{{item.title}}</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-checkbox color="green" dark value="red"></v-checkbox>
                                        </v-list-item-action>
                                    </v-list-item>

                                </v-list>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </v-container>
</div>
</template>

<script>
import axios from 'axios'
import {
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
    getParsedNftAccountsByOwner,
    isValidSolanaAddress,
    createConnectionConfig,
} from "@nfteyez/sol-rayz";

import NFTs from '@primenums/solana-nft-tools'
let OrbitSpinner = null
if (process.client) {
    OrbitSpinner = require('epic-spinners').OrbitSpinner
}
export default {
    components: {
        OrbitSpinner
    },
    data() {
        return {
            nfts: [],
            loading: true,
            color: 'linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%)'
        }
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        }
    },
    watch: {
        walletAddress(newValue, oldValue) {
            if (newValue != oldValue) {
                this.getAllNftData()
            }
        }
    },
    mounted() {
        this.getAllNftData()

    },
    methods: {
        getProvider() {
            if ("solana" in window) {
                const provider = window.solana;
                if (provider.isPhantom) {
                    return provider;
                }
            }

        },
        async getAllNftData() {
             axios.get('https://api-mainnet.magiceden.io/rpc/getNFTsByOwner/'+this.walletAddress)
            .then(res=>{
                for(var x=0;x<res.data.results.length;x++){
                    if(this.walletAddress==res.data.results[x].owner){
                        this.nfts.push(res.data.results[x])
                    }
                }
            })
            .catch(err=>console.log(err.respoonse))
            // const connect = createConnectionConfig(clusterApiUrl("devnet"));
            // const connect = createConnectionConfig(clusterApiUrl("mainnet-beta"));
            // let page = 1;
            // const perPage = 1;
            // const cacheTtlMins = 1;
            // var fetch = true;
            // while (fetch == true) {
            //     let myNft = await NFTs.getNFTsByOwner(connect, this.walletAddress, page, perPage, cacheTtlMins)
            //     console.log(myNft)
            //     this.loading = false
            //     if (myNft.length == 0) {
            //         fetch = false
            //     } else {
            //         for (var x = 0; x < myNft.length; x++) {
            //             if (!myNft[x].error) {
            //                 if (myNft[x].owner == this.walletAddress) {
            //                     this.nfts.push(myNft[x])
            //                 }
            //             }
            //         }
            //         page++
            //     }
            // }
        }

    }
}
</script>

<style lang="css">
.btn-plus {
    background: linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%) !important;
    border-radius: 50%;
    padding: 0px 2px;

}
</style>
