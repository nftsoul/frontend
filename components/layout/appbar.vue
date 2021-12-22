<template>
<div>
    <v-app-bar color="transparent" style="position:absolute;top:0;" app flat class="px-lg-16 px-md-5" extended>
        <v-app-bar-nav-icon class="mx-16 mt-3">
                <v-img :src="require('~/assets/images/logo.svg')" style="width:5%"></v-img>
        </v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <div class="hidden-md-and-down">
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
            <v-btn class="connect-wallet" @click="detectWallet()">
                Connect Wallet
            </v-btn>
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
            drawer: false
        }
    },
    methods: {
        detectWallet() {
            const isPhantomInstalled = window.solana && window.solana.isPhantom
            if (isPhantomInstalled) {
                try {
                    var resp = window.solana.connect().publicKey.toString();
                    // console.log(resp.publicKey.toString()) 
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
</style>
