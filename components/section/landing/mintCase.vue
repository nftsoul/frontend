<template>
<div class="dark-bg">
    <v-container>
        <div class="enclose-border">
            <v-row justify="center">
                <p class="title">Mint Showcase</p>
            </v-row>
            <v-row justify="center" v-if="cases.length > 0">
                <v-col cols="12" align="center">
                    <client-only>
                        <VueSlickCarousel v-bind="slickSetting">
                            <div v-for="(item, i) in cases" :key="i">
                               <GalleryMintCard :mintId="item._id" :title="item.collection_name" :image="item.image" :creator="item.user_id" :date="item.date" :mintPrice="item.price" />
                            </div>
                        </VueSlickCarousel>
                    </client-only>
                </v-col>
                <v-col cols="12" align="right">
                    <v-row justify="end">
                        <div class="outer-btn" @click="$router.push('/all-mint-showcases')">
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
            cases: [],
        };
    },
    computed: {
        slickSetting() {
            return this.$store.state.plugins.slickSetting;
        },
    },
    mounted() {
        this.getMintCases();
    },
    methods: {
        getMintCases() {
            this.$axios
                .get("/mint/list?page=1&limit=4")
                .then((res) => {
                    this.cases=res.data.result
                })
                .catch((err) => console.log(err.response));
        },
    },
};
</script>
