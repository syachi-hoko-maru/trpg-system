<template>
  <card-array-by-andml :andml="andml1" />
</template>

<script setup lang="ts">
import { isPast } from "~/src/util/date";

const { $templateText } = useNuxtApp();
const andml1 = `
&1 このページについて
このページでは管理人のしゃちほこ丸が作った、 &em_ソード・ワールド2.5（SW2.5/ソドワ）などのTRPGで役立つ素材 を &em_全て無料で公開 しています。
&br
ココフォリアでの使用を想定して作っていますが、その他のツールを使用したオンラインセッション（オンセ）や対面でのセッション（オフセ）でも幅広く利用できます。

&2 利用規約
&em_禁止事項 は以下の4つです。必ずご確認ください。
&br
- 自作発言
- TRPGセッション以外での使用（同人誌など）
- 二次配布（加工したものを含む）
- その他、各TRPGシステムのルールに反する使用方法
&br
なお「TRPGセッション以外での使用」と「加工したものの二次配布」の2つに関しては相談いただければ許可する場合もございます。
お気軽に &itwitter までご相談ください。
&br
※ TRPGセッションでしたら、 &em_収益化された配信での使用 なども問題ありません。

${
  isPast("2023/11/24")
    ? `
&2 更新情報
${
  !isPast("2024/1/24")
    ? `
- 2023/11/24¥sSW2.5 ルールサマリーを公開しました`
    : ""
}
`
    : ""
}

&1 TRPG ダンジョンマップタイル
&img_/material/map_tile.webp,TRPGダンジョンマップタイル
TRPGでダンジョンマップを簡単に作れる画像素材です。
&em_一本道からT字路・十字路や部屋など を並べるだけで簡単に配置し、自分だけのマップを作ることができます。
&br
ソード・ワールド2.5はもちろん、クトゥルフ神話TRPGなどの他のTRPGでも、 &em_ダンジョンやフィールドのマップ として使えます！
&br
画像はココフォリアにスクリーンパネルとしておいたものですが、png画像ですので他のサービスでも使用可能です。
&button_https://syachihokomaru.booth.pm/items/3401321 こちら（Booth）

${
  isPast("2023/11/24")
    ? `
&1 SW2.5 ルールサマリー
&img_/material/sum_battle_start.webp,SW2.5ルールサマリー（戦闘開始）
ソード・ワールド2.5のルールサマリーを作ってみました！
全3種類、PNG形式での頒布です。
&br
${
  !isPast("2023/12/25")
    ? "2023年12月に公開予定のココフォリア用ルームデータに入れるためのルールサマリーの先行公開となります。 &br &br"
    : ""
}
ぜひ活用してください！
&button_${
        $templateText.baseUrl
      }/image/material/sum_boken.png 冒険（SW2.5概要説明）はこちら
&button_${
        $templateText.baseUrl
      }/image/material/sum_battle_start.png 戦闘開始処理はこちら
&button_${$templateText.baseUrl}/image/material/sum_battle.png 戦闘はこちら
`
    : ""
}

&1 SW2.5 冒険者登録証
&img_/material/sheet_sample.webp,SW2.5冒険者登録証
冒険者ギルド支部に登録する際の「冒険者登録証」をオリジナルデザインで作成してみました。
自分のキャラクターを紹介するのに使ったり、シナリオを遊んだ記念に作ったり、してみてください！
&button_${
  $templateText.baseUrl
}/image/material/sheet_empty.png 未記入画像（PNG）はこちら
&button_${
  $templateText.baseUrl
}/image/material/sheet_empty.svg 未記入画像（SVG）はこちら

&1 TRPG 依頼書
&img_/material/quest_sample.webp,TRPG依頼書
ソード・ワールド2.5など &em_ファンタジー系のTRPGで役立つであろう「依頼書」 を作成してみました。
&&byosya
冒険者ギルド支部の酒場にいるあなたたちは壁にかかっているちょうど良い依頼を見つけます。
&&&
のようなシーンを演出するためにいかがでしょうか？
ぜひ使ってください。
&button_${
  $templateText.baseUrl
}/image/material/quest_empty1.png 未記入画像（PNG、「その他」記載なし）はこちら
&button_${
  $templateText.baseUrl
}/image/material/quest_empty2.png 未記入画像（PNG、「その他」記載あり）はこちら

&1 SW2.5 ボトルドールシート
&img_/material/bottle_doll.webp,SW2.5ボトルドールシート
「ソードワールド2.5サプリメント『魔導の学府ユーシズ』」（ &link_/sw25/forbeginner/suppliment/4,こちらで紹介しています ）に掲載されている、 &em_ボトルドール で遊ぶためのシートをオリジナルデザインで作成しました。
&em_サプリメントにない5レベル以上のデータ も、p.101掲載のコラム「5レベル以上」を参考に作成しました。
&br
画像はココフォリアにスクリーンパネルとしておいたものですが、pngファイルですので他のサービスでも使用可能です。印刷して使用いただくこともできます。
&button_https://syachihokomaru.booth.pm/items/3516274 こちら（Booth）
&br
ユーシズにいそうな魔物やアイテムを妄想して作ったオリジナルデータがあるので、よければ合わせてご覧ください。
&button_/sw25/data
&br
サプリメント紹介は以下からどうぞ。
&button_/sw25/forbeginner/suppliment/1

&1 冒険者ギルド支部のランチメニュー
&img_/material/lunch.webp,冒険者ギルド支部のランチメニュー
ソード・ワールド2.5で冒険者ギルド支部のランチメニューとして使った画像です。
&br
&em_TRPG初心者でもロールプレイをしやすくする ための一手として、最初の導入シーンに「キャラクターの選ぶメニューをロールプレイで教えてください」という質問をする際に使いました。
ロールプレイする気分になりつつ、 &em_キャラクターをつかむ一環にもなる と思うので、おすすめです。
&br
元はソード・ワールド2.5用に作りましたが、他のTRPGで使用いただいても構いません。
&button_${$templateText.baseUrl}/image/material/lunch.png PNGはこちら
&br
使用したシナリオは以下のページ掲載の『ウォフト=ルーバの研究所跡』（など）です。
こちらにはCCFOLIA用のルームデータもついてきます。
&button_/scenario

&3 ハルーラガイド
なお、このような &em_GMをする際の小技は同人誌『ハルーラガイド』に多く載っています！
『ハルーラガイド』の紹介はこちらをみてください。
&button_/sw25/feature/harula
『ハルーラガイド』の感想と「自分ならどうする」は以下のページからどうぞ。
&button_/blog/harula

&1 『モノクロマティカ』マス戦闘用マップ
サプリメント『泡沫世界モノクロマティカ』の「マス戦闘ルール」用の透過戦闘用マップです。
どちらもPNG形式です。
モノクロマティカについて詳しくは以下のページをご覧ください。
&button_/blog/monochro3
&3 白
&img_/material/monochro_battle_field_black.png,『モノクロマティカ』マス戦闘用マップ（黒枠）
&3 黒
&img_/material/monochro_battle_field_white.png,『モノクロマティカ』マス戦闘用マップ（白枠）
&amazon_モノクロマティカ

`;
</script>
