<template>
    <div>
        <v-toolbar flat app>
            <v-app-bar>
                <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
                <v-img src="@/assets/images/logo.svg" max-height="150" max-width="250">
                    NFT Soul
                </v-img>
            </v-app-bar>
        </v-toolbar>
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