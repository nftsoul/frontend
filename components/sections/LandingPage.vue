<template>
    <div class="d-flex">
        <SubmitButton SubmitButtonText="Exhibit" path="/Profile" />
        <Button ButtonText="Explore" path="PopularGalleries" />
    </div>
</template>

<script>
import Button from '../basics/Button.vue';
import SubmitButton from '../basics/SubmitButton.vue';
export default {
    components: { Button, SubmitButton }
}
</script>

<style scoped>
</style>