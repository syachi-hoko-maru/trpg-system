<template>
    <CardArrayByAndml :andml="andml1" />
    <slot />
    <CardArrayByAndml :andml="andml2" />
</template>

<script setup lang="ts">
const andml1 = `
&1 このページについて
このシナリオはしゃちほこ丸によるオリジナルサプリメント『シナノシマ¥s妖との戦い』の要素紹介ページです。
詳しくはこちらもご覧ください。
&button_/sw25/data/shinano
`

const andml2 = `
&1 『シナノシマ 妖との戦い』へ戻る
&button_/sw25/data/shinano
`

</script>