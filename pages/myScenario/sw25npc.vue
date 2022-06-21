<template lang="pug">
div
  SyachiCard(title="〈明けの明星〉")
    p.
      "導きの港" ハーヴェス王国の首都ハーヴェス（→『I』p. 379）の冒険者ギルド支部（→『I』p. 368）〈明けの明星〉の関係者を紹介します。<br>
      〈明けの明星〉は他の多くの冒険者ギルド支部と同様、宿屋と食堂・酒場の機能も備えています。
    MiniTitle#ldo ルドー
    p 冒険者ギルド支部〈明けの明星〉の支部長です。
</template>

<script lang="ts">
import Vue from "vue";

import SyachiCard from "@/components/util/SyachiCard.vue";
import TwitterLink from "@/components/util/TwitterLink.vue";
import Button from "@/components/util/Button.vue";
import MiniTitle from "@/components/util/MiniTitle.vue";

import SceneText from "~/components/scenario/parts/SceneExplainText.vue";

export default Vue.extend({
  name: "PuddingScenarioPage",
  components: {
    SyachiCard,
    TwitterLink,
    Button,
    SceneText,
    MiniTitle,
  },
});
</script>