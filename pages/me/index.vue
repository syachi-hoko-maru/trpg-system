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

&2 名刺
&meishi

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

&2 シナリオ/セッション用素材公開中
ソード・ワールド2.5やエモクロアTRPGのシナリオの作成・公開もしています。
オンラインセッションなどで使える素材も公開しているのでよければ使ってください！
全部無料です！
&button_/scenario 
&button_/sw25/tool/material 

&2 ハウスルール
僕が主催するセッションでのハウスルールを以下にまとめています。
トラブル防止のためのルールになっているのでよければ参考にしてください。
&button_/me/houserule

&1 趣味など
&2 趣味
&3 海外サッカー観戦
-スペインのチーム、 &link_https://www.realmadrid.com/ja,レアル・マドリード のファンです
-モドリッチ選手が大好きで、クロアチア代表も応援しています
-もちろん日本代表も応援しています

&3 Webプログラミング
- 主にNode.js¥s+¥sTypescript¥s+¥sVueの構成です

&3 ラグビー
- 高校生までやっていました
- 観戦、TVや配信でも大迫力です！　ラグビーW杯など、ぜひ見てください！（ &link_/search?tag=rugby,ブログにいろいろ書いてます ）

&2 好きなもの
&3 Minecraft
- 遊ぶのも見るのも好きです
- JavaもBEもやります
// - Mod開発してみたいな……と思いつつ……
- 最近ちょっとずつMod開発をしています

&3 ポケモン
- 初めて遊んだゲーム
-- ポケットモンスター¥sエメラルド
- 一番好きなポケモン
-- ラグラージ
--- &link_https://zukan.pokemon.co.jp/detail/0260,公式ポケモンずかんはこちら
--- 最初の相棒です
- 好きなタイプ
-- 「みず」
- 好きなジムリーダー
-- アダン：ホウエン地方ルネシティ（エメラルド限定）
// -今度スカーレットを買って遊ぶ予定

&3 ライトノベル＆アニメ
2010年台の作品をよく読んで・見ていました
&br
-東京レイヴンズ（あざの耕平先生）
-とある魔術の禁書目録（鎌池和馬先生）
-変態王子と笑わない猫（さがら総先生）
-やはり俺の青春ラブコメは間違っている（渡航先生）
-さくら荘のペットな彼女（鴨志田一先生）
-ノーゲーム・ノーライフ（榎宮祐先生）
-魔法科高校の劣等生（佐島勤先生）
-アクセル・ワールド（川原礫先生）

// &3 デュエマ
// -1年ほど前まではデュエプレをしていました &br 最近は全くできていません
&3 YouTube視聴
- Minecraft
--&link_https://www.youtube.com/@Nichijo_Gumi,日常組
--&link_https://www.youtube.com/@bellsworkshop2,Bell's¥sWorkshop（方向音痴の人）
- シミュレーションゲーム
--&link_https://www.youtube.com/@hayayabo,ハヤトの野望
--&link_https://www.youtube.com/@kohmagame,コーマ
--&link_https://www.youtube.com/@anaguma,あなぐま
- デュエル・マスターズ
-- &link_https://www.youtube.com/channel/UCGm5NSZFeb7q54h52bvX80g,デュエチューブ
-- &link_https://www.youtube.com/@hondhu,本日のデュエルマスターズ（本デュ）
-その他
--&link_https://www.youtube.com/@napolimens,ナポリの男たち
--&link_https://www.youtube.com/@omocorochannel,オモコロチャンネル
&3 特撮
-仮面ライダーギーツ
--倖田來未と湘南乃風が歌うオープニング曲「Trust・Last」がかっこいいのでぜひ聞いてください！（ &link_https://www.youtube.com/watch?v=xpN7rNcm5Vc,YouTube ）
--ガッチャードは追わない予定です……
-ドンブラザーズ
--楽しいお祭り騒ぎでした

// &br
// 最近はまっているもの

&1 リンク
&3 SNS
-&itwitter
-- このウェブサイトへのご意見・ご感想等もこちらへお願いします
-&link_https://trpger.us/@syachi_hoko_trp,Misskey（@syachi_hoko_trp@trpger.us）
-- Misskey（TRPGがすきー！）に参加しました

&3 シナリオ投稿サイト
-&link_https://talto.cc/users/DVUC9LjUviekGgXrbqXaJWAcLCm1,TALTO
-- シナリオを公開しています
-- シナリオ一覧は &link_/scenario,こちら へどうぞ
-&link_http://scenarch.com/userpages/14630,scenarch
-- 現在はTALTOへのリンクを掲載しているのみとなっています

&3 素材公開
-&link_https://syachihokomaru.booth.pm/,BOOTH
-- オンラインセッション素材などを公開しています
-- &link_/sw25/tool/material,こちら で配布素材の紹介をしています！

&3 その他
-&link_https://kakuyomu.jp/works/16816927859758100588,カクヨム
-- SW2.5に関する雑多なことを書いています
-- 最近は &link_/blog,ブログ があるので更新少なめです
`
</script>
