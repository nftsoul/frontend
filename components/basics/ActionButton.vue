<template>
    <div class="btn-container">
        <div class="action-btn">
            <button @click="DetailPage" class="btn" type="button">{{ ActionButtonText }}</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        ActionButtonText: {
            type: String,
        },
        path: {
            type: String,
            required: true
        }
    },
    methods: {
        DetailPage() {
            this.$router.push(this.path);
        }
    }
}
</script>

<style>
/* .btn-container {
    background-image: linear-gradient(to right, #2E11DE, #FE87FF);
    width: 140px;
} */

.action-btn {
    /* background-image: linear-gradient(to right, #2E11DE, #FE87FF); */
    border-radius: 6px;
    padding: 6px;
    margin: 8px;
    width: 140px;
    background:
        linear-gradient(#480268, #480268) padding-box,
        linear-gradient(to right, #2E11DE, #FE87FF) border-box;
    border-radius: 6px;
    border: 1px solid transparent;
}



/* .action-btn {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: red;
    padding: 6px;
    cursor: pointer;
    transition: color .2s;
} */

/* .action-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, darkblue, darkorchid) border-box;
    border: inherit;
    border-radius: inherit;
    mask:
        linear-gradient(#fff, #fff) padding-box,
        linear-gradient(#fff, #fff);
    mask-composite: exclude; 
}    */


.btn {
    margin: 0 auto;
    width: 100%;
}
</style>