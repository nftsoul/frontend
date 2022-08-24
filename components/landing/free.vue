<template>
    <div class="dark-bg">
        <v-container>
            <div class="enclose-border">
                <v-row justify="center">
                    <p class="title">Free Galleries</p>
                </v-row>
                <v-row justify="center" v-if="free.length > 0">
                    <v-col cols="12" align="center">
                        <client-only>
                            <VueSlickCarousel v-bind="slickSetting">
                                <div v-for="(item, i) in free" :key="i">
                                    <GalleryCard :galleryId="item._id" :title="item.gallery_name" :image="item.image"
                                        :nfts="item.nfts" :creator="item.created_by" :views="item.views"
                                        :favourites="item.favourites" />
                                </div>
                            </VueSlickCarousel>
                        </client-only>
                    </v-col>
                    <v-col cols="12" align="right">
                        <v-row justify="end">
                            <ReusableBorderGradientButton @click="$router.push('/free-galleries')"
                                ButtonText="View All" />
                        </v-row>
                    </v-col>
                </v-row>
                <v-row v-else justify="center">
                    <client-only>
                        <v-skeleton-loader v-for="(item, i) in 4" :key="i" class="mx-5" width="220" dark
                            type="card, article"></v-skeleton-loader>
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
            free: [],
        };
    },
    computed: {
        slickSetting() {
            return this.$store.state.plugins.slickSetting;
        },
    },
    mounted() {
        this.getCollections();
    },
    methods: {
        getCollections() {
            this.$axios
                .get("/gallery/free?page=1&limit=4")
                .then((res) => {
                    this.free = res.data.free;
                })
                .catch((err) => console.log(err.response));
        },
    },
};
</script>
