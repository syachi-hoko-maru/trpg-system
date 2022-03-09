<template lang="pug">
div(:id="id")
  v-card.my-5
    v-img(v-if="src", :src="src", :alt="title")
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
