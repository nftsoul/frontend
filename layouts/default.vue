<template>
  <v-app>
    <div v-if="loaded">
      <LayoutAppbar />
      <CommonSolscan />
      <Nuxt />
      <LayoutFooter />
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
    };
  },
  mounted(){
    this.loaded=true
  }
};
</script>

<style lang="css">
@import "~/assets/styles/main.css";
</style>
