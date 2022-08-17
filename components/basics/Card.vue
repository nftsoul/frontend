<template>
    <div>
        <v-card class="card" max-width="220px">
            <v-img :src="require(`~/assets/images/1.png`)">
            </v-img>
            <v-card-title>Ghost</v-card-title>
            <v-card-text>NFT FIre Ghost</v-card-text>
            <v-icon>fas fa-search</v-icon>
        </v-card>
        <!-- <NuxtLink :to="`/products/${card.id}`" class="card">
        <img :src="require(`@/assets/images/${card.image || 'fe1.jpg'}`)" alt="fe desc" class="image">
        <h3 class="header">{{ card.tittle }}</h3>
        <p class="snippet">{{ card.snippet }}</p>
        </NuxtLink> -->

    </div>
</template>

<script>
export default {
    props: ['card']
}
</script>

<style scoped>
.card {
    padding: 16px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>