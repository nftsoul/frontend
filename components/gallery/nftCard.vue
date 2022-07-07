<template>
<div>
    <v-card max-width="300" class="art-card" height="390">
        <v-hover v-slot="{ hover }">
            <v-img :src="image" :lazy-src="image" width="270" height="240">
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                </template>
                <v-expand-transition>
                    <div v-if="hover" @click="setProfilePic(image)" class="
                            d-flex
                            transition-fast-in-fast-out
                            v-card--reveal
                            text-h6
                            white--text
                          ">
                        <v-icon v-if="profiling" class="mdi-spin">mdi-reload</v-icon>
                        <p v-else style="cursor: pointer">Set as avatar</p>
                    </div>
                </v-expand-transition>
            </v-img>
        </v-hover>
        <v-card-text class="ml-n2 white--text text-left">{{
                    title
                  }}</v-card-text>
        <p class="mx-2 mt-n2 desc-text text-left">
            {{ description }}
        </p>

    </v-card>
</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            profiling: false,

        }
    },
    methods: {
        setProfilePic(image) {
            this.profiling = true;
            this.$axios
                .patch("/profile?image_link=" + image)
                .then((res) => {
                    this.profiling = false;
                    console.log('profile:',res.data.result)
                    this.$store.commit("wallet/setProfile", res.data.result);
                    this.$toast
                        .success("Your avatar has been updated.", {
                            iconPack: "mdi",
                            icon: "mdi-image",
                            theme: "outline",
                        })
                        .goAway(3000);
                })
                .catch((err) => console.log(err.response));
        },
    }
}
</script>

<style lang="css">
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(17, 24, 39, 0) 0%, #111827 100%);
}

.desc-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
</style>
