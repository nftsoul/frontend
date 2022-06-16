<template>
<div>
    <v-container>

            <v-row justify="center">
                <p class="title2 text-center">Top 3 Collection</p>
            </v-row>
            <v-row>
                <v-col cols="12" lg="4" md="6" v-for="(item,i) in 3" :key="i" align="center" class="pt-10">
                    <div class="outer-btn div1">
                        <div class="inner-btn div2">
                            <v-avatar size="60" class="mt-n16">
                                <v-img :src="require('~/assets/images/featured/fa3.png')"></v-img>
                            </v-avatar>
                            <p>Baby Boogle</p>
                            <div class="caption">

                            
                            <v-row justify="space-between" class="px-4">
                                <small>Total Nfts</small>
                                <small>1.2k</small>
                            </v-row>
                            <v-row justify="space-between" class="px-4">
                                <small>Total Views</small>
                                <small>12.5k</small>
                            </v-row>
                            <v-row justify="space-between" class="px-4">
                                <small>Galaries created</small>
                                <small>100</small>
                            </v-row>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
    </v-container>
</div>
</template>

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
