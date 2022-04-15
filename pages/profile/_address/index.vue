<template>
<div class="dark-bg">
    <ProfileMain />
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8" md="6">

                <v-tabs v-model="tab" background-color="#000229" color="white" dark icons-and-text slider-color="white">
                    <v-tabs-slider color="#000229"></v-tabs-slider>

                    <v-tab href="#tab-1" v-if="userAddress==walletAddress" class="text-capitalize" :to="'/profile/'+walletAddress+'/nfts'">
                        NFTs
                    </v-tab>

                    <v-tab href="#tab-2" class="text-capitalize" :to="'/profile/'+walletAddress+'/gallery'">
                        Collections
                    </v-tab>

                    <v-tab v-if="userAddress==walletAddress" href="#tab-2" class="text-capitalize" :to="'/profile/'+walletAddress+'/favourite'">
                        Favourites
                    </v-tab>
                    <v-tab v-if="userAddress==walletAddress" href="#tab-2" class="text-capitalize" :to="'/profile/'+walletAddress+'/earning-logs'">
                        Earning Logs
                    </v-tab>
                </v-tabs>
            </v-col>
            <v-btn class="btn-exhibit px-5 mt-8" @click="$router.push({name:'profile-address-exhibit',params:{'address':walletAddress}})">
                    Exhibit
                </v-btn>
        </v-row>
    </v-container>
    <NuxtChild />

</div>
</template>

<script>
export default {
    layout: 'user',
    data() {
        return {
            tab: 1
        }
    },
    computed: {
        userAddress(){
            return this.$route.params.address
        },
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        }
    },
    
}
</script>
<style lang="css">
    .v-tav--active{
        background-color: red !important;
  color: white !important;
    }
</style>
