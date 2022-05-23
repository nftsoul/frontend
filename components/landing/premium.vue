<template>
<div class="dark-bg">
    <v-container>
        <div class="enclose-border">
            <v-row justify="center">
                <p class="title">Premium Galleries</p>
            </v-row>
            <v-row v-if="premium.length > 0">
                <v-col cols="12" align="center">
                    <client-only>
                        <VueSlickCarousel v-bind="slickSetting">
                            <div v-for="(item, i) in premium" :key="i">
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
                                            <v-card-subtitle class="text-left">{{
                          item.gallery_name
                        }}</v-card-subtitle>
                                            <v-row>
                                                <div class="prem-sup-card rounded-lg" v-for="(nft, i) in item.nfts" :key="i">
                                                    <span v-if="i < 4">{{ nft.name }}</span>
                                                </div>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-card>
                            </div>
                        </VueSlickCarousel>
                    </client-only>
                </v-col>
                <v-col cols="12" align="right">
                    <v-row justify="end">
                        <div class="outer-btn" @click="$router.push('/premium-galleries')">
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
            premium: [],
        };
    },
    computed: {
        slickSetting() {
            return this.$store.state.plugins.slickSetting;
        },
    },
    mounted() {
        this.getPremium();
    },
    methods: {
        getPremium() {
            this.$axios
                .get("/all-premium?page=1&limit=4")
                .then((res) => {
                    this.premium = res.data.premium
                })
                .catch((err) => console.log(err.response))
        },
    },
};
</script>
