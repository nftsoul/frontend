<template>
<div class="dark-bg">
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="10" md="11">
                <div class="enclose-border">
                    <v-container>
                        <v-row>
                            <v-col cols="12" lg="4" md="6" align="center" class="px-5">
                                <v-img :src="require('~/assets/images/1.png')" class="rounded-lg"></v-img>
                            </v-col>
                            <v-col cols="12" lg="4" md="6" align="center" class="px-5">
                                <v-img :src="require('~/assets/images/2.png')" class="rounded-lg"></v-img>
                            </v-col>
                            <v-col cols="12" lg="4" md="6">
                                <p>Infinity Lab Collections</p>
                                <v-list dense style="box-shadow:none !important">
                                    <v-list-item dense>
                                        <v-list-item-avatar>
                                            <v-img :src="require('~/assets/images/profile.png')"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                Roy Reyna
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                @Rayna
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-row class="mt-5">
                                    <v-col cols="6">
                                        <p class="mb-0 caption text--disabled">start with</p>
                                        <p class="text-h5">2.5 SOL</p>
                                        <v-btn small color="#C202D3" rounded x-small @click="stream">
                                            <small>Pay Now & See</small>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="caption text--disabled">About This Gallery</p>
                                        <p class="caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua.</p>
                                        <v-btn small rounded color="#A0A0A0">
                                            <small>Add To Favourite</small>
                                        </v-btn>
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
    methods: {
        async stream() {
            var res = await window.solana.connect()
            var myAddress = res.publicKey.toString()
            const depositData = {
                sender: myAddress, 
                amount: 0.001,
            };
            const streamData = {
                sender: myAddress,
                receiver: "8NhEDGdQEmzNR8fULpsdfLZV8NmWiSzyyzz2VdhoTfXU",
                amount: 1,
                start: Math.floor(Date.now() / 1000),
                end: Math.floor(Date.now() / 1000)+100,
            };
            const depositResponse = await depositNativeToken(depositData);
            const streamResponse = await initNativeTransaction(streamData);
            console.log('response:',depositResponse,streamResponse)
        },
    }
}
</script>
