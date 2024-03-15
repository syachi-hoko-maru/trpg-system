<template>
  <div>
    <Card>
      <template #title>流派YesNo診断</template>
      <Andml
        andmls="「YES」「NO」を答えるだけで、あなたにおすすめの流派を紹介します。"
      />
      <ItemButton @click="openDialogoYesNo('ryuha')">開始する</ItemButton>
    </Card>
    <CardArrayByAndml :andml="ryuhaAndml" />
  </div>
</template>

<script setup lang="ts">
import { ginou } from "~/src/dict/ginou";
import type { RyuhaBook, RyuhaData } from "~/src/dict/ryuha";
import { ryuhaList } from "~/src/dict/ryuha";

const { openDialogoYesNo } = useDialogo();

const format = (ryuha: RyuhaData) =>
  [
    `&3 &id_detail_${ryuha.name},${ryuha.name}`,
    `【${ryuha.name}】はサプリメント『${ryuha.book.replace(
      /（.*）/,
      ""
    )} 』に掲載されている流派です。`,
    ryuha.description.length ? [...ryuha.description] : "",

    "&4 地域",
    ryuha.area,
    ryuha.area === "他の大陸"
      ? [
          "- 前版である「ソード・ワールド2.0」から公式に移植されたデータです。 &br テラスティア大陸から渡ってきた人から習ったものとして、導入できます。 &br 詳しくは『バトルマスタリー』をご覧ください。",
        ]
      : "",
    ,
    ryuha.gino.length
      ? ["&4 相性の良い技能", ...ryuha.gino.map((g) => `- ${g}`)]
      : "",
  ].flat();

const ryuhaAndml = `
&1 このページについて
このページはソード・ワールド2.5（SW2.5/ソドワ）に登場する、「流派」の一覧です。
現在ある &em_${ryuhaList.length}種類 の流派全てを掲載しています！
&br
- 「ソドワにはどんな流派があるの？」
- 「〇〇するキャラクターを作りたい！　いい流派はあるかな？」
- 「〇〇って流派、どんな流派なの？」
- 「〇〇って流派はどの本に出てくるの？」
&br
といった方向けです！

&3 流派とは？
ソード・ワールド2.5における「流派」とは、戦闘特技などを拡張し、より複雑な戦闘スタイル等をデータで表わせるルールです。
&br
サプリメント『魔導の学府ユーシズ』で最初に登場し、『バトルマスタリー』で本格的に導入されました。
&br
&em_ルールブックには出てこないルール・データです ので初心者の方は「へ〜こういうのがあるんだ！」くらいに思っておくのがおすすめです。
&amazon_バトルマスタリー・博物誌・ユーシズ

&3 流派いっぱいあってわからない……
- 「流派っていっぱいあるんだ……」
- 「${
  ryuhaList.length
}種類もあるなんて、全部見たらわけわかんなくなっちゃうよ……」
&br
という方向けに、このページでは以下のコンテンツを用意しています。
&4 流派YesNo診断
少し上にスクロールするとあります。
質問に「Yes」「No」「わからない」で答えるだけでおすすめの流派がわかります！
&button_#流派YesNo診断 こちら

&4 「技能」別流派一覧
下の方にあります。
技能（ファイター・ソーサラー・スカウトなど）ごとに、おすすめの流派をまとめています！
&button_#おすすめ技能別の流派一覧 こちら

&3 関連ページ
ソード・ワールド2.5については &link_/sw25,こちら をご覧ください。
またソード・ワールド2.5初心者向け情報は &link_/sw25/forbeginner,こちら にまとめてありますので合わせてご覧ください。

&3 注意
なお、画像には今回Midjourneyを使用して生成した画像を一部使用しています。
詳しくはこちら。
&button_/blog/midjourney

&1 ソード・ワールド2.5の流派一覧
以下はソード・ワールド2.5に登場している流派の一覧です。
現在、 &em_${ryuhaList.length}種類の流派のデータ があります！
&br
クリックするとその流派の詳細に飛びます。
${ryuhaList
  .reduce((prev, curr) => {
    const obj = prev.find((p) => p.book === curr.book);
    if (obj) {
      obj.list.push(curr.name);
    } else {
      prev.push({
        book: curr.book,
        list: [curr.name],
      });
    }
    return prev;
  }, [] as { book: RyuhaBook; list: RyuhaData["name"][] }[])
  .map((d) => [
    `&3 ${d.book}`,
    `${d.book}の流派は以下の${d.list.length}つです。`,
    "&br",
    ...d.list.map((l) => `- &link_#detail_${l},${l}`),
  ])
  .flat()
  .join("\n")}

&1 ソード・ワールド2.5の流派詳細
個別の詳細な解説は現在準備中です。
&br
${ryuhaList.map(format).flat().join("\n")}

&1 おすすめ技能別の流派一覧
クリックするとその流派の詳細に飛びます。
&br
技能一覧はこちら。
&button_/sw25/forbeginner/ginou
${ginou
  .map((g) => {
    const ryuhaListForGino = ryuhaList.filter((r) => {
      // 技能が含まれる
      if (r.gino.findIndex((rg) => rg === g.name) >= 0) return true;
      // 魔法使い系
      if (
        g.type.find((t) => t === "魔法使い系") &&
        r.gino.findIndex((rg) => rg === "全ての魔法使い系技能") >= 0
      )
        return true;
      // マギシュー
      if (
        (g.name === "マギテック" || g.name === "シューター") &&
        r.gino.findIndex((rg) => rg === "マギシュー") >= 0
      )
        return true;
    });
    return [
      `&3 ${g.name}`,
      ...ryuhaListForGino.map(
        (r) =>
          `- &link_#detail_${r.name},【${r.name}】 （${r.book.replace(
            /（.*）/,
            ""
          )}）`
      ),
      ryuhaListForGino.length === 0
        ? `現在、${g.name}と特別に相性が良い流派はありません`
        : "",
    ];
  })
  .flat()
  .join("\n")}

&1 他のページ
ソード・ワールド2.5に登場する &em_種族 については以下をご覧ください。
&button_/sw25/forbeginner/syuzoku

ソード・ワールド2.5に登場する &em_技能 については以下をご覧ください。
&button_/sw25/forbeginner/ginou
&br
&amazon_バトルマスタリー・博物誌・ユーシズ
`;
</script>
