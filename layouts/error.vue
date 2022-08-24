<template>
  <v-app dark>
    <v-container>
      <v-row>
        <v-col align="center">
             <v-img class="mt-16" :src="require('~/assets/images/err-img.svg')" max-width="400"></v-img>
             <h2>An error occured</h2>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
}
</script>
