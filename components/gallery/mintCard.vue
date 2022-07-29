<template>
  <div>
    <v-card
      color="transparent"
      flat
      class="pa-5"
      max-width="300"
      height="470"
      @click="$router.push({ name: 'preview-id', params: { id: mintId } })"
    >
      <div class="outer-card">
        <div class="inner-card">
          <v-img
            :src="image"
            :lazy-src="image"
            class="mx-auto"
            width="220"
            height="220"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card class="rounded-pill mt-n6" max-width="150">
            <v-list dense class="py-1">
              <v-list-item dense class="pa-0">
                <v-list-item-avatar class="my-0 ml-2">
                  <v-img
                    v-if="creator.image_link"
                    :src="creator.image_link"
                  ></v-img>
                  <v-icon v-else>mdi-account-tie</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="ml-n2" v-if="creator.name">{{
                    creator.name.slice(0, 10)
                  }}</v-list-item-title>
                  <v-list-item-title class="ml-n2" v-else>{{
                    creator.wallet_address.slice(0, 5)
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card-subtitle class="text-left mx-n3"
            >{{ title.slice(0, 20)
            }}<span v-if="title.length > 20">..</span></v-card-subtitle
          >

          <br />

          <v-col class="pa-0" align="center">
            <small>2 hr 34 minutes 2 sec</small>
            <v-row no-gutters>
              <small class="mr-1">Items: 12</small>
              <v-spacer></v-spacer>
              <small class="mr-1">Price: {{ mintPrice }}</small>
            </v-row>
          </v-col>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>

export default {
  props: {
    mintId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    mintPrice: {
      type: Number,
      required: true,
    },
    creator: {
      type: Object,
      required: true,
    },
  },
};
</script>
