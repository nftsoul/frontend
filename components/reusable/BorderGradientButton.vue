<template>
    <div class="outer-btn text-center" @click="$emit('click')">
        <div class="inner-btn">
            <v-icon>{{ IconName }}</v-icon>
            <p class="mt-n1" style="line-height: 1.8; font-size: 14px; ">{{ ButtonText }}</p>
            <v-icon>{{ IconSecondName }}</v-icon>
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
        },
        IconSecondName: {
            type: String
        }
    },
}
</script>

<style>
.inner-btn {
    display: flex;
    justify-content: center;
    align-items: bottom;
}
</style>