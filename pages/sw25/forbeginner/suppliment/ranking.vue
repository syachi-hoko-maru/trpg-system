<template>
  <CardArrayByAndml :andml="andml1" />
  <card v-for="(suppliment, i) of ranking.filter(r => r.rank <= 5).sort((a, b) => - a.rank + b.rank)">
    <template #title>
      {{ suppliment.rank }}位 {{ suppliment.name }}
    </template>
    <template #before>
      <div class="d-flex flex-column align-center">
        <v-rating v-model="suppliment.ossusume" readonly size="x-small" class="px-5" half-increments />
      </div>
    </template>
    <andml :andmls="setExplainAndml(suppliment)" />
  </card>
  <CardArrayByAndml :andml="andml2" />
</template>

<script setup lang="ts">
const { $suppliments } = useNuxtApp()

type RankingData = Suppliment & {
  gname: string
  gnum: number;
  rank: number;
}

let nowScore = 0
let nowRank = 0
const ranking: RankingData[] = $suppliments
  .map((sg, i) => sg.items.map(s => Object.assign(s, { gname: sg.type, gnum: i })))
  .flat()
  .sort((a, b) => -a.ossusume + b.ossusume)
  .map((s, i) => {
    if (s.ossusume !== nowScore) {
      nowScore = s.ossusume
      nowRank = i + 1
    }
    return Object.assign(s, { rank: nowRank })
  })

const setExplainAndml = (rankingData: RankingData) => {
  const top = rankingData.rank === 1
  return `
  ${top ? "そして、" : ""}おすすめサプリメントランキングの${top ? "栄えある" : ""}第${rankingData.rank}位は &em_「おすすめ度：${rankingData.ossusume}」 の『 &em_${rankingData.name} 』です！
  サプリメント『${rankingData.name}』は &em_「${rankingData.gname}」に分類されるサプリ です。
  &br
  ${top ? "1位に輝いた" : ""}『${rankingData.name}』の &em_内容やおすすめのポイント は以下のページで紹介しています！
  併せてご覧ください。
&button_/sw25/forbeginner/suppliment/${rankingData.gnum + 2}/#${rankingData.name} こちら
&amazon_${rankingData.name}
  `
}

const andml1 = `
&1 このページについて
このページではソード・ワールド2.5の初心者向けに、 &em_おすすめのサプリメントをランキング形式で紹介 します。
「どのサプリメントがおすすめなのか知りたい！」って方、ぜひご覧ください。
&br
「全てのサプリメントについて知りたい！」って方は以下のページも併せてご覧ください。
&button_/sw25/forbeginner/suppliment

&2 注意
なお、あくまでもこれは個人のつけた初心者向けおすすめ度のランキングです。
これを見て購入して何らかの不利益を被ったとしても、責任を取れません。
ご注意ください。

&1 いきなりトップ5を紹介
いきなりですが、 &em_総合ランキングトップ5 を紹介します！
&br
なお、下では発売済みの &em_全${ranking.length}つのサプリの順位表 を掲載しているので最後まで見ていってください！
`

const andml2 = `
&1 発売済み全${ranking.length}つのサプリの順位表
では、ソード・ワールド2.5の全${ranking.length}つのサプリのおすすめ度順位表を紹介します。
&br
なお、これはあくまでの個人のつけた &em_初心者向けおすすめ度 です。
順位が低いものも &em_初心者におすすめではないだけ でとても良いサプリメントなので、ぜひ最終的には全部揃えてください！
&br
` + ranking.map(r => `第${r.rank}位¥s &link_/sw25/forbeginner/suppliment/${r.gnum + 2}/#${r.name},${r.name}（${r.gname}）`).join("\n")
  + `
&br
それぞれのサプリについて &em_「詳しく知りたい！」 って方はそれぞれのリンクへ飛ぶか、以下のページをご覧ください。
&button_/sw25/forbeginner/suppliment/1/

他にもこのウェブサイトには初心者向けの情報や、ソード・ワールド2.5用のツールを公開しているのでぜひご覧ください。
&button_/sw25/forbeginner
&button_/sw25/tool

`
</script>