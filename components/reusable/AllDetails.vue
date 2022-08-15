<template>
    <div>
        <p>{{ gallery.name }}: {{ gallery.desc }}</p>
    </div>
</template>

<script>
export default {
    props: ["gallery"],
}
</script>

<style scoped>
</style>