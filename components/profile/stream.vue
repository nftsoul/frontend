<template>
<div class="dark-bg">
    <v-container>
        <v-row justify="center" class="mt-5">
            <h3>Item Preview</h3>
        </v-row>
        <v-row justify="center">
            <v-col cols="10" align="center">
                <div class="enclose-border yo">

                    <carousel-3d :controls-visible="true" :controls-width="40" :controls-height="40" perspective="0" inverseScaling="00" display="1" width="700" height="400" border="0">
                        <slide v-for="(item,i) in selected.nfts" :index='i' :key="i">
                            <template slot-scope="{index,isCurrent,leftIndex,rightIndex}">
                                <v-card :data-index="index" flat style="border-radius:10px" color="transparent" :class="{current:isCurrent,onLeft:(leftIndex >=0),onRight:(rightIndex >= 0)}">
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" lg="5" md="6">
                                                <v-img :src="item.img" class="mx-auto rounded-lg" height="375"></v-img>
                                            </v-col>
                                            <v-col cols="12" lg="7" md="6">
                                                <p class="text-h5 mb-0">{{selected.gallery_name}}</p>
                                                <p><small>1 of 30 <v-chip dark small>
                                                            <v-icon small class="mr-1">mdi-heart</v-icon>1.0k
                                                        </v-chip></small></p>
                                                <v-card light color="white" class="rounded-lg pa-2">
                                                    <v-row no-gutters>
                                                        <v-chip dark small color="#C202D3">Details</v-chip>
                                                        <v-chip small dark class="mx-2">Attributes</v-chip>
                                                        <v-chip small dark>History</v-chip>
                                                    </v-row>
                                                    <v-divider class="mt-3"></v-divider>
                                                    <v-card-text class="caption">
                                                        {{selected.description}}

                                                    </v-card-text>
                                                </v-card>
                                                <p class="mb-0"><small>Countdown</small></p>
                                                <p class="text-h6 font-weight-bold" style="color:#C202D3">{{minuteLeft}}:{{secondLeft}}</p>
                                                <v-divider class="mt-n3"></v-divider>
                                                <v-list-item dense class="px-0">
                                                    <v-list-item-avatar size="30">
                                                        <v-icon>mdi-account-tie</v-icon>
                                                    </v-list-item-avatar>
                                                    <v-list-item-content>
                                                        <v-list-item-title>
                                                            {{selected.user_id.slice(0,5)}}
                                                        </v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-btn rounded small class="btn-exhibit">
                                                    <small>View Next NFT</small>
                                                </v-btn>

                                            </v-col>
                                        </v-row>
                                    </v-container>

                                </v-card>

                            </template>
                        </slide>
                    </carousel-3d>
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
            totalTime: 300,
            minuteLeft: 0,
            secondLeft: 0,
        }
    },
    computed: {
        selected() {
            return this.$store.state.content.selected
        }
    },
    mounted() {
        window.setInterval(() => {
            this.minuteLeft = Math.floor(this.totalTime / 60)
            this.secondLeft = this.totalTime % 60
            this.totalTime -= 1
            if (this.totalTime == 0) {
                window.clearInterval()
                this.$router.push({
                    name: 'profile-preview'
                })
            }
        }, 1000);

    },
    methods: {
        getImg(item) {
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
.carousel-3d-slide {
    background: #030537 !important;
    border-radius: 10px !important;
    box-shadow: none;
}
</style>
