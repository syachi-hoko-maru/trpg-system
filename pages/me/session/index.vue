<template>
  <card>
    <template #title>準備中</template>
  </card>
  <card>
    <template #title>おすすめのページ</template>
    <andml :andmls="andml1" />
  </card>
</template>

<script setup lang="ts">
const andml1 = `
ソード・ワールド2.5の最新情報はこちら！
2023年7月20日発売予定のサプリメント『アーケインレリック』の情報もあります。
&button_/sw25/new
&button_/blog/arcane_relic

ソード・ワールド2.5で役立つツールはこちら！
&button_/sw25/tool

ソード・ワールド2.5の初心者向け情報はこちら！
おすすめシナリオやおすすめサプリメントの紹介もあります。
&button_/sw25/forbeginner
`
</script>