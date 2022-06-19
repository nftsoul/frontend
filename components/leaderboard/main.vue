<template>
    <div class="dark-bg py-3">
        <v-container>
            <v-row justify="center">
                <p class="title white--text">Leader Board</p>
            </v-row>
            <v-row justify="center">
                <!-- <v-col cols="12" lg="6" md="6">
                    <gallery />
                </v-col> -->
                <v-col cols="12" lg="6" md="6" class="custom-back my-3">
                    <collection />
                    <comment />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Collection from './collection.vue';
import Gallery from './gallery.vue'
import Comment from './comment.vue'
export default {
    components:{Collection,Gallery,Comment}
}
</script>