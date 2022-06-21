<template lang="pug">
div
  SyachiCard(:title="chapter.chapterName")
    template(v-for="content in chapter.chapterContent")
      template(v-if="content.sectionName")
        Section(:section="content")
      template(v-else-if="content.itemName")
        Item(:item="content")
      parts(v-else, :line="content")
</template>

<script lang="ts">
import Vue from "vue";

import SyachiCard from "@/components/util/SyachiCard.vue";
import Section from "@/components/scenario/Section.vue";
import Item from "@/components/scenario/Item.vue";
import parts from "@/components/scenario/parts/index.vue";

export default Vue.extend({
  name: "ScenarioComponent",
  components: {
    SyachiCard,
    Section,
    Item,
    parts,
  },
  props: {
    chapter: {
      type: Object,
      required: true,
    },
  },
});
</script>