<template>
<div>
    <v-card min-height="500" flat color="transparent">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" lg="8" md="6">
                    <v-row v-if="collections.length==0" justify="center">
                        <v-col v-if="!noData" align="center">
                            <orbit-spinner class="ma-10" :animation-duration="1200" :size="55" color="#fff" />
                            <p>Loading your Collections...</p>
                        </v-col>
                        <v-col v-else align="center">
                            <v-img :src="require('~/assets/images/sad.svg')" max-width="300"></v-img>
                            <p>You have no collection</p>
                            <v-btn @click="createCol()" class="btn-exhibit">Create Now</v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="12" lg="4" md="6" v-for="(item,i) in collections" :key="i" align="center">
                            <v-card color="transparent" flat max-width="300" height="470">
                                <div class="outer-card">
                                    <div class="inner-card">
                                        <v-img :src="item.image" :lazy-src="item.image" class="mx-auto" width="220" height="220">
                                            <template v-slot:placeholder>
                                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                    </v-row>
                                                </template>
                                        </v-img>

                                        <v-card class="rounded-pill mt-n6" max-width="150" style="">
                                            <v-list dense class="py-1">
                                                <v-list-item dense class="pa-0">
                                                    <v-list-item-avatar class="my-0 ml-2">
                                                        <v-icon>mdi-account-tie</v-icon>
                                                    </v-list-item-avatar>
                                                    <v-list-item-content>
                                                        <v-list-item-title class="ml-n2">{{item.user_id.slice(0,5)+'....'}}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </v-card>
                                        <v-card-subtitle class="text-left">{{item.gallery_name}}</v-card-subtitle>
                                        <v-row>
                                            <div class="prem-sup-card rounded-lg" v-for="(nft,i) in item.nfts" :key="i">
                                                <span v-if="i<4">{{nft.title}}</span>
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
    </v-card>
</div>
</template>

<script>
import axios from 'axios'
let OrbitSpinner=null
if (process.client) {
    OrbitSpinner = require('epic-spinners').OrbitSpinner

}
export default {
    components:{OrbitSpinner},
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
            axios.get('https://nft-soul.herokuapp.com/api/all-gallery/' + this.walletAddress).then(res => {
                this.collections = res.data
                if (res.data.length == 0) {
                    this.noData = true
                }
            }).catch(err => console.log(err.response))
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
