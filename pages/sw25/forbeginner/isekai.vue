<template>
  <card-array-by-andml :andml="andml1" />
</template>

<script setup lang="ts">
import { getPageSetting } from "~/src/pages/getPageSetting";
import { isPast } from "~/src/util/date";

const route = useRoute();
const pageSetting = ref(getPageSetting(route.fullPath));
watch(
  () => route.fullPath,
  () => {
    pageSetting.value = getPageSetting(route.fullPath);
  }
);

const andml1 = `
&1 異世界冒険ガイドを紹介します！
このページでは、グループSNEから出ている「異世界冒険者ガイド」シリーズについて紹介します。
&br
「どんな人におすすめ？」「どう役立つの？」って方、ぜひ読んでいってください！
&br
そして、 &em_ソード・ワールド2.5（SW2.5/ソドワ）をやっている人、興味ある人にはめっちゃおすすめ のシリーズです！
とはいえ、「ソード・ワールド2.5って何？」って方にもわかるよう説明するので、安心してください。
&br
これを書いている${pageSetting.value.lastmod}時点で、シリーズは以下の3冊です。
&br
- 「異世界冒険ガイド きみならどうする!?　はじめての冒険」
- 「異世界武器ペディア ウェポンストーリーズ」
- 「異世界冒険ガイド きみならどうする!?　街での冒険」
&amazon_異世界

${
  !isPast(new Date("2023-5-23"))
    ? `
