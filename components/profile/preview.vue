<template>
<div class="dark-bg">
    <v-card :min-height="screenHeight()" flat color="transparent">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" lg="11" md="11">
                    <div class="enclose-border">
                        <v-container v-if="selected.nfts">
                            <v-row>
                                <v-col v-if="selected.nfts.length > 0" cols="12" lg="4" md="6" align="center" class="px-5">
                                    <v-img :src="selected.nfts[0].image" class="rounded-lg">
                                        <template v-slot:placeholder>
                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-col>
                                <v-col v-if="selected.nfts.length > 1" cols="12" lg="4" md="6" align="center" class="px-5">
                                    <v-img :src="selected.nfts[1].image" class="rounded-lg">
                                        <template v-slot:placeholder>
                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-col>
                                <v-col cols="12" lg="4" md="6" class="pr-0">
                                    <p>{{ selected.gallery_name }}</p>
                                    <v-list dense style="box-shadow: none !important" class="px-2">
                                        <v-list-item dense @click="seeProfile()">
                                            <v-list-item-avatar>
                                                <v-icon>mdi-account-tie</v-icon>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    {{ selected.user_id.slice(0, 5) }}
                                                </v-list-item-title>
                                                <!-- <v-list-item-subtitle>
                                                @Rayna
                                            </v-list-item-subtitle> -->
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                    <v-row class="mt-5">
                                        <v-col cols="5">
                                            <p class="mb-0 caption text--disabled">start with</p>
                                            <p class="text-h5" v-if="selected.price>0">{{ selected.price }} SOL</p>
                                            <p class="text-h5" v-else>{{ 0 }} SOL</p>

                                            <div>
                                                <v-btn small color="green" class="mt-7" rounded x-small @click="stream" :loading="loading">
                                                    <small>{{getBtnText()}}</small>
                                                </v-btn>
                                            </div>
                                            <p class="mt-2 body-2">
                                                Total Items: {{ selected.nfts.length }}
                                            </p>
                                        </v-col>
                                        <v-col cols="7" class="px-0">
                                            <p class="mb-0 caption text--disabled">
                                                About This Gallery
                                            </p>
                                            <p style="line-height: 15px">
                                                <small>{{ selected.description }}</small>
                                            </p>
                                            <!-- <v-btn small rounded color="#A0A0A0">
                                            <small>Add To Favourite</small>
                                        </v-btn> -->
                                        </v-col>
                                    </v-row>
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
import axios from "axios";
let zebec = null;
if (process.client) {
    zebec = require("zebecprotocol-sdk");
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
        };
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress;
        },
        selected() {
            return this.$store.state.content.selected;
        },
    },
    mounted() {
        this.increaseView()
        if (this.selected == "") {
            this.$router.push("/");
        }
    },
    methods: {
        seeProfile() {
            this.$router.push({
                name: 'profile-address-index-gallery',
                params: {
                    address: this.selected.user_id
                }
            })
        },
        getBtnText() {
            if (this.selected.user_id == this.walletAddress) {
                return 'View'
            } else {
                if (this.selected.premium == true) {
                    return 'Pay and View'
                } else {
                    return 'Free View'
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

                const depositData = {
                    sender: this.walletAddress,
                    amount: parseFloat(this.selected.price) +
                        0.02 * parseFloat(this.selected.price),
                };

                var total_charge =
                    parseFloat(this.selected.price) +
                    0.02 * parseFloat(this.selected.price);
                // console.log('charge:',total_charge)
                var lamports = await this.connection.getBalance(
                    new web3.PublicKey(this.walletAddress)
                );

                var available = parseFloat(lamports * 0.000000001).toFixed(5);

                if (this.selected.user_id != this.walletAddress) {
                    if (this.selected.premium) {

                        if (total_charge < available) {
                            // depositing sol
                            this.approvalDialog = true

                            let depositResponse = await zebec.depositNativeToken(depositData);

                            if (depositResponse.status == "success") {
                                this.approvals -= 1
                                let currentTime1 = Math.floor(Date.now() / 1000);
                                let futureTime1 = currentTime1 + 60;
                                let creatorResponse = await zebec.initNativeTransaction({
                                    sender: this.walletAddress,
                                    receiver: "9wGdQtcHGiV16cqGfm6wsN5z9hmUTiDqN25zsnPu1SDv",
                                    amount: parseFloat(0.02 * this.selected.price),
                                    start_time: currentTime1,
                                    end_time: futureTime1,
                                });
                                if (creatorResponse.status == "success") {
                                    this.approvals -= 1
                                    let currentTime2 = Math.floor(Date.now() / 1000)
                                    let futureTime2 = currentTime2 + 60
                                    let platformResponse = await zebec.initNativeTransaction({
                                        sender: this.walletAddress,
                                        receiver: this.selected.user_id,
                                        amount: parseFloat(this.selected.price),
                                        start_time: currentTime2,
                                        end_time: futureTime2,
                                    });
                                    if (platformResponse.status == "success") {
                                        this.streampda = platformResponse.data.pda
                                        this.saveEarning();
                                        this.loading = false;
                                        this.approvalDialog = false
                                        this.$router.push({
                                            name: "profile-stream"
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
                        this.$router.push({
                            name: "profile-stream"
                        });
                    }
                } else {
                    this.$router.push({
                        name: "profile-stream"
                    });
                }

            }
        },
        screenHeight() {
            return window.innerHeight - 300;
        },
        increaseView() {
            axios.get(
                process.env.baseUrl + "/single-gallery/" + this.selected._id
            )
        },

        saveEarning() {
            axios
                .post(process.env.baseUrl + "/post-earnings", {
                    user_id: this.walletAddress,
                    gallery_id: this.selected._id,
                    price: this.selected.price,
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
