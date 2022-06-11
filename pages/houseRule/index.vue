<template lang="pug">
div
  SyachiCard(title="ハウスルール")
    p しゃちほこ丸の主催する卓でのハウスルールをまとめています。
    p 参加する際は必ずお読みください。不明点などあればお気軽にご相談ください。

  SyachiCard(title="システム別")
    p
      Button(url="houseRule/sw25", text="ソード・ワールド2.5") 

  SyachiCard(title="共通ハウスルール")
  SyachiCard(title="ココフォリアのタブの使い方について")
    p 以下のようにお願いします
    ul
      li メイン
        ul
          li 行動の宣言
          li 判定
          li ロールプレイ
            ul
              li ボイセの場合も、テキストでのロールプレイを行なっても構いません
      li 情報
        ul
          li GMが情報を貼る用
      li 雑談
        ul
          li 点呼（テキセのみ・下記参照）
          li 質問（例：「ルール分からなかったので解説してください」）
          li 雑談（例：「このキャラかわいいね〜」などのPL発言）
          li 試し振り（例：いわゆる「お祓い」目的のダイスロールも含む）

  SyachiCard(title="点呼について（テキセ）")
    p セッション開始時にココフォリアの雑談タブで点呼を行います。
    p お返事お願いします。

  SyachiCard(title="ロールプレイについて")
    p いっぱい楽しんでいただきたいです。ただし、時間に限りもあるので、以下のことをご了承ください
    ol
      li GMが「そうこう話していると……」などと言って切り上げた場合、次の場面へ移ってください
      li 送る予定の文章がある場合、なるべく用意しておいてください（戦闘が始まるときにこれを言いたい！　攻撃するときにこれを言いたい！　など）（テキセのみ）

  SyachiCard(title="言葉使いについて")
    p 周囲の人に誤解を含め不快感を与えないよう、優しく丁寧な言葉使いを心がけてください。

  SyachiCard(title="遅刻・欠席について")
    p なるべく早く連絡をお願いします。
    p また仕方ない場合も含め、ひとこと参加者の方に謝罪の言葉をいただけるとありがたいです。
</template>

<script lang="ts">
import Vue from "vue";
import SyachiCard from "@/components/util/SyachiCard.vue";
import TwitterLink from "@/components/util/TwitterLink.vue";
import Button from "@/components/util/Button.vue";

export default Vue.extend({
  name: "ScenariosPage",
  components: {
    SyachiCard,
    TwitterLink,
    Button,
  },
  mounted() {
    this.$nuxt.$emit("hiddenAmazon", false);
  },
});
</script>