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

export default Vue.extend({
  name: "PuddingScenarioPage",
  components: {
    SyachiCard,
    Scenario,
  },
  asyncData() {
    return {};
  },
  data() {
    const scenarioId = "pudding";
    const scenario = scenarioById(scenarioId);
    const src = scenario.src
      ? require(`~/assets/projects/${scenario.src}`)
      : `https://syachi-hoko-maru.github.io/trpg-system/syachi.png`;

    return {
      scenario: scenario,
      scenarioId: scenarioId,
      title: scenario.title,
      description: scenario.messages.join("/n"),
      src,
    };
  },
  head() {
    return {
      title: this.$data.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$data.description,
        },
        {
          hid: "description",
          name: "description",
          content: this.$data.description,
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: this.$data.title,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://syachi-hoko-maru.github.io/trpg-system/myScenario/${this.$data.scenarioId}`,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.$data.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.$data.description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.$data.src,
        },
      ],
    };
  },
});
</script>