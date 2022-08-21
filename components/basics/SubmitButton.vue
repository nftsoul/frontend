<template>
    <v-btn class="submit-btn">
        <button @click="ProfilePage" class="btn" type="button">{{ SubmitButtonText }}</button>
    </v-btn>
</template>

<script>
export default {
    props: {
        SubmitButtonText: {
            type: String,
        },
        path: {
            type: String,
            required: true
        }
    },
    methods: {
        ProfilePage() {
            this.$router.push(this.path);
        }
    }
}
</script>

<style scoped>
.submit-btn {
    background-image: linear-gradient(to right, #2E11DE, #FE87FF);
    border-radius: 6px;
    padding: 6px;
    margin: 10px;
    width: 140px;
}

.btn {
    margin: 0 auto;
    width: 100%;
}
</style>