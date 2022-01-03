<template>
<div class="profile-bg">
    <v-container class="py-16">
        <v-row class="pt-16" justify="center">
            <v-col cols="6">
                <v-card flat>
                    <v-list style="background-color:transparent">
                        <v-list-item>
                            <v-list-item-avatar tile width="200" height="220">
                                <v-img :src="require('~/assets/images/profile.png')"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Masham Raymens
                                </v-list-item-title>
                                <small>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua.

                                </small>
                                <v-card-actions>
                                    <v-chip dark :color="chipColor" class="mr-2">
                                        Following  109
                                    </v-chip>
                                    <v-chip dark :color="chipColor">
                                        Following  116
                                    </v-chip>
                                </v-card-actions>
                            </v-list-item-content>

                        </v-list-item>

                    </v-list>
                </v-card>
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
            chipColor: 'rgba(160, 160, 160, 0.3)'
        }
    }
}
</script>

<style lang="css">
.profile-bg {
    background: linear-gradient(261.36deg, #C202D3 3.07%, #300253 64.08%, #16023C 82.04%, #000229 100%);
}

.profile-card {
    background-color: transparent !important;
}
</style>
