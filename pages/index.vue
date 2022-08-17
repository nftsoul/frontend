<template>
  <div>
    <Buttons />
    <Cards />
  </div>
</template>

<script>
import Buttons from '../components/sections/Buttons.vue';
import Cards from '../components/sections/Cards.vue';
export default {
  name: "IndexPage",
  components: { Buttons, Cards }
}
</script>
