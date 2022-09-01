<template>
<div class="back">
    <v-container>
        <v-row justify="center" class="my-5">
            <p class="grand-title-text text-h5">How does it work?</p>
        </v-row>
        <v-row justify="center">
            <v-col cols="10" align="center" class="custom-back py-16">
                <v-row justify="center">
                    <v-col cols="12" lg="2" md="2" align="center">
                        <v-card flat color="transparent" max-width="300">
                            <v-avatar class="mx-auto pa-1 gradient-back" size="60">
                                <v-img :src="require('~/assets/images/wallet-filled-money-tool.png')"></v-img>
                            </v-avatar>
                            <p class="mb-n3 mt-5">Connect Wallet</p>

                            <v-card-subtitle>
                                <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua. -->
                            </v-card-subtitle>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="1" md="1" align="center">
                        <v-icon class="icon-grad hidden-sm-and-down" large>mdi-arrow-right</v-icon>
                        <v-icon class="icon-grad hidden-md-and-up" large>mdi-arrow-down</v-icon>
                    </v-col>
                    <v-col cols="12" lg="3" md="3" align="center">
                        <v-card flat color="transparent" max-width="300">
                            <v-avatar class="mx-auto pa-1 gradient-back" size="60">
                                <v-img :src="require('~/assets/images/image-gallery.png')"></v-img>
                            </v-avatar>
                            <p class="mb-n3 mt-5">Create Gallery</p>

                            <v-card-subtitle>
                                <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua. -->
                            </v-card-subtitle>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="1" md="1" align="center">
                        <v-icon class="icon-grad hidden-sm-and-down" large>mdi-arrow-right</v-icon>
                        <v-icon class="icon-grad hidden-md-and-up" large>mdi-arrow-down</v-icon>
                    </v-col>
                    <v-col cols="12" lg="2" md="2" align="center">
                        <v-card flat color="transparent" max-width="300">
                            <v-avatar class="mx-auto pa-1 gradient-back" size="60">
                                <v-img :src="require('~/assets/images/tag.png')"></v-img>
                            </v-avatar>
                            <p class="mb-n3 mt-5">Exhibit</p>

                            <v-card-subtitle>
                                <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua. -->
                            </v-card-subtitle>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<style lang="css">
.back {
    background: #000229;
}

.custom-back {
    background: #0E103B;
    border-radius: 7px;
}

.icon-grad {
    background: linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.gradient-back {
    border-radius: 7px;
    background: linear-gradient(264.75deg, #FE87FF 3.04%, #FD2BFF 23.86%, #C202D3 41.34%, #5E0FFF 68.89%, #1905DA 99.63%);
}
</style>
