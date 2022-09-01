<template>
  <div>
    <v-text-field
      @input="handleInput"
      :rules="rules"
      dense
      outlined
      background-color="#030537"
      :placeholder="placeholder"
      color="white"
      :type="inputtype"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    inputtype:{
       type:String,
       default:null
    },
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
 
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    },
  },
};
</script>
