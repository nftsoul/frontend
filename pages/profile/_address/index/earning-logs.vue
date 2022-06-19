<template>
<div class="dark-bg">
    <v-card :min-height="screenHeight()" flat color="transparent">
        <v-container>
            <v-row justify="center">
                <v-col cols="10">
                    <v-row v-if="earning.length > 0" justify="center">
                        <div class="earn-box">
                            <v-simple-table dark style="background-color: #030537">
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">S.N.</th>
                                            <th class="text-left">Product</th>
                                            <th class="text-left">Price</th>
                                            <th class="text-left">Date & Time</th>
                                            <th class="text-left">User</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, i) in earning" :key="i">
                                            <td>{{ i + 1 }}</td>
                                            <td>{{ item.gallery_id.gallery_name }}</td>
                                            <td>{{ item.price }}</td>
                                            <td>
                                                {{
                            moment
                              .utc(item.datetime)
                              .format("MMMM Do YYYY, h:mm:ss a")
                          }}
                                            </td>
                                            <td>{{ item.user_id }}</td>

                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </div>
                    </v-row>
                    <v-row v-else justify="center">
                        <v-col v-if="loading == true" align="center">
                            <div class="spinner-box my-16">
                                <client-only>
                                    <spinner :animation-duration="1200" :size="55" color="#fff" />
                                </client-only>
                            </div>
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
import moment from "moment";
let OrbitSpinner = null;
if (process.client) {
    OrbitSpinner = require("epic-spinners").OrbitSpinner;
}
export default {
    components: {
        OrbitSpinner
    },
    data() {
        return {
            moment: moment,
            earning: [],
            loading: true,
            withdrawing: false
        };
    },
    computed: {
        walletAddress() {
            return this.$route.params.address
        },
    },
    mounted() {
        this.getEarnings()
    },
    methods: {
        screenHeight() {
            return window.innerHeight - 350;
        },
        getEarnings() {
            this.$axios
                .get( "/profile/earnings/"+this.$auth.user._id)
                .then((res) => {
                    this.earning = res.data;
                    this.loading = false;
                })
                .catch((err) => console.log(err.response));
        },
    },
};
</script>

<style lang="scss">
.earn-box {
    padding: 1px;
    border-radius: 5px;
    background: linear-gradient(265.07deg,
            #4a04d8 3.26%,
            #5e0fff 31.76%,
            #fd2bff 70.6%,
            #c202d3 97.81%);
}
</style>
