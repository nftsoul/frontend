<template>
    <div>
        <div class="btn-gradient mt-5" @click="$emit('click')">
        </div>
        <p class="mt-n6 body-2" style="width:100px">{{ ButtonText }}</p>
    </div>
</template>

<script>
export default {
    props: {
        ButtonText: {
            type: String
        }
    }
}
</script>

<style scoped>
</style>