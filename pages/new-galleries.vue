<template>
<div class="dark-bg">
    <client-only>
    <v-card :min-height="$store.dispatch('utility/screenHeight')" flat color="transparent">
        <v-container class="py-16">
            <v-row class="py-16" justify="center">
                <v-col cols="12" lg="12" md="8" align="center">
                    <v-row justify="end">
                        <v-col cols="12" lg="6" md="8" align="center">
                            <p class="title">New Galleries</p>
                        </v-col>
                        <v-col cols="12" lg="3" md="4">
                            <FormSearchField v-model="search" />
                        </v-col>
                    </v-row>
                    <v-row v-if="nfts.length == 0" justify="center">
                        <v-row v-if="loading==true">
                            <v-col align="center" cols="12" lg="3" md="4" v-for="(item,i) in 8" :key="i">
                                <v-skeleton-loader class="mx-5" width="220" dark type="card, article"></v-skeleton-loader>
                            </v-col>
                        </v-row>

                        <v-col align="center" v-else>
                            <p>No Gallery Found</p>
                        </v-col>
                    </v-row>
                    <div v-else>
                        <v-row>
                            <v-col cols="12" lg="3" md="6" v-for="(item, i) in nfts" :key="i" align="center">
                                <GalleryCard :galleryId="item._id" :title="item.gallery_name" :image="item.image" :nfts="item.nfts" :creator="item.created_by" :views="item.views" :favourites="item.favourites" />
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col align="center">
                                <v-pagination v-model="page" dark :length="pages" prev-icon="mdi-menu-left" next-icon="mdi-menu-right" :total-visible="10" @input="input" class="my-5"></v-pagination>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
    </client-only>
</div>
</template>

<script>
export default {
    data() {
        return {
            nfts: [],
            page: 1,
            limit: 20,
            total: 0,
            loading: true,
            pages: 1,
            search: ''
        };
    },
    mounted() {
        this.getFreeNfts();
    },
    watch: {
        search() {
            this.nfts=[]
                this.loading = true
                this.searchGallery()
            
        }
    },
    methods: {
        async searchGallery() {
            let searched = await this.$store.dispatch('utility/searchGallery', {
                'q': this.search,
                sort: 'newest'
            })
            this.nfts = searched
            this.loading = false

        },
    
        getFreeNfts() {
            this.$axios
                .get(
                    "/gallery/new?page=" +
                    this.page +
                    "&limit=" +
                    this.limit
                )
                .then((res) => {
                    this.total = res.data.total
                    if (this.total % 20 == 0) {
                        this.page = this.total / 20
                    } else {
                        this.pages = Math.floor(this.total / 20) + 1
                    }
                    this.nfts = res.data.galleries;
                    this.loading = false;
                })
                .catch((err) => console.log(err.response));
        },
        input(e) {
            this.page = e;
            this.getFreeNfts();
        },
    },
};
</script>
