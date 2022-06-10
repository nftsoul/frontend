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
                            <GalleryCard :galleryId="item.gallery_id._id" :title="item.gallery_id.gallery_name" :image="item.gallery_id.image" :nfts="item.gallery_id.nfts" :creator="item.gallery_id.created_by" :views="item.gallery_id.views" :favourites="item.gallery_id.favourites" />
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
        profile(){
            return this.$store.state.wallet.profile
        }
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
                    "/favourite/" +
                    this.profile._id
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
