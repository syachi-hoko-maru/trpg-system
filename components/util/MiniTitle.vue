<template lang="pug">
div
  h3.mt-5.mb-2
    slot
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MiniTitleComponent",
});
</script>