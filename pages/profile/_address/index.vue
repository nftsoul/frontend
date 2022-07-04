<template>
<div class="dark-bg">
    <ProfileMain />
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8" md="6">

                <v-tabs v-model="tab" background-color="#000229" tile color="purple" group v-if="profile">
                    <v-tabs-slider color="#000229"></v-tabs-slider>

                    <v-tab href="#tab-1" v-if="walletAddress == profile.wallet_address" class="text-capitalize" :to="'/profile/'+userAddress+'/nfts'">
                        NFTs
                    </v-tab>

                    <v-tab href="#tab-2" class="text-capitalize" :to="'/profile/'+userAddress+'/gallery'">
                        Galleries
                    </v-tab>

                    <v-tab v-if="walletAddress == profile.wallet_address" href="#tab-2" class="text-capitalize" :to="'/profile/'+userAddress+'/favourite'">
                        Favourites
                    </v-tab>
                    <v-tab v-if="walletAddress == profile.wallet_address" href="#tab-2" class="text-capitalize" :to="'/profile/'+userAddress+'/earning-logs'">
                        Earning Logs
                    </v-tab>
                </v-tabs>
            </v-col>
            <v-btn class="btn-exhibit px-5 mt-8" v-if="creating==false" @click="$router.push({name:'profile-address-index-exhibit',params:{'address':userAddress}})">
                Create Gallery
            </v-btn>
        </v-row>
    </v-container>
    <NuxtChild />

</div>
</template>

<script>
export default {
    layout: 'user',
    middleware:'auth',
    data() {
        return {
            tab: 1
        }
    },
    computed: {
        userAddress() {
            return this.$route.params.address
        },
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        },
        creating() {
            return this.$store.state.nft.creating
        },
        profile(){
            return this.$store.state.wallet.profile
        }
    },

}
</script>

<style lang="css">
.v-tav--active {
    background-color: red !important;
    color: white !important;
}
</style>
