<template lang="pug">
div
  SyachiCard(title="SW2.5 データ")
    p こちらのページではSW2.5のキャラクター・魔物・アイテム・魔法などのデータを掲載します。
  Character(:data="data")
</template>

<script lang="ts">
import Vue from "vue";
import SyachiCard from "@/components/util/SyachiCard.vue";
import Character from "@/components/data/Character.vue";

import data from "@/assets/data/data.json";

export default Vue.extend({
  components: {
    SyachiCard,
    Character,
  },
  data() {
    return {
      data: data,
    };
  },
});
</script>
