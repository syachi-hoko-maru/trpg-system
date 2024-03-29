<template>
  <CardArrayByAndml :andml="caution" />
  <CardArrayByAndml :andml="first" v-if="page <= 1" />
  <PagesSuppliment v-if="page >= 2 && page <= pagemax" :num="page - 2" />
  <CardArrayByAndml :andml="end" v-if="page >= pagemax" />
  <CardArrayByAndml :andml="add" />
</template>

<script setup lang="ts">
import { bookList } from "~/src/dict/new";
import { isHidden } from "~/src/pages/getPageSetting";
import { pageSettingList } from "~/src/pages/pageSettingList";
import { isPast, sortByDate } from "~/src/util/date";

const route = useRoute();
const pagemax = 5;

const { getNowPagePage } = usePages();

const page = computed(getNowPagePage);

watch(route, () => {
  scrollTo(0, 0);
});

const caution = `
&1 注意
この内容は全て私見です。ご注意ください。
これを見て購入して何らかの不利益を被ったとしても、責任を取れません。
`;

const first = `
&1 この記事について
この記事ではソード・ワールド2.5（SW2.5/ソドワ）のサプリメントについて、初心者向けに解説しています。
&br
- 「ソード・ワールド2.5のサプリメントいっぱいあって、どれから買えばいいかわからない……」
- 「どのサプリメントに欲しい情報が載っているかわからない……」
- 「サプリメントって何？」
&br
という方はぜひご覧ください！
&br
&br
「ソード・ワールド2.5って何……？」って方は以下のページをご覧ください。
&button_/sw25
&button_/sw25/forbeginner

&1 最初に結論
&em_最初に買うのに最もおすすめ のサプリメントは『 &em_エピックトレジャリー 』 です。
もし迷ったらルールブックI〜IIIの次は『エピックトレジャリー』を買いましょう。
&br
ただし、 &em_人によっておすすめも変わる ので、よければ下記を読んで「自分が本当に欲しいサプリメント」を探してください。
&amazon_エピックトレジャリー

&3 ランキングもあります！
ランキング形式でおすすめのものを紹介しているページもあります。
こちらも合わせてご覧ください。
&button_/sw25/forbeginner/suppliment/ranking

&3 新刊情報はこちら！
&em_新刊情報と刊行予想 については以下のページをご覧ください。
&button_/sw25/feature/new
&button_/search/?tag=sw25_new&sort=recent 新刊情報一覧

&1 SW2.5の展開について
執筆している2023年7月現在、 &info_sw25 は発売から5年の月日が流れており、この間に多数の関連書籍等が出版されています。

&2 ボードゲーム
まず最初に、以下の3つは &em_TRPGではなくボードゲーム です！
&br
TRPGより気軽に入門できるらしい（僕は遊んだことない）ので、「SW2.5（またはTRPG）に興味を持っているけど……」って人にはオススメです。
ただ、 &em_ちょっと高い です。
&br
-ソード・ワールド2.5 RPGスタートセット
-ソード・ワールド2.5 RPGボックスセット
-ソード・ワールド2.5 RPGビルディングBOX

&2 ルールブック
TRPGとしてのSW2.5には、まずルールブックI〜IIIがあります。
全て文庫本で &em_1,000円弱 で買えます。
&br
&em_まずはルールブックIだけでも買ってみてください！
それだけで遊べます。
&harry

&2 リプレイとサプリメント
ルールブックの他に販売されている書籍は、リプレイとサプリメント（以下「サプリ」）の2つに分けることができます。
&br
- リプレイ
-- &em_簡単にいうとプレイ記録
-- こんな感じで遊ぶんだよ〜って参考にもなるし、公式が世界観を提供してくれてる場でもあるし、僕は小説としても楽しんでます（これについては賛否両論あるようですが）
- サプリ
-- &em_拡張ルールブック のようなもの
--- &em_電子ゲームで言うならDLC みたいな感じ
--- 追加のデータ（種族・技能・アイテム・魔物……）やルール、ワールド設定などが載っています
-- いわゆるシナリオ集なことも
&br
このページではサプリについて、リプレイとサプリが一冊になっているものを含めて紹介します。

&1 旧版について
以下の3つは展開がすでに終了した &em_旧版 になります！
&br
- ソード・ワールド2.0（SW2.0）
- ソード・ワールド
- ソード・ワールド完全版
&br
ソード・ワールド2.0は &em_一部データに互換性 があり、組み合わせて遊ぶこともできます。
が、初心者の方には &em_ひとまずSW2.5のものを揃えていくことを強くおすすめ します。
&br
&br
ただしプレイグループによってはSW2.0やソード・ワールド完全版などで遊んでいることもあります。
自分が遊んでいるのが何か確認すると良いです！
&br
このページではソード・ワールド2.5（SW2.5/ソドワ）のみを扱いますのでご注意ください。

&1 サプリメントの分類
SW2.5のサプリは &em_大きく分けて4種類 あります。
以下の分類名は僕が呼んでいるものです。
&br
公式では分類がさまざまな呼び方がされており、定まっていないようです。
&br
-&link_/sw25/forbeginner/suppliment/2,大型サプリ
--&em_大規模なデータ・ルールの追加 があるサプリ
--&em_一番おすすめ
-&link_/sw25/forbeginner/suppliment/3,キャラビルドサプリ
--キャラクターを作る補助的なサプリ
--小規模なデータ・ルールの追加も
-&link_/sw25/forbeginner/suppliment/4,ツアーサプリ
--1つの地方もしくは都市に絞って &em_世界観や設定を詳細に解説 するサプリ
--シナリオも掲載
-&link_/sw25/forbeginner/suppliment/5,バトルブックサプリ
--&em_1つの大きなシナリオ （キャンペーン）となっているサプリ
-- &em_GMなしで1人でも遊べる
`;

