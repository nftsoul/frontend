<template>
    <v-btn class="submit-btn">
        <button class="btn" type="button">{{ SubmitButtonText }}</button>
    </v-btn>
</template>

<script>
export default {
    props: {
        SubmitButtonText: {
            type: String,
        }
    },
    methods: {
        ShowAlert(msg) {
            alert(msg);
        }
    },
}
</script>

<style scoped>
.submit-btn {
    background-image: linear-gradient(to right, #2E11DE, #FE87FF);
    border-radius: 6px;
    padding: 6px;
    margin: 8px;
    width: 140px;
}

.btn {
    margin: 0 auto;
    width: 100%;
}
</style>