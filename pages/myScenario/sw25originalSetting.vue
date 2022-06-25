<template lang="pug">
div
  SyachiCard(title="〈明けの明星〉")
    p.
      "導きの港" ハーヴェス王国の首都ハーヴェス（→『I』p. 379）の冒険者ギルド支部（→『I』p. 368）〈明けの明星〉の関係者を紹介します。<br>
      〈明けの明星〉は他の多くの冒険者ギルド支部と同様、宿屋と食堂・酒場の機能も備えています。
    MiniTitle#ldo ルドー
    p 冒険者ギルド支部〈明けの明星〉の支部長を務める豪快な男です。
    p かつては自身も冒険者であり、「最強の冒険者になる」と息込んでましたが、怪我もあって20年前に引退しこの支部で働くようになりました。7年前に亡くなった先代（リルドラケン／男／享年320）を継いで支部長となりました。
    p 気前がよく、なんらかの機会があればすぐに奢ってくれ、手が空いてれば自ら厨房に立つこともあります。そのこともあってから冒険者からは慕われています。
    p 弟のレオ（レオル・オレンビーク 人間／男／43）はハーヴェスの宮廷料理人です。
    p 「ほら、お祝いに奢ってやる！　食え食え。食える時にいっぱい食っとくのが大事だ！」
    p 「おう。行ってこい！　元気に帰ってこいよ！」
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