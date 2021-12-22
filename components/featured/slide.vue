<template>
<div class="dark-bg pt-16">
    <v-container>
        <v-row justify="center" class="mt-5">
            <h3>Featured Items</h3>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" class="px-5">
                <carousel-3d autoplay autoplayHoverPause style="width:80%" :controls-visible="true" :controls-width="40" :controls-height="40" perspective="0" inverseScaling="00" space="360" display="3" width="320" height="545" border="0">
                    <slide v-for="(item,i) in featured" :index='i' :key="i">
                        <template slot-scope="{index,isCurrent,leftIndex,rightIndex}">
                            <v-card :data-index="index" class="slide-box pa-5" max-width="320" height="545" :class="{current:isCurrent,onLeft:(leftIndex >=0),onRight:(rightIndex >= 0)}">
                                <v-img :src="require('~/assets/images/featured/'+item.src)" class="mx-auto" max-width="280"></v-img>
                                <div class="outer-avatar ml-10 mt-n7">
                                    <v-avatar>
                                        <img :src="require('~/assets/images/featured/'+item.avatar)" alt="img">
                                    </v-avatar>
                                </div>
                                <v-card-title>{{item.title}}</v-card-title>
                                <v-card-subtitle>{{item.subtitle}}</v-card-subtitle>
                                <v-card-actions>
                                    <div class="outer-btn mx-auto" @click="detailDialog=true">
                                        <div class="inner-btn">
                                            <p class="ml-6 mt-n1" style="font-size:14px">View</p>
                                        </div>
                                    </div>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </slide>
                </carousel-3d>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog v-model="detailDialog" max-width="1070">
        <v-card dark color="primary" class="detail-card pa-5">
            <v-container>
                <v-row>
                    <v-col cols="12" lg="6" md="6" align="right">
                        <v-img :src="require('~/assets/images/monkey.png')" height="500">
                            <v-card style="background-color:rgba(160, 160, 160, 0.5) !important" class="rounded-pill ma-1" width="30">
                                <v-col class="pa-1">
                                    <v-icon>mdi-heart</v-icon><br>
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-col>
                            </v-card>
                        </v-img>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                        <p>Abstract Blue Pink</p>
                        <v-row no-gutters>
                            <v-card color="grey" class="pa-1" width="200">
                                <v-row>
                                    <v-col cols="3">
                                        <v-avatar size="38" class="my-0">
                                            <v-img :src="require('~/assets/images/featured/fa1.png')"></v-img>
                                        </v-avatar>
                                    </v-col>
                                    <v-col cols="9">
                                        <p class="dialog-card-title mb-0">Owned By</p>
                                        <p class="dialog-card-subtitle mb-0">Christian Diokno</p>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-spacer></v-spacer>
                            <v-card color="grey" class="pa-1" width="200">
                                <v-row>
                                    <v-col cols="3">
                                        <v-avatar size="38" class="my-0">
                                            <v-img :src="require('~/assets/images/featured/fa1.png')"></v-img>
                                        </v-avatar>
                                    </v-col>
                                    <v-col cols="9" class="pl-4">
                                        <p class="dialog-card-title mb-0">Created By</p>
                                        <p class="dialog-card-subtitle mb-0">Roy Reyna</p>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-row>
                        <v-row>
                            <v-btn text color="#FD2BFF">Details</v-btn>
                            <v-btn text>Attributes</v-btn>
                            <v-btn text>Offer</v-btn>
                        </v-row>

                        <v-row class="px-4">
                            <small>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </small>
                        </v-row>
                        <v-row no-gutters class="py-5">
                            <v-card color="grey" class="px-2 rounded-pill" width="55">
                                <small>125 <v-icon small>mdi-eye</v-icon></small>
                            </v-card>
                            <v-card color="grey" class="px-2 rounded-pill mx-2" width="55">
                                <small>125 <v-icon small>mdi-eye</v-icon></small>
                            </v-card>
                            <v-card color="grey" class="px-2 rounded-pill" width="55">
                                <small>125 <v-icon small>mdi-eye</v-icon></small>
                            </v-card>
                        </v-row>
                        <v-row class="mt-n3">
                            <v-list two-line dense style="background-color:transparent">
                                <v-list-item dense v-for="(item,i) in users" :key="i">
                                    <v-list-item-avatar class="my-0">
                                        <v-img :src="require('~/assets/images/featured/fa1.png')"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{item.name}} <span class="text--secondary">{{item.activity}}</span>
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            {{item.time}} hour ago
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            detailDialog: false,
            featured: [{
                    src: 'f1.png',
                    avatar: 'fa1.png',
                    title: '3D Art',
                    subtitle: 'Lorem Ipsum Dolor'
                },
                {
                    src: 'f2.png',
                    avatar: 'f2.png',
                    title: '3D Art',
                    subtitle: 'Lorem Ipsum Dolor'
                },
                {
                    src: 'f3.png',
                    avatar: 'fa3.png',
                    title: '3D Art',
                    subtitle: 'Lorem Ipsum Dolor'
                },

            ],
            users: [{
                    src: 'fa1.png',
                    name: 'Marcio Bordin',
                    time: '1',
                    activity: 'commented'
                },
                {
                    src: 'fa2.png',
                    name: 'Marcio Bordin',
                    time: '4',
                    activity: 'liked'
                },
                {
                    src: 'fa3.png',
                    name: 'Marcio Bordin',
                    time: '9',
                    activity: 'shared'
                }
            ]
        }
    },
    methods: {

    }
}
</script>

<style lang="css">
.outer-avatar {
    width: 50px;
    border-radius: 50px;
    background: linear-gradient(264.44deg, #FE87FF 2.87%, #C202D3 34.05%, #5E0FFF 67.82%, #1905DA 99.15%);
    padding: 1px;
}

.slide-box {
    border-radius: 50px !important;
}

.carousel-3d-slide {
    background: #030537 !important;
    border-radius: 50px !important;
}

.detail-card {
    border-radius: 7px;
    box-shadow: 0px 0px 5px #B0B0B0;
}

.dialog-card-title {
    font-weight: 600;
    font-size: 12px;
    color: #636262;
}

.dialog-card-subtitle {
    font-weight: 600;
    font-size: 14px;
    color: #f5f7f8;
}

a.next {
    border: 3px solid #C202D3;
    padding-right: 7px;
    border-radius: 50%;
    line-height: 28px !important;
}

a.prev {
    border: 3px solid white;
    border-radius: 50%;
    padding-left: 7px;
    line-height: 28px !important;
    border: 3px solid #C202D3;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

a.next span {
    background: linear-gradient(86.47deg, #FE87FF 1.47%, #FD2BFF 21.9%, #C202D3 39.06%, #9208E8 57.62%, #5E0FFF 84.84%, #1905DA 96.24%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

a.prev span {
    background: linear-gradient(86.47deg, #FE87FF 1.47%, #FD2BFF 21.9%, #C202D3 39.06%, #9208E8 57.62%, #5E0FFF 84.84%, #1905DA 96.24%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.slider {
  @media screen and (min-width: 769px) {
      height: 220px;
  }
  @media screen and (max-width: 440px) {
      height: 140px;
  }
}
</style>
