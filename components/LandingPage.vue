<template>
    <div>
        <SubmitButton @click="handleInfo" />
    </div>
</template>

<script>
import SubmitButton from './reusable/SubmitButton.vue';
export default {
    components: { SubmitButton },
    methods: {
        handleInfo() {
            alert("work it damnit");
        }
    },
}
</script>

<style scoped>
</style>