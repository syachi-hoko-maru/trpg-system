<template>
  <card>
    <template #title>
      FAQ
    </template>
    以下ではソード・ワールド2.5に関するよくある質問をまとめています。
    <item-button @click="() => showFAQ = !showFAQ">{{ showFAQ ? "FAQを閉じる" : "FAQを見る" }}</item-button>
    <div v-if="showFAQ">
      <card v-for="faq, i of faqs" :key="faq.title">
        <template #title>
          Q{{ i + 1 }}. {{ faq.title }}
        </template>
        <andml :andmls="faq.explain" />
      </card>
    </div>

  </card>

  <card>
    <template #title>
      便利なリンク
    </template>
    <andml :andmls="andmlll" />
    <card v-for="link of links" :key="link.title">
      <template #title>
        {{ link.title }}
      </template>
      <andml :andmls="link.explain" />
      <item-button :url="link.url">こちら</item-button>
    </card>
  </card>
</template>

<script setup lang="ts">

const andmlll = `
以下にはしゃちほこ丸が独断と偏見で選んだ、 &em_ソード・ワールド2.5未経験者・初心者 にとって役立つであろうリンクを、 &em_役立つ時系列順に 掲載しています。
順番に読めばソード・ワールド2.5をはじめられると思います！
ぜひ参考にしてください。
`

const showFAQ = ref(true)

const faqs = [
  {
    title: "SW2.5ってどんなTRPGですか？",
    explain: [
      "このウェブサイトでは以下で紹介しています。",
      "&button_/sw25 ",
      "また、以下の「便利なリンク」の上の方にもソード・ワールド2.5について紹介しているスライドやページを紹介しています。参考にしてください。"
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
    title: "SW2.5のルールブックはどれを買えばいいですか？",
    explain: [
      "&em_「ソード・ワールド2.5」 のルールブックIを書いましょう。",
      "&br",
      "「ソード・ワールド2.0」や数字のついていない「ソード・ワールド」「ソード・ワールド完全版」は旧版にあたります。 &em_間違って買わないように 気をつけましょう。",
      "※ ただし、今でも旧版で遊び続けている人もいるため、一緒に遊ぶ予定の人がいればその人に確認しましょう。",
      "&br",
      "まずは &em_ルールブックIだけで大丈夫 です。",
      "&amazon_ルールブック"
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

]

const links = [
  {
    title: "SW2.5ビギナーズインストラクション「Welcome to らくしあ！」",
    explain: [
      "ソード・ワールド2.5についてわかりやすく解説されているスライドです。",
      "「未経験者さんを沼に落とすために作った、初心者向け資料」とのことで、 &em_世界観や種族、技能 についてわかりやすくまとまっています。",
      "&em_SW2.5を初めてみようという方はまず読んでみることをお勧め します。",
      "&br",
      "（公開しているのはハルーラガイド（ &link_/blog/harula,感想はこちら ）の作者でもある &link_https://twitter.com/numachipachi,たかはるさん です。）"
    ],
    url: "https://takahaltrpg.hatenablog.jp/entry/2019/07/19/SW2.5%E3%83%93%E3%82%AE%E3%83%8A%E3%83%BC%E3%82%BA%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%A9%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%80%8CWelcome_to_%E3%82%89%E3%81%8F%E3%81%97%E3%81%82%EF%BC%81"
  },
  {
    title: "富士見書房公式 TRPG ONLINE「ソード・ワールド2.5」",
    explain: [
      "公式がソード・ワールド2.5について解説しているページです。",
      "こちらも &em_SW2.5を初めてみようという方はまず読んでみることをお勧め します。",
    ],
    url: "https://fujimi-trpg-online.jp/game/sw25.html"
  },
  {
    title: "ゆとシートII（ゆと工公式）",
    explain: [
      "オンラインセッションの際に &em_キャラクターシート を置いておけるサービスです。",
      "まずは使ってみておくことをお勧めします。"
    ],
    url: "https://yutorize.2-d.jp/ytsheet/sw2.5/"
  },
  {
    title: "ココフォリア",
    explain: [
      "&em_オンラインセッション の際に使うサービスです。（SW2.5以外のTRPGでも使います。）",
      "使い方は &link_https://docs.ccfolia.com/,公式ドキュメント を読みつつ、よくわからないところがあればYouTubeで「ココフォリア 使い方」などと調べると良いでしょう。",
      "まずは使ってみておくことをお勧めします。"
    ],
    url: "https://ccfolia.com/"
  },
  {
    title: "Picrew",
    explain: [
      "&em_「キャラクターの立ち絵」をカスタマイズして作れる サービスです。",
      "画像メーカーごとに利用規約があるので、TRPGで使えるかどうか、確認しましょう。",
      "まずは使ってみておくことをお勧めします。"
    ],
    url: "https://picrew.me/ja"
  },
  {
    title: "SW2.5 Twitterコミュニティ紹介",
    explain: [
      "いざオンラインで一緒に遊ぶ人を探そうというときに役立つ機能を紹介しています。"
    ],
    url: "/sw25/tool/community"
  },
  {
    title: "SW2.5 おすすめサプリメント紹介",
    explain: [
      "&em_SW2.5に慣れてきた後に役立つ 「サプリメント（拡張ルールブック）をどれから買えばいいのか」を書いています。",
      "&em_まずはルールブックIだけで大丈夫 なので、慣れてきて「もっと遊びたい！」となったときに読んでください。",
    ],
    url: "/sw25/forbeginner/suppliment/1"
  },

]
</script>