<template>
  <card-array-by-andml :andml="andml" />
  <pages-contact />
</template>

<script setup lang="ts">
const andml = `
&1 自己紹介
しゃちほこ丸と申します。
TRPG、特にソード・ワールド2.5が大好きな、「しゃち」模様で「ほこ」を持った「丸」い「しゃちほこ」です。
&br
主にTwitterで活動しています。
このウェブサイトへのご意見・ご感想等も &itwitter へお願いします。

&2 ブログ
以下のページにブログを書いています。
主にソード・ワールド2.5などのTRPGについて、知見や感想、最新情報などを書いています。
駄文ですが、ぜひ読んでいってください。
&button_/blog

&2 アイコン
アイコンがよく変わります。
歴代のアイコンをここで公開しようと思っています。
&button_/me/gallery

&1 TRPGについて
&info_trpg 、特に &info_sw25 などを遊んでいます。
CoCなども遊びます。
&br
よければ一緒に遊んでください！
持っているルールブックやサプリメントについては以下を参照してください。
&button_/me/rulebook 所持ルールブック一覧

&2 TRPG自己紹介シート
TRPG自己紹介シートは &link_https://create-now.vercel.app/trpg-manual,こちら で作成させていただきました。
ウェブサイト上で作れて便利なのでぜひ使ってください！
&img_/material/prof.webp,TRPG自己紹介シート
&br

&2 SW2.5自己紹介シート
こちらの &em_SW2.5自己紹介シート は以下のページから作成できます！
ウェブサイト上で簡単5分（最速1分、入力内容に迷って5分）で作成可能です！
&button_/sw25/tool/intro
&img_/material/profsw25.webp,SW2.5自己紹介シート
&br
&2 プレイ環境
現在はオンラインのテキストセッションがメインで、たまにボイスセッションも遊びます。
オンラインセッションの際は主に &link_https://discord.com/,Discord と &link_https://ccfolia.com,ココフォリア を使っています。

&2 シナリオ&セッション用素材公開中
ソード・ワールド2.5やエモクロアTRPGのシナリオの作成・公開もしています。
オンラインセッションなどで使える素材も公開しているのでよければ使ってください！
全部無料です！
&button_/scenario 公開シナリオ一覧
&button_/sw25/tool/material 公開シナリオ一覧

&2 ハウスルール
僕が主催するセッションでのハウスルールを以下にまとめています。
トラブル防止のためのルールになっているのでよければ参考にしてください。
&button_/me/houserule

&1 趣味など
趣味
-海外サッカー観戦
--スペインのチーム、 &link_https://www.realmadrid.com/ja,レアル・マドリード のファンです
-Webプログラミング
&br
好きなもの
-Minecraft
-ポケモン
--一番好きなのは最初の相棒のラグラージ（ &link_https://zukan.pokemon.co.jp/detail/0260,公式ポケモンずかんはこちら ）
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
-- このウェブサイトへのご意見・ご感想等もこちらへお願いします
-&link_https://trpger.us/@syachi_hoko_trp,Misskey（@syachi_hoko_trp@trpger.us）
--Misskey（TRPGがすきー！）に参加しました
-&link_https://talto.cc/users/DVUC9LjUviekGgXrbqXaJWAcLCm1,TALTO
--シナリオを公開しています
-&link_https://kakuyomu.jp/works/16816927859758100588,カクヨム
--SW2.5に関する雑多なことを書いています
-&link_https://syachihokomaru.booth.pm/,BOOTH
--オンラインセッション素材などを公開しています
`
</script>
