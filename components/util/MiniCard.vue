<template lang="pug">
div(:id="id")
  v-card
    v-card-text
      .subtitle-1 {{ title }}
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
    src: {
      type: String,
    },
    id: {
      required: false,
      type: String,
    },
  },
});
</script>
