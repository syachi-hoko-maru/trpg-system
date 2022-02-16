<template lang="pug">
div
  SyachiCard(title="しゃちほこ丸のTRPGシステムへようこそ")
    p このサイトではTRPGに役立つシステムの提供などを行なっていく予定です。
    p 随時更新していきます。更新情報は
      TwitterLink(inline)
      | にて発信させていただきます。
    p 現在はSW2.5のダメージ計算や命中する割合の計算などに使えるシミュレーターを公開しています。
    Botton(url="/sw25simulate", text="SW2.5 判定シミュレーター")

  SyachiCard(title="ご挨拶")
    p.
      しゃちほこ丸という名前でTRPG、特にソード・ワールド2.5（SW2.5）などを遊んでいます。<br>
      「ソード・ワールド2.5をしたい！」という方はぜひお気軽にTwitterにてお声がけください。未経験者も大歓迎です。
    TwitterLink
    p 中の人は20代の男です。良い声ではありませんがボイスセッションもテキストセッションも可能です。
    p 僕の持っているルールブック一覧などについては以下のページをご覧ください。
    Botton(url="/rulebooks", text="所持ルールブック一覧")

  SyachiCard(title="リンク")
    p BOOTHではセッション用素材などを、TALTOでシナリオを、カクヨムには雑記をそれぞれ投稿しています。
    Botton(url="https://syachihokomaru.booth.pm/", text="BOOTH（しゃちほこ丸の屋台）")
    Botton(
      url="https://talto.cc/users/DVUC9LjUviekGgXrbqXaJWAcLCm1",
      text="TALTO（しゃちほこ丸の屋台）"
    )
    Botton(
      url="https://kakuyomu.jp/works/16816927859758100588",
      text="カクヨム（しゃちほこ丸の雑多な置き場）"
    )
    p これらの情報は以下のTwitterで発信していきます。
    TwitterLink(yti)
    p また、現在進行中の同人活動プロジェクトは以下のページから確認することができます。
    Botton(url="/projects", text="現在進行中の同人活動プロジェクト")
    p 質問箱を設置しています。質問があればお気軽にどうぞ。
    Botton(url="https://peing.net/ja/syachi_hoko_trp", text="質問箱")
</template>

<script>
import SyachiCard from "@/components/util/SyachiCard.vue";
import TwitterLink from "@/components/util/TwitterLink.vue";
import Botton from "~/components/util/Button.vue";

export default {
  name: "IndexPage",
  components: {
    SyachiCard,
    TwitterLink,
    Botton,
  },
};
</script>
