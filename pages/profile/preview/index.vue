<template>
<div class="dark-bg">
    <v-container class="py-16">
        <v-row class="py-16">
            <v-col>
                <v-container>
                    <v-row justify="center">
                        <v-col cols="12" lg="11" md="11">
                            <div class="enclose-border">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" lg="4" md="6" align="center" class="px-5">
                                            <v-img :src="require('~/assets/images/1.png')" class="rounded-lg"></v-img>
                                        </v-col>
                                        <v-col cols="12" lg="4" md="6" align="center" class="px-5">
                                            <v-img :src="require('~/assets/images/2.png')" class="rounded-lg"></v-img>
                                        </v-col>
                                        <v-col cols="12" lg="4" md="6" class="pr-0">
                                            <p>Infinity Lab Collections</p>
                                            <v-list dense style="box-shadow:none !important">
                                                <v-list-item dense>
                                                    <v-list-item-avatar>
                                                        <v-img :src="require('~/assets/images/profile.png')"></v-img>
                                                    </v-list-item-avatar>
                                                    <v-list-item-content>
                                                        <v-list-item-title>
                                                            Roy Reyna
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle>
                                                            @Rayna
                                                        </v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                            <v-row class="mt-5">
                                                <v-col cols="5">
                                                    <p class="mb-0 caption text--disabled">start with</p>
                                                    <p class="text-h5">2.5 SOL</p>
                                                   
                                                    <p class="mt-2 body-2">Total Items: 45</p>
                                                </v-col>
                                                <v-col cols="7" class="px-0">
                                                    <p class="mb-0 caption text--disabled">About This Gallery</p>
                                                    <p style="line-height:15px"><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua.</small></p>
                                                    <v-btn small rounded color="#A0A0A0">
                                                        <small>Add To Favourite</small>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
                <CommonProfile />
            </v-col>
        </v-row>
    </v-container>

</div>
</template>

<script>
export default {
    layout: 'user',
    data() {
        return {

        }
    }
}
</script>
