<template>
    <div>
        <Button ButtonText="View All" />
        <SubmitButton SubmitButtonText="Exhibit" path="/Profile" />
        <ActionButton ActionButtonText="Go Details Page" path="/Details" />
        <ActionButton ActionButtonText="Go Popular Gallerie" path="/PopularGalleries" />
        <ActionButton ActionButtonText="customers" path="/customers/index" />
    </div>
</template>

<script>
import Button from '../basics/Button.vue';
import SubmitButton from '../basics/SubmitButton.vue';
import ActionButton from '../basics/ActionButton.vue';
export default {
    components: { Button, SubmitButton, ActionButton, ActionButton }
}
</script>

<style scoped>
</style>