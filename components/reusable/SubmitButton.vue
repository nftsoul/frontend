<template>
    <v-btn class="submit-btn">
        <button @click="DetailPage" class="btn" type="button">submit Button</button>
    </v-btn>
</template>

<script>
export default {
    props: {
        type: String,
    },
    methods: {
        handleClick() {
            console.log("hello");
        },
        handleInfo() {
            alert("work it damnit");
        },
        DetailPage() {
            this.$router.push('Details');
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