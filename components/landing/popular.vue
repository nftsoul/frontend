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
                    <p class="title">Popular Galleries</p>
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
                            <GalleryCard :galleryId="item._id" :title="item.gallery_name" :image="item.image" :nfts="item.nfts" :creator="item.created_by" :views="item.views" :favourites="item.favourites" />
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
            this.popular=[]
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
                .get('/gallery/trending?page=1&limit=4', {
                    query: item
                })
                .then((res) => {
                    for(var x=0;x<res.data.trending_galleries.length;x++){
                        if(res.data.trending_galleries[x] != null){
                            this.popular.push(res.data.trending_galleries[x])
                        }
                    }
                })
                .catch((err) => console.log(err.response));
        },
    },
};
</script>
