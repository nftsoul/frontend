<template>
<div class="dark-bg">
    <v-container class="py-10">
        <v-row justify="center">
            <h3>Explore Artworks</h3>
        </v-row>
        <v-row class="pa-3" no-gutters>
            <v-btn dark color="primary ma-3" large>
                All
            </v-btn>
            <v-btn dark color="primary ma-3" large>
                Art
            </v-btn>
            <v-btn dark color="primary ma-3" large>
                Music
            </v-btn>
            <v-btn dark color="primary ma-3" large>
                Sports
            </v-btn>
            <v-btn dark color="primary ma-3" large>
                Collectibles
            </v-btn>
            <v-text-field placeholder="Search" class="ma-3" height="30" solo dark background-color="primary" append-icon="mdi-cloud-search"></v-text-field>

            <v-menu transition="slide-y-transition" bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on" large>
                        Sort by
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                </template>
                <v-list width="200" style="background-color:#636262">
                    <div v-for="(item, i) in items" :key="i">
                        <v-list-item>
                            <v-list-item-title>{{ item.title }}</v-list-item-title><br><br>
                        </v-list-item>
                        <v-divider v-if="items.length-items.indexOf(item)>1"></v-divider>
                    </div>
                </v-list>
            </v-menu>

        </v-row>
        <v-row>
            <v-col cols="12" lg="2" md="4" v-for="(item,i) in 32" :key="i" align="center">
                <v-card max-width="300" class="art-card">
                    <v-img :src="require('~/assets/images/1.png')"></v-img>
                    <v-card-text class="ml-n2 white--text">Lorem Ipsum Dolor</v-card-text>
                    <p class="mx-2 mt-n2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua.
                    </p>
                    <v-card-actions class="mt-n10">
                        <v-spacer></v-spacer>
                        <v-chip class="ma-2" color="#030537">
                            125
                            <v-icon class="ml-3">mdi-eye</v-icon>
                        </v-chip>
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            items: [{
                    title: 'Latest'
                },
                {
                    title: 'Newest'
                },
                {
                    title: 'Popular'
                },
                {
                    title: 'High to Low'
                },
                {
                    title: 'Low to High'
                },
                {
                    title: 'Oldest'
                },
            ],
        }
    }
}
</script>

<style lang="css">
@import '~/assets/styles/component.css';
</style>
