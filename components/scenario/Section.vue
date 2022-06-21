<template lang="pug">
div
  MiniTitle {{ section.sectionName }}
  template(v-for="sectionContent in section.sectionContent")
    template(v-if="sectionContent.itemName")
      Item(:item="sectionContent")
    parts(v-else, :line="sectionContent")
</template>

<script lang="ts">
import Vue from "vue";

import MiniTitle from "@/components/util/MiniTitle.vue";
import Item from "@/components/scenario/Item.vue";
import parts from "@/components/scenario/parts/index.vue";

export default Vue.extend({
  name: "ScenarioComponent",
  components: {
    MiniTitle,
    Item,
    parts,
  },
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
});
</script>