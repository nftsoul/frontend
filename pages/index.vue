<template>
  <div>
    <LandingPage />
    <Cards />
  </div>
</template>

<script>
import Buttons from '../components/sections/Buttons.vue';
import Cards from '../components/sections/Cards.vue';
import LandingPage from '../components/sections/LandingPage.vue';
export default {
  name: "IndexPage",
  components: { Buttons, Cards, LandingPage }
}
</script>
