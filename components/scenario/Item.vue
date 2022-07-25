<template lang="pug">
div
  .subtitle-1 {{ item.itemName }}
  template(v-for="itemContent in item.itemContent")
    parts(:box="itemContent")
</template>

<script lang="ts">
import Vue from "vue";

import parts from "@/components/scenario/parts/index.vue";

export default Vue.extend({
  name: "ScenarioComponent",
  components: { parts },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
});
</script>