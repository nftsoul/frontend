<template>
    <div>
        <v-container>
            <v-row no-gutters justify="end">
                <v-btn class="btn-exhibit mt-5 mx-auto mx-lg-0"
                    @click="$router.push('/profile/' + userAddress + '/create-mint-showcase')">
                    Create New Mintcase
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-row>
            <v-row justify="center" v-if="shows.length > 0">
                <v-col v-for="(item, i) in shows" :key="i" cols="12" lg="3" md="4" align="center">
                    <GalleryMintCard :mintId="item._id" :title="item.collection_name" :image="item.image"
                        :creator="item.user_id" date="2022-03-04" :mintPrice="item.price" />
                </v-col>
                <v-col cols="12" align="right">
                    <v-row justify="center" class=" justify-md-end">
                        <ReusableBorderGradientButton @click="$router.push('/all-mint-showcases')"
                            ButtonText="View All" />
                    </v-row>
                </v-col>
            </v-row>
            <v-row v-else justify="center">
                <client-only v-if="loaded == false">
                    <v-skeleton-loader v-for="(item, i) in 4" :key="i" class="mx-5" width="220" dark
                        type="card, article"></v-skeleton-loader>
                </client-only>
                <v-col cols="12" lg="6" md="8" v-else>
                    <p class="gradient-title text-h5 mt-16">NFTSOUL MINT SHOWCASE</p>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. </small>
                    <v-row no-gutters justify="center">
                        <v-btn class="btn-exhibit mt-5"
                            @click="$router.push('/profile/' + userAddress + '/create-mint-showcase')">
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
data() {
return {
shows: [],
loaded: false
}
},
computed: {
userAddress() {
return this.$route.params.address;
},
},
mounted() {
this.getMyShows()
},
methods: {
getMyShows() {
this.$axios
.get("/mint/list?page=1&limit=4")
.then((res) => {
this.shows = res.data.result
this.loaded = true
})
.catch((err) => console.log(err.response));
}
}
}
</script>
