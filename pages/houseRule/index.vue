<template lang="pug">
div
  SyachiCard(title="ハウスルール")
    p しゃちほこ丸の主催する卓でのハウスルールをまとめています。<br>
      | 参加する際は必ずお読みください。
    p 今後も参加する全員にとってより良いセッションができるよう、改善していくつもりです。<br>
      | ご意見・ご感想等よろしくお願いいたします。<br>
      | 不明点などあればお気軽にご相談ください。

  SyachiCard(title="システム別")
    p
      Button(url="houseRule/sw25", text="ソード・ワールド2.5") 

  SyachiCard#common(title="共通ハウスルール")
  SyachiCard(title="ココフォリアのタブの使い方について")
    p 以下のようにお願いします
    ul
      li メイン
        ul
          li 行動の宣言
          li 判定・成長
          li ロールプレイ
            ul
              li ボイセの場合も、テキストでのロールプレイを行なっても構いません
      li 情報
        ul
          li GMが情報を貼る用
      li 雑談
        ul
          li 点呼（テキセのみ）
            ul
              li セッション開始時にココフォリアの雑談タブで点呼を行います。<br>
                | お返事お願いします。
          li 質問（例：「ルール分からなかったので解説してください」）
          li 雑談（例：「このキャラかわいいね〜」などのPL発言）
          li 試し振り（例：いわゆる「お祓い」目的のダイスロールも含む）

  SyachiCard(title="ロールプレイについて")
    p いっぱい楽しんでいただきたいです。ただし、時間に限りもあるので、以下のことをご了承ください
    ul
      li GMが「そうこう話していると……」などと言って切り上げた場合、次の場面へ移ってください
      li 送る予定の文章がある場合、なるべく用意しておいてください（戦闘が始まるときにこれを言いたい！　攻撃するときにこれを言いたい！　など）（テキセのみ）
      li PC発言であっても、差別用語など、見聞きした人が不快になりうる言葉の使用に関しては特に注意してください
        ul
          li PCにこのような発言をさせる場合、「『お前……』と暴言を放ちます」のようにPL発言での説明に止めるようにお願いします
          li これらの言葉を放ちそうなキャラの使用はお控えいただく可能性があります

  SyachiCard(title="守っていただきたいこと")
    ul
      li 言葉遣い
        ul
          li PL発言は、周囲の人に誤解を含め不快感を与えないよう、優しく丁寧な言葉使いを心がけてください
            ul
              li 原則として敬体（です・ます調）でお願いします
          li PC発言であっても、差別用語など、見聞きした人が不快になりうる言葉の使用に関しては特に注意してください
            ul
              li PCにこのような発言をさせる場合、「『お前……』と暴言を放ちます」のようにPL発言での説明に止めるようにお願いします
              li これらの言葉を放ちそうなキャラの使用はお控えいただく可能性があります
      li 遅刻・欠席
        ul
          li なるべく早く連絡をお願いします
          li また仕方ない場合も含め、ひとこと参加者の方に謝罪の言葉をいただけるとありがたいです
      li 脱線
        ul 
          li 雑談が盛り上がるのは良いことですが、セッション中はセッションから脱線しすぎないようお願いします
          li これはDiscordでのセッション準備でもお願いします
            ul
              li ここでする必要のない雑談はTwitterなどでお願いします
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