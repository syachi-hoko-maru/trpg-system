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
          title: "ソード・ワールド2.5 シナリオ作成",
          id: "sw25scenario",
          src: "hukyo.png", // "saborima.png",
          messages: [
            "現在TALTOにてサプリメント『魔導の学府 ユーシズ』で追加された〈ボトルドール〉を楽しむためのシナリオ「サボリ魔とトモダチと迷いの森」を無料公開しています。",
            "<a href='https://campaign.talto.cc/talto_cal2022/calendar/' target='_blank'>TALTOシナリオカレンダー2022</a>の4月18日を担当させていただき、初心者向けのシナリオ「ウォフト=ルーバの研究所跡」を公開しました。僕自身が初心者への布教のために作って複数回回したシナリオです。<br>初心者GMの方でも回しやすいシナリオとなっていると思います。",
            "今後も随時シナリオを作成し、公開していく予定です。",
            // "<a href='https://twitter.com/talto_cal2022' target='_blank'>TALTOシナリオカレンダー2022</a>の4月18日を担当させていただき、初心者向けのシナリオ「ウォフト=ルーバの研究所跡」を公開する予定です。僕自身が布教用として複数回回したシナリオです。<br>初心者GMの方でも回しやすいシナリオとなっていると思います。",
            "8月にはフェリシモ魔法部×二足獣企画さんによる<a href='https://www.felissimo.co.jp/mahoubu/kitomaho/'  target='_blank'>「きっと魔法遣いだったあなたたちへ」</a>というシナリオ一斉投稿企画へ参加させていただくつもりで、準備を進めています。<br>『鉄道の都 キングスフォール』掲載の大鉄道祭に関するシナリオにするつもりです。",
            "TALTOだけではなく、Pixivやカクヨムでの公開であったり、BOOTHでのPDF版の公開であったりも予定しています。<br>当ウェブサイトでも公開を予定しています。",
          ],
          schedules: [
            "2022年 1月26日 「サボリ魔とトモダチと迷いの森」公開",
            "2022年 4月1日 「ウォフト=ルーバの研究所跡」公開",
            "2022年 8月8日 「Magic Steam Festival」（仮）公開予定",
          ],
          buttons: [
            {
              url: "https://talto.cc/users/DVUC9LjUviekGgXrbqXaJWAcLCm1",
              text: "TALTO（しゃちほこ丸の屋台）",
            },
            {
              url: "/myScenario",
              text: "マイシナリオ",
            },
          ],
        },
        {
          title: "エモクロアTRPG シナリオ作成",
          id: "emokloreScenario",
          src: "cancionAzul.jpeg",
          messages: [
            "エモクロアTRPGシナリオ「Canción Azul」（カンシオン アスール）を執筆中です！　<a href='https://hydroxytrpg.booth.pm/items/3826115' target='_blank'>非公式サプリメント「マギアスエイジ」</a>を使ったファンタジーものです。<br><a href='https://twitter.com/fumidori75/status/1490988828873879553'  target='_blank'>#海の日TRPGシナリオ企画</a>に参加させていただくつもりです！",
          ],
          schedules: ["2022年 7月18日 「Canción Azul」公開予定"],
          buttons: [
            {
              url: "https://talto.cc/users/DVUC9LjUviekGgXrbqXaJWAcLCm1",
              text: "TALTO（しゃちほこ丸の屋台）",
            },
            {
              url: "/myScenario",
              text: "マイシナリオ",
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
            "SW2.5のココフォリア用のマップ素材を作成中です。",
          ],
          schedules: [],
          buttons: [
            {
              url: "https://syachihokomaru.booth.pm/",
              text: "BOOTH（しゃちほこ丸の屋台）",
            },
          ],
        },
        {
          title: "宇宙ペンギンTRPG Bluish",
          id: "blueish",
          src: "blueish.png",
          messages: [
            "「<ruby>宇宙<rp>(</rp><rt>スペース</rt><rp>)</rp></ruby>ペンギン」となって地球を守るために戦う、オリジナルTRPGです。",
            'タイトルの<ruby>"Bluish" <rp>(</rp><rt>ブルーイッシュ</rt><rp>)</rp></ruby>は「青みがかった」といった意味の英語です。<br>これはソ連の「ヴォストーク1号」で人類初の大気圏外からの帰還を果たしたユーリ・ガガーリンの名言「地球は青かった」の英訳をもとにしています。',
          ],
          schedules: [
            "2022年 1ページTRPG版 公開予定",
            "2022年 完全版 公開予定",
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
          schedules: ["2022年 公開予定"],
        },
        {
          title: "ソード・ワールド2.5 同人サプリメント「コロレスアニマルム」",
          id: "sw25ca",
          src: "colores.png",
          messages: [
            "ソード・ワールド2.5の同人サプリメントです。<br>オリジナル種族・冒険者技能などのデータを収録する予定です。",
            "「コロレスアニマルム」は「魂の色」という意味のラテン語をもとにしており、「魂」に関係したデータが多くなっています。",
          ],
          schedules: ["2022年 公開予定"],
        },
      ],
    };
  },
});
</script>
