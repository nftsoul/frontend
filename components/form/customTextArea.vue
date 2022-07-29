<template>
  <div>
    <v-textarea
      @input="handleInput"
      :rules="rules"
      :rows="rows"
      dense
      outlined
      background-color="#030537"
      :placeholder="placeholder"
      :auto-grow="autoGrow"
      color="white"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    rules: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data(){
    return{
      autoGrow:true,
      rows:2
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    },
  },
};
</script>
