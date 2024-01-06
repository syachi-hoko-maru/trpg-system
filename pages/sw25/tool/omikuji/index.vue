<template>
    <Card>
        <template #title>
            ソドワおみくじ
        </template>
        <Andml :andmls="discription" />
        <PagesOmikujiButton>おみくじを引く</PagesOmikujiButton>
        <Andml :andmls="note" />
    </Card>
</template>
<script setup lang="ts">
const thisYear = new Date().getFullYear()
const discription = `
「ソドワおみくじ」はTRPG「ソード・ワールド2.5」（SW2.5/ソドワ）の運勢を占うおみくじです。
&br
あなたの${thisYear}年の運勢を占ってみましょう！！
`

const note = `
&br
おみくじでわかるのは「シナリオ運」や「相性の良い種族・技能」などです。
&br
相性の良い種族や技能を用いて、ソード・ワールド2.5を遊んでみたら楽しめること間違いなし！　かもです！
`

</script>