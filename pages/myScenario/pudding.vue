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
  Scenario(:scenarioId="scenarioId")
</template>

<script lang="ts">
import Vue from "vue";

import SyachiCard from "@/components/util/SyachiCard.vue";
import Scenario from "@/components/scenario/index.vue";

import { scenarioById } from "@/assets/scenarios";

const scenarioId = "pudding";

export default Vue.extend({
  name: "PuddingScenarioPage",
  meta: [
    {
      hid: "description",
      name: "description",
      content: scenarioById(scenarioId).messages.join("/n"),
    },
    {
      hid: "description",
      name: "description",
      content: scenarioById(scenarioId).messages.join("/n"),
    },
    {
      hid: "og:site_name",
      property: "og:site_name",
      content: scenarioById(scenarioId).title,
    },
    { hid: "og:type", property: "og:type", content: "website" },
    {
      hid: "og:url",
      property: "og:url",
      content: `https://syachi-hoko-maru.github.io/trpg-system/myScenario/${scenarioId}`,
    },
    {
      hid: "og:title",
      property: "og:title",
      content: scenarioById(scenarioId).title,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: scenarioById(scenarioId).messages.join("/n"),
    },
    {
      hid: "og:image",
      property: "og:image",
      content: scenarioById(scenarioId).src
        ? require(`~/assets/projects/${scenarioById(scenarioId).src}`)
        : `https://syachi-hoko-maru.github.io/trpg-system/syachi.png`,
    },
  ],
  components: {
    SyachiCard,
    Scenario,
  },
  data: function () {
    return {
      scenario: scenarioById(scenarioId),
      scenarioId: scenarioId,
    };
  },
});
</script>