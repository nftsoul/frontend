<template>
<div class="dark-bg">
    <v-container>
        <v-row justify="center">
            <v-col cols="8">
                <v-row class="py-5">
                    <v-btn text dark color="#C202D3">My Collections</v-btn>
                    <v-btn text dark>Favourite</v-btn>
                </v-row>
                <v-row v-if="loading" justify="center">
                    <v-col align="center">
                        <orbit-spinner class="ma-10" :animation-duration="1200" :size="55" color="#fff" />
                        <p>Loading your NFTs...</p>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col cols="12" lg="4" md="6" v-for="(item,i) in nfts" :key="i" align="center">
                        <v-card max-width="300" class="art-card" height="390">
                            <v-img :src="item.image" :lazy-src="item.image" width="270" height="240"></v-img>
                            <v-card-text class="ml-n2 white--text text-left">{{item.name}}</v-card-text>
                            <p class="mx-2 mt-n2 desc-text text-left">
                                {{item.description}}
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
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import axios from 'axios'
const web3 = require("@solana/web3.js");

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
            loading: true
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
            // let addrs = new web3.PublicKey(this.walletAddress)
            // let connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

            // axios.get('https://explorer.solana.com/address/'+this.walletAddress+'/tokens?cluster=devnet')
            // .then(res=>console.log(res.data))
    
            // const connect = createConnectionConfig(clusterApiUrl("devnet"));
            const connect = createConnectionConfig(clusterApiUrl("mainnet-beta"));

            //first getting mint addresses and then fetching using those mints
            // let mints = await NFTs.getMintTokensByOwner(connect, this.walletAddress);
            // console.log('mints', mints);

            // for (let i = 0; i < mints.length; i++) {
            //     let myNFT = await NFTs.getNFTByMintAddress(connect, mints[i]);

            //     if (myNFT.owner == this.walletAddress) {
            //         console.log('myNFT', myNFT);
            //         this.nfts.push(myNFT)
            //     }

            // }

            //all nfts by owner at once
            // let allMyNFTs = await NFTs.getNFTsByOwner(connect, this.walletAddress);
            // console.log(allMyNFTs)
            // this.nfts = allMyNFTs
            // console.log('allMyNFTs', allMyNFTs);

            //paginate fetching by owner
            let page = 1;
            const perPage = 1;
            const cacheTtlMins = 1;
            var fetch = true;
            while (fetch == true) {
                let myNft = await NFTs.getNFTsByOwner(connect, this.walletAddress, page, perPage, cacheTtlMins)
                console.log(myNft)

                if (myNft.length == 0) {
                    fetch = false
                } else {
                    for (var x = 0; x < myNft.length; x++){
                        if (!myNft[x].error) {
                            if (myNft[x].owner == this.walletAddress) {
                                this.nfts.push(myNft[x])
                                this.loading = false
                            }
                        }
                    }
                    page++
                }
            }

            // let myNFT = await NFTs.getNFTByMintAddress(connect, mint[0].mint);
            // console.log('nft:',myNFT)
            //     page++
            // if(mynft==''){
            //     fetch=false
            //     console.log(stopped)
            // }
            // else{
            //     this.nfts.push(mynft)
            // }

            // while (x < 5) {
            //     let mynft = await NFTs.getNFTsByOwner(connect, this.walletAddress, page, perPage, cacheTtlMins);
            //     console.log('mynft:', mynft)
            //     page++
            // }

            //sabai fetch nagarne no fix sequence
            // try {
            //     // const connect = createConnectionConfig(clusterApiUrl("mainnet-beta"));
            //     const connect = createConnectionConfig(clusterApiUrl("devnet"));
            //     const provider = this.getProvider()
            //     let ownerToken = provider.publicKey
            //     const result = isValidSolanaAddress(ownerToken)
            //     const tokens = await getParsedNftAccountsByOwner({
            //         publicAddress: ownerToken,
            //         connection: connect,
            //         serialization: true,
            //     });
            //     var data = Object.keys(tokens).map((key) => tokens[key]);
            //     console.log('collection:',tokens)
            //     let n = data.length;
            //     let arr = []

            //     for (let i = 0; i < n; i++) {
            //         let val = await axios.get(data[i].data.uri);
            //         this.nfts.push(val);
            //         this.loading = false
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        }

    }
}
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
