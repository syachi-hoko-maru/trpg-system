<template>
  <card-array-by-andml :andml="andml1" />
  <item-pagesindex
    title="他のキャラクタービルド"
    :page-setting-list="
      $pageSettingList.filter(
        (pa) => pa.to.indexOf('/sw25/forbeginner/build/') === 0
      )
    "
  />
  <card-array-by-andml :andml="andml2" />
</template>

<script setup lang="ts">
interface Props {
  aboutThisPage: string;
  main: string;
}
const Props = defineProps<Props>();

const andml1 = `
&1 このページについて
このページはソード・ワールド2.5（SW2.5/ソドワ）におけるキャラクターのビルド（データ構成）の作り方を初心者向けにわかりやすく解説するシリーズの1ページです。
&br
${Props.aboutThisPage}
&br
ぜひ最後まで読んでください。
また、 &em_もしよければ周りの方に共有 してください。
&br
&em_基本について や &em_パーティーのバランスなど が気になる方や、 &em_他のキャラクタービルド が気になる方は以下のページをご覧ください。
&button_/sw25/forbeginner/build

${Props.main}

&1 キャラクタービルドをいろいろ解説しています
&em_パーティーのバランスなど基本 が気になる方や、 &em_他のキャラクタービルド が気になる方は以下のページをご覧ください。
&button_/sw25/forbeginner/build
`;

const andml2 = `
&1 併せて読んで欲しいページ
「種族や技能ってどんなのがあるの？」って人はぜひ以下のページを見てください。
&button_/sw25/forbeginner/syuzoku
&button_/sw25/forbeginner/ginou
また、ソード・ワールド2.5などのTRPGのキャラクターシートを保管・共有できるWebサービス「ゆとシート」の使い方を以下で公開しています。
&button_/sw25/forbeginner/ytsheet
ぜひどれもご覧ください。
`;
</script>
