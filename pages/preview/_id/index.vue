<template>
<div class="dark-bg">
    <v-card :min-height="screenHeight()" flat color="transparent" class="pt-16">
        <v-container class="pt-16">
            <v-row justify="center">
                <v-col cols="12" lg="12" md="11">
                    <div class="enclose-border">
                        <v-container v-if="preview != ''">
                            <v-row>
                                <v-col v-if="preview.nfts.length > 0" cols="12" lg="4" md="6" align="center" class="px-5">
                                    <v-img :src="preview.image" class="rounded-lg">
                                        <template v-slot:placeholder>
                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-col>
                                <v-col cols="12" lg="5" md="6" class="pr-0">
                                    <v-row no-gutters class="pb-2">
                                        <p>{{ preview.gallery_name }}</p>
                                        <v-spacer></v-spacer>
                                        <ShareNetwork class="mb-2" network="twitter" :url="getShareLink()" :title="preview.gallery_name" description="Exhibit and earn from your NFT Collections" quote="Create galleries, showcase your best NFTs and earn from them." hashtags="nftsoul,nft_collection">

                                            <div @mouseenter="expand=true" @mouseleave="expand=false">
                                                <v-row no-gutters>
                                                    <div class="twitter-share">
                                                        <v-icon color="white">mdi-twitter</v-icon>
                                                    </div>
                                                    <v-expand-y-transition>
                                                        <div v-show="expand" class="twitter-share-expanded">
                                                            <small>Share on twitter</small>
                                                        </div>
                                                    </v-expand-y-transition>
                                                </v-row>
                                            </div>
                                        </ShareNetwork>

                                    </v-row>
                                    <v-list dense style="box-shadow: none !important" class="px-2">
                                        <v-list-item dense @click="seeProfile()">
                                            <v-list-item-avatar class="my-0 ml-2">
                                                <v-img v-if="preview.created_by.image_link" :src="preview.created_by.image_link"></v-img>
                                                <v-icon v-else>mdi-account-tie</v-icon>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-if="preview.created_by.name">{{preview.created_by.name.slice(0,20)}}</v-list-item-title>
                                                <v-list-item-title v-else>{{preview.user_id.slice(0, 5)}}</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        </v-list-item>
                                    </v-list>
                                    <v-row class="mt-5">
                                        <v-col cols="5">
                                            <p class="mb-0 caption text--disabled">start with</p>
                                            <p class="text-h5" v-if="preview.price>0">{{ preview.price }} SOL</p>
                                            <p class="text-h5" v-else>{{ 0 }} SOL</p>

                                            <div>
                                                <v-btn small color="green" class="mt-7" rounded x-small @click="stream" :loading="loading">
                                                    <small>{{getBtnText()}}</small>
                                                </v-btn>
                                            </div>
                                            <p class="mt-2 body-2">
                                                Total Items: {{ preview.nfts.length }}
                                            </p>
                                        </v-col>
                                        <v-col cols="7" class="px-0">
                                            <p class="mb-0 caption text--disabled">
                                                About This Gallery
                                            </p>
                                            <p style="line-height: 15px">
                                                <small>{{ preview.description }}</small>
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" lg="3" md="6" class="px-3">
                                    <h5 class="mx-5">Comments</h5>
                                    <div style="border-left:1px solid #500083;height:300px;overflow:auto" class="px-3">
                                        <div v-if="comments.length>0">
                                            <v-list-item v-for="(item,i) in comments" :key="i">
                                                <v-list-item-avatar>
                                                    <v-img v-if="item.user_id.image_link" :src="item.user_id.image_link" max-width="40" max-height="40"></v-img>
                                                    <v-icon v-else large>mdi-account</v-icon>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title>
                                                        <span v-if="item.user_id.name">{{item.user_id.name}}</span>
                                                        <span v-else>{{ item.user_id.wallet_address.slice(0, 5) }}</span>
                                                    </v-list-item-title>
                                                    <small class="text--disabled" v-html="item.body"></small>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </div>
                                        <div v-else>

                                            <small>No comments yet</small>
                                        </div>

                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-container v-else>
                            <v-row>
                                <v-col cols="12" lg="4" md="6">
                                    <v-skeleton-loader type="image"></v-skeleton-loader>
                                </v-col>
                                <v-col cols="12" lg="4" md="6">
                                    <v-skeleton-loader type="list-item-avatar, list-item-three-line, card-heading, actions\"></v-skeleton-loader>
                                </v-col>
                                <v-col cols="12" lg="4" md="6">
                                    <v-skeleton-loader v-for="(item,i) in 5" :key="i" dark type="list-item-avatar"></v-skeleton-loader>

                                </v-col>
                            </v-row>
                        </v-container>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-card>

    <!-- approval dialog -->
    <v-dialog v-model="approvalDialog" max-width="400" persistent>
        <div class="border-white rounded-lg">
            <v-card color="primary" class="rounded-lg">
                <v-col align="center">
                    <p class="text--disabled">
                        <spinner :animation-duration="1200" :size="30" color="#fff" class="mx-auto" />Do not close this window
                    </p>
                    <p>You will be able to see items after payment approval</p>
                    <p>{{ approvals }} Approvals Left</p>
                </v-col>
            </v-card>
        </div>
    </v-dialog>
    <!-- end approval dialog -->
</div>
</template>

<script>
let zebec = null;
if (process.client) {
    zebec = require("@zebec-protocol/stream");
}

