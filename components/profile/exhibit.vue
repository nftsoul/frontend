<template>
<div class="dark-bg">
    <v-container class="py-lg-16 py-md-10 py-5">
        <v-row justify="center">
            <div class="outer-card rounded-lg">
                <div class="inner-card pa-1 rounded-lg">
                    <v-btn text dark class="px-5">
                        Create New Item
                        <div class="btn-plus ml-2">
                            <v-icon dark color="white" small>mdi-plus</v-icon>
                        </div>
                    </v-btn>
                </div>
            </div>
        </v-row>
        <v-row justify="center" class="py-5">
            <v-col cols="8">
                <div class="outer-card rounded-lg">
                    <div class="inner-card pa-1 rounded-lg">
                        <v-list dense style="background-color:transparent" class="py-0">
                            <v-list-item class="px-0">
                                <v-list-item-avatar tile class="rounded-lg my-0">
                                    <v-img :src="require('~/assets/images/1.png')"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>Phaty Platys</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-checkbox></v-checkbox>
                                </v-list-item-action>
                            </v-list-item>

                        </v-list>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            color: 'linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%)'
        }
    }
}
</script>

<style lang="css">
.btn-plus {
    background: linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%) !important;
    border-radius: 50%;
    padding: 0px 2px;

}
</style>
