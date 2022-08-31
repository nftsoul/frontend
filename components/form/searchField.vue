<template>
    <div>
        <v-text-field @input="handleInput" placeholder="Search collection" class="mx-3" dense solo dark
            background-color="primary" color="white" append-icon="mdi-cloud-search"></v-text-field>
    </div>
</template>
<script>
export default {
    methods: {
        handleInput(e) {
            this.$emit('input', e)
        }
    }
}
</script>