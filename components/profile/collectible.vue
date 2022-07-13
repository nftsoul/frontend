<template>
<div class="dark-bg">
    <v-card :min-height="screenHeight()" flat color="transparent">
        <v-container>
            <v-row justify="center">
                <v-col cols="8">
                    <v-row v-if="nfts.length > 0">
                        <v-col cols="12" lg="4" md="6" v-for="(item, i) in nfts" :key="i" align="center">
                            <GalleryNftCard :title="item.name" :image="item.image" :description="item.description" />
                        </v-col>
                    </v-row>
                    <v-row v-if="loading == true" justify="center">
                        <v-col align="center">
                            <client-only>
                                <spinner :animation-duration="1200" :size="55" color="#fff" />
                            </client-only>
                            <p>Loading your NFTs...</p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col v-if="nfts.length == 0 && loading == false" align="center">
                            <v-img :src="require('~/assets/images/sad.svg')" max-width="300"></v-img>
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
import NFTs from "@primenums/solana-nft-tools";
const web3 = require("@solana/web3.js");

let solrayz = null;
if (process.client) {
    solrayz = require("@nfteyez/sol-rayz");
}
import axios from "axios";
export default {
    data() {
        return {
            nfts: [],
            loading: true,
            connect: "",
            profiling: false,
            cluster: null,
        };
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        },
        wallet() {
            return this.$store.state.wallet.wallet
        }
    },
    watch: {
        walletAddress(newValue, oldValue) {
            if (newValue != oldValue) {
                this.getAllNftData();
            }
        },
    },
    mounted() {
        this.cluster = process.env.CLUSTER;
        this.getAllNftData();
    },
    methods: {
        screenHeight() {
            if (process.client) {
                return window.innerHeight - 350;
            } else {
                return 600;
            }
        },
        async getAllNftData() {
            if (this.wallet == "Phantom") {
                if (this.cluster == "devnet") {
                    const conn = new web3.Connection(
                        web3.clusterApiUrl("devnet"),
                        "confirmed"
                    );
                    this.nfts = [];
                    // Get all mint tokens (NFTs) from your wallet
                    const walletAddr = this.walletAddress;
                    let mints = await NFTs.getMintTokensByOwner(conn, walletAddr);

                    let promises = [];
                    for (var x = 0; x < mints.length; x++) {
                        let myNFT = await NFTs.getNFTByMintAddress(conn, mints[x]);
                        if (myNFT.owner == this.walletAddress) {
                            this.nfts.push(myNFT);
                        }
                    }
                } else {
                    const publicAddress = await solrayz.resolveToWalletAddress({
                        text: this.walletAddress,
                    });
                    this.meta = await solrayz.getParsedNftAccountsByOwner({
                        publicAddress,
                    });
                    let promises = [];
                    for (var x = 0; x < this.meta.length; x++) {
                        try {
                            promises.push(
                                await axios.get(this.meta[x].data.uri).then((response) => {
                                    if (response.data) {
                                        this.nfts.push(response.data);
                                    }
                                })
                            );
                        } catch (e) {
                            console.log(e);
                        }
                        Promise.all(promises);
                    }
                }
                this.loading = false;
            } else {
                var baseURL = null
                if (process.env.CLUSTER == 'devnet') {
                    const testApiKey = "2daCevUAvh_JeAjR4JVKX6pcqABrRrh3"
                    baseURL = `https://eth-ropsten.alchemyapi.io/nft/v2/${testApiKey}/getNFTs/`
                } else {
                    const apiKey = "LEmpWOyg99tT_8lqP_RY6yAU6NBR5VKA"
                    baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;
                }

                // replace with the wallet address you want to query for NFTs
                // let ownerAddr = "0x2A5ecfde059e54606a885516f14635a6d25bb316"
                let ownerAddr = this.walletAddress
                var config = {
                    method: "get",
                    url: `${baseURL}?owner=${ownerAddr}`,
                };

                axios(config)
                    .then((response) => {
                        let res = response.data.ownedNfts
                        for (var x = 0; x < res.length; x++) {
                            if (typeof(res[x].metadata.image) != 'undefined' && typeof(res[x].metadata.name) != 'undefined' && typeof(res[x].metadata.attributes) != 'undefined' && typeof(res[x].metadata.description) != 'undefined') {
                                let name=res[x].metadata.name
                                let attributes=res[x].metadata.attributes
                                let image=this.fixURL(res[x].metadata.image)
                                let description=res[x].metadata.description

                                let info={'name':name,'attributes':attributes,'image':image,'description':description}
                                this.nfts.push(info)
                            }
                    
                        }
                        this.loading = false
                    })
                    .catch((error) => console.log(error));
            }
        },
        fixURL(url) {
            if (typeof (url) != "undefined") {
                if (url.startsWith("ipfs://ipfs/")) {
                    return "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://ipfs/").slice(-1)[0];
                } else if (url.startsWith("ipfs")) {
                    return "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://").slice(-1)[0];
                } else {
                    return url;
                }
            } else {
                return url;
            }
        }
    },
};
</script>
