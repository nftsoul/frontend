<template>
<div class="dark-bg">
    <v-container>
        <v-row justify="center" class="py-5">
            <div class="line-box mt-3"></div>
            <p class="grand-title-text mx-3">Our Top Galleries</p>
            <div class="line-box mt-3"></div>
        </v-row>

        <div class="enclose-border">
            <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-col cols="12" lg="4" md="6" align="center">
                    <p class="title">Popular Collections</p>
                </v-col>
                <v-col cols="12" lg="4" md="6">
                    <v-row no-gutters>

                        <small class="float-left mt-2">In Last:</small>
                        <v-btn-toggle v-model="duration" dense tile group dark color="#FE87FF">
                            <v-btn small value="one">
                                <small>24 Hours</small>
                            </v-btn>

                            <v-btn small value="seven">
                                <small>7 Days</small>
                            </v-btn>

                            <v-btn small value="thirty">
                                <small>30 Days</small>
                            </v-btn>

                            <v-btn small value="all">
                                <small>All Time</small>
                            </v-btn>
                        </v-btn-toggle>
                    </v-row>
                </v-col>
            </v-row>

            <v-row justify="center" v-if="popular.length > 0">
                <v-col cols="12" align="center">
                    <client-only>
                        <VueSlickCarousel v-bind="slickSetting">
                            <div v-for="(item, i) in popular" :key="i">
                                <v-card color="transparent" flat class="pa-5" max-width="300" height="470" @click="$router.push({name:'preview-id',params:{id:item._id}})">
                                    <div class="outer-card">
                                        <div class="inner-card ">
                                            <v-img :src="item.image" class="mx-auto" width="220" height="220"></v-img>

                                            <v-card class="rounded-pill mt-n6" max-width="150">
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
                                            <v-card-subtitle class="text-left">{{item.gallery_name.slice(0,20)}}<span v-if="item.gallery_name.length>20">....</span></v-card-subtitle>
                                            <v-row>
                                                <div class="prem-sup-card rounded-lg" v-for="(nft, i) in item.nfts" :key="i">
                                                    <span v-if="i < 4">{{ nft.name }}</span>
                                                </div>
                                            </v-row>
                                            <br>

                                            <v-col class="pa-0">
                                                <v-divider class="mb-1"></v-divider>
                                                <v-row no-gutters>
                                                    <small class="mr-1">25</small>
                                                    <v-icon small>mdi-eye</v-icon>
                                                    <v-spacer></v-spacer>
                                                    <small class="mr-1">40</small>
                                                    <v-icon small>mdi-heart-outline</v-icon>
                                                </v-row>

                                            </v-col>

                                        </div>
                                    </div>
                                </v-card>
                            </div>
                        </VueSlickCarousel>
                    </client-only>
                </v-col>
                <v-col cols="12" align="right">
                    <v-row justify="end">
                        <div class="outer-btn" @click="$router.push('/popular-galleries')">
                            <div class="inner-btn">
                                <p class="mt-n1 mr-3" style="font-size: 14px">View All</p>
                            </div>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
            <v-row v-else justify="center">
                <client-only>
                    <v-skeleton-loader v-for="(item,i) in 4" :key="i" class="mx-5" width="220" dark type="card, article"></v-skeleton-loader>
                </client-only>
            </v-row>
        </div>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            trending: [],
            popular: [],
            duration: 'one',
        };
    },
    computed: {
        slickSetting() {
            return this.$store.state.plugins.slickSetting;
        },
    },
    watch: {
        duration() {
            if (this.duration == 'one') {
                this.getCollections('24hrs')
            } else if (this.duration == 'seven') {
                this.getCollections('7days')
            } else if (this.duration == 'thirty') {
                this.getCollections('30days')
            } else {
                this.getCollections()
            }
        }
    },
    mounted() {
        this.getCollections('24hrs');
    },
    methods: {
        getCollections(item) {
            this.$axios
                .get('/all-trending?page=1&limit=4', {
                    query: item
                })
                .then((res) => {
                    this.popular = res.data.trending
                })
                .catch((err) => console.log(err.response));
        },
    },
};
</script>
