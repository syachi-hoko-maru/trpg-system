<template>
  <CardArrayByAndml :andml="ryuhaAndml" />
</template>

<script setup lang="ts">
import { RyuhaBook, RyuhaData, ryuhaList } from '~/src/dict/ryuha';

const format = (ryuha: RyuhaData) => [
  `&3 ${ryuha.name}`,
  `「${ryuha.name}」はサプリメント『 &em_${ryuha.book} 』に掲載されている流派です。`,
  ryuha.area ? `&br &em_${ryuha.area} に伝わっています。` : "",
  ryuha.description.length ? ["&br", ...ryuha.description] : "",
  ryuha.gino.length ? `&br 主に &em_${ryuha.gino.join("・")} と相性が良い流派です。` : ""
].flat()

const ryuhaAndml = `
&1 このページについて
このページはソード・ワールド2.5（SW2.5/ソドワ）に登場する、「流派」の一覧です。
現在ある &em_${ryuhaList.length}種類 の流派全てを掲載しています！
&br
ソード・ワールド2.5において流派とは、戦闘特技などを拡張し、より複雑な戦闘スタイル等をデータで表わせるルールです。
&br
サプリメント『魔導の学府ユーシズ』で最初に登場し、『バトルマスタリー』で本格的に導入されました。
&br
- 「ソドワにはどんな流派があるの？」
// - 「〇〇するキャラクターを作りたい！　いい流派はあるかな？」
// - 「〇〇って流派、どんな流派なの？」
- 「〇〇って流派はどの本に出てくるの？」
&br
といった方向けに情報まとめています。
&amazon_バトルマスタリー・ユーシズ
&br
ルールブックには出てこないルール・データですので初心者の方は「へ〜こういうのがあるんだ！」くらいに思っておくのがおすすめです。
&br
&br
ソード・ワールド2.5については &link_/sw25,こちら をご覧ください。
またソード・ワールド2.5初心者向け情報は &link_/sw25/forbeginner,こちら にまとめてありますので合わせてご覧ください。
&br
&br
なお、画像には今回Midjourneyを使用して生成した画像を一部使用しています。
詳しくはこちら。
&button_/blog/midjourney

&1 ソード・ワールド2.5の流派一覧
以下はソード・ワールド2.5に登場している流派の一覧です。
現在、 &em_${ryuhaList.length} の流派のデータがあります！
&br
${ryuhaList
    .reduce((prev, curr) => {
      const obj = prev.find(p => p.book === curr.book)
      if (obj) {
        obj.list.push(curr.name)
      } else {
        prev.push({
          book: curr.book,
          list: [curr.name]
        })
      }
      return prev
    }, [] as { book: RyuhaBook, list: RyuhaData["name"][] }[])
    .map(d => [
      `&3 ${d.book}`,
      `${d.book}の流派は以下の${d.list.length}つです。`,
      "&br",
      ...d.list.map(l => `- ${l}`)
    ])
    .flat()
    .join("\n")}

&1 ソード・ワールド2.5の流派詳細
&&tatami_準備中
（準備中）
&br
${ryuhaList
    .map(format)
    .flat()
    .join("\n")}
&&

&1 他のページ
ソード・ワールド2.5に登場する &em_種族 については以下をご覧ください。
&button_/sw25/forbeginner/syuzoku

ソード・ワールド2.5に登場する &em_技能 については以下をご覧ください。
&button_/sw25/forbeginner/ginou
&br
&amazon_バトルマスタリー・博物誌・ユーシズ
`

</script>