<template>
  <card>
    <template #title>
      よくある質問
    </template>
    <item-block-faq v-for="faq, i of faqs" :key="faq.title" :title="faq.title">
      <andml :andmls="faq.explain" />
    </item-block-faq>
  </card>
</template>

<script setup lang="ts">
const faqs = [
  {
    title: "SW2.5って何の略ですか？　他にソード・ワールド2.5の略称はありますか？",
    explain: [
      "SW2.5はTRPG「ソード・ワールド2.5」の略称の1つです。",
      "他にも「sw25」や「ソドワ」「そどわ」などが使われます。",
    ],
  },
  {
    title: "SW2.5ってどんなTRPGですか？",
    explain: [
      "このウェブサイトでは以下で紹介しています。",
      "&button_/sw25 ",
      "また、以下の「便利なリンク」 の上の方にもソード・ワールド2.5について紹介しているスライドやページを紹介しています。参考にしてください。",
      "&button_/sw25/forbeginner/links"
    ],
  },
  {
    title: "SW2.5はクトゥルフ神話TRPGとはどういう関係ですか？",
    explain: [
      "「ソード・ワールド2.5」（SW2.5）も「クトゥルフ神話TRPG」（CoC）も &em_TRPGのシステムの1つ です。",
      "トークによって物語を遊ぶというTRPGの本質は同じですが、世界観やルールに違いがあります。"
    ],
  },
  {
    title: "SW2.5を始めるにはどうすればいいですか？",
    explain: [
      "まずはルールブックを買いましょう！　990円で買えるので、まずは買って読んでみるのがおすすめです。",
      "あとは、「便利なリンク」 を順に読んでくだされば始められます！",
      "&button_/sw25/forbeginner/links"
    ],
  },
  {
    title: "SW2.5のルールブックはどれを買えばいいですか？",
    explain: [
      "&em_「ソード・ワールド2.5」 のルールブックIを書いましょう。",
      "&br",
      "「ソード・ワールド2.0」や数字のついていない「ソード・ワールド」「ソード・ワールド完全版」は旧版にあたります。 &em_間違って買わないように 気をつけましょう。",
      "※ ただし、今でも旧版で遊び続けている人もいるため、一緒に遊ぶ予定の人がいればその人に確認しましょう。",
      "&br",
      "まずは &em_ルールブックIだけで大丈夫 です。",
      "&amazon_ルールブック",
      "&br",
      "もし &em_〇〇という種族が使いたいけどどのルールブックに載っているの……？ 　という方がいれば、以下のページをご覧ください。",
      "&button_/sw25/forbeginner/syuzoku"
    ],
  },
  {
    title: "SW2.5のルールブックは必要ですか？",
    explain: [
      "オンラインで遊ぶなら、 &em_手元にあったほうが良い でしょう。",
      "&em_990円とお手軽価格 なので買うことを強くお勧めします。",
      "&br",
      "「1回遊んでから買いたい」という方はルールブック未所持でも参加可能なセッションを探しましょう。",
      "特に記述がない募集を見つけた場合、 &em_トラブル防止のため、必ず確認 しましょう。",
      "なお、僕がGMをする場合、 &link_https://fujimi-trpg-online.jp/download/sw25.html#sample,サンプルキャラクター を使っての参加をお願いしています。",
      "&br",
      "ただ、ルールブックを「ワールド」だけでも読んで臨んだほうが &em_よりソード・ワールド2.5を楽しめると思う ので、買っておくことをお勧めです。"
    ],
  },
  {
    title: "SW2.5のサプリメントはどれを買えばいいですか？",
    explain: [
      "まずは &em_ルールブックIだけで大丈夫 です。",
      "&br",
      "その上で、「サプリメントを買うぜ！」という場合には以下を参照ください。",
      "&button_/sw25/forbeginner/suppliment/1"
    ],
  },
  {
    title: "SW2.5と他のファンタジーTRPGとの違いはなんですか？",
    explain: [
      "日本のファンタジー系TRPGの中では、まずわかりやすく &em_「手軽さ」と毎年複数冊のサプリメントが出る「サポートの手厚さ」 によって差別化されます。",
      "&br",
      "さまざまなルールの違いに関しては &link_https://www.youtube.com/@Baketsusan,バケツさん（YouTube） のシリーズ「ファンタジーTRPGを比べてみよう！」がおすすめです。",
      "&button_https://www.youtube.com/watch?v=2ibJQwxapyE&list=PLKNsDN1V6QW66JwABhpATxu9uySNjOP-1&index=1 YouTube"
    ],
  },

]

</script>
