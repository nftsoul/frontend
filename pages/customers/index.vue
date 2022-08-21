<template>
    <div>
        <button @click="GoHome" type="button">Home Page</button>
        <NuxtLink to="Details">details</NuxtLink>
        <NuxtLink to="/PopularGalleries" event="" @click.native="calculateQueryParams('/PopularGalleries')">
            Popular Galleries
        </NuxtLink>
    </div>
</template>

<script>
export default {
    methods: {
        GoHome() {
            this.$route.push("/Details");
        }
    },

    calculateQueryParams(path) {
        const query = {
            PopularGalleries: performance.now(),
        }

        this.$router.push({ path, query })
    },
}
</script>

<style scoped>
</style>