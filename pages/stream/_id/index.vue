<template>
<div class="dark-bg pt-16">
    <v-container class="pt-16">
        <v-row justify="center">
            <h3>Item Preview</h3>
        </v-row>
        <v-row justify="center">
            <v-col cols="12">
                <div v-if="stream != ''">
                    <client-only>
                        <carousel-3d style="box-shadow: none" :autoplay="false" :autoplay-timeout="10000" :controls-visible="true" :controls-width="40" :controls-height="40" perspective="0" inverseScaling="00" space="360" display="1" width="900" height="535" border="0">
                            <slide v-for="(item, i) in stream.nfts" :index="i" :key="i">
                                <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                                    <div class="enclose-border yo">
                                        <v-container>
                                            <v-row>
                                                <v-col cols="4">
                                                    <p class="mb-0">
                                                        {{ stream.gallery_name }}
                                                    </p>
                                                    <p class="mb-0">
                                                        <small>{{ index + 1 }} of {{ stream.nfts.length }}

                                                            <v-tooltip top v-if="favourite.includes(stream._id)">
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-chip dark small v-bind="attrs" v-on="on" class="pa-2">
                                                                        <v-icon small class="mr-1">mdi-heart</v-icon>Added
                                                                    </v-chip>
                                                                </template>
                                                                <span>Favourite</span>
                                                            </v-tooltip>

                                                            <v-tooltip top v-else>
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-chip dark small @click="addToFavourite" v-bind="attrs" v-on="on" :loading="loading">
                                                                        <v-icon small class="mr-1">mdi-heart</v-icon>Add
                                                                    </v-chip>
                                                                </template>
                                                                <span>Add to Favourite</span>
                                                            </v-tooltip>
                                                        </small>
                                                    </p>
                                                </v-col>
                                                <v-col cols="3">
                                                    <ShareNetwork style="text-decoration: none;" class="mb-2" network="twitter" :url="getShareLink()" :title="stream.gallery_name" description="Exhibit and earn from your NFT Collections" quote="Create galleries, showcase your best NFTs and earn from them." hashtags="nftsoul,nft_collection">

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
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" lg="5" md="6">
                                                    <div class="img-box pa-2">
                                                        <v-img :src="item.image" :lazy-src="item.image" class="mx-auto rounded-lg" max-width="350" height="300">
                                                            <template v-slot:placeholder>
                                                                <v-row class="fill-height ma-0" align="center" justify="center">
                                                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                                </v-row>
                                                            </template>
                                                        </v-img>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" lg="7" md="6" class="mt-n6">
                                                    <v-card outlined class="rounded-lg pa-2">
                                                        <v-row no-gutters>
                                                            <v-chip dark small :color="getColor('story')" @click="active = 'story'">Nft Story</v-chip>
                                                            <v-chip small dark class="mx-2" :color="getColor('attributes')" @click="active = 'attributes'">Attributes</v-chip>

                                                            <v-chip dark small :color="getColor('details')" @click="active = 'details'">Details</v-chip>

                                                            <v-spacer></v-spacer>
                                                        </v-row>
                                                        <v-divider class="mt-3"></v-divider>
                                                        <v-card-text class="caption px-0">
                                                            <div class="attr-desc-box">
                                                                <span v-if="active == 'details'">{{item.description}}</span>

                                                                <span v-if="active == 'attributes'">
                                                                    <v-row>
                                                                        <v-col class="py-0" cols="4" v-for="(attr, j) in item.attributes" :key="j">
                                                                            <div class="ma-1 attr-box">
                                                                                <p class="mb-0" v-if="attr.trait_type">
                                                                                    {{ attr.trait_type }}
                                                                                </p>
                                                                                <span v-if="attr.value" class="text--white">{{ attr.value }}</span>
                                                                            </div>
                                                                        </v-col>
                                                                    </v-row>
                                                                </span>
                                                                <span v-if="active == 'story'">{{item.story}}</span>
                                                            </div>
                                                        </v-card-text>
                                                    </v-card>

                                                    <v-divider class="mt-n3"></v-divider>

                                                    <v-list-item dense class="px-0 mt-2">
                                                        <v-list-item-avatar size="30">
                                                            <v-icon>mdi-account-tie</v-icon>
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title>
                                                                {{ stream.user_id.slice(0, 5) }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </div>
                                </template>
                            </slide>
                        </carousel-3d>
                    </client-only>
                </div>
                <v-container v-else>
                    <v-row justify="center">
                        <v-col cols="12" lg="6" md="6">
                            <v-skeleton-loader type="V-list-item"></v-skeleton-loader>
                            <v-skeleton-loader type="image"></v-skeleton-loader>
                        </v-col>
                        <v-col cols="12" lg="6" md="6">
                            <v-skeleton-loader type="card-avatar, article, actions"></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
        <!-- comments -->
        <v-row justify="center">
            <v-col cols="10" class="px-8">
                <v-card dark outlined class="max-width:800">
                    <div v-if="comments.length > 0">
                        <v-list-item v-for="(item, i) in comments" :key="i">

                            <v-list-item-avatar class="mr-0">
                                <v-img v-if="item.user_id.image_link" :src="item.user_id.image_link" max-width="40" max-height="40"></v-img>
                                <v-icon v-else large>mdi-account</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content @mouseenter="selectedIndex=i" @mouseleave="selectedIndex=null,replying=false">
                                <v-list-item-title>
                                    <span v-if="item.user_id.name">{{item.user_id.name}}</span>
                                    <span v-else>{{item.user_id.wallet_address.slice(0, 5)}}</span>
                                    <small class="caption text--disabled">{{$moment(item.time).fromNow()}}</small>
                                    <small class="reply-btn position-abs text--disabled mb-0 ml-2 mt-n1" v-if="selectedIndex==i" @click="replying=true">
                                        <v-icon small>mdi-reply</v-icon>Reply
                                    </small>
                                </v-list-item-title>
                                <v-card-text class="text--disabled pa-0"><small v-html="item.body"></small></v-card-text><br>
                                <v-row no-gutters class="mt-1">
                                    <small v-if="item.reply_count>0" @click="getReplies(item,i)" class="reply-btn">{{item.reply_count}} Replied</small>
                                    <v-btn x-small text v-if="replyPage==1 && selectedIndex==i" :loading="moreReply"></v-btn>

                                </v-row>

                                <div v-if="replying==true && selectedIndex==i" class="mt-3">
                                    <v-list-item dense class="px-0" v-if="profile">
                                        <v-row no-gutters>
                                            <v-col cols="1" class="pa-0">
                                                <v-list-item-avatar size="30" class="mb-0 mt-2 mr-1">
                                                    <v-img v-if="profile.image_link" :src="profile.image_link" :lazy-src="profile.image_link"></v-img>
                                                    <v-icon v-else large>mdi-account</v-icon>
                                                </v-list-item-avatar>
                                            </v-col>
                                            <v-col>
                                                <v-list-item-content class="py-1 ml-n5">
                                                    <v-textarea rows="1" id="txtArea" @keypress.enter="onEnterPress(item)" auto-grow dark color="white" append-icon="mdi-check" :loading="makingReply" @click:append="makeReply(item)" class="mb-n5" v-model="reply" outlined dense placeholder="Reply"></v-textarea>
                                                </v-list-item-content>
                                            </v-col>
                                        </v-row>
                                    </v-list-item>
                                </div>
                                <!-- end make reply -->

                                <!-- replies -->
                                <div v-if="item.replies">
                                    <v-list-item dense v-for="(reply,j) in item.replies" :key="j">
                                        <v-list-item-avatar size="30" class="mr-0">
                                            <v-img v-if="reply.user_id.image_link" :src="reply.user_id.image_link" max-width="60" max-height="60"></v-img>
                                            <v-icon v-else>mdi-account</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <span v-if="reply.user_id.name">{{reply.user_id.name}}</span>
                                                <span v-else>{{ reply.user_id.wallet_address.slice(0, 5) }}</span>
                                                <small class="caption text--disabled">{{$moment(reply.time).fromNow()}}</small>
                                            </v-list-item-title>
                                            <v-card-text class="text--disabled pa-0"><small v-html="reply.body"></small></v-card-text><br>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-row no-gutters>
                                        <v-btn v-if="item.reply_count>5 && item.replies.length < item.reply_count" @click="getReplies(item,i)" x-small text>
                                            <v-icon small>mdi-arrow-down</v-icon>
                                            <small>See More</small>
                                        </v-btn>
                                        <v-btn v-if="replyPage>1" x-small text :loading="moreReply"></v-btn>
                                    </v-row>
                                </div>
                                <!-- end replies -->
                            </v-list-item-content>

                        </v-list-item>
                    </div>
                    <div v-else class="ma-5">
                        <div v-if="!loaded">
                            <v-skeleton-loader v-for="(item, i) in 5" :key="i" dark type="list-item-avatar"></v-skeleton-loader>
                        </div>
                        <small v-else>No comments yet...</small>
                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text x-small v-if="comments.length > 4 && totalComments != comments.length" @click="getComments()" :loading="more">
                            See More Comments
                            <v-icon small>mdi-arrow-down</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    <v-row no-gutters class="px-5">
                        <v-avatar>
                            <v-img v-if="profile.image_link" :src="profile.image_link"></v-img>
                            <v-icon v-else large>mdi-account</v-icon>
                        </v-avatar>
                        <v-textarea dark rows="1" auto-grow id="txtArea2" @keypress.enter="preventComment()" color="white" class="px-2" outlined v-model="comment" :error-messages="error" placeholder="What do you think about the gallery?"></v-textarea>
                    </v-row>
                    <v-row no-gutters class="px-5 pb-5">
                        <v-spacer></v-spacer>
                        <v-btn small rounded dark class="mt-n3 connect-wallet" :loading="commenting" @click="makeComment()">Post a comment</v-btn>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <!-- end comments -->
    </v-container>

    <v-dialog v-model="leave" max-width="400">
        <div class="border-white rounded-lg">
            <v-card color="primary" class="rounded-lg">
                <p>Sure to leave?</p>

                <v-card-actions>
                    <v-btn @click="leave = false">cancel</v-btn>
                    <v-btn @click="goTo()">confirm</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            totalTime: 300,
            minuteLeft: 0,
            secondLeft: 0,
            active: "story",
            favourite: [],
            loading: false,
            index: 0,
            current: "",
            attributes: [],
            comment: "",
            comments: [],
            loaded: false,
            page: 0,
            commenting: false,
            error: "",
            totalComments: 0,
            more: false,
            stream: "",
            leave: false,
            expand: false,
            selectedIndex: null,
            replying: false,
            reply: '',
            selectedComment: '',
            replyPage: 0,
            more: false,
            makingReply: false,
            moreReply:false
        };
    },
    watch: {
        comment() {
            if (this.comment != "") {
                this.error = ''
            }
        }
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress;
        },
        profile() {
            return this.$store.state.wallet.profile;
        },
        gallery_id() {
            return this.$route.params.id;
        },
        streaming() {
            return this.$store.state.nft.streaming;
        },
        currentRoute() {
            return this.$store.state.nft.currentRoute;
        },
    },
    beforeRouteLeave(to, from, next) {
        // this.leave=true
        this.$store.commit("nft/setStream", false);
        next();
    },
    mounted() {
        if (this.streaming == true) {
            this.getStream();
            this.getComments();
            this.getFavourite();
        } else {
            this.$router.back();
        }
    },
    methods: {
        preventComment() {
            this.makeComment()
            var el = document.getElementById("txtArea2");
            el.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                }
            });
        },
        onEnterPress(item) {
            this.makeReply(item)
            var el = document.getElementById("txtArea");
            el.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                }
            });
        },
        getReplies(item, i) {
            this.moreReply = true
            if (this.selectedComment != item._id) {
                this.replyPage = 1
                this.selectedComment = item._id
            } else {
                this.replyPage += 1
            }
            this.$axios.get(
                "/comment/reply/" + item._id, {
                    params: {
                        page: this.replyPage,
                    },
                }
            ).then(res => {
                this.moreReply = false
                const index = this.comments.indexOf(item)
                let rep = res.data.replies.replies
                if (!this.comments[index].replies) {
                    this.comments[index]['replies'] = []
                }
                let reply_ids = []
                for (var y = 0; y < this.comments[index].replies.length; y++) {
                    reply_ids.push(this.comments[index].replies[y]._id)
                }
                for (var x = 0; x < rep.length; x++) {
                    if (!reply_ids.includes(rep[x]._id)) {
                        this.comments[index].replies.push(rep[x])

                    }
                }
            })
        },
        getShareLink() {
            return process.env.SITE_URL + '/preview/' + this.gallery_id
        },
        getStream() {
            this.$axios
                .get("/gallery-stream", {
                    params: {
                        id: this.gallery_id,
                    },
                })
                .then((res) => {
                    this.stream = res.data[0];
                    this.current = this.stream.nfts[this.index];
                });
        },
        makeReply(item) {
            this.makingReply = true
            this.selectedComment = item
            if (this.reply != '') {
                this.$axios
                    .post("/comments/reply/" + item._id, {
                        body: this.reply,
                        user_id: this.profile._id,
                    })
                    .then((res) => {
                        this.makingReply = false
                        let rep = res.data.reply
                        this.reply = ''
                        rep['user_id'] = this.profile
                        const index = this.comments.indexOf(item)
                        if (this.comments[index].replies) {
                            this.comments[index].replies.push(rep)
                        } else {
                            this.comments[index]['replies'] = []
                            this.comments[index].replies.push(rep)
                        }
                        this.comments[index].reply_count += 1
                    })
                    .catch((err) => err.response);
            }
        },
        getComments() {
            this.page++;
            this.more = true;
            this.$axios
                .get("/comments/" + this.gallery_id, {
                    params: {
                        page: this.page,
                        limit: 5,
                    },
                })
                .then((res) => {
                    this.totalComments = res.data.totalComments;
                    for (var x = 0; x < res.data.result.length; x++) {
                        this.comments.push(res.data.result[x]);
                    }
                    this.loaded = true;
                    this.more = false;
                })
                .catch((err) => err.response);
        },
        makeComment() {
            if (this.comment == "") {
                this.error = "Nothing to comment";
            } else {
                this.commenting = true;
                this.$axios
                    .post("/comments", {
                        body: this.comment.replace(/\n/g, "<br>\n"),
                        user_id: this.profile._id,
                        gallery_id: this.gallery_id,
                    })
                    .then((res) => {
                        let resp = res.data.comment;
                        resp.user_id = this.profile;
                        this.comments.push(resp);
                        this.commenting = false;
                        this.comment = "";
                    })
                    .catch((err) => err.response);
            }
        },
        getLink(item) {
            if (item.image_link) {
                return item.image_link;
            } else {
                return require("~/assets/images/profile.svg");
            }
        },
        getColor(item) {
            if (item == this.active) {
                return "#C202D3";
            }
        },
        viewNext() {
            if (this.stream.nfts.length > this.index + 1) {
                this.index++;
            }
        },
        getFavourite() {
            this.$axios
                .get("/get-favourite-gallery/" + this.walletAddress)
                .then((res) => {
                    for (var x = 0; x < res.data.length; x++) {
                        this.favourite.push(res.data[x].gallery_id);
                    }
                })
                .catch((err) => console.log(err.response));
        },

        addToFavourite() {
            this.favourite.push(this.stream._id);
            this.$axios
                .post("/save-favourite", {
                    user_id: this.profile._id,
                    gallery_id: this.stream._id,
                })
                .then((res) => {
                    this.loading = false;
                    this.$toast
                        .success("Added to favourite.", {
                            iconPack: "mdi",
                            icon: "mdi-heart",
                            theme: "outline",
                        })
                        .goAway(3000);
                })
                .catch((err) => console.log(err.response));
        },
    },
};
</script>

