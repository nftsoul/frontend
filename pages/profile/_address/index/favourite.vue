<template>
<div>
    <v-card :min-height="screenHeight()" flat color="transparent">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" lg="8" md="6">
                    <v-row v-if="collections.length == 0" justify="center">
                        <v-col v-if="!noData" align="center">
                            <div class="spinner-box my-16">
                                <client-only>
                                    <spinner :animation-duration="1200" :size="55" color="#fff" />
                                </client-only>
                            </div>
                            <p>Loading your Collections...</p>
                        </v-col>
                        <v-col v-else align="center">
                            <v-img :src="require('~/assets/images/sad.svg')" max-width="300"></v-img>
                            <p>You do not have any favourite collection</p>
                            <v-btn @click="$router.push({ path: '/featured' })" class="btn-exhibit">Explore Now</v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="12" lg="4" md="6" v-for="(item, i) in collections" :key="i" align="center">
                            <GalleryCard :galleryId="item._id" :title="item.gallery_name" :image="item.image" :nfts="item.nfts" :creator="item.created_by" :views="item.views" :favourites="item.favourites" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            collections: [],
            noData: false,
        };
    },
    computed: {
        walletAddress() {
            return this.$route.params.address
        },
    },
    mounted() {
        this.getCollections();
    },
    methods: {
        screenHeight() {
            return window.innerHeight - 350;
        },
        getCollections() {
            this.$axios
                .get(
                    "/get-favourite/" +
                    this.walletAddress
                )
                .then((res) => {
                    this.collections = res.data

                    if (res.data.length == 0) {
                        this.noData = true;
                    }
                })
                .catch((err) => console.log(err.response));
        },
        
    },
};
</script>
