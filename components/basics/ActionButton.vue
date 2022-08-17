<template>
    <div class="action-btn">
        <button @click="DetailPage" class="btn" type="button">{{ ActionButtonText }}</button>
    </div>
</template>

<script>
export default {
    props: {
        ActionButtonText: {
            type: String,
            required: true
        }
    },
    methods: {
        DetailPage() {
            this.$router.push('/Details');
        }
    }
}
</script>

<style>
.action-btn {
    /* background-image: linear-gradient(to right, #2E11DE, #FE87FF); */
    border-radius: 6px;
    padding: 6px;
    margin: 8px;
    width: 140px;
    border: 2px solid #fff;
}

.btn {
    margin: 0 auto;
    width: 100%;
}
</style>