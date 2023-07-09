<template>
  <card-array-by-andml :andml="andml1" />
  <pages-intro-5anni />
  <card-array-by-andml :andml="andml2" />
</template>

<script setup lang="ts">
const { $templateText } = useNuxtApp()
const andml1 = `
&1 「祝5周年！　SW2.5フレーム」とは？
ソード・ワールド2.5（SW2.5/ソドワ）は &em_2023年7月20日に5周年を迎えます！
&br
このページではこれを記念した「祝5周年！　SW2.5フレーム」をあなたのアイコンにつけることができます！
ぜひ作成し、使ってください！
&br
&img_/sw25intro/5anni_example.webp,祝5周年！　SW2.5フレーム使用例
&br
丸型のアイコンを使う、Twitter・Instagram・YouTube・LINE・MisskeyなどのSNSで使用できます。
他にもBoothやCCFOLIA・TALTOなどのアイコンとしても使用できます！
&br
動作確認は主にPCで行っていますが、スマートフォンでも問題なく動作するはずです。
もしエラーがあれば &itwitter までお気軽にご相談ください。
&br
&br
&br
なお、他にも当ウェブサイトではウェブ上で画像を作れるツールがあるので、よければあわせてご利用ください！
&button_/sw25/tool/intro
&button_/sw25/tool/bosyu
また、公式による5周年記念のサプリメント『アーケインレリック』の発売などについては以下をご覧ください。
&button_/sw25/new
&button_/search?word=アーケインレリック&sort=recent アーケインレリック関連ページ

&1 注意点
ソード・ワールド2.5の認める範囲内において、この画像は自由にご利用いただけます。
&br
ただし &em_自作発言はお控えください。
公序良俗に反する使用もお控えください。
&br
なお、画像の処理は全てあなたのPC・タブレット・スマートフォン上で行われ、サーバーへアップロードされることはありません。

&2 お願い
「新しいアイコン」と言った発信の際、一緒に &em_こちらのページのURLを共有 していただければ幸いです。
&em_みんなでソード・ワールド2.5の5周年をお祝いしましょう！！
&button-share

&1 画像形式の配布
自身で編集したい方のため、フレームをPNG形式とSVG形式でダウンロード可能となっています。
&br
&em_これらの画像を未編集で配布することはご遠慮ください。
また、 &em_右下の製作者の表示を消すのもご遠慮ください。
&br
以上2点について、よろしくお願いします。

&3 PNG
いわゆる普通の画像形式です。
SVGに詳しくない方はこちらをご利用ください。
&br
「画像を作る」ボタンを押す前に &link_#プレビュー,「プレビュー」 にある画像を保存してください。
すでに「画像を作る」ボタンを押している場合、 &em_ページを更新 してください。

&3 SVG
データが汚いのは我慢していただくようお願いします。
※文字は全てアウトライン化されております。
&button_${$templateText.baseUrl}/image/sw25intro/5anni_1.svg 祝5周年！　SW2.5フレームはこちら
&button_${$templateText.baseUrl}/image/sw25intro/5anni_2.svg 風船なしのフレームはこちら
&button_${$templateText.baseUrl}/image/sw25intro/5anni_3.svg シンプルなフレームはこちら

`
const andml2 = `
&1 その他のページ
ソード・ワールド2.5（SW2.5/ソドワ）の初心者向け情報はこちら！
&button_/sw25/forbeginner

5周年記念のサプリメント『アーケインレリック』の発売などについては以下をご覧ください。
&button_/sw25/new
&button_/search?word=アーケインレリック&sort=recent アーケインレリック関連ページ

「サプリメントってどんなのがあったっけ？」って方はこちらをどうぞ〜
&button_/sw25/forbeginner/suppliment
&button_/sw25/forbeginner/suppliment/ranking

他にもソード・ワールド2.5で役立つさまざまなツールを公開しています。
ぜひご活用ください。
&button_/sw25/tool

Twitterで一緒に遊ぶ人を集める場合に便利なTwitterコミュニティがあります。
&button_/sw25/tool/community

さらに &em_ソード・ワールド2.5に関する情報をまとめたり考察をしたり しているページは多々あります。
ぜひご覧ください。
&button_/search?tag=sw25 こちら
`

</script>