<style lang="css">
.carousel-3d-slide {
    background: #030537 !important;
    border-radius: 10px !important;
    box-shadow: none;
}

.img-box {
    box-shadow: none;
    height: 300px;
    width: 300px;
    border-radius: 10px;
    border: 2px solid #030537;
}

.attr-box {
    background-color: #0e103b;
    border-radius: 7px;
    padding: 10px;
    box-shadow: none !important;
}

.attr-box p {
    font-size: 14px;
    color: #f5f7f8;
}

.attr-desc-box {
    overflow-y: auto;
    overflow-x: hidden;
    height: 250px;
    padding: 5px;
}

a.next {
    border: 3px solid #c202d3;
    padding-right: 7px;
    border-radius: 50%;
    line-height: 28px !important;
}

a.prev {
    border: 3px solid white;
    border-radius: 50%;
    padding-left: 7px;
    line-height: 28px !important;
    border: 3px solid #c202d3;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

a.next span {
    background: linear-gradient(86.47deg,
            #fe87ff 1.47%,
            #fd2bff 21.9%,
            #c202d3 39.06%,
            #9208e8 57.62%,
            #5e0fff 84.84%,
            #1905da 96.24%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

a.prev span {
    background: linear-gradient(86.47deg,
            #fe87ff 1.47%,
            #fd2bff 21.9%,
            #c202d3 39.06%,
            #9208e8 57.62%,
            #5e0fff 84.84%,
            #1905da 96.24%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.v-list-item__avatar{
    align-self: flex-start;
}
</style>
