<template>
    <div>
        <Button ButtonText="View All" />
        <SubmitButton SubmitButtonText="Exhibit" />
        <ActionButton ActionButtonText="Go Details Page" />
    </div>
</template>

<script>
import Button from '../basics/Button.vue';
import SubmitButton from '../basics/SubmitButton.vue';
import ActionButton from '../basics/ActionButton.vue';
export default {
    components: { Button, SubmitButton, ActionButton }
}
</script>

<style scoped>
</style>