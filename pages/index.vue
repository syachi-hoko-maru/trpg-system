<template lang="pug">
div
  SyachiCard(title="しゃちほこ丸のTRPGシステムへようこそ")
    p このサイトではTRPGに役立つシステムの提供などを行なっていく予定です。
    p 随時更新していきます。更新情報は
      TwitterLink(inline)
      | にて発信させていただきます。
    p 現在はSW2.5のダメージ計算や命中する割合の計算などに使えるシミュレーターを公開しています。
    Button(url="/sw25simulate", text="SW2.5 判定シミュレーター")

  SyachiCard(title="ご挨拶")
    p.
      しゃちほこ丸という名前でTRPG、特にソード・ワールド2.5（SW2.5）などを遊んでいます。<br>
      「ソード・ワールド2.5をしたい！」という方はぜひお気軽にTwitterにてお声がけください。未経験者も大歓迎です。
    TwitterLink
    p 中の人は20代の男です。
    p 現在、テキストセッションをメインに遊ばせていただいております。
    //- p 良い声ではありませんがボイスセッションもテキストセッションも可能です。
    p 僕の持っているルールブック一覧については以下のページをご覧ください。
    Button(url="/rulebooks", text="所持ルールブック一覧")

  SyachiCard(title="ソード・ワールド2.5（SW2.5）卓募集用コミュニティ")
    p ソード・ワールド2.5が発売5年を迎えた2022年7月20日に、
      a(href="https://twitter.com/i/communities/1549495894386434048") ソード・ワールド2.5（SW2.5）卓募集用コミュニティ
      | というTwitterコミュニティを作りました。
    p 名前の通り、卓募集をするためのコミュニティです。「卓募集に人が集まらない」という人と、「卓募集が見つからない」って人がいるので、作ってみました。そどわプレイヤーの出会いの場になれば幸いです。
    p オンセする方はボイセ・テキセ問わず、ぜひご参加ください！<br>
      | 初心者・未経験者・GM未経験者も大歓迎です。

  SyachiCard(title="同人活動")
    p 現在進行中の同人活動プロジェクトは以下のページから確認することができます。
    Button(url="/projects", text="現在進行中の同人活動プロジェクト")
    p SW2.5とエモクロアTRPGのシナリオを執筆・公開しています。以下のページに詳細を掲載しています。
    Button(url="/myScenario", text="シナリオ")

  SyachiCard(title="リンク")
    p BOOTHではセッション用素材などを、TALTOでシナリオを、カクヨムには雑記をそれぞれ投稿しています。
    Button(url="https://syachihokomaru.booth.pm/", text="BOOTH（しゃちほこ丸の屋台）")
    Button(
      url="https://talto.cc/users/DVUC9LjUviekGgXrbqXaJWAcLCm1",
      text="TALTO（しゃちほこ丸の屋台）"
    )
    Button(
      url="https://kakuyomu.jp/works/16816927859758100588",
      text="カクヨム（しゃちほこ丸の雑多な置き場）"
    )
    p これらの情報は以下のTwitterで発信していきます。
    TwitterLink(yti)
    p 質問箱を設置しています。質問があればお気軽にどうぞ。
    Button(url="https://peing.net/ja/syachi_hoko_trp", text="質問箱")
</template>

<script>
import SyachiCard from "@/components/util/SyachiCard.vue";
import TwitterLink from "@/components/util/TwitterLink.vue";
import Button from "~/components/util/Button.vue";

export default {
  name: "IndexPage",
  components: {
    SyachiCard,
    TwitterLink,
    Button,
  },
};
</script>
