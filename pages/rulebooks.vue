<template lang="pug">
div
  SyachiCard(title="所持ルールブック一覧")
    p.
      このページではしゃちほこ丸の所持するルールブック・サプリメントをまとめています。<br>
      これらは全て遊びたいシステムですのでお誘いお待ちしております。
  SyachiCard(v-for="group in groups", :key="group.group", :title="group.name")
    p(v-html="group.message")
    v-list
      v-list-item(v-for="item in group.items", :key="item.rulebook")
        v-list-item-content
          v-list-item-title {{ item.rulebook }}
          template(v-for="supplement in item.supplements")
            v-list-item-subtitle {{ supplement }}
    template(v-if="group.group == 'SW'")
      hr.mb-3
      p なおカクヨムにてソード・ワールド2.5のサプリメント紹介をしているのでぜひご覧ください。
      Botton(
        url="https://kakuyomu.jp/works/16816927859758100588",
        text="カクヨム（しゃちほこ丸の雑多な置き場）"
      )
</template>

<script lang="ts">
import Vue from "vue";
import SyachiCard from "@/components/util/SyachiCard.vue";
import Botton from "~/components/util/Button.vue";

export default Vue.extend({
  name: "RulebooksPage",
  components: { SyachiCard, Botton },
  data: function () {
    return {
      groups: [
        {
          group: "CoC",
          name: "クトゥルフ神話TRPG",
          message:
            "6版・7版ともにPLをしたことがありますが、KP経験はありません。",
          items: [
            {
              group: "CoC",
              rulebook: "クトゥルフ神話TRPG（第6版）",
              supplements: [],
            },
            {
              group: "CoC",
              rulebook: "新クトゥルフ神話TRPG（第7版）",
              supplements: [],
            },
          ],
        },
        {
          group: "SW",
          name: "ソード・ワールド",
          message:
            "ソード・ワールド2.5はGM・PL共に経験があります。<br>2.0は身内でのGM・PL経験があり、1stは全く経験がありません。",
          items: [
            {
              group: "SW",
              rulebook: "ソード・ワールド2.5（I〜III）",
              supplements: [
                "エピックトレジャリー",
                "モンストラスロア",
                "メイガスアーツ",
                "アウトロープロファイルブック",
                "冒険の国グランゼール",
                "鉄道の都キングスフォール",
                "星座の町サイレックオード",
                "魔導の学府ユーシズ",
                "ヴァイスシティ",
                "デモンズライン",
                "剣と荒野と放浪者",
                "冒険者たちの幻獣戦線",
              ],
            },
            {
              group: "SW",
              rulebook: "ソード・ワールド2.0（I〜III 改訂版）",
              supplements: [
                "ルールブックEX",
                "バルバロスブック",
                "ラクシアゴッドブック",
                "カルディアグレイス",
                "イグニスブレイズ",
                "ルミエルレガシィ",
                "フォルトナコード",
                "エイジ・オブ・グリモワール",
                "ユーレリア博物誌",
                "ディルフラム博物誌",
                "イスカイア博物誌",
                "フェアリーガーデン",
                "アシュラウトの無限工房",
              ],
            },
            {
              group: "SW",
              rulebook: "ソード・ワールドRPG（完全版）",
              supplements: [],
            },
          ],
        },
        {
          group: "sfic",
          name: "サイコロフィクションシリーズ",
          message:
            "インセインは身内でのGM・PL経験があります。<br>他は全く経験がありません。",
          items: [
            {
              group: "sfic",
              rulebook: "インセイン（1〜3）",
              supplements: [],
            },
            {
              group: "sfic",
              rulebook: "シノビガミ（スタートブック 上・下 改訂版）",
              supplements: [],
            },
            {
              group: "sfic",
              rulebook: "艦これRPG 抜錨ノ書",
              supplements: [],
            },
          ],
        },
        {
          group: "bouki",
          name: "冒険企画局（その他）",
          message: "どちらもPLのみ経験があります。",
          items: [
            {
              group: "bouki",
              rulebook: "蒸気と冒険の飛空艇TRPG 歯車の塔の探空士",
              supplements: ["探空士と黒煙の軌跡"],
            },
            {
              group: "bouki",
              rulebook: "誰かのために成りかわるTRPG バケノカワ",
              supplements: [],
            },
          ],
        },
        {
          group: "FEAR",
          name: "F.E.A.R.",
          message: "いずれも全く経験がありません。",
          items: [
            {
              group: "FEAR",
              rulebook: "アリアンロッドRPG 2E（1・2 改訂版）",
              supplements: [],
            },
            {
              group: "FEAR",
              rulebook: "ダブルクロスThe3rdEdition（1・2）",
              supplements: ["上級ルールブック"],
            },
          ],
        },
        {
          group: "other",
          name: "その他",
          message: "いずれも全く経験がありません。",
          items: [
            {
              group: "other",
              rulebook: "常夜国騎士譚RPG ドラクルージュ",
              supplements: [
                "ヘレティカノワール",
                "ノブレスストーリア",
                "サングトラヴェリア",
              ],
            },
            {
              group: "other",
              rulebook: "ログ・ホライズンTRPG",
              supplements: [],
            },
          ],
        },
        {
          group: "dozin",
          name: "同人",
          message: "身内でのPLのみ経験があります。",
          items: [
            {
              group: "dozin",
              rulebook: "TRPGおまじな大饗宴",
              supplements: [],
            },
          ],
        },
        {
          group: "web",
          name: "ウェブ",
          message: "いずれも全く経験がありません。",
          items: [
            {
              group: "web",
              rulebook: "エモクロアTRPG",
              supplements: [],
            },
          ],
        },
      ],
    };
  },
});
</script>
