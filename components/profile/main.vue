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
                        <p v-if="walletAddress" class="mb-n7">{{walletAddress.slice(0,8)+'.............'+walletAddress.slice(-3,-1)}}</p>
                    </v-card>
                </v-row>
                <div class="btn-gradient mt-5">

                </div>
                <p class="mt-n6 body-2">Edit Profile</p>

                <div class="btn-gradient mt-5">

                </div>
                <p class="mt-n6 body-2">Link Twitter</p>

                <button @click="authenticate('twitter')">auth Twitter</button>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import axios from 'axios';
const web3 = require("@solana/web3.js");

const LoginWithTwitter = require('login-with-twitter')
const tw = new LoginWithTwitter({
    consumerKey: 'vJRAXPUaKdnOSn1V3gdn1kzLW',
    consumerSecret: 'fF0D0xcMlBVcVYY7mBICr6pF2cMxXWthHpE1QhuMQtGNvDyL7V',
    callbackUrl: 'http://localhost:3001/profile/7X5Pz19drXvWZrxaP7sdqN3ZG8hSD8DrB18PFS5h3KVW/nfts'
})
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

        },
        authenticate(provider) {
            this.$auth.authenticate(provider).then(function () {
                // Execute application logic after successful social authentication
            })
        },
        async callTwitterLogin() {
            // const TwitterStrategy = require('passport-twitter').Strategy;

            // passport.use(new TwitterStrategy({
            //         consumerKey: 'ZNLeRwvLOgMfKd3eRNFkygKZW',
            //         consumerSecret: 'SKhF51YNyphKYfVvwKXAtPNOLwYM14W6HiBfvxwhPRawKkEAiq',
            //         callbackURL: "http://127.0.0.1:3000/twitter/callback"
            //     },
            //     function (token, tokenSecret, profile, cb) {
            //         User.findOrCreate({
            //             twitterId: profile.id
            //         }, function (err, user) {
            //             return cb(err, user);
            //         });
            //         console.log(profile)
            //     }
            // ));
            // app.get('/twitter', (req, res) => {
            tw.login((err, tokenSecret, url) => {
                if (err) {
                    // Handle the error your way
                }

                // Save the OAuth token secret for use in your /twitter/callback route
                // req.session.tokenSecret = tokenSecret

                // Redirect to the /twitter/callback route, with the OAuth responses as query params
                // res.redirect(url)
                console.log(tokenSecret)
            })
            // })

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
    width: 100px;
    height: 30px;
    padding: 3px;
    border-radius: 7px;
    /*1*/
    border: 2px solid transparent;
    /*2*/
    background: linear-gradient(45deg, #1905DA, #FE87FF) border-box;
    /*3*/
    -webkit-mask:
        /*4*/
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    /*5'*/
    mask-composite: exclude;
    /*5*/
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
