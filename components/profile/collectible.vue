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
                            <v-img :src="item.data.image" :lazy-src="item.data.image" width="270" height="240"></v-img>
                            <v-card-text class="ml-n2 white--text text-left">{{item.data.name}}</v-card-text>
                            <p class="mx-2 mt-n2 desc-text text-left">
                                {{item.data.description}}
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
import {
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import {
    getParsedNftAccountsByOwner,
    isValidSolanaAddress,
    createConnectionConfig,
} from "@nfteyez/sol-rayz";
import {
    OrbitSpinner
} from 'epic-spinners'
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
    computed:{
        walletAddress(){
            return this.$store.state.wallet.walletAddress
        }
    },
    watch:{
        walletAddress(newValue,oldValue){
            if(newValue!=oldValue){
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
            try {
                const connect = createConnectionConfig(clusterApiUrl("mainnet-beta"));
                // const connect = createConnectionConfig(clusterApiUrl("devnet"));
                const provider = this.getProvider()
                let ownerToken = provider.publicKey
                const result = isValidSolanaAddress(ownerToken)
                const tokens = await getParsedNftAccountsByOwner({
                    publicAddress: ownerToken,
                    connection: connect,
                    serialization: true,
                });
                var data = Object.keys(tokens).map((key) => tokens[key]);
                console.log('collection:',data)
                let n = data.length;
                let arr = []
                
                for (let i = 0; i < n; i++) {
                    let val = await axios.get(data[i].data.uri);
                    this.nfts.push(val);
                    this.loading = false
                }
            } catch (error) {
                console.log(error);
            }
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
