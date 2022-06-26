<template>
<v-app>
    <client-only>
        <LayoutAppbar />
        <CommonSolscan />
    </client-only>
    <Nuxt />
    <client-only>
        <LayoutFooter />
    </client-only>
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
