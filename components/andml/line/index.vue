<template>
  <component
    v-for="(data, i) of dataArray"
    :is="data.component"
    :props="data.props"
    :key="(data.andml ? data.andml : ``) + i"
  >
    <andml-inline :andml="data.andml" />
  </component>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { AndmlData, AndmlScript } from "~~/types/andml";

interface Props {
  andmls: string[];
}
const Props = defineProps<Props>();

// lineの処理
const andmlLineScriptArray: AndmlScript[] = [
  // 見出し
  { script: "2", component: resolveComponent("AndmlLineHead2") },
  { script: "3", component: resolveComponent("AndmlLineHead3") },
  { script: "4", component: resolveComponent("ItemHead4") },
  // インタビュー用
  { script: "syachi", component: resolveComponent("AndmlLineSyachi") },
  // ボタン
  { script: "button_", component: resolveComponent("AndmlLineButton") },
  {
    script: "button-share",
    component: resolveComponent("AndmlLineButtonShare"),
  },
  {
    script: "button-dark",
    component: resolveComponent("PagesSettingDarkmode"),
  },
  { script: "button-event_", component: resolveComponent("PagesSettingEvent") },
  {
    script: "button-dice_",
    component: resolveComponent("AndmlLineButtonDice"),
  },
  {
    script: "copy_",
    component: resolveComponent("AndmlLineButtonCopy"),
  },
  // 画像・動画・ツイート埋め込み
  { script: "img_", component: resolveComponent("AndmlLineImgc") },
  { script: "camera_", component: resolveComponent("AndmlLineCamera") },
  { script: "youtube_", component: resolveComponent("AndmlLineYoutube") },
  { script: "tweet_", component: resolveComponent("AndmlLineTweet") },
  { script: "lottie_", component: resolveComponent("ItemLottie") },
  // ソドワ用
  { script: "weapon_", component: resolveComponent("ItemSw25Weapon") },
  { script: "item_", component: resolveComponent("ItemSw25Item") },
  { script: "gishiki_", component: resolveComponent("ItemSw25Gishiki") },
  // 更新日時用
  { script: "date_", component: resolveComponent("AndmlLineDate") },
  // 告知・宣伝
  { script: "ltwitter", component: resolveComponent("AndmlLineTwitter") },
  { script: "amazon_", component: resolveComponent("AndmlLineAmazon") },
  { script: "c102", component: resolveComponent("ItemNoticeC102") },
  // バナー
  { script: "harry", component: resolveComponent("ItemBannerHarry") },
  // 名刺
  { script: "meishi", component: resolveComponent("AndmlLineMeishi") },
  // ゲーム関連
  { script: "game", component: resolveComponent("Game") },
  { script: "fireworks", component: resolveComponent("GameFireworks") },
  {
    script: "halloween-score",
    component: resolveComponent("GameHalloweenScore"),
  },
  { script: "rpg", component: resolveComponent("GameRpg") },
];

const setLineComponent = (andml: string): AndmlData => {
  if (andml.startsWith("-")) {
    // 箇条書きは特別扱い
    const reg = new RegExp(`^(-+)\s*([^-].*)$`);
    return {
      props: andml.replace(reg, "$1"),
      andml: andml.replace(reg, "$2"),
      component: resolveComponent("AndmlLineList"),
    };
  }
  if (andml.startsWith(`//`)) {
    // コメントアウトは特別扱い
    return {
      andml: "",
      component: resolveComponent("AndmlLineP"),
    };
  }
  for (let script of andmlLineScriptArray) {
    if (andml.startsWith(`&${script.script}`)) {
      if (script.script.endsWith("_")) {
        const reg = new RegExp(`^&${script.script}([^\\s]+)(\\s+(.*))?$`);
        const matchArray = andml.match(reg);
        if (!matchArray)
          throw createError(`[Error] AndmlLineScript "${andml}" is not found`);
        return {
          props: matchArray[1],
          andml: matchArray[3],
          component: script.component,
        };
      } else {
        const reg = new RegExp(`^&${script.script}\\s*(.*)$`);
        const matchArray = andml.match(reg);
        if (!matchArray)
          throw createError(`[Error] AndmlLineScript "${andml}" is not found`);
        return {
          andml: matchArray[1],
          component: script.component,
        };
      }
    }
  }
  return {
    andml,
    component: resolveComponent("AndmlLineP"),
  };
};
const dataArray: Ref<AndmlData[]> = computed(() =>
  Props.andmls.map(setLineComponent)
);
</script>
