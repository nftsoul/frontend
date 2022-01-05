<template>
<div class="profile-bg">
    <v-container>
        <v-row class="pt-16" justify="center">
            <v-col cols="6" align="end">
                <v-card flat>
                    <v-list style="background-color:transparent">
                        <v-list-item>
                            <v-list-item-avatar tile width="200" height="220">
                                <v-img :src="require('~/assets/images/profile.png')"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Masham Raymens
                                </v-list-item-title>
                                <small>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua.

                                </small>
                                <v-card-actions>
                                    <v-chip dark :color="chipColor" class="mr-2">
                                        Following  109
                                    </v-chip>
                                    <v-chip dark :color="chipColor">
                                        Following  116
                                    </v-chip>
                                </v-card-actions>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
                <v-btn class="btn-exhibit px-5" @click="$router.push({name:'profile-address-exhibit',params:{'address':walletAddress}})">
                    Exhibit
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    layout: 'user',
    data() {
        return {
            chipColor: 'rgba(160, 160, 160, 0.3)'
        }
    },
    computed:{
        walletAddress(){
            return this.$route.params.address
        }
    }
}
</script>

<style lang="css">
.profile-bg {
    background: linear-gradient(261.36deg, #C202D3 3.07%, #300253 64.08%, #16023C 82.04%, #000229 100%);
}

.profile-card {
    background-color: transparent !important;
}
.btn-exhibit{
background: linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%);

}
</style>
