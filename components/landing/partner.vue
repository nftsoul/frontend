<template>
<div class="back">
    <v-container>
        <v-row justify="center" class="my-8">
             <p class="white--text text-h5">Our Partners</p>
        </v-row>
        <v-row justify="center" class="py-lg-5">
            <v-col cols="7" lg="5" md="5" align="center">
                    <v-img :src="require('~/assets/images/zebec-logo.png')" max-width="300" max-height="50"></v-img>
            </v-col>
            <v-col cols="7" lg="4" md="5" align="center">
                <v-img :src="require('~/assets/images/solana-logo.svg')" max-width="350" max-height="50"></v-img>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>