const end = `
&1 まとめ
以上となります。
ここまでお読みいただき、ありがとうございました。
&br
自分に合ったサプリメントは見つかりましたか？
気になるサプリメントがあった方は &em_ぜひそのサプリを買ってみてください！
&br
&em_ソドワライフがより楽しくなる こと間違いなしです。
&br
相談も随時受け付けていますので、 &itwitter へ、 &em_お気軽にリプとかDM してください。
&br
&em_今後も随時更新する予定 なのでたまに見に来てくれると嬉しいです。
更新情報は &itwitter でつぶやきます。

&3 困ったらエピックトレジャリーを！
見つからなかった方は &em_まずはエピックトレジャリーがおすすめ です。
技能や種族がわかりやすく増えるわけではありませんが、アイテムが増えることでできることが増えます！
&amazon_エピックトレジャリー

&3 ランキングもあります
サプリメントのおすすめ度ランキングはこちら！
&button_/sw25/forbeginner/suppliment/ranking

&3 種族・技能についてはこちらをチェック
&button_/sw25/forbeginner/syuzoku
&button_/sw25/forbeginner/ginou

&3 今後のサプリメントについてはこちらへ
また、 &em_新刊情報と刊行予想 については以下のページをご覧ください。
&button_/sw25/feature/new

&1 最後に
なお、繰り返しますが、 &em_全て私見 ですのでご注意ください。
これを見て購入して何らかの不利益を被ったとしても、責任を取れません。
&br
&em_相談は大歓迎 です。 &itwitter へ、 &em_お気軽にリプとかDM してください。
&br
あと、すごく大事なことですが、サプリなんて持ってなくても遊べます。
&em_ルルブIだけでも遊べます 。
&br
遊ぶ人を探す際は以下も参考にしてみてください。
&button_/sw25/tool/intro
&button_/sw25/tool/community
`;

const newBooks = bookList
  .filter((b) => !isPast(b.date))
  .sort((a, b) => sortByDate(false)(a.date, b.date));
const newBook = newBooks[0];

const forBeginners = pageSettingList.filter(
  (p) =>
    p.to.startsWith("/sw25/forbeginner/") &&
    p.to.indexOf("suppliment") === -1 &&
    p.to.indexOf("supplement") === -1 &&
    p.osusume &&
    !isHidden(p)
);
const forBeginnersTo =
  forBeginners[Math.floor(Math.random() * forBeginners.length)].to;
const add = `
&1 おすすめページ
&3最新情報はこちら！
この「おすすめサプリメント紹介」は発売後、少し時間が経ってからの更新となります。
&br
当サイトでは &em_ソード・ワールド2.5（SW2.5/ソドワ） の最新刊となる &em_『${
  newBook.long ? newBook.long : newBook.title
}』 （${
  newBook.dispDate ? newBook.dispDate : newBook.date
}発売予定）を全力で特集中です！
&br
- 「最近のサプリはどんな感じなの？」
- 「新しく出るサプリは？」
&br
という方は、以下のボタンをクリックして最新の情報を探してください！
&button_/search/?tag=sw25_new&sort=recent 新刊情報一覧

&3 ソード・ワールド2.5の初心者の方にはこちらもおすすめ！
一緒に遊ぶ人を探そう！
&button_/sw25/tool/intro
&button_/sw25/tool/community

初心者向けのお役立ち情報まとめてます！
ぜひソドワ沼へ！
&button_/sw25/forbeginner
${forBeginnersTo ? `&button_${forBeginnersTo}` : ""}

`;
</script>
