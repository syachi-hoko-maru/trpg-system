<template>
  <CardArrayByAndml :andml="andml" />
  <PagesWalkerList />
  <CardArrayByAndml :andml="end" />
</template>

<script setup lang="ts">
const andml = `
&1 ライからの挨拶
よぉ！　俺の名前はライ。
冒険者をしてる。
&br
&img_/other/walker/rai_register.webp,ライの冒険者登録証
&br
歩き回るのが好きなもんで、拠点にしてるハーヴェスやらハーヴェスの周辺をよく散歩してる。
&br
良いとこがいっぱいあるのに、魔物がうろちょろしてんのもあってなかなか知られてなかったりもするからよ、紹介してみることにした。
&br
なーんて、カッコよく言ったが、友人に勧められたからだ。
書くと酒を奢ってくれるらしい。
&br
まぁ文章書くのは上手くねぇから、その辺は頑張って読んでくれ。
&br
あとよ、この前の冒険で見つけた魔動機があるから、コイツも使っていく。
なんやらボタンを押すと見たままの絵が出てくんだ。面白い魔動機だぜ。
&camera_river_side_walk,海と共に生きる街,ハーヴェス

&1 注意
&3 イラストについて
&4 ライ
ライのイラストは &link_https://twitter.com/yasubaru0,やすばる さん作成の &link_https://picrew.me/ja/image_maker/13338,Picrew【ストイックな男メーカー】 を使用して作成させていただきました。
ウェブサイトでの利用が問題ないか、 &link_https://marshmallow-qa.com/messages/6eb2dfe2-d720-46f0-b686-677a8f8aab39,マシュマロ （ &link_https://x.com/yasubaru0/status/1767550875764191410,該当ツイート ）にて確認させていただいています。

&4 各地の画像について
紹介していく各地の画像は、フリー素材やAdobe等が提供するいくつかの生成AIで作成した素材をAdobe¥sPhotoshopやAdobe¥sIllustratorを用いて編集したものとなります。

&3 内容について
こちらの内容は公式のものではなく、しゃちほこ丸が独自に考えた要素（オリジナル設定）を多々含みます。
&br
オリジナルの舞台設定・NPCのほか、魔物やアイテムなども含まれます。
&br
公式から発売されているルールブック・サプリメント・リプレイ・ボックスセット等々と矛盾する内容が含まれるかもしれません。
&br
あらかじめご承知おきください。
`;
const end = `&1 その他のオリジナルデータ
しゃちほこ丸が作成したオリジナルデータは以下にまとまっています！
ぜひこちらもあわせてご覧ください。
&button_/sw25/data`;
</script>

<style lang="scss" scoped>
h4.head3 {
  font-size: 1.5em;
  line-height: 1rem;
  font-weight: bold;
  margin-left: 0;
}
</style>
