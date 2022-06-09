<template>
<div>
    <v-card color="transparent" flat class="pa-5" max-width="300" height="470" @click="$router.push({name:'preview-id',params:{id:galleryId}})">
        <div class="outer-card">
            <div class="inner-card">
                <v-img :src="image" :lazy-src="image" class="mx-auto" width="220" height="220">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>

                <v-card class="rounded-pill mt-n6" max-width="150">
                    <v-list dense class="py-1">
                        <v-list-item dense class="pa-0">
                            <v-list-item-avatar class="my-0 ml-2">
                                <v-img v-if="creator.image_link" :src="creator.image_link"></v-img>
                                <v-icon v-else>mdi-account-tie</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="ml-n2" v-if="creator.name">{{creator.name.slice(0,10)}}</v-list-item-title>
                                <v-list-item-title class="ml-n2" v-else>{{creator.wallet_address.slice(0, 5)}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
                <v-card-subtitle class="text-left mx-n3">{{title.slice(0,20)}}<span v-if="title.length>20">..</span></v-card-subtitle>
                <v-row>
                    <div class="prem-sup-card rounded-lg px-2" v-for="(nft, i) in nfts.slice(0,4)" :key="i">
                        <small v-if="nft.name.length>8">{{ nft.name.slice(0,8) }}..</small>
                        <small v-else>{{ nft.name }}</small>
                    </div>
                </v-row>

                <br>

                <v-col class="pa-0">
                    <v-divider class="mb-1"></v-divider>
                    <v-row no-gutters>
                        <small class="mr-1">{{views}}</small>
                        <v-icon small>mdi-eye</v-icon>
                        <v-spacer></v-spacer>
                        <small class="mr-1">{{favourites}}</small>
                        <v-icon small>mdi-heart-outline</v-icon>
                    </v-row>

                </v-col>
            </div>
        </div>
    </v-card>
</div>
</template>

<script>
export default {
    props: {
        galleryId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        nfts: {
            type: Array,
            required: true
        },
        creator: {
            type: Object,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        favourites: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        console.log('creator:', this.creator)
    }
}
</script>
