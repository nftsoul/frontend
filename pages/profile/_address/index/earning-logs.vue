<template>
<div class="dark-bg">
    <v-card min-height="500" flat color="transparent">
        <v-container>
            <v-row justify="center">
                <v-col cols="8">
                    <v-row v-if="earning.length>0" justify="center">
                        <v-col cols="12" lg="4" md="6" v-for="(item,i) in nfts" :key="i" align="center">
                            <v-card max-width="300" class="art-card" height="390" @click="$store.commit('content/setDetailDialog',true)">
                                <v-img :src="item.img" :lazy-src="item.img" width="270" height="240">
                                    <template v-slot:placeholder>
                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                                <v-card-text class="ml-n2 white--text text-left">{{item.title}}</v-card-text>
                                <p class="mx-2 mt-n2 desc-text text-left">
                                    {{item.content}}
                                </p>
                                <v-card-actions class="mt-n10">
                                    <v-spacer></v-spacer>
                                    <v-chip class="ma-2 mt-5" color="#030537">
                                        125
                                        <v-icon class="ml-3">mdi-eye</v-icon>
                                    </v-chip>
                                </v-card-actions>

                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row v-else justify="center">
                        <v-col v-if="loading==true" align="center">
                            <orbit-spinner class="ma-10" :animation-duration="1200" :size="55" color="#fff" />
                            <p>Loading your earning logs...</p>
                        </v-col>
                        <v-col v-else align="center">
                            <v-img :src="require('~/assets/images/sad.svg')" max-width="300"></v-img>
                            <p>Yo have no earnings yet...</p>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</div>
</template>
<script>
let OrbitSpinner=null
if (process.client) {
    OrbitSpinner = require('epic-spinners').OrbitSpinner
}
export default {
    components:{OrbitSpinner},
    data(){
        return{
            earning:[],
            loading:true
        }
    },
    mounted(){
        this.getEarnings()
    },
    methods:{
        getEarnings(){
            this.loading=false
        }
    }
}
</script>