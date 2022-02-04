<template>
<div class="back">
    <v-container>
        <v-row justify="center" class="my-8">
             <p class="white--text text-h5">Our Partners</p>
        </v-row>
        <v-row justify="center">
            <v-col cols="10" align="center" class="py-16">
                <v-row justify="space-around">
                    <v-img :src="require('~/assets/images/zebec-logo.png')" max-width="300" height="50"></v-img>
                    <v-img :src="require('~/assets/images/solana-logo.svg')" max-width="350" height="50"></v-img>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>
