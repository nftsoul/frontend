<template>
<v-app>
    <LayoutAppbar />
    <CommonSolscan />
    <Nuxt />
    <LayoutFooter />
</v-app>
</template>

<script>
export default {
    data() {
        return {
            loaded: false,
        };
    },
    mounted() {
        this.loaded = true
    }
};
</script>

<style lang="css">
@import "~/assets/styles/main.css";
</style>
