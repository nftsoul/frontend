<template>
<div class="dark-bg">
    <v-card :max-height="screenHeight()" flat color="transparent" style="overflow: auto">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" lg="6" md="10">
                    <div class="placeholder-content">
                        <section class="sticky-content py-2">
                            <!-- sticky header -->
                            <v-row no-gutters class="pb-3" style="position: sticky">
                                <div class="rounded-pill card-back px-1">
                                    <v-text-field v-model="search" rounded placeholder="Search your nft.." class="mt-n2 mb-n5" color="white" dark background-color="primary"></v-text-field>

                                    <!-- <v-row no-gutters>
                                <v-btn small icon class="mx-2 mt-1">
                                    <v-icon color="#fe87ff">mdi-nfc-search-variant</v-icon>
                                </v-btn>
                            </v-row> -->
                                </div>
                                <v-spacer></v-spacer>
                                <div v-if="editing == false" class="btn-gradient" style="width: 150px; height: 40px" @click="createGallery"></div>
                                <div v-if="editing == false" class="body-2 mt-2" style="margin-left: -135px">
                                    <v-icon>mdi-plus</v-icon>
                                    <span>Add to Gallery</span>
                                </div>
                            </v-row>
                            <!-- end sticky header -->
                        </section>
                        <!-- nfts list -->
                        <v-row v-if="nfts.length > 0" class="pt-8">
                            <v-col cols="12" lg="6" md="6" v-for="(item, i) in nfts" :key="i">
                                <v-card class="outer-card rounded-lg" style="height: 55px">
                                    <div class="inner-card pa-1 rounded-lg" style="height: 53px">
                                        <v-list dense style="
                          background-color: transparent;
                          box-shadow: none !important;
                        " class="py-0">
                                            <v-list-item class="px-0">
                                                <v-list-item-avatar tile class="rounded-lg my-0">
                                                    <v-img :src="item.image" :lazy-src="item.image">
                                                        <template v-slot:placeholder>
                                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                            </v-row>
                                                        </template>
                                                    </v-img>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{
                              item.name
                            }}</v-list-item-title>
                                                </v-list-item-content>
                                                <v-list-item-action>
                                                    <v-tooltip top v-if="collected.includes(item.name)">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-icon v-bind="attrs" v-on="on" color="red">mdi-stop-circle-outline</v-icon>
                                                        </template>
                                                        <span class="caption" style="z-index: 5000">Already belongs to a collection</span>
                                                    </v-tooltip>
                                                    <div v-else @click="selectNft(item)" class="link">
                                                        <v-checkbox v-if="collectionIds.includes(item.image)" disabled v-model="yes" color="green" dark style="border-radius: 50% !important"></v-checkbox>
                                                        <v-checkbox v-else disabled v-model="no" color="green" dark style="border-radius: 50% !important"></v-checkbox>

                                                        <!-- <v-checkbox v-else @change="selectNft(item)" color="green" dark :value="false" style="border-radius: 50% !important;"></v-checkbox> -->
                                                    </div>
                                                </v-list-item-action>
                                            </v-list-item>
                                        </v-list>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                        <!-- end nfts list -->

                        <v-row v-if="loading == true">
                            <v-col align="center">
                                <div class="spinner-box mt-10">
                                    <client-only>
                                        <spinner :animation-duration="1200" :size="55" color="#fff" />
                                    </client-only>
                                </div>
                                <p>Loading your NFTs...</p>
                            </v-col>
                        </v-row>
                        <v-row v-if="nfts.length == 0 && loading == false">
                            <v-col align="center">
                                <v-img :src="require('~/assets/images/sad.svg')" max-width="300"></v-img>
                                <p>{{ noNft }}</p>
                            </v-col>
                        </v-row>
                    </div>
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
            connect: "",
            collected: [],
            selected: [],
            nfts: [],
            noNft: "Yo do not have any NFTs. Get some and then come back.",
            loading: true,
            color: "linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%)",
            search: "",
            originalList: [],
            searchedNft: [],
            cluster: null,
            selecting: [],
            yes: true,
            no: false,
        };
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        },
        editing() {
            return this.$store.state.content.editing;
        },
        collection() {
            return this.$store.state.nft.collection;
        },
        collectionIds() {
            return this.$store.state.nft.collectionIds;
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
        search(newValue, oldValue) {
            if (newValue.length < 1) {
                this.nfts = this.originalList;
                this.noNft = "Yo do not have any NFTs. Get some and then come back.";
            } else {
                this.filterNft();
            }
        },
        originalList() {
            if (this.search == "") {
                this.nfts = this.originalList;
            }
        },
    },

    mounted() {
        if (this.$route.name == "profile-address-index-exhibit") {
            this.$store.commit("nft/setCollection", []);
            this.$store.commit("nft/setCollectionIds", []);
        }
        this.cluster = process.env.CLUSTER;
        this.getAllNftData();
        this.filterNft();
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

                await this.getCollected();

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
                            this.originalList.push(myNFT);
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
                                        this.originalList.push(response.data);
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
                this.nfts = []
                this.loading=false
            }
        },
        getCollected() {
            this.$axios
                .get("/gallery/all/" + this.$route.params.address)
                .then((res) => {
                    for (var x = 0; x < res.data.galleries.length; x++) {
                        for (var y = 0; y < res.data.galleries[x].nfts.length; y++) {
                            this.collected.push(res.data.galleries[x].nfts[y].name);
                        }
                    }
                })
                .catch((err) => console.log(err.response));
        },
        createGallery() {
            if (this.collection.length == 0) {
                this.$toast
                    .error("Please select some nfts to create gallery.", {
                        iconPack: "mdi",
                        icon: "mdi-image",
                        theme: "outline",
                    })
                    .goAway(3000);
            } else {
                this.$router.push({
                    name: "profile-address-create",
                    params: {
                        address: this.walletAddress,
                    },
                });
            }
        },

        selectNft(item) {
            if (this.collectionIds.includes(item.image)) {
                this.$store.commit("nft/deselectNft", item);
            } else {
                this.$store.commit("nft/selectNft", item);
            }
        },
        filterNft() {
            this.searchedNft = [];
            for (var x = 0; x < this.originalList.length; x++) {
                let lowerSearch = this.search.toLowerCase();
                let lowerName = this.originalList[x].name.toLowerCase();
                if (lowerName.indexOf(lowerSearch) >= 0) {
                    this.searchedNft.push(this.originalList[x]);
                }
                this.nfts = this.searchedNft;
            }

            if (this.nfts.length == 0) {
                this.noNft = "No NFT found with that search. Try different keyword.";
            }
        },
    },
};
</script>

<style lang="css">
.card-back {
    background: linear-gradient(90deg,
            #fe87ff 3.04%,
            #fd2bff 23.86%,
            #c202d3 41.34%,
            #5e0fff 68.89%,
            #1905da 99.63%) !important;
}

.btn-plus {
    background: linear-gradient(264.75deg,
            #fe87ff 3.04%,
            #fd2bff 23.86%,
            #c202d3 41.34%,
            #5e0fff 68.89%,
            #1905da 99.63%) !important;
    border-radius: 50%;
    padding: 0px 2px;
}

.sticky-content {
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 2rem 0px;
    background-color: #000229;
}

.placeholder-content {
    height: 1000px;
}

.theme--dark.v-input--is-disabled {
    color: rgb(147, 248, 147);
}
</style>
