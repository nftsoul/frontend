<template>
<div>
    <v-container style="height:500px;">
        <v-row justify="center">
            <v-col cols="12" lg="6" md="8">
                <p class="gradient-title text-h5 mt-16">NFTSOUL MINT SHOWCASE</p>
                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </small>
                <v-row no-gutters justify="center">
                    <v-btn class="btn-exhibit mt-5" @click="$router.push('/profile/'+userAddress+'/create-mint-showcase')">
                        Get Started
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    computed: {
        userAddress() {
            return this.$route.params.address;
        },
    }
}
</script>
