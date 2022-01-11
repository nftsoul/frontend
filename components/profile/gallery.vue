<template>
<div>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8" md="6">
                <v-row v-if="collections.length==0" justify="center">
                    <v-col v-if="!noData" align="center">
                        <!-- <orbit-spinner class="ma-10" :animation-duration="1200" :size="55" color="#fff" /> -->
                        <p>Loading your Collections...</p>
                    </v-col>
                    <v-col v-else align="center">
                        <p>You have no collection</p>
                        <v-btn @click="createCol()" class="btn-exhibit">Create Now</v-btn>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col cols="12" lg="4" md="6" v-for="(item,i) in collections" :key="i" align="center">
                        <v-card color="transparent" flat max-width="300">
                            <div class="outer-card">
                                <div class="inner-card">
                                    <v-img :src="getImg(item)" class="mx-auto" width="220" height="220"></v-img>

                                    <v-card class="rounded-pill mt-n6" max-width="150" style="">
                                        <v-list dense class="py-1">
                                            <v-list-item dense class="pa-0">
                                                <v-list-item-avatar class="my-0 ml-2">
                                                    <v-img :src="require('~/assets/images/1.png')"></v-img>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title class="ml-n2">{{item.user_id.slice(0,5)+'....'}}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-card>
                                    <v-card-subtitle class="text-left">{{item.gallery_name}}</v-card-subtitle>
                                    <v-row>
                                        <div class="prem-sup-card rounded-lg">
                                            <span>Neko Kingdom</span>
                                        </div>
                                        <div class="prem-sup-card rounded-lg">
                                            <span>Cat Series</span>
                                        </div>
                                        <div class="prem-sup-card rounded-lg">
                                            <span>Neko</span>
                                        </div>
                                        <div class="prem-sup-card rounded-lg">
                                            <span>Stone Tail</span>
                                        </div>
                                        <div class="prem-sup-card rounded-lg">
                                            <span>Eye</span>
                                        </div>
                                        <div class="prem-sup-card rounded-lg">
                                            <span>Bunny Ear</span>
                                        </div>
                                        <div class="prem-sup-card rounded-lg">
                                            <span>Triple Horn</span>
                                        </div>
                                    </v-row>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>

            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import axios from 'axios'
// if (process.client) {
//     OrbitSpinner = require('epic-spinners').OrbitSpinner
//     // import OrbitSpinner from 'epic-spinners'

// }
export default {
    // components:{OrbitSpinner},
    data() {
        return {
            collections: [],
            noData: false
        }
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        }
    },
    mounted() {
        this.getCollections()
    },
    methods: {
        getCollections() {
            axios.get('http://nft-soul.herokuapp.com/api/all-gallery/' + this.walletAddress).then(res => {
                console.log(res.data)
                this.collections = res.data
                if (res.data.length == 0) {
                    this.noData = true
                }
            }).catch(err => console.log(err.response))
        },
        getImg(item) {
            return this.$cloudinary.image.url(
                item.image, {
                    gravity: 'auto:subject',
                }
            )
        },
        createCol() {
            this.$router.push({
                name: 'profile-address-exhibit',
                params: this.walletAddress
            })
        }
    }
}
</script>
