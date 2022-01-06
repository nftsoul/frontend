<template>
<div>
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
    data(){
        return{
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
    computed:{
        detailDialog:{
            get(){
                return this.$store.state.content.detailDialog
            },
            set(value){
                this.$store.commit('content/setDetailDialog',value)
            }
        }
    }
}
</script>
