<template>
<div>
    <v-container fluid class="custom-back">
        <v-row justify="center">
            <v-col cols="12" lg="8" md="12">
                <p class="title2 text-center">Top Earned Gallery</p>
                <v-list-item class="px-0" v-if="showcase != null">
                    <v-list-item-avatar tile size="160">
                        <v-img :src="showcase._id.image"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{showcase._id.gallery_name}}
                        </v-list-item-title>
                        <v-list-item class="px-0">
                            <v-list-item-avatar>
                                <v-img v-if="showcase._id.created_by.image_link" :src="showcase._id.created_by.image_link"></v-img>
                                <v-icon v-else>mdi-account</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <span v-if="showcase._id.created_by.name">{{showcase._id.created_by.name}}</span>
                                    <span v-else>{{showcase._id.created_by.wallet_address.slice(0,8)}}</span>

                                </v-list-item-title>
                                <v-list-item-subtitle v-if="showcase._id.created_by.username">
                                    {{showcase._id.created_by.username}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <small class="caption">Views: {{showcase._id.views}}</small>
                        <small class="caption">Total Items: {{showcase.nfts[0]}}</small>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
        </v-row>
        <v-row class="py-3">
            <v-col align="center">
                <p class="title2 white--text">Top 3 Gallaries</p>
                <v-simple-table class="simple" dark style="background-color: transparent">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">S.N.</th>
                                <th class="text-left">user</th>
                                <th class="text-left">Gallery</th>
                                <th class="text-left">Total Sol Earned</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item, i) in list" :key="i">
                                <td>{{ i + 1 }}</td>
                                <td>
                                    <v-list-item class="px-0" dense>
                                        <v-list-item-avatar class="mr-2">
                                            <v-img v-if="item._id.created_by.image_link" :src="item._id.created_by.image_link"></v-img>
                                            <v-icon v-else>mdi-account</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <span v-if="item._id.created_by.name">{{item._id.created_by.name}}</span>
                                                <span v-else>{{item._id.created_by.wallet_address.slice(0,8)}}</span>

                                            </v-list-item-title>
                                            <v-list-item-subtitle v-if="item._id.created_by.username">
                                                {{item._id.created_by.username}}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </td>
                                <td>{{item._id.gallery_name}}</td>
                                <td>{{item.earned}} Sol</td>
                            
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            showcase: null,
            list: []
        }
    },
    mounted() {
        this.getShowcase()
        this.getEarnedList()
    },
    methods: {
        getShowcase() {
            this.$axios.get('/gallery/top-earned/showcase?limit=3&page=1')
                .then(res => {
                    this.showcase = res.data.galleries[0]
                })
                .catch(err => console.log(err.response))
        },
        getEarnedList() {
            this.$axios.get('/gallery/top-earned/list?limit=3&page=1')
                .then(res => {
                    this.list = res.data.galleries
                    console.log('show:', this.list)
                })
                .catch(err => console.log(err.response))
        }
    }
}
</script>

<style lang="scss">
tbody {
    tr:hover {
        background-color: transparent !important;
    }
}

table {
    border: none
}

tr {
    border: none
}
</style>