const web3 = require("@solana/web3.js");
export default {
    data() {
        return {
            loading: false,
            connection: new web3.Connection(
                web3.clusterApiUrl(process.env.CLUSTER),
                "confirmed"
            ),
            approvalDialog: false,
            approvals: 3,
            streampda: null,
            comments: [],
            loaded: false,
            preview: '',
            expand: false
        };
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress;
        },
        gallery_id() {
            return this.$route.params.id
        }
    },
    mounted() {
        this.getNft()
        this.getComments()
    },
    methods: {
        getNft() {
            this.$axios.get(
                "/single-gallery/" + this.gallery_id
            ).then(res => {
                this.preview = res.data.gallery[0]
            })
        },
        getShareLink(){
            return process.env.SITE_URL+'/preview/' + this.gallery_id
        },
        getLink(item) {
            if (item.image_link) {
                return item.image_link
            } else {
                return require('~/assets/images/profile.svg')
            }
        },
        getComments() {
            this.$axios.get('/comments/' + this.gallery_id, {
                    params: {
                        page: 1,
                        limit: 5
                    }
                })
                .then(res => {
                    this.comments = res.data.result
                    this.loaded = true
                })
                .catch(err => err.response)
        },
        seeProfile() {
            this.$router.push({
                name: 'profile-address-index-gallery',
                params: {
                    address: this.preview.user_id
                }
            })
        },
        getBtnText() {
            if (this.preview.user_id == this.walletAddress) {
                return 'View'
            } else {
                if (this.preview.premium == true) {
                    return 'Pay and View'
                } else {
                    return 'Free View'
                }
            }
        },
        async stream() {
            const zeb = new zebec.NativeStream(window.solana, process.env.CLUSTER_URL)
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
                    amount: Number(this.preview.price) + Number(0.02 * this.preview.price)
                };

                var total_charge =
                    parseFloat(this.preview.price) +
                    0.02 * parseFloat(this.preview.price);
                // console.log('charge:',total_charge)
                var lamports = await this.connection.getBalance(
                    new web3.PublicKey(this.walletAddress)
                );

                var available = parseFloat(lamports * 0.000000001).toFixed(5);

                if (this.preview.user_id != this.walletAddress) {
                    if (this.preview.premium) {

                        if (total_charge < available) {
                            // depositing sol
                            this.approvalDialog = true

                            let depositResponse = await zeb.deposit(depositData);

                            if (depositResponse.status == "success") {
                                this.approvals -= 1
                                let currentTime1 = Math.floor(Date.now() / 1000) + 120;
                                let futureTime1 = currentTime1 + 1200;
                                let creatorResponse = await zeb.init({
                                    sender: this.walletAddress,
                                    receiver: "9wGdQtcHGiV16cqGfm6wsN5z9hmUTiDqN25zsnPu1SDv",
                                    amount: 0.02 * this.preview.price,
                                    start_time: currentTime1,
                                    end_time: futureTime1,
                                });
                                if (creatorResponse.status == "success") {
                                    this.approvals -= 1
                                    let currentTime2 = Math.floor(Date.now() / 1000) + 120
                                    let futureTime2 = currentTime2 + 1200
                                    let platformResponse = await zeb.init({
                                        sender: this.walletAddress,
                                        receiver: this.preview.user_id,
                                        amount: parseFloat(this.preview.price),
                                        start_time: currentTime2,
                                        end_time: futureTime2,
                                    });
                                    if (platformResponse.status == "success") {
                                        this.$store.commit('nft/setStream', true)
                                        this.streampda = platformResponse.data.pda
                                        this.saveEarning();
                                        this.loading = false;
                                        this.approvalDialog = false

                                        this.$router.push({
                                            name: "stream-id",
                                            params: {
                                                id: this.gallery_id
                                            }
                                        });
                                    } else {
                                        this.loading = false;
                                        this.approvalDialog = false
                                        this.approvals = 3
                                        this.$toast
                                            .error("User rejected the request", {
                                                iconPack: "mdi",
                                                icon: "mdi-cancel",
                                                theme: "outline",
                                            })
                                            .goAway(3000);
                                    }
                                } else {
                                    this.approvalDialog = false
                                    this.loading = false;
                                    this.approvals = 3
                                    this.$toast
                                        .error("User rejected the request", {
                                            iconPack: "mdi",
                                            icon: "mdi-cancel",
                                            theme: "outline",
                                        })
                                        .goAway(3000);
                                }
                            } else {
                                this.loading = false;
                                this.approvalDialog = false
                                this.approvals = 3
                                this.$toast
                                    .error("User rejected the request", {
                                        iconPack: "mdi",
                                        icon: "mdi-cancel",
                                        theme: "outline",
                                    })
                                    .goAway(3000);
                            }
                        } else {
                            this.loading = false;
                            this.$toast
                                .error("Insufficient fund.", {
                                    iconPack: "mdi",
                                    icon: "mdi-wallet",
                                    theme: "outline",
                                })
                                .goAway(3000);
                        }
                    } else {
                        this.$store.commit('nft/setStream', true)
                        this.$router.push({
                            name: "stream-id",
                            params: {
                                id: this.gallery_id
                            }
                        });
                    }
                } else {
                    this.$store.commit('nft/setStream', true)

                    this.$router.push({
                        name: "stream-id",
                        params: {
                            id: this.gallery_id
                        }
                    });
                }

            }
        },
        screenHeight() {
            return window.innerHeight;
        },

        saveEarning() {
            this.$axios
                .post("/post-earnings", {
                    user_id: this.walletAddress,
                    gallery_id: this.preview._id,
                    price: this.preview.price,
                    datetime: new Date(),
                    withdrawn: false,
                    pda: this.streampda
                })
                .catch((err) => console.log(err.response));
        },
    },
};
</script>

<style scoped>
.border-white {
    border: 1px solid white !important;
}


</style>
