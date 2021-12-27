<template>
<div class="dark-bg">
    <v-container>
        <v-row justify="center">
            <v-col cols="8">
                <v-row class="py-5">
                    <v-btn text dark color="#C202D3">My Collections</v-btn>
                    <v-btn text dark>Favourite</v-btn>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="4" md="6" v-for="(item,i) in nfts" :key="i" align="center">
                        <v-card max-width="300" class="art-card">
                            <v-img :src="item.data.image" width="270" height="240"></v-img>
                            <v-card-text class="ml-n2 white--text text-left">{{item.data.name}}</v-card-text>
                            <p class="mx-2 mt-n2 text-left">
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

export default {
    data() {
        return {
            nfts: []
        }
    },
    mounted() {
        const createConnection = () => {
            return new Connection(clusterApiUrl("devnet"));
        };
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
                const connect = createConnectionConfig(clusterApiUrl("devnet"));
                const provider = this.getProvider();
                let ownerToken = provider.publicKey;
                const result = isValidSolanaAddress(ownerToken);
                this.nfts = await getParsedNftAccountsByOwner({
                    publicAddress: ownerToken,
                    connection: connect,
                    serialization: true,
                });
                var data = Object.keys(this.nfts ).map((key) => this.nfts [key]);
                let arr = [];
                let n = data.length;
                for (let i = 0; i < n; i++) {
                    let val = await axios.get(data[i].data.uri);
                    arr.push(val);
                }
                this.nfts=arr
            } catch (error) {
                console.log(error);
            }
        }

    }
}
</script>