&2 最新刊は5/19発売！
シリーズ最新刊の「異世界冒険ガイド きみならどうする!?　街での冒険」は2023年5月19日発売予定です！
&br
その他のソード・ワールド2.5関連書籍の新刊情報や刊行予想は以下のページをご覧ください。
&button_/sw25/feature/new
`
    : ""
}

&1 異世界冒険ガイドはどんな本？
「異世界冒険ガイド」は、「遊びながらファンタジー世界を知ることができる文庫本」です。
&br
&em_基本的には初めての冒険に出る主人公とその仲間たちの物語 です。
&br
が、タイトルに「きみならどうする！？」とあるように、 &em_選択肢が出てきます。
ゲームブックのような感じですね。
&br
選んだもの次第ではバッドエンドになってしまうことも……。

&2 本の流れ
「シチュエーションの説明」→「選択肢」→「選択肢ごとの展開」
&br
という流れを繰り返しながら物語が進んでいきます。
&br
主人公は物語の中で何度か冒険に行き、ファンタジー世界を旅して、経験を積んでいきます。
&br
そして、読者自身もファンタジー世界での冒険を追体験して、 &em_いつの間に冒険した気分に なれます。

&2 ファンタジー世界は面白い
主人公たちが冒険する世界はいわゆるファンタジー世界。
&br
「ドラゴンクエスト」シリーズや「ハリーポッター」シリーズのように、 &em_魔法が使えます！
&em_ドラゴンやペガサスなどの幻獣が出てきます！
&br
エルフやドワーフなどの異種族もいる世界です！
&br
まだまだ平和とは言い難く、悪い魔物もいっぱいいる世界です。
油断したらいきなり出てきたドラゴンに消し炭にされちゃうかも？
&br
冒険者となって、困っている人を助け、敵を倒す……。
すっごくワクワクしませんか？

&2 あなたの冒険スタイル診断
そして「異世界冒険ガイド きみならどうする!?　はじめての冒険」は本の最後に、「あなたの冒険スタイル診断」がついています。
&br
今まで選んだ選択肢に応じて、 &em_あなたにあった「冒険スタイル」がわかる のです。
&br
冒険スタイルとは具体的には「戦士タイプ」「密偵タイプ」「魔法使いタイプ」……のような感じです。
&br
この冒険スタイルを見て、そのタイプになった気持ちで &em_2周目を遊ぶ のはいかがでしょうか？
選ばなかった選択肢を読んでみたりして、2周目も楽しめます！

&2 ソード・ワールド2.5を始めよう！
そして「あなたの冒険スタイル診断」では、「あなたにあった『ソード・ワールド2.5』のキャラクターの例」が出てきます。
&br
ソード・ワールド2.5は「TRPG」の1つで、 &em_この「異世界冒険ガイド」シリーズと同じファンタジー世界を舞台 にしています。
詳しくは「あなたの冒険スタイル診断」の後ろにも書いてあるのですが、ここでも簡単に説明します！

&3 TRPGとは？
TRPGとはゲーム機の役割を人が担って遊ぶゲームのジャンルの1つです。
ボードゲーム（人生ゲームなど）の兄弟のような感じです。
&br
詳しくは以下で解説しています。
&button_/trpg

&3 ソード・ワールド2.5とは
前述の通り、「異世界冒険ガイド」シリーズと同じファンタジー世界を舞台としたTRPGです。
「異世界冒険ガイド」シリーズの登場人物のような「冒険者」に &em_なりきって 遊びます。
&br
とにかく面白くて、管理人はめっちゃハマってます。
魅力について、詳しくは以下で解説しています。
&button_/sw25

&1 異世界武器ペディアはどんな本？
「異世界武器ぺディア」はその名の通り、「異世界の武器」の百科事典のような存在の文庫本です。
&br
&em_20種類もの武器 について、「武器に関する短編ストーリー」「武器の概要解説」「ファンタジー世界における使われ方の解説」が載っています！
&br
読めばファンタジー世界における武器について詳しくなること間違いなしです。
&br
冒頭の「あなたの戦闘スタイル診断」がついているので、自分に合った武器がわかるのも面白いところです。
&br
武器に関するイラストも豊富なため、頭の中に武器のイメージができていきます！

&2 ファンタジー好きな方はこっちから読んでもOK
「異世界冒険ガイド」の登場人物たちも出てきますが、ファンタジー好きならこちらから読んでも大丈夫です！
&br
ソード・ワールド2.5をやったことがない人や知らないって人でも、「ドラゴンクエスト」「ファイナルファンタジー」などなどファンタジー世界を舞台としたゲームを遊んだことがあれば、楽しめると思います！
&br
逆に「ファンタジーって何？」って方は「異世界冒険ガイド きみならどうする!?　はじめての冒険」を先に読む方がおすすめです。
先に読んでおけば、「ファンタジーってこんな感じなんだ」ってのが掴めているので楽しめると思います！

&1 ソード・ワールド2.5を知らなくても楽しめます！
「異世界冒険ガイド」シリーズは「ソード・ワールド2.5」と同じ世界を舞台にしていますが、 &em_知らなくても十分楽しめます！
&br
というか、 &em_入り口として最適です！
&br
「ファンタジーって興味あるけど難しそうだな……」って人も、「ファンタジー世界大好き！」って人も、「異世界冒険ガイド」や「異世界武器ぺディア」を読んでみてください！
&br
そしてその舞台を冒険したくなったら、ぜひ一緒にソード・ワールド2.5をして遊びましょう！！
&em_すっごく楽しい ですよ！

&1 ソード・ワールド2.5に興味がある人はぜひぜひ読もう
「異世界冒険ガイド」シリーズはソード・ワールド2.5（SW2.5/ソドワ）と同じファンタジー世界（ラクシア）を舞台としたシリーズです。
&br
「異世界冒険ガイド きみならどうする!?　はじめての冒険」を読むと &em_冒険の雰囲気 を掴めますし、 &em_冒険者の日常 もわかってきます。
ロールプレイがより楽しくなること間違いなしです。
&br
「異世界武器ぺディア」はソード・ワールド2.5にある武器についていろいろと解説されています。
使う武器を選ぶのが楽しくなります！
「あなたの戦闘スタイル診断」を使って選ぶのも面白いと思います！
&br
ソード・ワールド2.5の名前を直接冠しているわけではなく、ソード・ワールド2.5のデータが追加されるわけでもありませんが、ぜひぜひ読んでください。
&em_あなたのラクシアでの生活がより鮮やかに なります！
`;
</script>
