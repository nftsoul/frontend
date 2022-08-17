<template>
    <div>
        <div class="action-btn">
            <button class="btn" type=button @click="GoHome">Go Home</button>
            <!-- <ActionButton @click="GoHome" ActionButtonText="Return Home" /> -->
        </div>
        <nuxt-link to="{name: 'IndexPage'}">
            <Button ButtonText="Go To Home" />
        </nuxt-link>
    </div>
</template>

<script>
import Button from '../basics/Button.vue';
export default {
    methods: {
        GoHome() {
            this.$router.push("/");
        }
    },
    components: { Button }
}
</script>

<style scoped>
</style>