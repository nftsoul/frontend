<template>
<div class="dark-bg">
    <UtilsSeo :title="pre.gallery[0].gallery_name" :gallery_id="pre.gallery[0]._id" :description="pre.gallery[0].description" :image="pre.gallery[0].image" />
    <v-card :min-height="screenHeight()" flat color="transparent" class="pt-16">
        <v-container class="pt-16">
            <v-row justify="center">
                <v-col cols="12" lg="12" md="11">
                    <div class="enclose-border">
                        <v-container v-if="preview != ''">
                            <v-row>
                                <v-col v-if="preview.nfts.length > 0" cols="12" lg="3" md="6" align="center" class="px-5">
                                    <v-img :src="preview.image" class="rounded-lg">
                                        <template v-slot:placeholder>
                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                <v-progress-circular indeterminate color="grey lighten-5">
                                                </v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-col>
                                <v-col cols="12" lg="5" md="6" class="pr-0">
                                    <v-row class="pb-2 mb-2">
                                        <p v-if="preview.gallery_name.length > 30">{{
                                                    preview.gallery_name.slice(0, 30)
                                            }}<br>{{
        preview.gallery_name.slice(30, -1)
}}</p>
                                        <p v-else>{{ preview.gallery_name }}</p>
                                        <v-spacer></v-spacer>
                                        <ShareNetwork class="mx-3" style="text-decoration: none;" network="twitter" :url="getShareLink()" :title="preview.gallery_name" description="Exhibit and earn from your NFT Collections" quote="Create galleries, showcase your best NFTs and earn from them." hashtags="nftsoul,nft_collection">

                                            <div @mouseenter="expand = true" @mouseleave="expand = false">
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
                                                <v-list-item-title v-if="preview.created_by.name">
                                                    {{ preview.created_by.name.slice(0, 20) }}</v-list-item-title>
                                                <v-list-item-title v-else>{{ preview.user_id.slice(0, 5) }}
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                    <v-row class="mt-5">
                                        <v-col cols="5">
                                            <p class="mb-0 caption text--disabled">start with</p>
                                            <p class="text-h5" v-if="preview.price > 0">{{ preview.price }} SOL</p>
                                            <p class="text-h5" v-else>{{ 0 }} SOL</p>

                                            <div>
                                                <v-btn small color="green" class="mt-7" rounded x-small @click="stream" :loading="loading">
                                                    <small>{{ getBtnText() }}</small>
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
                                <v-col cols="12" lg="4" md="6" class="px-3">
                                    <h5 class="mx-5">Comments</h5>
                                    <div style="border-left:1px solid #500083;height:300px;overflow:auto" class="px-3">
                                        <div v-if="comments.length > 0">
                                            <v-list-item v-for="(item, i) in comments" :key="i" class="px-0">
                                                <v-list-item-avatar size="50" class="mr-2">
                                                    <v-img v-if="item.user_id.image_link" :src="item.user_id.image_link" max-width="60" max-height="60"></v-img>
                                                    <v-icon v-else large>mdi-account</v-icon>
                                                </v-list-item-avatar>
                                                <v-list-item-content @mouseenter="hoverIndex=i">
                                                    <v-list-item-title>
                                                        <span v-if="item.user_id.name">{{ item.user_id.name }}</span>
                                                        <span v-else>{{ item.user_id.wallet_address.slice(0, 5)
                                                            }}</span>
                                                        <small class="caption text--disabled">{{ $moment(item.time).fromNow() }}</small>
                                                        <small class="reply-btn position-abs text--disabled mb-0 mt-n6" v-if="hoverIndex==i" @click="selectedIndex = i,replying = true,reply=''">
                                                            <v-icon small>mdi-reply</v-icon>Reply
                                                        </small>
                                                    </v-list-item-title>
                                                    <v-card-text class="text--disabled pa-0"><small v-html="item.body"></small></v-card-text><br>
                                                    <v-row no-gutters>
                                                        <small v-if="item.reply_count > 0" @click="getReplies(item, i)" class="reply-btn">{{ item.reply_count }} Replied</small>
                                                        <v-btn x-small text v-if="replyPage == 1 && selectedIndex == i" :loading="more"></v-btn>
                                                    </v-row>

                                                    <!-- make reply -->
                                                    <div v-if="replying == true && selectedIndex == i">
                                                        <v-list-item dense class="px-0" v-if="profile">
                                                            <v-row no-gutters>
                                                                <v-col cols="2" class="pa-0">
                                                                    <v-list-item-avatar size="30" class="mb-0 mt-2 mr-1">
                                                                        <v-img v-if="profile.image_link" :src="profile.image_link" :lazy-src="profile.image_link"></v-img>
                                                                        <v-icon v-else large>mdi-account</v-icon>
                                                                    </v-list-item-avatar>
                                                                </v-col>
                                                                <v-col>
                                                                    <v-list-item-content class="py-1">
                                                                        <v-textarea rows="1" id="txtArea" auto-grow @keypress.enter="onEnterPress(item)" dark color="white" :loading="makingReply" append-icon="mdi-check" @click:append="makeReply(item)" class="mb-n5" v-model="reply" outlined dense placeholder="Reply"></v-textarea>
                                                                    </v-list-item-content>
                                                                </v-col>
                                                            </v-row>
                                                        </v-list-item>
                                                    </div>
                                                    <!-- end make reply -->

                                                    <!-- replies -->
                                                    <div v-if="item.replies" style="width:100%">
                                                        <v-list-item dense v-for="(reply, j) in item.replies" :key="j">
                                                            <v-list-item-avatar size="30" class="mr-2">
                                                                <v-img v-if="reply.user_id.image_link" :src="reply.user_id.image_link" max-width="60" max-height="60"></v-img>
                                                                <v-icon v-else>mdi-account</v-icon>
                                                            </v-list-item-avatar>
                                                            <v-list-item-content>
                                                                <v-list-item-title>
                                                                    <span v-if="reply.user_id.name">{{ reply.user_id.name }}</span>
                                                                    <span v-else>{{
                                                                                reply.user_id.wallet_address.slice(0, 5)
                                                                        }}</span>
                                                                    <small class="caption text--disabled">{{ $moment(reply.time).fromNow() }}</small>
                                                                </v-list-item-title>
                                                                <v-card-text style="width:100%" class="text--disabled pa-0"><small v-html="reply.body"></small></v-card-text>
                                                                <br>
                                                            </v-list-item-content>
                                                        </v-list-item>

                                                        <v-row no-gutters>
                                                            <v-btn v-if="item.reply_count > 5 && item.replies.length < item.reply_count" @click="getReplies(item, i)" x-small text>
                                                                <v-icon small>mdi-arrow-down</v-icon>
                                                                <small>See More</small>
                                                            </v-btn>
                                                            <v-btn v-if="replyPage > 1" x-small text :loading="more">
                                                            </v-btn>
                                                        </v-row>

                                                    </div>
                                                    <!-- end replies -->
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
                                    <v-skeleton-loader type="list-item-avatar, list-item-three-line, card-heading, actions\">
                                    </v-skeleton-loader>
                                </v-col>
                                <v-col cols="12" lg="4" md="6">
                                    <v-skeleton-loader v-for="(item, i) in 5" :key="i" dark type="list-item-avatar">
                                    </v-skeleton-loader>

                                </v-col>
                            </v-row>
                        </v-container>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</div>
