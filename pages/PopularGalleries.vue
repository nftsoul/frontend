<template>
    <div>
        <Cards />
        <PopularGallery />
    </div>
</template>

<script>
import Cards from '../components/sections/Cards.vue';
import PopularGallery from '../components/sections/PopularGallery.vue';
export default {
    components: { Cards, PopularGallery }
}
</script>

<style scoped>
</style>