<template>
<div>
    <v-container fluid class="custom-back">
        <v-row>
            <v-col cols="12" lg="6" md="12">
                <p class="title2 text-center">Top Viewed Gallery</p>
                <v-list-item dense class="px-0">
                    <v-list-item-avatar tile size="140">
                        <v-img :src="require('~/assets/images/featured/f1.png')"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            Rear 101
                        </v-list-item-title>
                        <v-list-item dense class="px-0">
                            <v-list-item-avatar class="mr-1">
                                <v-img :src="require('~/assets/images/featured/fa3.png')"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <small>Roy Reyna</small>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    <small>6gk7Ygtv45</small>

                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <small class="caption">Views: 1.2k</small>
                        <small class="caption">Total Items: 45</small>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col cols="12" lg="6" md="12">
                <p class="title2">Top Earned Gallery</p>
                <v-list-item dense class="px-0">
                    <v-list-item-avatar tile size="140">
                        <v-img :src="require('~/assets/images/featured/f1.png')"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            Rear 101
                        </v-list-item-title>
                        <v-list-item dense class="px-0">
                            <v-list-item-avatar class="mr-1">
                                <v-img :src="require('~/assets/images/featured/fa3.png')"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <small>Roy Reyna</small>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    <small>6gk7Ygtv45</small>

                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <small class="caption">Views: 1.2k</small>
                        <small class="caption">Total Items: 45</small>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
        </v-row>
        <v-row class="py-3">
            <v-col align="center">
                <p class="title2 white--text">Top 3 Gallaries</p>
                <v-simple-table class="simple" dark style="background-color: transparent">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">S.N.</th>
                                <th class="text-left">user</th>
                                <th class="text-left">Gallery</th>
                                <th class="text-left">Total Sol Earned</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr v-for="(item, i) in 3" :key="i">
                                <td>{{ i + 1 }}</td>
                                <td>
                                    <v-list-item dense class="px-0">
                                        <v-list-item-avatar class="mr-1">
                                            <v-img :src="require('~/assets/images/featured/fa3.png')"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <small>Roy Reyna</small>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                <small>6gk7Ygtv45</small>

                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </td>
                                <td><small>Monkey Kingdom</small></td>
                                <td><small>2.50 Sol</small>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            // gallaries:[
            //     {user:{}}
            // ]
        }
    }
}
</script>
<style lang="scss">
tbody {
    tr:hover {
        background-color: transparent !important;
    }
}
table{
    border:none
}
tr{
    border:none
}

</style>
