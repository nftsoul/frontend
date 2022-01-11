<template>
<div class="dark-bg">
    <ProfileMain />
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8" md="6">

                <v-tabs v-model="tab" background-color="#000229" color="white" dark icons-and-text slider-color="white">
                    <v-tabs-slider color="#000229"></v-tabs-slider>

                    <v-tab href="#tab-1" class="text-capitalize" :to="'/profile/'+walletAddress+'/nfts'">
                        My NFTs
                    </v-tab>

                    <v-tab href="#tab-2" class="text-capitalize" :to="'/profile/'+walletAddress+'/gallery'">
                        Collections
                    </v-tab>
                </v-tabs>
            </v-col>
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
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        }
    },
    mounted(){
        this.seeNft()
    },
    methods: {
        seeNft() {
            this.$router.push({
                name: 'profile-address-index-nfts',
                params: {
                    address: this.walletAddress
                }
            })
        },
        seeGallery() {
            this.$router.push({
                name: 'profile-address-index-gallery',
                params: {
                    address: this.walletAddress
                }
            })
        }
    }
}
</script>
<style lang="css">
    .v-tav--active{
        background-color: red !important;
  color: white !important;
    }
</style>
