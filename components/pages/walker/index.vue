<template>
  <CardArrayByAndml :andml="andml" />
  <CardArrayByAndml :andml="middle" />
  <PagesWalkerList />
  <CardArrayByAndml :andml="end" />
</template>

<script setup lang="ts">
interface Props {
  andml: string;
}
const Props = defineProps<Props>();

const middle = `&1 シリーズについて
こちらをご覧ください。
&button_/sw25/data/walker
`;

const end = `&1 おすすめページ
しゃちほこ丸が作成したオリジナルデータは以下にまとまっています！
ぜひこちらもあわせてご覧ください。
&button_/sw25/data

シナリオを探している方は以下をご参考にしてください。
&button_/sw25/forbeginner/scenario
&button_/scenario

公式情報を集めたい方はサプリメント紹介や新刊情報をご活用ください。
&button_/sw25/forbeginner/suppliment/1
&button_/sw25/feature/new

ハーヴェス周辺の情報は以下などに載っています。
&amazon_ブルライト博物誌・グランゼール
`;
</script>
