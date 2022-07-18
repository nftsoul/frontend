<template>
<div class="profile-bg">
    <v-container>
        <v-row class="pt-16" justify="center">
            <v-col cols="6" align="center" class="pb-8">
                <client-only>
                    <div v-if="profile.image_link" class="mb-3">
                        <v-img :lazy-src="profile.image_link" class="rounded-circle" :src="profile.image_link" alt="Avatar" max-width="160" max-height="160">
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                    </div>
                    <v-avatar v-else size="175" color="white" class="rounded-circle">
                        <v-icon size="205" color="#c202d3">mdi-account-circle</v-icon>
                    </v-avatar>
                </client-only>
                <div v-if="profile != null" class="my-3">
                    <p class="text-h6" v-if="profile.name">{{profile.name}}</p>

                    <v-row justify="center py-3">
                        <p class="mr-5 mt-1 text-gradient link" @click="tutorProfile()" v-if="profile.username">@{{profile.username}}</p>
                        <v-card max-width="200" dark color="black" class="pa-2" height="40" @click="copy()">
                            <p v-if="profile" class="mb-n7">{{profile.wallet_address.slice(0,8)+'.............'+profile.wallet_address.slice(-3,-1)}}</p>
                            <client-only v-else>
                                <spinner :animation-duration="1200" :size="20" color="#fff" />
                            </client-only>
                        </v-card>
                    </v-row>
                </div>

                <v-row justify="center" v-if="walletAddress == profile.wallet_address" no-gutters class="mt-n5">
                    <v-col cols="3" align="center">
                        <div class="btn-gradient mt-5" @click="showProfileDialog">

                        </div>
                        <p class="mt-n6 body-2">Edit Profile</p>
                    </v-col>

                </v-row>

                <ShareNetwork network="twitter" :url="getProfileLink()" title="NFTsoul..Exhibit and earn from your NFT Collections" description="Exhibit and earn from your NFT Collections" quote="Create galleries, showcase your best NFTs and earn from them." hashtags="nftsoul,nft_collection">
                    <v-btn fab color="#1da1f2" small dark class="rounded-circle mr-n8" style="z-index:500;">
                        <v-icon>
                            mdi-twitter
                        </v-icon>
                    </v-btn>
                    <v-chip light color="white" style="cursor:pointer">
                        <span class="ml-5" style="color:#1da1f2">Share on twitter</span>
                    </v-chip>
                </ShareNetwork>

            </v-col>
        </v-row>
    </v-container>

    <v-dialog v-model="profileDialog" max-width="300" style="z-index:501">
        <v-card class="background" dark>
            <v-card-title>Update profile</v-card-title>
            <v-card-text>
                <v-col align="center">
                    <v-form v-model="valid" ref="form">
                        <v-text-field v-model="name" color="white" :rules="[validRules.required,validRules.lengthMin3]" dense outlined label="Enter your full name"></v-text-field>
                        <v-text-field v-model="username" color="white" :rules="[validRules.required,validRules.lengthMin3]" dense outlined label="Pick a username"></v-text-field>
                    </v-form>
                    <v-btn dark small outlined class="my-n5" @click="updateProfileDetail" :loading="updating">Update</v-btn>

                </v-col>

            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
const web3 = require("@solana/web3.js");

export default {
    layout: 'user',
    middleware: 'auth',
    data() {
        return {
            chipColor: 'rgba(160, 160, 160, 0.3)',
            loading: true,
            connect: '',
            balance: '',
            profileDialog: false,
            valid: true,
            name: '',
            username: '',
            validRules: {
                required: (value) => !!value || "Required.",
                lengthMin3: (v) => (v && v.length > 2) || "At least 3 characters.",
            },
            updating: false,
            image_link: '',
            profile: ''
        }
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        },

    },
    watch: {
        walletAddress(newValue, oldValue) {
            if (newValue != oldValue) {
                this.getAccountInfo()
            }
        },
        profileDialog() {
            if (this.profileDialog == false) {
                this.$refs.form.reset()
            }
        }
    },
    mounted() {
        this.connect = new web3.Connection(web3.clusterApiUrl(process.env.CLUSTER), 'confirmed');
        // this.getAccountInfo()
        // this.auth()
        if (!this.$auth.user) {
            this.$router.push('/')
        }
        this.getProfileInfo()
    },
    methods: {
        getProfileInfo() {
            this.$axios.get('/profile/'+this.$route.params.address).then(res => {
                this.profile=res.data[0]
                this.$store.commit('wallet/setProfile', this.profile)
            })
        },
        tutorProfile() {
            // window.open('https://twitter.com/'+this.profile.username)
        },
        copy() {
            navigator.clipboard.writeText(this.walletAddress).then(res => {}).catch(err => console.log(err.response))
            this.$toast.success("Address copied.", {
                    iconPack: "mdi",
                    icon: "mdi-content-copy",
                    theme: "outline"
                })
                .goAway(1000)
        },
        getProfileLink() {
            return 'https://nftsoul.io/profile/' + this.$route.params.address + '/gallery'
        },
        showProfileDialog() {
            if (this.profile.name) {
                this.name = this.profile.name
            }
            if (this.profile.username) {
                this.username = this.profile.username
            }
            this.profileDialog = true
        },
        async getAccountInfo() {
            var blc = await this.connect.getBalance(new web3.PublicKey(this.walletAddress))
            this.balance = parseFloat(blc * 0.000000001).toFixed(5)

        },
        updateProfileDetail() {
            if (this.$refs.form.validate()) {
                this.updating = true
                this.$axios.patch('/profile/info?name=' + this.name + '&username=' + this.username)
                    .then(res => {
                        this.profile=res.data.result
                        this.$store.commit('wallet/setProfile', res.data.result)
                        this.updating = false
                        this.profileDialog = false
                    }).catch(err => console.log(err.response))
            }

        },
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
    cursor: pointer;
    width: 100px;
    height: 30px;
    padding: 3px;
    border-radius: 7px;
    /*1*/
    border: 1px solid transparent;
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

a:-webkit-any-link {
    text-decoration: none !important;
}

.rounded-circle {
    border: 2px solid white;
}

.link:hover {
    cursor: pointer;
}
</style>
