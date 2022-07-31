<template>
<div class="py-16 dark-bg">
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8" md="8" align="center">
                <p class="title">Mint Showcase</p>
                <v-card color="#030537" width="500" height="300"></v-card>
                <div class="enclose-border">
                    <v-row>
                        <v-col cols="3" v-for="(item,i) in 4" :key="i">
                            <v-img :src="require('assets/images/featured/f1.png')" max-width="150"></v-img>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <h4 class="theme-color mb-3">About this collection</h4>
                            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </small>
                        </v-col>
                    </v-row>
                    <v-row class="mt-8">
                        <v-card tile color="#1905DA" class="mr-5">
                            <v-icon color="#1DA1F2">mdi-twitter</v-icon>
                        </v-card>
                        <small>Mint Date <span class="theme-color mr-3">3 July 2022</span> <span class="mr-3">Items 12</span> <span>Mint Price 0.2 Sol</span></small>
                    </v-row>
                    <v-row class="py-8">
                        <v-col align="left">

                            <v-tabs v-model="tab" background-color="transparent" color="#c202d3" hide-slider>
                                <v-tab class="text-capitalize">RoadMap</v-tab>
                                <v-tab>Team</v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="tab" style="background-color:transparent">
                                <v-tab-item>
                                    <v-timeline align-top dense>
                                        <v-timeline-item v-for="(item, i) in 4" :key="i" class="my-16" small color="white" right>
                                            <p class="theme-color mb-2">Phase {{i+1}}</p>
                                            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </small>
                                        </v-timeline-item>
                                    </v-timeline>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" lg="6" md="6" v-for="i in 4" :key="i">
                                                <V-card dark>
                                                    <v-row no-gutters>
                                                        <v-col cols="8">
                                                            <h4>Hodei Amadi</h4>
                                                            <v-divider style="border:1px solid white"></v-divider>
                                                            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .</small>
                                                            <v-row no-gutters>
                                                                <v-icon color="#1DA1F2">mdi-twitter</v-icon>
                                                            </v-row>
                                                        </v-col>
                                                        <v-col cols="4">
                                                            <v-img class="rounded-circle ml-n2" width="100" height="100" style="border:2px solid white" :src="require('~/assets/images/featured/f1.png')"></v-img>
                                                        </v-col>
                                                    </v-row>
                                                </V-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>

                                </v-tab-item>
                            </v-tabs-items>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            tab: 0
        }
    }
}
</script>

<style scoped>
.v-tab {
    text-transform: capitalize;
}

.v-timeline-item__inner-dot {
    background-color: white !important;
}

.theme--dark.v-timeline::before {
    background: linear-gradient(264.75deg, #FE87FF 3.04%, #1905DA 99.63%);
}

.theme--dark.v-timeline .v-timeline-item__dot {
    background: transparent;
}
</style>
