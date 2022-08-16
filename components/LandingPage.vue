<template>
    <div>
        <MyNav />
        <SubmitButton @click="handleInfo" />
    </div>
</template>

<script>
import SubmitButton from './reusable/SubmitButton.vue';
import MyNav from './header/MyNav.vue';
export default {
    components: { SubmitButton, MyNav },
    methods: {
        handleInfo() {
            alert("work it damnit");
        }
    },
}
</script>

<style scoped>
</style>