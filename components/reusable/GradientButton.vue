<template>
    <div>
        <!-- <v-btn class="btn-exhibit ma-3" width="100" @click="exhibit()">{{ GradientButtonText }}</v-btn> -->
        <v-btn class="btn-exhibit ma-3" @click="$emit('click')">{{ ButtonText }}</v-btn>
    </div>
</template>

<script>
export default {
    props: {
        ButtonText: {
            type: String
        },
    },
}
</script>

<style>
.btn-exhibit {
    background: linear-gradient(264.75deg,
            #fe87ff 3.04%,
            #fd2bff 23.86%,
            #c202d3 41.34%,
            #5e0fff 68.89%,
            #1905da 99.63%);
    border-radius: 7px;
}
</style>