</template>

<script>
const web3 = require("@solana/web3.js");
export default {
    async asyncData({
        params
    }) {
        const pre = await fetch(process.env.API_URL + `/gallery/${params.id}`).then((res) => res.json());
        console.log(pre)
        return {
            pre
        };
    },
    head() {
        return {
            link: [{
                hid: "canonical",
                rel: "canonical",
                href: process.env.API_URL + `/gallery/${this.$route.params.id}`
            }]
        };
    },
    data() {
        return {
            loading: false,
            connection: new web3.Connection(web3.clusterApiUrl(process.env.CLUSTER), "confirmed"),
            approvalDialog: false,
            approvals: 3,
            streampda: null,
            comments: [],
            loaded: false,
            preview: "",
            expand: false,
            selectedIndex: null,
            hoverIndex: null,
            replying: false,
            reply: "",
            selectedComment: "",
            replyPage: 0,
            more: false,
            makingReply: false,
            profile: this.$auth.user
        };
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress;
        },
        gallery_id() {
            return this.$route.params.id;
        },
    },
    mounted() {
        this.getNft();
        this.getComments();

    },
    methods: {
        async getProvider() {
            if ("solana" in window) {
                const provider = window.solana;
                if (provider.isPhantom) {
                    return provider;
                }
            } else {
                window.open("https://www.phantom.app/", "_blank");
            }
        },
        onEnterPress(item) {
            this.makeReply(item);
            var el = document.getElementById("txtArea");
            el.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                }
            });
        },
        getReplies(item, i) {
            this.more = true;
            if (this.selectedComment != item._id) {
                this.replyPage = 1;
                this.selectedComment = item._id;
            } else {
                this.replyPage += 1;
            }
            this.$axios.get("/comment/reply/" + item._id, {
                params: {
                    page: this.replyPage,
                },
            }).then(res => {
                this.more = false;
                const index = this.comments.indexOf(item);
                let rep = res.data.replies
                if (!this.comments[index].replies) {
                    this.comments[index]["replies"] = [];
                }
                let reply_ids = [];
                for (var y = 0; y < this.comments[index].replies.length; y++) {
                    reply_ids.push(this.comments[index].replies[y]._id);
                }
                for (var x = 0; x < rep.length; x++) {
                    if (!reply_ids.includes(rep[x]._id)) {
                        this.comments[index].replies.push(rep[x]);
                    }
                }
            });
        },
        getNft() {
            this.$axios.get("/gallery/" + this.gallery_id).then(res => {
                this.preview = res.data.gallery[0];
            });
        },
        getShareLink() {
            return process.env.SITE_URL + "/preview/" + this.gallery_id;
        },
        getLink(item) {
            if (item.image_link) {
                return item.image_link;
            } else {
                return require("~/assets/images/profile.svg");
            }
        },
        makeReply(item) {
            this.makingReply = true;
            this.selectedComment = item;
            if (this.reply != "") {
                this.$axios
                    .post("/comment/reply/" + item._id, {
                        body: this.reply,
                        user_id: this.profile._id,
                    })
                    .then((res) => {
                        this.makingReply = false;
                        let rep = res.data.reply;
                        this.reply = "";
                        rep["user_id"] = this.profile;
                        const index = this.comments.indexOf(item);
                        if (this.comments[index].replies) {
                            this.comments[index].replies.push(rep);
                        } else {
                            this.comments[index]["replies"] = [];
                            this.comments[index].replies.push(rep);
                        }
                        this.comments[index].reply_count += 1;
                    })
                    .catch((err) => err.response);
            }
        },
        getComments() {
            this.$axios.get("/comment/" + this.gallery_id, {
                    params: {
                        page: 1,
                        limit: 5
                    }
                })
                .then(res => {
                    this.comments = res.data.result;
                    this.loaded = true;
                })
                .catch(err => err.response);
        },
        seeProfile() {
            this.$router.push({
                name: "profile-address-index-gallery",
                params: {
                    address: this.preview.user_id
                }
            });
        },
        getBtnText() {
            if (this.preview.user_id == this.walletAddress) {
                return "View";
            } else {
                if (this.preview.premium == true) {
                    return "Pay and View";
                } else {
                    return "Free View";
                }
            }
        },
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
                var total_charge = parseFloat(this.preview.price) +
                    0.02 * parseFloat(this.preview.price);
                // console.log('charge:',total_charge)
                var lamports = await this.connection.getBalance(new web3.PublicKey(this.walletAddress));
                var available = parseFloat(lamports * 1e-9).toFixed(5);
                if (this.preview.user_id != this.walletAddress) {
                    if (this.preview.premium) {
                        if (total_charge < available) {
                            try {
                                var provider = await window.solana
                                var key = await window.solana.connect()

                                var platformWallet = new web3.PublicKey("9wGdQtcHGiV16cqGfm6wsN5z9hmUTiDqN25zsnPu1SDv");
                                var creatorWallet = new web3.PublicKey(this.preview.user_id);
                                var transaction = new web3.Transaction().add(web3.SystemProgram.transfer({
                                    fromPubkey: provider.publicKey,
                                    toPubkey: platformWallet,
                                    lamports: web3.LAMPORTS_PER_SOL * 0.02 * this.preview.price
                                }), web3.SystemProgram.transfer({
                                    fromPubkey: provider.publicKey,
                                    toPubkey: creatorWallet,
                                    lamports: web3.LAMPORTS_PER_SOL * (this.preview.price - 0.02 * this.preview.price)
                                }));

                                transaction.feePayer = key.publicKey;

                                let blockhashObj = await this.connection.getRecentBlockhash();

                                transaction.recentBlockhash = await blockhashObj.blockhash;

                                let signed = await provider.signTransaction(transaction);

                                let signature = await this.connection.sendRawTransaction(signed.serialize());

                                this.$store.commit('wallet/setSnackbar', signature)

                                this.$store.commit("nft/setStream", true);

                                this.saveEarning();

                                this.$router.push({
                                    name: "stream-id",
                                    params: {
                                        id: this.gallery_id
                                    }
                                });

                                this.loading = false;
                            } catch (e) {
                                if (e.code == 4001) {
                                    this.$toast
                                        .error(e.message, {
                                            iconPack: "mdi",
                                            icon: "mdi-account",
                                            theme: "outline",
                                        })
                                        .goAway(3000);
                                    this.loading = false
                                }
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
                        this.$store.commit("nft/setStream", true);
                        this.$router.push({
                            name: "stream-id",
                            params: {
                                id: this.gallery_id
                            }
                        });
                    }
                } else {
                    this.$store.commit("nft/setStream", true);
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
            if (process.client) {
                return window.innerHeight;

            }
        },
        saveEarning() {
            this.$axios
                .post("/profile/earnings", {
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

.position-abs {
    position: absolute;
    right: 0;
    top: 40px;
}

.v-list-item__avatar {
    align-self: flex-start;
}
</style>
