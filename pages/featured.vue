<template>
    <div class="dark-bg">
        <v-card :min-height="screenHeight()" flat color="transparent">
            <v-container class="py-16">
                <v-row justify="center" class="py-5">
                    <div class="line-box mt-4"></div>
                    <p class="title mx-3">Explore Nfts</p>
                    <div class="line-box mt-4"></div>
                </v-row>
                <v-row no-gutters class="justify-center">
                    <v-btn value="all" class="mx-2 mb-6 mb-sm-0" dark color="primary" @click="getPopularNfts()"
                        elevation="10">
                        All
                    </v-btn>

                    <v-btn v-for="(item, i) in collections" :key="i" class="mx-2 mb-6 mb-sm-0" color="primary"
                        :value="item._id" @click="searchSortGallery({ 'q': item._id, sort: 'popular' })">
                        {{ item._id }}
                    </v-btn>

                    <v-spacer class="d-none d-md-block"></v-spacer>

                    <FormSearchField v-model="search" />

                    <v-menu transition="slide-y-transition" bottom offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark v-bind="attrs" v-on="on" large class="mx-2">
                                {{ sortText }}
                                <v-icon>mdi-chevron-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list width="200" style="background-color:#636262">
                            <div v-for="(item, i) in items" :key="i">
                                <v-list-item v-if="item.title != sortText" @click="searchSortGallery(item)">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title><br><br>
                                </v-list-item>
                                <v-divider v-if="items.length - items.indexOf(item) > 1"></v-divider>
                            </div>
                        </v-list>
                    </v-menu>

                </v-row>
                <v-row v-if="nfts.length == 0" justify="center">
                    <v-col align="center" v-for="(item, i) in 8" :key="i">
                        <v-skeleton-loader class="mx-5" width="220" dark type="card, article"></v-skeleton-loader>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col cols="12" lg="3" md="6" v-for="(item, i) in nfts" :key="i" align="center">
                        <GalleryCard :galleryId="item._id" :title="item.gallery_name" :image="item.image"
                            :nfts="item.nfts" :creator="item.created_by" :views="item.views"
                            :favourites="item.favourites" />
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-pagination v-model="page" dark :length="pages" prev-icon="mdi-menu-left"
                        next-icon="mdi-menu-right" :total-visible="10" @input="input" class="my-5"></v-pagination>
                </v-row>
            </v-container>
        </v-card>
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
            pages: 1,
            page: 1,
            collections: [],
            text: 'all',
            search: '',
            sortText: 'Sort By',
            items: [
                {
                    title: 'Newest',
                    sort: 'newest'
                },
                {
                    title: 'Popular',
                    sort: 'popular'
                },
                {
                    title: 'High to Low',
                    sort: 'pricehl'
                },
                {
                    title: 'Low to High',
                    sort: 'pricelh'
                },
                {
                    title: 'Oldest',
                    sort: 'oldest'
                },
            ],
        };
    },
    mounted() {
        this.getPopularNfts();
        this.getTopCollections()
    },
    watch: {
        search() {
            this.searchSortGallery({ 'q': this.search, sort: 'popular' })
        }
    },
    methods: {
        screenHeight() {
            if (process.client) {
                return window.innerHeight;

            } else {
                return 900;
            }
        },
        async searchSortGallery(item) {
            this.sortText = item.title
            this.nfts = []
            let searched = await this.$store.dispatch('utility/searchGallery', {
                'q': this.search,
                sort: item.sort
            })
            this.nfts = searched
        },
        getTopCollections() {
            this.$axios.get('/collection/top-three')
                .then(res => this.collections = res.data.topThreeCollections)
        },
        getPopularNfts() {
            this.$axios
                .get(
                    "/gallery/trending?page=" + this.page + "&limit=" + this.limit, {
                    query: '7days'
                })
                .then((res) => {
                    this.total = res.data.total
                    if (this.total % 20 == 0) {
                        this.page = this.total / 20
                    } else {
                        this.pages = Math.floor(this.total / 20) + 1
                    }

                    for (var x = 0; x < res.data.trending.length; x++) {
                        if (res.data.trending[x] != null) {
                            let data = res.data.trending[x]._id
                            data['views'] = res.data.trending[x].views
                            this.nfts.push(data)
                        }
                    }
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
