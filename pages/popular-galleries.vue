<template>
<div class="dark-bg">
    <v-card :min-height="screenHeight()" flat color="transparent">
        <v-container class="py-16">
            <v-row class="py-16" justify="center">
                <v-col cols="12" lg="12" md="8" align="center">
                    <v-row justify="center">
                        <p class="title">Popular Galleries</p>
                    </v-row>
                    <v-row v-if="nfts.length == 0" justify="center">
                        <v-col align="center" v-for="(item,i) in 8" :key="i">
                                <v-skeleton-loader  class="mx-5" width="220" dark type="card, article"></v-skeleton-loader>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="12" lg="3" md="6" v-for="(item, i) in nfts" :key="i" align="center">
                            <v-card color="transparent" flat class="pa-5" max-width="300" height="470" @click="$router.push({name:'preview-id',params:{id:item._id}})">
                                <div class="outer-card">
                                    <div class="inner-card">
                                        <v-img :src="item.image" class="mx-auto" width="220" height="220"></v-img>

                                        <v-card class="rounded-pill mt-n6" max-width="150" style="">
                                            <v-list dense class="py-1">
                                                <v-list-item dense class="pa-0">
                                                   <v-list-item-avatar class="my-0 ml-2">
                                                            <v-img v-if="item.created_by.image_link" :src="item.created_by.image_link"></v-img>
                                                            <v-icon v-else>mdi-account-tie</v-icon>
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title class="ml-n2" v-if="item.created_by.name">{{item.created_by.name.slice(0,10)}}</v-list-item-title>
                                                            <v-list-item-title class="ml-n2" v-else>{{item.user_id.slice(0, 5)}}</v-list-item-title>
                                                        </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </v-card>
                                            <v-card-subtitle class="text-left mx-n3">{{item.gallery_name.slice(0,28)}}<span v-if="item.gallery_name.length>27">..</span></v-card-subtitle>

                                       <v-row>
                                            <div class="prem-sup-card rounded-lg px-2" v-for="(nft, i) in item.nfts.slice(0,4)" :key="i">
                                                <small v-if="nft.name.length>10">{{ nft.name.slice(0,10) }}..</small>
                                                <small v-else>{{ nft.name }}</small>
                                            </div>
                                        </v-row>

                                        <br>

                                        <v-col class="pa-0">
                                            <v-divider class="mb-1"></v-divider>
                                            <v-row no-gutters>
                                                <small class="mr-1">{{item.views}}</small>
                                                <v-icon small>mdi-eye</v-icon>
                                                <v-spacer></v-spacer>
                                                <small class="mr-1">{{item.favourites}}</small>
                                                <v-icon small>mdi-heart-outline</v-icon>
                                            </v-row>

                                        </v-col>
                                    </div>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-pagination v-model="page" dark :length="pages" prev-icon="mdi-menu-left" next-icon="mdi-menu-right" :total-visible="10" @input="input" class="my-5"></v-pagination>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</div>
</template>

<script>
let OrbitSpinner = null;
if (process.client) {
    OrbitSpinner = require("epic-spinners").OrbitSpinner;
}
export default {
    components: {
        OrbitSpinner
    },
    data() {
        return {
            nfts: [],
            page: 1,
            limit: 15,
            total: 0,
            pages: 1,
            page:1
        };
    },
    mounted() {
        this.getPopularNfts();
    },
    methods: {
        screenHeight() {
            return window.innerHeight;
        },
        getPopularNfts() {
            this.$axios
                .get(
                    "/trending?page="+this.page+"&limit=2")
                .then((res) => {
                    this.total = res.data.galleryCount
                    if (this.total % 20 == 0) {
                        this.page = this.total / 20
                    } else {
                        this.pages = Math.floor(this.total / 20)+1
                    }
                    this.nfts = res.data.trending_galleries
                })
                .catch((err) => console.log(err.response));
        },
        input(e) {
            this.page = e;
            this.getPopularNfts();
        },
    },
};
</script>
