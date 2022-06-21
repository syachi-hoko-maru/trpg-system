<template lang="pug">
div
  SyachiCard(
    :title="scenario.title",
    :src="scenario.src ? require(`~/assets/projects/${scenario.src}`) : ''"
  )
    p
      span.system {{ scenario.system }}
      br
      template(v-for="special in scenario.specials")
        span.special {{ special }}
        br
    p
      template(v-for="data in scenario.data")
        span.data {{ data }}
        br
  Scenario(scenarioId="pudding")
</template>

<script lang="ts">
import Vue from "vue";

import SyachiCard from "@/components/util/SyachiCard.vue";
import Scenario from "@/components/scenario/index.vue";

import { scenarioById } from "@/assets/scenarios";

export default Vue.extend({
  name: "PuddingScenarioPage",
  components: {
    SyachiCard,
    Scenario,
  },
  data: function () {
    return {
      scenario: scenarioById("pudding"),
    };
  },
});
</script>