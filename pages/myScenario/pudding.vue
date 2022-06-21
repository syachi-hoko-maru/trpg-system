<template lang="pug">
div
  SyachiCard(
    title="とろ〜りとしたあまいやつ",
    :src="require(`~/assets/projects/pudding.png`)"
  )
  Scenario(scenarioId="pudding")
</template>

<script lang="ts">
import Vue from "vue";
import * as fs from "fs";

import SyachiCard from "@/components/util/SyachiCard.vue";
import TwitterLink from "@/components/util/TwitterLink.vue";
import Button from "@/components/util/Button.vue";
import MiniTitle from "@/components/util/MiniTitle.vue";

import Scenario from "@/components/scenario/index.vue";

export default Vue.extend({
  name: "PuddingScenarioPage",
  components: {
    SyachiCard,
    TwitterLink,
    Button,
    MiniTitle,
    Scenario,
  },
});
</script>