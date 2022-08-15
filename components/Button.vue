<template>
    <div class="button__container">
        <div class="outer-btn">
            <div class="inner-btn">
                <!-- <button class="text-btn">{{ ButtonText }}</button> -->
                <p class="text-btn">{{ ButtonText }}</p>
            </div>
        </div>
        <!-- <button class="bbtn">{{ ButtonText }}</button> -->
    </div>
</template> 

<script>
export default {
    props: {
        ButtonText: {
            type: String,
            default: () => "Label",
        }
    }
}
</script>

<style scoped>
.outer-btn {
    background: #000229;
    padding: 2px;
    margin: 10px;
    border-radius: 6px;
    width: 140px;
    background-image: linear-gradient(to right, #2E11DE, #FE87FF);
    box-shadow: 0 0 20px -7px #FE87FF;
    cursor: pointer;
}

.inner-btn {
    background: #000229;
    border-radius: 6px;
    padding: 8px;
}

.text-btn {
    margin: 0;
    text-align: center;
}
</style>