<template>
    <div class="button__container">
        <!-- <div class="outer-btn">
                <div class="inner-btn">
                    <button @click="AnotherPage" type="button" class="text-btn">{{ ButtonText }}</button>
                </div>
            </div> -->

        <div class="test">
            <!-- <div class="testt"></div> -->
            <button @click="AnotherPage" type="button" class="testt">{{ ButtonText }}</button>
            <p class="testt-text">{{ ButtonText }}</p>
        </div>
    </div>
</template> 

<script>
export default {
    props: {
        ButtonText: {
            type: String,
            default: () => "Label",
        },
        path: {
            type: String,
            required: true
        }
    },
    methods: {
        AnotherPage() {
            this.$router.push(this.path);
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
    box-shadow: 0 0 20px -7px #FE87FF;
}

.testt>p {
    color: red;
    /* position: absolute; */
    top: -20px;
    margin-top: -20px;
}

.outer-btn {
    background: #000229;
    padding: 1px;
    margin: 4px;
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
    width: 100%;
}
</style>