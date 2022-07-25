<template lang="pug">
div
  MiniCard(title="GM向け情報")
    slot
</template>

<script lang="ts">
import Vue from "vue";
import MiniCard from "@/components/util/MiniCard.vue";

export default Vue.extend({
  name: "GMInfoTextComponent",
  components: {
    MiniCard,
  },
});
</script>