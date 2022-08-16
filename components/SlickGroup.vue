<template>
    <div>
        <v-slide-group>
            <div>kjasd</div>
            <div>aiksjdhb</div>
        </v-slide-group>
        <Button ButtonText="Click All" />
        <Button v-on:click="say('asd')" ButtonText="Buy It" />
        <Nuxt-link class="link" to="/"><Button ButtonText="Go to HomePage" /></Nuxt-link>
    </div>
</template>

<script>
export default {
    methods: {
        say: function (msg) {
            alert(msg)
        }
    }
}
</script>

<style scoped>
.link {
    text-decoration: none;
    color: #fff;
    font-weight: 800;
}
</style>