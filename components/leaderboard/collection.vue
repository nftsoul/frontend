<template>
<div>
    <v-container>
        <v-row justify="center">
            <p class="title2 text-center my-3">Top 3 Collection</p>
        </v-row>
        <v-row justify="center" v-if="collections.length>0">
            <v-col cols="12" lg="4" md="6" v-for="(item,i) in collections" :key="i" align="center">
                <div class="outer-btn div1" :class="setMargin(i)">
                    <div class="inner-btn div2">
                        <v-avatar size="60" class="mt-n16">
                            <v-img :src="item.image"></v-img>
                        </v-avatar>
                        <p class="item-overlap">{{item._id}}</p>
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
                    let top = []
                    if (responses.length == 3) {
                        top[0] = responses[1]
                        top[1] = responses[0]
                        top[2] = responses[2]
                    } else if (responses.length == 2) {
                        top[0] = responses[1]
                        top[1] = responses[0]
                    } else {
                        top = responses
                    }
                    this.collections = top

                })
                .catch(err => console.log(err.response))
        },
        setMargin(i) {
            if (i != 1) {
                return 'mt-lg-8 mt-md-8'
            }
        },
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
.item-overlap{
     width: 150px;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
}
</style>
