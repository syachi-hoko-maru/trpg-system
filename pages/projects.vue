<template lang="pug">
div
  SyachiCard(title="しゃちほこ丸の同人活動プロジェクトについて")
    p 以下が現在進行中の同人活動プロジェクトとなっています。
    p これらの最新情報は以下のTwitterで発信しています。
    TwitterLink(yti)

  SyachiCard(
    v-for="project in projects.filter((o) => !o.hidden)",
    :key="project",
    :title="project.title"
  )
    template(v-for="message in project.messages")
      p(v-html="message")
    v-list
      v-list-item(
        dense,
        v-for="schedule in project.schedules",
        :key="schedule"
      )
        v-list-content {{ schedule }}
    template(v-for="button in project.buttons")
      Button(:url="button.url", :text="button.text")
</template>

<script lang="ts">
import Vue from "vue";
import SyachiCard from "@/components/util/SyachiCard.vue";
import TwitterLink from "@/components/util/TwitterLink.vue";
import Button from "@/components/util/Button.vue";

export default Vue.extend({
  name: "ProjectsPage",
  components: {
    SyachiCard,
    TwitterLink,
    Button,
  },
  data: function () {
    return {
      projects: [
        {
          title: "宇宙ペンギンTRPG Bluish",
          messages: [
            "「<ruby>宇宙<rp>(</rp><rt>スペース</rt><rp>)</rp></ruby>ペンギン」となって地球を守るために戦う、オリジナルTRPGです。",
            'タイトルの<ruby>"Bluish" <rp>(</rp><rt>ブルーイッシュ</rt><rp>)</rp></ruby>は「青みがかった」といった意味の英語です。<br>これはソ連の「ヴォストーク1号」で人類初の大気圏外からの帰還を果たしたユーリ・ガガーリンの名言「地球は青かった」の英訳をもとにしています。',
          ],
          schedules: [
            "2022年 2月中旬 1ページTRPG版 公開予定",
            "2022年 5月 完全版 公開予定",
          ],
        },
        {
          title:
            "ソード・ワールド2.5 同人シナリオ集「ボイジャーズアドベンチャー」",
          hidden: true,
          messages: [
            "ソード・ワールド2.5の同人シナリオ集です。<br>シナリオを7〜10本ほど収録予定です。",
          ],
          schedules: ["2022年 夏 公開予定"],
        },
        {
          title: "ソード・ワールド2.5 同人サプリメント「コロレスアニマルム」",
          messages: [
            "ソード・ワールド2.5の同人サプリメントです。<br>オリジナル種族・冒険者技能などのデータを収録する予定です。",
            "「コロレスアニマルム」は「魂の色」という意味のラテン語をもとにしており、「魂」に関係したデータが多くなっています。",
          ],
          schedules: ["2022年 夏 公開予定"],
        },
        {
          title: "ソード・ワールド2.5 シナリオ作成",
          messages: [
            "現在TALTOにてサプリメント「魔導の学府 ユーシズ」で追加された〈ボトルドール〉を楽しむためのシナリオ「サボリ魔とトモダチと迷いの森」を無料公開しています。",
            "今後も随時シナリオを追加予定です。",
            "Pixivやカクヨムでの公開やBOOTHでのPDF版の公開も予定しています。",
          ],
          schedules: [],
          buttons: [
            {
              url: "https://talto.cc/users/DVUC9LjUviekGgXrbqXaJWAcLCm1",
              text: "TALTO（しゃちほこ丸の屋台）",
            },
          ],
        },
        {
          title: "オンラインセッション素材",
          messages: [
            "BOOTHにてオンラインセッション素材を公開しています。",
            "SW2.5の〈ボトルドール〉を楽しむための素材「ボトルドールシート素材」は現在無料配布中です。",
            "「ダンジョンマップタイル」はSW2.5のほか、CoCのクローズドシナリオなどでも使えます。",
          ],
          schedules: [],
          buttons: [
            {
              url: "https://syachihokomaru.booth.pm/",
              text: "BOOTH（しゃちほこ丸の屋台）",
            },
          ],
        },
      ],
    };
  },
});
</script>
