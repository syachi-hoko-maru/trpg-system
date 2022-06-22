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
const title = scenarioById(scenarioId).title;
const description = scenarioById(scenarioId).messages.join("/n");
const src = scenarioById(scenarioId).src
  ? require(`~/assets/projects/${scenarioById(scenarioId).src}`)
  : `https://syachi-hoko-maru.github.io/trpg-system/syachi.png`;

export default Vue.extend({
  name: "PuddingScenarioPage",
  meta: [
    {
      hid: "description",
      name: "description",
      content: description,
    },
    {
      hid: "description",
      name: "description",
      content: description,
    },
    {
      hid: "og:site_name",
      property: "og:site_name",
      content: title,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: `https://syachi-hoko-maru.github.io/trpg-system/myScenario/${scenarioId}`,
    },
    {
      hid: "og:title",
      property: "og:title",
      content: title,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: description,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: src,
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