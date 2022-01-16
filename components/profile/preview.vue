<template>
<div class="dark-bg">
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="11" md="11">
                <div class="enclose-border">
                    <v-container>
                        <v-row>
                            <v-col v-if="selected.nfts.length>0" cols="12" lg="4" md="6" align="center" class="px-5">
                                <v-img :src="selected.nfts[0].img" class="rounded-lg"></v-img>
                            </v-col>
                            <v-col v-if="selected.nfts.length>1" cols="12" lg="4" md="6" align="center" class="px-5">
                                <v-img :src="selected.nfts[1].img" class="rounded-lg"></v-img>
                            </v-col>
                            <v-col cols="12" lg="4" md="6" class="pr-0">
                                <p>{{selected.gallery_name}}</p>
                                <v-list dense style="box-shadow:none !important">
                                    <v-list-item dense>
                                        <v-list-item-avatar>
                                            <v-icon>mdi-account-tie</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{selected.user_id.slice(0,5)}}
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
                                        <p class="text-h5">{{selected.price}} SOL</p>
                                        <v-btn small color="green" class="mt-7" rounded x-small @click="stream">
                                            <small>Play and View</small>
                                        </v-btn>
                                        <p class="mt-2 body-2">Total Items: {{selected.nfts.length}}</p>
                                    </v-col>
                                    <v-col cols="7" class="px-0">
                                        <p class="mb-0 caption text--disabled">About This Gallery</p>
                                        <p style="line-height:15px"><small>{{selected.description}}</small></p>
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
</div>
</template>

<script>
import axios from 'axios'
import {
    getProvider,
    depositNativeToken,
    initNativeTransaction,
    withdrawNativeTransaction,
    cancelNativeTransaction,
    pauseNativeTransaction,
    resumeNativeTransaction,
    withdrawNativeTokenDeposit,
} from "zebecprotocol-sdk";
export default {
    data() {
        return {

        }
    },
    computed: {
        walletAddress(){
            return this.$store.state.wallet.walletAddress
        },
        selected() {
            return this.$store.state.content.selected
        }
    },
    mounted(){
        this.increaseView()
    },
    methods: {

        async stream() {
            var res = await window.solana.connect()
            var myAddress = res.publicKey.toString()
            const depositData = {
                sender: myAddress,
                amount: 0.00001 + 0.00001,
            };
            const streamData = {
                sender: myAddress,
                receiver: this.selected.user_id,
                amount: 0.00001+0.00001,
                start: Math.floor(Date.now() / 1000),
                end: Math.floor(Date.now() / 1000) + 30,
            };
            depositNativeToken(depositData)
                .then(res => {
                    console.log('1-res:',res.data)
                    if (res.data.transactionhash) {
                        initNativeTransaction(streamData)
                            .then(res2 => {
                                console.log('res:2:',res2.data)
                                if (res2.data.transactionhash) {
                                    this.$router.push({
                                        name: 'profile-stream'
                                    })
                                } else {
                                    this.$toast
                                        .error("Insufficient fund.", {
                                            iconPack: "mdi",
                                            icon: "mdi-wallet",
                                            theme: "outline"
                                        })
                                        .goAway(3000);
                                }
                            })
                            .catch(err => console.log('2-err:',err.response))
                    } else {
                        this.$toast
                            .error("Insufficient fund.", {
                                iconPack: "mdi",
                                icon: "mdi-wallet",
                                theme: "outline"
                            })
                            .goAway(3000);
                    }
                })
                .catch(err => console.log('err:1', err.response))
        },
        increaseView(){
            axios.get('http://nft-soul.herokuapp.com/api/single-gallery/'+this.selected._id)
        }
    }
}
</script>
