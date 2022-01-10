<template>
<v-card  :src="require('~/assets/images/abstract-flowing.png')" flat>
    <v-img :height="screenHeight()" :lazy-src="require('~/assets/images/abstract-flowing.png')" :src="require('~/assets/images/abstract-flowing.png')">
        <v-container class="py-16">
            <v-row class="py-16">
                <v-col cols="12" lg="6" md="6" class="py-lg-16">
                    <p class="text-lg-h3 text-md-h4 text-sm-h5">Exhibit and Earn From <br>Your NFT Collections</p>
                    <p class="">Create galleries, showcase your best NFTs and earn from them.</p>
                    <v-row class="mt-10">
                        <v-btn class="btn-exhibit ma-3" width="100" @click="detectWallet()">Exhibit</v-btn>
                        <div class="outer-btn ma-3" @click="$router.push({path:'/featured'})">
                            <div class="inner-btn">
                                <p class="ml-3 mt-n1" style="font-size:14px">Explore</p>
                            </div>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-img>

</v-card>
</template>

<script>
import Appbar from '../layout/appbar';
export default {
    components: {
        Appbar
    },
    data() {
        return {
            windowHeight: 0,
        }
    },
    computed:{
        walletAddress(){
            return this.$store.state.wallet.walletAddress
        }
    },
    mounted() {
        this.windowHeight = window.innerHeight
    },
    methods: {
        screenHeight() {
            return this.windowHeight;
        },
        exhibit(){
            if(this.walletAddress==null){
                this.$toast
                .error("Please connect your phantom wallet first and then try again.", {
                    iconPack: "mdi",
                    icon: "mdi-wallet",
                    theme: "outline"
                })
                .goAway(3000);
            }
            else{
                this.$router.push({
                    name:'profile-address-exhibit',
                    params:{address:this.walletAddress}
                })
            }
        },
        detectWallet() {
            const isPhantomInstalled = window.solana && window.solana.isPhantom
            if (isPhantomInstalled) {
                try {
                    this.getAddress()
                } catch (err) {
                    this.$toast
                        .success("Unable to connect.", {
                            iconPack: "mdi",
                            icon: "mdi-bitcoin",
                            theme: "outline"
                        })
                        .goAway(3000);
                }

            } else {
                this.$toast
                    .success("Please install phantom wallet", {
                        iconPack: "mdi",
                        icon: "mdi-bitcoin",
                        theme: "outline"
                    })
                    .goAway(3000);
            }
        },
        async getAddress() {
            var resp = await window.solana.connect();
            this.$store.commit('wallet/setWalletAddress', resp.publicKey.toString())
            this.$router.push({
                name:'profile-address-exhibit',
                params:{address:this.walletAddress}
            })
        },
    }
}
</script>

<style lang="css">
.back {
    width: 100%;
    background-image: url('~/assets/images/abstract-flowing.jpg');
    background-size: 100% 100%;
}

.btn-exhibit {
    background: linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%);
    border-radius: 7px;
}

</style>
