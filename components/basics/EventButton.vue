<template>
    <div>
        <div class="test">
            <button class="testt" type="button">{{ EventButtonText }}</button>
            <p class="testt-text">{{ EventButtonText }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        EventButtonText: {
            type: String,
        }
    }

}
</script>

<style scoped>
.testt {
    cursor: pointer;
    width: 100%;
    height: 36px;
    padding: 6px;
    border-radius: 7px;
    border: 1px solid transparent;
    background: linear-gradient(45deg, #1905da, #fe87ff) border-box;
    -webkit-mask: linear-gradient(#fff, #fff 0) padding-box, linear-gradient(#fff, #fff 0);
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    /* box-shadow: 0 0 20px -7px #FE87FF; */
}

.testt-text {
    margin-top: -30px;
    text-align: center;
}

.test {
    width: 140px;
    height: 36px;
    margin: 10px;
    border-radius: 7px;
}
</style>