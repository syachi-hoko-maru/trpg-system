<template lang="pug">
div
  SyachiCard(title="シナリオ")
    p 以下が現在公開中・執筆中・計画中のシナリオとなります。
    p これらの最新情報は以下のTwitterで発信しています。
    TwitterLink(yti)
    p シナリオ執筆以外の同人活動プロジェクトについては以下をご覧ください。
    Button(url="/projects", text="現在進行中の同人活動プロジェクト")

  SyachiCard(title="利用にあたって")
    p 改変は、セッションが参加者全員にとって面白くなるとGMが考えるのであれば、自由にしていただいて構いません。<br>
      | 特にPCがシナリオで想定していない行動をした場合にアドリブで解決することは強く推奨します。<br>
      | なお、シナリオ改善のため、どのような改変を行なったか教えていただければ幸いです。
    p また、システムの規約を守る限りにおいて、配信は収益化含めOK、会場代等がかかるオフラインセッションへの利用もOKです。
    p プレイ時間の目安は対面でのセッションか、ボイスセッションの場合を想定したものです。

  SyachiCard(
    v-for="scenario in scenarios.filter((o) => !o.hidden)",
    :key="scenario.title",
    :title="scenario.title",
    :src="scenario.src ? require(`~/assets/projects/${scenario.src}`) : ''"
  )
    p
      span.system {{ scenario.system }}
      br
      span.status {{ scenario.status ? scenario.status : '計画中' }}・
      span.price {{ scenario.price ? `¥${scenario.price}-` : '無料' }}
      br
      template(v-for="special in scenario.specials")
        span.special {{ special }}
        br
    p
      template(v-for="data in scenario.data")
        span.data {{ data }}
        br
    p(v-for="message in scenario.messages", :key="scenario", v-html="message")
    template(v-for="button in scenario.buttons.filter((o) => o.url)")
      Button(:url="button.url", :text="button.text")
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
  data: function () {
    return {
      scenarios: [
        {
          title: "ウォフト=ルーバの研究所跡",
          hidden: false,
          system: "ソード・ワールド2.5",
          status: "公開中",
          src: "hukyo.png", // "saborima.png",
          messages: [
            "僕自身が初心者への布教のために作り、何度か回したシナリオです。<br>初心者GMの方でも回しやすいシナリオとなっていると思います。",
            '遺跡へ行く探索モノのシナリオですが、裏テーマとして "たましい" があり、「エモい」と言ってもらえるものになっているかな、と考えております。',
            "<a href='https://campaign.talto.cc/talto_cal2022/calendar/' target='_blank'>TALTOシナリオカレンダー2022</a>の4月18日のシナリオです。",
            "ココフォリアの部屋データが付属しています。",
          ],
          buttons: [
            {
              url: "https://talto.cc/projects/NU47DZgkJ51cMVBsYv504",
              text: "TALTO",
            },
          ],
          special: [],
          data: ["2〜6人用（推奨4〜5人）", "4時間程度", "初期作成"],
        },
        {
          title: "サボり魔とトモダチと迷いの森",
          hidden: false,
          system: "ソード・ワールド2.5",
          status: "公開中",
          src: "saborima.png",
          messages: [
            "『魔導の学府 ユーシズ』で追加された〈ボトルドール〉を楽しむためのシナリオです。",
            "GMレスで、1人から遊ぶことができます。",
            "オンラインセッション用の素材が付属しています。",
          ],
          buttons: [
            {
              url: "https://talto.cc/projects/pzrYcCZuMTZh69bbSmj3T",
              text: "TALTO",
            },
          ],
          specials: ["GMレス"],
          data: ["1〜6人用", "2時間程度", "初期作成 or 2〜3レベル"],
        },
        {
          title: "Canción Azul（カンシオン アスール）",
          hidden: false,
          system: "エモクロアTRPG",
          status: "執筆中（7/18公開予定）",
          src: "cancionAzul.jpeg",
          messages: [
            "<a href='https://hydroxytrpg.booth.pm/items/3826115'  target='_blank'>非公式サプリメント「マギアスエイジ」</a>を使ったファンタジーものです。<br>マギアスエイジの舞台となるスブトゥリムの南端、「南の大海」に面する港町で、漁船の失踪事件を調査するシナリオとなります。",
            "<a href='https://twitter.com/fumidori75/status/1490988828873879553'  target='_blank'>#海の日TRPGシナリオ企画</a>に参加させていただくつもりです！",
          ],
          buttons: [
            {
              // url: "https://talto.cc/projects/pzrYcCZuMTZh69bbSmj3T",
              text: "TALTO",
            },
          ],
          specials: [],
          data: ["1〜4人用", "3〜4時間程度"],
        },
        {
          title: "Magic Steam Festival",
          hidden: false,
          system: "ソード・ワールド2.5",
          status: "執筆中（8/8公開予定）",
          src: "kitomaho.jpeg",
          messages: [
            "『鉄道の都 キングスフォール』掲載の大鉄道祭に関するシナリオにするつもりです。",
            "フェリシモ魔法部×二足獣企画さんによる<a href='https://www.felissimo.co.jp/mahoubu/kitomaho/  target='_blank''>「きっと魔法遣いだったあなたたちへ」</a>というシナリオ一斉投稿企画へ参加させていただくつもりで、準備を進めています。",
          ],
          buttons: [
            {
              // url: "https://talto.cc/projects/pzrYcCZuMTZh69bbSmj3T",
              text: "TALTO",
            },
          ],
          specials: [],
          data: ["3〜5人用", "3時間程度", "5〜6レベル向け"],
        },
        {
          title: "とろ〜りとしたあまいやつ",
          hidden: false,
          system: "ソード・ワールド2.5",
          status: "自分で回す用",
          src: "pudding.png",
          messages: [
            "「プリン」の素材を求めてお使いに行くシナリオです。",
            "オリジナル設定として、アルフレイム大陸における「プリン」は魔法生物プリン（オリジナル）を真似したもので、魔動機文明時代に作られたもの、となっています。<br>現在では一部の人が好んで食べる高級品です。",
          ],
          buttons: [
            {
              // url: "https://talto.cc/projects/pzrYcCZuMTZh69bbSmj3T",
              text: "TALTO",
            },
          ],
          specials: [],
          data: ["2〜5人用", "2〜3時間程度", "2〜3レベル向け"],
        },
      ],
    };
  },
});
</script>
