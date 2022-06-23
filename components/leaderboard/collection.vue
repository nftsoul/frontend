<template>
<div>
    <v-container>
        <v-row justify="center">
            <p class="title2 text-center mt-3">Top 3 Collection</p>
        </v-row>
        <v-row v-if="collections.length>0">
            <v-col cols="12" lg="4" md="6" v-for="(item,i) in collections" :key="i" align="center">
                <div class="outer-btn div1" :class="setMargin(i)">
                    <div class="inner-btn div2">
                        <v-badge bordered color="primary" :content="getRank(i)"></v-badge>

                        <!-- <v-avatar size="60" class="mt-n16">
                            <v-img :src="require('~/assets/images/featured/fa3.png')"></v-img>
                        </v-avatar> -->
                        <p>{{item._id}}</p>
                        <div class="caption">

                            <v-row justify="space-between" class="px-4">
                                <small>Total Nfts</small>
                                <small>{{item.collections}}</small>
                            </v-row>
                            <v-row justify="space-between" class="px-4">
                                <small>Total Views</small>
                                <small>{{item.views}}</small>
                            </v-row>
                            <v-row justify="space-between" class="px-4">
                                <small>Galaries created</small>
                                <small>{{item.galleries}}</small>
                            </v-row>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12" lg="4" md="6" v-for="(item,i) in 3" :key="i" align="center">
                <v-skeleton-loader class="mx-auto" :class="setMargin(i)" height="150" max-width="300" type="card"></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            collections: []
        }
    },
    mounted() {
        this.getCollections()
    },
    methods: {
        getCollections() {
            this.$axios.get('/collection/top-three')
                .then(res => {
                    let responses = res.data.topThreeCollections
                    let top = responses[0]
                    responses.splice(0, 1)
                    responses[1] = top
                    this.collections = responses
                })
                .catch(err => console.log(err.response))
        },
        setMargin(i) {
            if (i != 1) {
                return 'mt-lg-8 mt-md-8'
            }
        },
        getRank(i) {
            if (i == 0) {
                return '2'
            } else if (i == 1) {
                return '1'
            } else if (i == 2) {
                return '3'
            }
        }
    }
}
</script>

<style>
.div1 {
    width: 170px;
    height: 130px;
}

.div2 {
    width: 168px;
    height: 128px;
}
</style>
