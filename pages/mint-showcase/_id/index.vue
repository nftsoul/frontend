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
                            <small>{{details.description}}</small>
                        </v-col>
                    </v-row>
                    <v-row class="mt-8">
                        <v-card tile color="#1905DA" class="mr-5">
                            <v-row no-gutters>
                                <v-icon color="#1DA1F2" @click="openLink(0)">mdi-twitter</v-icon>
                                <v-img :src="require('~/assets/icons/discord.png')" @click="openLink(1)" width="25" height="20" class="mx-2"></v-img>
                                <v-icon color="#1DA1F2" @click="openLink(2)">mdi-linkedin</v-icon>
                            </v-row>
                        </v-card>
                        <small>Mint Date <span class="theme-color mr-3">3 July 2022</span> <span class="mr-3">Items {{details.images.length}}</span> <span>Mint Price {{details.price}} Sol</span></small>
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
                                        <v-timeline-item v-for="(item,i) in details.roadmap" :key="i" class="my-16" small color="white" right>
                                            <p class="theme-color mb-2">Phase {{i+1}}</p>
                                            <small>{{item}}</small>
                                        </v-timeline-item>
                                    </v-timeline>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" lg="6" md="6" v-for="(item,i) in details.members" :key="i">
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
            tab: 0,
            details: ''
        }
    },
    computed: {
        mint_id() {
            return this.$route.params.id
        }
    },
    mounted() {
        this.getMintDetails()
    },
    methods: {
        getMintDetails() {
            this.$axios.get('/mint/stream/' + this.mint_id)
                .then(res => {
                    this.details = res.data.result[0]
                    console.log('data:', res.data)
                })
                .catch(err => console.log(err.response))
        },
        openLink(i) {
            if (i == 0) {
                window.open(this.details.social[0].twitter)

            } else if (i == 1) {
                window.open(this.details.social[0].discord)

            } else if (i == 2) {
                window.open(this.details.social[0].linkedin)

            }
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
