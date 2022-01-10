<template>
<div>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8" md="6">
                <v-row>
                    <v-col cols="12" lg="4" md="6" v-for="(item,i) in 5" :key="i" align="center">
                        <v-card color="transparent" flat class="pa-5" max-width="300">
                            <div class="outer-card">
                                <div class="inner-card">
                                    <v-img :src="require('~/assets/images/1.png')" class="mx-auto" width="220" height="220"></v-img>
                                    <v-card class="rounded-pill mt-n6" max-width="150" style="">
                                        <v-list dense class="py-1">
                                            <v-list-item dense class="pa-0">
                                                <v-list-item-avatar class="my-0 ml-2">
                                                    <v-img :src="require('~/assets/images/1.png')"></v-img>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title class="ml-n2">@Roy Reyna</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-card>
                                    <v-card-subtitle class="text-left">Lorem Ipsum Dolor</v-card-subtitle>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
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

        }
    }
}
</script>
