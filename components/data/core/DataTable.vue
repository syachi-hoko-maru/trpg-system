<template lang="pug">
dl
  dt {{ title }}
  dd.text-center {{ data ? data : '-' }}
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "dataTable",
  props: {
    title: {
      type: String,
    },
    data: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/main.sass";

dt {
  background-color: #283593;
}
</style>
