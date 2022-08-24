<template>
    <div style="margin: 3px">
        <div class="btn-gradient" style="width: 150px; height: 40px" @click="$emit('click')">
        </div>
        <div class="body-2" style="margin: -30px 0 0 10px">
            <v-icon>{{ IconName }}</v-icon>
            <span>{{ ButtonText }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        ButtonText: {
            type: String
        },
        IconName: {
            type: String
        }
    }
}
</script>

<style>
.btn-plus {
    background: linear-gradient(264.75deg,
            #fe87ff 3.04%,
            #fd2bff 23.86%,
            #c202d3 41.34%,
            #5e0fff 68.89%,
            #1905da 99.63%) !important;
    border-radius: 50%;
    padding: 0px 2px;
}
</style>