<template>
<div>
    <v-container>
        <v-row class="py-3">
            <v-col>
                <p class="title2">Top Recent Comments</p>

                <v-row v-if="comments.length>0">
                    <v-list-item dense v-for="(item,i) in comments" :key="i">
                        <v-list-item-avatar size="50" class="mr-2">
                            <v-img v-if="item.user_id.image_link" :src="item.user_id.image_link" max-width="60" max-height="60"></v-img>
                            <v-icon v-else large>mdi-account</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>

                            <p class="mb-1 mt-2" style="font-size:12px">
                                <span v-if="item.user_id.name">{{ item.user_id.name }}</span>
                                <span v-else>{{ item.user_id.wallet_address.slice(0, 8)
                                                            }}</span>
                            </p>
                            <p class="mb-0 text--disabled" style="font-size:12px" v-html="getCommentBody(item)"></p>
                        </v-list-item-content>
                    </v-list-item>
                </v-row>
                <v-row v-else>
                    <v-skeleton-loader v-for="i in 4" :key="i" class="mb-2" style="width:100%" type="list-item-avatar" dark>
                    </v-skeleton-loader>
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
            comments: []
        }
    },
    mounted() {
        this.getComments()
    },
    methods: {
        getComments() {
            this.$axios.get('/comment/recent')
                .then(res => {
                    this.comments = res.data.comments
                })
                .catch(err => console.log(err.response))
        },
        getCommentBody(item) {
            return '"' + this.getBody(item.body) + '" on <span class="theme-color">' + this.getGallery(item.gallery_id) + '</span>'
        },
        getBody(body) {
            if (body.length > 35) {
                return body.slice(0, 35) + '..'
            } else {
                return body
            }
        },
        getGallery(gallery) {
            if (gallery.length > 25) {
                return gallery.gallery_name.slice(0, 25) + '..'
            } else {
                return gallery.gallery_name
            }
        }
    }
}
</script>
