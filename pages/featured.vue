<template>
<div class="dark-bg">
    <v-card :min-height="screenHeight()" flat color="transparent">
        <v-container class="py-16">
            <v-row justify="center" class="py-5">
                <div class="line-box mt-4"></div>
                <p class="title mx-3">Explore Nfts</p>
                <div class="line-box mt-4"></div>
            </v-row>
            <v-row no-gutters>
                <v-btn dark color="primary mx-2" large>
                    All
                </v-btn>
                <v-btn dark color="primary mx-2" large>
                    Art
                </v-btn>
                <v-btn dark color="primary mx-2" large>
                    Music
                </v-btn>
                <v-btn dark color="primary mx-2" large>
                    Sports
                </v-btn>
                <v-btn dark color="primary mx-2" large>
                    Collectibles
                </v-btn>
                <v-text-field placeholder="Search" class="mx-2" height="30" solo dark background-color="primary" color="white" append-icon="mdi-cloud-search"></v-text-field>

                <v-menu transition="slide-y-transition" bottom offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark v-bind="attrs" v-on="on" large class="mx-2">
                            Sort by
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list width="200" style="background-color:#636262">
                        <div v-for="(item, i) in items" :key="i">
                            <v-list-item>
                                <v-list-item-title>{{ item.title }}</v-list-item-title><br><br>
                            </v-list-item>
                            <v-divider v-if="items.length-items.indexOf(item)>1"></v-divider>
                        </div>
                    </v-list>
                </v-menu>

            </v-row>
            <v-row v-if="nfts.length == 0" justify="center">
                <v-col align="center" v-for="(item,i) in 8" :key="i">
                    <v-skeleton-loader class="mx-5" width="220" dark type="card, article"></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12" lg="3" md="6" v-for="(item, i) in nfts" :key="i" align="center">
                    <GalleryCard :galleryId="item._id" :title="item.gallery_name" :image="item.image" :nfts="item.nfts" :creator="item.created_by" :views="item.views" :favourites="item.favourites" />
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-pagination v-model="page" dark :length="pages" prev-icon="mdi-menu-left" next-icon="mdi-menu-right" :total-visible="10" @input="input" class="my-5"></v-pagination>
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
            items: [{
                    title: 'Latest'
                },
                {
                    title: 'Newest'
                },
                {
                    title: 'Popular'
                },
                {
                    title: 'High to Low'
                },
                {
                    title: 'Low to High'
                },
                {
                    title: 'Oldest'
                },
            ],
        };
    },
    mounted() {
        this.getPopularNfts();
        this.getTopCollections()
    },
    methods: {
        screenHeight() {
            if (process.client) {
                return window.innerHeight;

            } else {
                return 900;
            }
        },
        getTopCollections(){
            this.$axios.get('/top/collections/')
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
