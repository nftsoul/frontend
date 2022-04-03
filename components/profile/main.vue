<template>
<div class="profile-bg">
    <v-container>
        <v-row class="pt-16" justify="center">
            <v-col cols="6" align="center">
                <v-avatar size="150" class="bordered">
                    <img :src="require('~/assets/images/profile.svg')" alt="Avatar">
                </v-avatar>
                <p class="text-h6">Masha Raymers</p>
                <v-row justify="center">
                    <p class="mr-5 mt-1 text-gradient">@mashmer</p>
                    <v-card dark color="black" class="pa-2" height="40">
                        <p class="mb-n7">{{walletAddress.slice(0,8)+'.............'+walletAddress.slice(-3,-1)}}</p>
                    </v-card>
                </v-row>
                <div class="btn-gradient mt-5">
                    Edit Profile
                </div>
                <v-btn class="btn-exhibit px-5" @click="$router.push({name:'profile-address-exhibit',params:{'address':walletAddress}})">
                    Exhibit
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
const web3 = require("@solana/web3.js");

export default {
    layout: 'user',
    data() {
        return {
            chipColor: 'rgba(160, 160, 160, 0.3)',
            loading: true,
            connect: '',
            balance: '',
        }
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        }
    },
    watch: {
        walletAddress(newValue, oldValue) {
            if (newValue != oldValue) {
                this.getAccountInfo()
            }
        }
    },
    mounted() {
        this.connect = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
        this.getAccountInfo()
    },
    methods: {
        async getAccountInfo() {
            var blc = await this.connect.getBalance(new web3.PublicKey(this.walletAddress))
            this.balance = parseFloat(blc * 0.000000001).toFixed(5)

        }
    }
}
</script>

<style lang="scss">
.profile-bg {
    background: linear-gradient(261.36deg, #C202D3 3.07%, #300253 64.08%, #16023C 82.04%, #000229 100%);
}

.profile-card {
    background-color: transparent !important;
}

.btn-exhibit {
    background: linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%);
}

.bordered {
    border: 3px solid white;
}

.btn-gradient {
    border: 5px solid;
    border-radius: 50%;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%);
    ;

}

.text-gradient {
    font-weight: 600;
    font-size: 16px;
    background: linear-gradient(264.44deg, #FE87FF 2.87%, #C202D3 34.05%, #5E0FFF 67.82%, #1905DA 99.15%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}
</style>
