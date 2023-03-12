<template>
  <card-array-by-andml :andml="andml" />
  <pages-contact />
</template>

<script setup lang="ts">
const andml = `
しゃちほこ丸と申します。
「しゃち」模様で「ほこ」を持った「丸」い「しゃちほこ」です。
&br
&info_trpg 、特に &info_sw25 などを遊んでいます。
CoCなども遊びます。
持っているルールブックやサプリメントについては以下を参照してください。
&button_/me/rulebook 所持ルールブック一覧
&br
現在はテキストセッションがメインです。
オンラインセッションの際は主に &link_https://discord.com/,Discord と &link_https://ccfolia.com,ココフォリア を使っています。
&br
シナリオの公開もしているのでよければ遊んでください。
&button_/scenario 公開シナリオ一覧

&1 趣味など
趣味
-海外サッカー観戦
--スペインのチーム、レアル・マドリードのファンです
-Webプログラミング
&br
好きなもの
-Minecraft
-ポケモン
--一番好きなのは最初の相棒のラグラージ（ &link_https://zukan.pokemon.co.jp/detail/0260,公式ポケモンずかん）
--今度スカーレットを買って遊ぶ予定
-ライトノベル＆アニメ
--2010年台の作品をよく見ていました
---東京レイヴンズ（あざの耕平先生）
---とある魔術の禁書目録（鎌池和馬先生）
---変態王子と笑わない猫（さがら総先生）
---やはり俺の青春ラブコメは間違っている（渡航先生）
---さくら荘のペットな彼女（鴨志田一先生）
---ノーゲーム・ノーライフ（榎宮祐先生）
---魔法科高校の劣等生（佐島勤先生）
-デュエマ
--1年ほど前まではデュエプレをしていました &br 最近は全くできていません
-ゲーム実況動画の視聴
--&link_https://www.youtube.com/@Nichijo_Gumi,日常組

&br
最近はまっているもの
-仮面ライダーギーツ
--倖田來未と湘南乃風が歌うオープニング曲「Trust・Last」がかっこいいのでぜひ聞いてください！（ &link_https://www.youtube.com/watch?v=xpN7rNcm5Vc,YouTube）
// -ドンブラザーズ

&1 リンク
-&itwitter
-&link_https://talto.cc/users/DVUC9LjUviekGgXrbqXaJWAcLCm1,TALTO
--シナリオを公開しています
-&link_https://kakuyomu.jp/works/16816927859758100588,カクヨム
--SW2.5に関する雑多なことを書いています
-&link_https://syachihokomaru.booth.pm/,BOOTH
--オンラインセッション素材などを公開しています

`
</script>
