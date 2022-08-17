<template>
  <v-app dark>
    <v-main>
      <MyNav />
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import MyNav from "../components/header/MyNav.vue";
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  },
  components: { MyNav }
}
</script>
