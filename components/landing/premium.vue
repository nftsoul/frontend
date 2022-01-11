<template>
<div class="dark-bg">
    <v-container>
        <div class="enclose-border">
            <div class="row">
                <v-col cols="12" align="center">
                    <p class="title">Premium Collections</p>
                   <client-only v-if="premium.length>0">
                        <VueSlickCarousel v-bind="slickSetting">
                            <div v-for="(item,i) in premium" :key="i">
                                <v-card color="transparent" flat class="pa-5" max-width="300" @click="seePremium()">
                                    <div class="outer-card">
                                        <div class="inner-card">
                                            <v-img :src="getImg(item)" class="mx-auto" width="220" height="220"></v-img>

                                            <v-card class="rounded-pill mt-n6" max-width="150" style="">
                                                <v-list dense class="py-1">
                                                    <v-list-item dense class="pa-0">
                                                        <v-list-item-avatar class="my-0 ml-2">
                                                            <v-img :src="require('~/assets/images/1.png')"></v-img>
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title class="ml-n2">{{item.user_id.slice(0,5)}}</v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                            <v-card-subtitle class="text-left">{{item.gallery_name}}</v-card-subtitle>
                                            <v-row>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko Kingdom</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Cat Series</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Neko</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Stone Tail</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Eye</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Bunny Ear</span>
                                                </div>
                                                <div class="prem-sup-card rounded-lg">
                                                    <span>Triple Horn</span>
                                                </div>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-card>
                            </div>
                        </VueSlickCarousel>
                    </client-only>
                </v-col>
            </div>
        </div>
    </v-container>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            premium:[]
        }
    },
    computed: {
        slickSetting() {
            return this.$store.state.plugins.slickSetting
        }
    },
    mounted(){
        this.getPremium()
    },
    methods:{
        seePremium(){
            this.$router.push({
                name:'preview',
            })
        },
        getPremium(){
            axios.get('https://nft-soul.herokuapp.com/api/get-gallery')
            .then(res=>{
                this.premium=res.data.premium
            })
            .catch(err=>console.log(err.response))
        },
        getImg(item){
            return this.$cloudinary.image.url(
                item.image, {
                    gravity: 'auto:subject',
                }
            )
        }
    }
}
</script>

<style lang="css">
.theme--dark.v-list {
    background-color: #030537 !important;
    box-shadow: 2px 2px 4px 0px #C202D380 inset !important;
    box-shadow: -2px -2px 4px 0px #C202D380 inset !important;
}

.prem-sup-card {
    width: fit-content;
    background: linear-gradient(261.36deg, #C202D3 3.07%, #300253 64.08%, #16023C 82.04%, #000229 100%);
    margin: 5px;
}

.prem-sup-card span {
    padding: 0 10px;
    font-size: 12px;
}
</style>
