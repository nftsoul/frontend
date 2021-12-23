<template>
<div>
    <v-app-bar color="transparent" style="position:absolute;top:0;" app flat class="px-lg-16 px-md-5" extended>
        <v-app-bar-nav-icon class="mx-16 mt-3">
            <v-img :src="require('~/assets/images/logo.svg')" style="width:5%"></v-img>
        </v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <div class="hidden-md-and-down mt-5">
            <v-btn text>
                Home
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn text>
                Explore
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn text>
                Pages
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn text>
                Stats
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn text>
                Elements
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn v-if="walletAddress == null" class="connect-wallet" @click="detectWallet()">
                Connect Wallet
            </v-btn>

            <div v-else class="auth-box mt-n2">
                <div class="auth-inside">
                    <div class="auth-inside-1">
                        <v-avatar size="20" class="mx-2 mt-3">
                            <v-img :src="require('~/assets/images/phantom.png')"></v-img>
                        </v-avatar>
                    </div>
                    <div class="auth-inside-2">
                        <p class="wallet-text mt-3" v-if="walletAddress">{{walletAddress.slice(0,8)+'...'}}</p>
                    </div>
                </div>
            </div>
        </div>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app absolute temporary right dark color="primary">
        <v-list nav dense>
            <v-list-item>
                <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item>
                <v-list-item-title>Explore</v-list-item-title>
            </v-list-item>

            <v-list-item>
                <v-list-item-title>Pages</v-list-item-title>
            </v-list-item>

            <v-list-item>
                <v-list-item-title>Stats</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Elements</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Connect Wallet</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
export default {

    data() {
        return {
            resp: '',
            drawer: false,
            authBtn: null
        }
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        }
    },
    methods: {
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
        }
    }
}
</script>

<style lang="css">
@import '~/assets/styles/appbar.css';

.v-btn span {
    font-size: 14px;
}

.connect-wallet {
    background: linear-gradient(265.07deg, #4A04D8 3.26%, #5E0FFF 31.76%, #FD2BFF 70.6%, #C202D3 97.81%);
}

.auth-box {
    float:right;
    background: linear-gradient(265.07deg, #4A04D8 3.26%, #5E0FFF 31.76%, #FD2BFF 70.6%, #C202D3 97.81%);
    width: 145px;
    height: 45px;
    border-radius: 7px;
    padding: 1px;
}

.auth-inside {
    background: linear-gradient(264.44deg, #FE87FF 2.87%, #C202D3 34.05%, #5E0FFF 67.82%, #1905DA 99.15%);
    border-radius: 7px;
}

.auth-inside-1 {
    float: left;
    width: 30%;
    height: 43px;
    background-color: #030537;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}

.auth-inside-2 {
    width: 69%;
    height: 43px;
    margin-left: 1px;
    padding: 0 5px;
    float: left;
    background-color: #030537;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}

.wallet-text {
    color: #F5F7F8;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 1px;

}
</style>
