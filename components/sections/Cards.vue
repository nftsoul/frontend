<template>
    <div>
        <Card />
        <Button ButtonText="Popular Galleries" />
        <div class="action-btn">
            <button @click="PopularGallery" class="btn" type="button">{{ ActionButtonText }}</button>
        </div>
        <!-- <div>
            <h4 class="header">{{ cardsSection.title }}</h4>
            <p class="snippet">{{ cardsSection.snippet }}</p>
            <div class="cards-container">
                <Card v-for="card in cardsSection.cards" :key="card.id" :card="card" />
            </div>
        </div> -->
    </div>
</template>

<script>
import Card from '../basics/Card.vue';
import Button from '../basics/Button.vue';
export default {
    components: { Card, Button },

    props: {
        ActionButtonText: {
            type: String,
            default: () => "Go Popular Galleries",
        },
    },

    methods: {
        PopularGallery() {
            this.$router.push('/PopularGalleries');
        }
    }
}
</script>

<style scoped>
.action-btn {
    /* background-image: linear-gradient(to right, #2E11DE, #FE87FF); */
    border-radius: 6px;
    padding: 6px;
    margin: 8px;
    width: 140px;
    border: 2px solid #fff;
}

.btn {
    margin: 0 auto;
    width: 100%;
}
</style>