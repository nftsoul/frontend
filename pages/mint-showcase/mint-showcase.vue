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
                            <h4>About this collection</h4>
                            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </small>
                        </v-col>
                    </v-row>
                    <v-row>
                            <v-card tile color="#1905DA" class="mr-3">
                                <v-icon>mdi-twitter</v-icon>
                            </v-card>
                        <small>Mint Date 3 July 2022  Items 12  Mint Price 0.2 Sol</small>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>
