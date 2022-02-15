<template lang="pug">
div
  v-card.my-5
    v-card-title.headline(v-if="title") {{ title }}
    v-card-text
      slot
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "SyachiCard",
  props: {
    title: {
      type: String,
    },
  },
});
</script>
