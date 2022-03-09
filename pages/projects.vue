<template lang="pug">
div
  SyachiCard(title="しゃちほこ丸の同人活動プロジェクトについて")
    p 以下が現在進行中の同人活動プロジェクトとなっています。
    p これらの最新情報は以下のTwitterで発信しています。
    TwitterLink(yti)

  SyachiCard(
    v-for="project in projects.filter((o) => !o.hidden)",
    :key="project.title",
    :title="project.title",
    :src="project.src ? require(`~/assets/projects/${project.src}`) : ''",
    :id="project.id"
  )
    p(v-for="message in project.messages", :key="message", v-html="message")
    v-list
      v-list-item(
        dense,
        v-for="schedule in project.schedules",
        :key="schedule"
      )
        v-list-item-content {{ schedule }}
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
          id: "blueish",
          src: "blueish.png",
          messages: [
            "「<ruby>宇宙<rp>(</rp><rt>スペース</rt><rp>)</rp></ruby>ペンギン」となって地球を守るために戦う、オリジナルTRPGです。",
            'タイトルの<ruby>"Bluish" <rp>(</rp><rt>ブルーイッシュ</rt><rp>)</rp></ruby>は「青みがかった」といった意味の英語です。<br>これはソ連の「ヴォストーク1号」で人類初の大気圏外からの帰還を果たしたユーリ・ガガーリンの名言「地球は青かった」の英訳をもとにしています。',
          ],
          schedules: [
            "2022年 春 1ページTRPG版 公開予定",
            "2022年 夏 完全版 公開予定",
          ],
        },
        {
          title:
            "ソード・ワールド2.5 同人シナリオ集「ボイジャーズアドベンチャー」",
          id: "sw25va",
          hidden: true,
          messages: [
            "ソード・ワールド2.5の同人シナリオ集です。<br>シナリオを7〜10本ほど収録予定です。",
          ],
          schedules: ["2022年 夏 公開予定"],
        },
        {
          title: "ソード・ワールド2.5 同人サプリメント「コロレスアニマルム」",
          id: "sw25ca",
          src: "colores.png",
          messages: [
            "ソード・ワールド2.5の同人サプリメントです。<br>オリジナル種族・冒険者技能などのデータを収録する予定です。",
            "「コロレスアニマルム」は「魂の色」という意味のラテン語をもとにしており、「魂」に関係したデータが多くなっています。",
          ],
          schedules: ["2022年 夏 公開予定"],
        },
        {
          title: "ソード・ワールド2.5 シナリオ作成",
          id: "sw25scenario",
          src: "saborima.png",
          messages: [
            "現在TALTOにてサプリメント「魔導の学府 ユーシズ」で追加された〈ボトルドール〉を楽しむためのシナリオ「サボリ魔とトモダチと迷いの森」を無料公開しています。",
            "<a href='https://twitter.com/talto_cal2022' target='_blank'>TALTOシナリオカレンダー2022</a>の4月18日を担当させていただき、初心者向けのシナリオ「ウォフト=ルーバの研究所跡」を公開します。僕自身が布教用として複数回回したシナリオです。<br>初心者GMの方でも回しやすいシナリオとなっています。",
            "今後も随時シナリオを追加予定です。",
            "Pixivやカクヨムでの公開やBOOTHでのPDF版の公開も予定しています。",
          ],
          schedules: ["2022年 4月18日 「ウォフト=ルーバの研究所跡」公開予定"],
          buttons: [
            {
              url: "https://talto.cc/users/DVUC9LjUviekGgXrbqXaJWAcLCm1",
              text: "TALTO（しゃちほこ丸の屋台）",
            },
          ],
        },
        {
          title: "オンラインセッション素材",
          id: "material",
          src: "dungeon.png",
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
