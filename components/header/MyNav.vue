<template>
    <div>
        <v-app-bar app>
            <!-- <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon> -->
            <NuxtLink to="/">
                <v-img :src='require(`@/assets/images/logo.svg`)' max-height="150" max-width="250">
                </v-img>
            </NuxtLink>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: false
        }
    }
}
</script>

<style scoped>
</style>