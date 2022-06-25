<template lang="pug">
div
  SyachiCard(title="SW2.5 ページまとめ")
    p こちらのページではSW2.5でよく使うページをまとめています。

  SyachiCard(title="キャラクター作成・レギュレーション")
    ul
      li 高レベルキャラクター作成表（→『III』p. 72『ユーシズ』p. 56）
      li 成長回数平均表（→『III』p. 74）
      li ひとりあたり報酬総額と〈剣のかけら〉の目安（→『I』p. 399『II』p. 338『III』p. 338『ユーシズ』p. 58）
    MiniTitle(title="シナリオ")
    ul
      li 「不死の女王の眷属」（→『II』p. 339）
      li 「ラブソングの行方」（→『KF』p. 48）
      li 「地下鉄遺跡にて……」（→『KF』p. 66）

  SyachiCard(title="ワールド")
    MiniTitle 汎用
    ul
      li 冒険者ギルド支部（→『I』p. 368）
      li 魔動機文明アル・メナス時代（→『I』p. 355）
      li "奈落の魔域"（→『I』p. 377）
    MiniTitle 各地方・国
    ul
      li "導きの港" ハーヴェス王国の首都ハーヴェス（→『I』p. 379）
        ul
          li 
      li "鉄と鋼の盟主" キングスレイ鉄鋼王国の首都キングスフォール（→『II』p. 319）
        ul
          li 「冒険者無料パス」（→『KF』p. 42）
          li 「大鉄道祭」（→『KF』p. 14 p. 46）
          li 「天誅祭」（→『KF』p. 40 p. 46）
          li グランドターミナル駅区（→『KF』p. 11）
            ul
              li ストラスフォード大聖堂（→『KF』p. 14）
              li 〈軌上の鉄獣〉（→『KF』p. 48）
                ul
                  li 支部長ダン・ラッシャー（→『KF』p. 49）
          li 北東トライネヤ駅区（→『KF』p. 28）
            ul
              li アステリア神殿（→『KF』p. 30）

  SyachiCard(title="魔物")
    ul
      li ウルフ（→『I』p. 450『ML』p. 100）
      li ジャイアントリザード（→『I』p. 451『ML』p. 100）
      li パープルアント（→『I』p. 451『ML』p. 101）
      li エルビレア（→『I』p.469）
</template>

<script lang="ts">
import Vue from "vue";

import SyachiCard from "@/components/util/SyachiCard.vue";
import TwitterLink from "@/components/util/TwitterLink.vue";
import Button from "@/components/util/Button.vue";
import MiniTitle from "@/components/util/MiniTitle.vue";

export default Vue.extend({
  name: "pagesPage",
  components: {
    SyachiCard,
    TwitterLink,
    Button,
    MiniTitle,
  },
  data: function () {
    return {};
  },
});
</script>
