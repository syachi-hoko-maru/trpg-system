<template>
  <card>
    <andml :andmls="text" />
  </card>
  <card v-for="group, g of groups" :key="group.group">
    <div v-for="sys, s of group.system" :key="sys.rulebook">
      <item-head2>
        {{ sys.rulebook }}
      </item-head2>
      <div v-if="sys.supplements.length">
        <div v-if="sys.supplements.length < 4 || show[g] && show[g][s]">
          <div class="pl-5" v-for="supplement of sys.supplements"
            :key="typeof supplement === 'string' ? supplement : supplement.supplements[0]">
            <template v-if="typeof supplement === 'string'">
              {{ supplement }}
            </template>
            <template v-else>
              <div class="mt-3 mb-1">
                {{ supplement.group }}
              </div>
              <div class="pl-5" v-for="suppl of supplement.supplements" :key="suppl">
                {{ suppl }}
              </div>
            </template>
          </div>

        </div>
        <item-button v-if="sys.supplements.length >= 4" @click.stop="() => showSuppliment(g, s)">
          {{ show[g] && show[g][s]
            ? "サプリメントを非表示" : "サプリメントを表示する"
          }}
        </item-button>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

const show: Ref<boolean[][]> = ref([])
const showSuppliment = (g: number, s: number) => {
  if (!show.value[g] || !show.value[g].length) show.value[g] = []
  if (!show.value[g][s]) {
    show.value[g][s] = true
  }
  else show.value[g][s] = false
}

const text = `
以下では管理人のしゃちほこ丸が所有するルールブック・サプリメントの一覧を掲載しています。
ソード・ワールド2.5のおすすめサプリメントについては以下をご覧ください。
&button_/sw25/forbeginner/suppliment/1 
`

const rulebookGroups = ["CoC", "SW", "sfic", "bouki", "FEAR", "other", "dozin", "web"] as const
type RulebookGroup = typeof rulebookGroups[number]
type Rulebook = {
  readonly group: RulebookGroup,
  readonly system: {
    readonly rulebook: string,
    readonly supplements: (string | { group: string, supplements: string[] })[]
  }[]
}
const groups: Readonly<Rulebook[]> = [
  {
    group: "CoC",
    system: [
      {
        rulebook: "クトゥルフ神話TRPG（第6版）",
        supplements: [],
      },
      {
        rulebook: "新クトゥルフ神話TRPG（第7版）",
        supplements: [],
      }
    ]
  },
  {
    group: "SW",
    system: [
      {
        rulebook: "ソード・ワールド2.5（I〜III）",
        supplements: [
          {
            group: "大型サプリ",
            supplements: [
              "エピックトレジャリー",
              "モンストラスロア",
              "メイガスアーツ",
              "バトルマスタリー",
            ]
          },
          {
            group: "キャラクタービルディングブック系サプリ",
            supplements: [
              "アウトロープロファイルブック",
            ]
          },
          {
            group: "ツアー系サプリ",
            supplements: [
              "冒険の国グランゼール",
              "鉄道の都キングスフォール",
              "星座の町サイレックオード",
              "魔導の学府ユーシズ",
              "ブルライト博物誌",
            ]
          },
          {
            group: "バトルブック系サプリ・シナリオ集",
            supplements: [
              "ヴァイスシティ　‐悪徳の贄‐",
              "デモンズライン　‐追憶の守人‐",
              "グリフォンロード　‐黄金のキャラバン‐",
              "煌日の姫と冴月の王子",
              "ストーリーフラグメンツ",
            ]
          },
          {
            group: "データ付き大判リプレイ",
            supplements: [
              "剣と荒野と放浪者",
              "剣と荒野と放浪者2",
              "冒険者たちの幻獣戦線",
            ]
          },
          {
            group: "非公式サプリメント",
            supplements: [
              "ハルーラガイド－ゲームマスターズアーカイブ－"
            ]
          }
        ],
      },
      {
        rulebook: "ソード・ワールド2.0（I〜III 改訂版）",
        supplements: [
          {
            group: "単行本サイズ",
            supplements: [
              "ルールブックEX",
              "バルバロスブック",
              "ラクシアゴッドブック",
            ]
          },
          {
            group: "大型サプリ",
            supplements: [
              "ウィザーズトゥーム",
              "カルディアグレイス",
              "イグニスブレイズ",
              "ルミエルレガシィ",
              "フォルトナコード",
              "エイジ・オブ・グリモワール",
            ]
          },
          {
            group: "ツアー系サプリ",
            supplements: [
              "フェイダン博物誌",
              "ザルツ博物誌",
              "ユーレリア博物誌",
              "ダグニア博物誌",
              "ディルフラム博物誌",
              "イスカイア博物誌",
            ]
          },
          {
            group: "バトルブック系サプリ・シナリオ集",
            supplements: [
              "ミストキャッスル　-蛮都からの生還-",
              "フェアリーガーデン　-妖精たちの空中庭園-",
              "ミストグレイヴ　-蛮都への復讐-",
              "彷徨ノ塔　‐フォビドゥンタワー‐",
              "アシュラウトの無限工房",
              "モンスター☆ハッカーズ",
            ]
          },
        ],
      },
      {
        rulebook: "ソード・ワールドRPG（完全版）",
        supplements: [],
      },
    ]
  },
  {
    group: "sfic",
    system: [
      {
        rulebook: "インセイン（1〜3）",
        supplements: [],
      },
      {
        rulebook: "シノビガミ（スタートブック 上・下 改訂版）",
        supplements: [],
      },
      {
        rulebook: "艦これRPG 抜錨ノ書",
        supplements: [],
      }
    ]
  },
  {
    group: "bouki",
    system: [
      {
        rulebook: "蒸気と冒険の飛空艇TRPG 歯車の塔の探空士",
        supplements: ["探空士と黒煙の軌跡"],
      },
      {
        rulebook: "誰かのために成りかわるTRPG バケノカワ",
        supplements: [],
      },]
  },
  {
    group: "FEAR",
    system: [
      {
        rulebook: "アリアンロッドRPG 2E（1・2 改訂版）",
        supplements: [],
      },
      {
        rulebook: "ダブルクロスThe3rdEdition（1・2）",
        supplements: ["上級ルールブック"],
      },
    ]
  },
  {
    group: "other",
    system: [
      {
        rulebook: "ふしぎもののけRPGゆうやけこやけ",
        supplements: []
      },
      {
        rulebook: "常夜国騎士譚RPG ドラクルージュ",
        supplements: [
          "ヘレティカノワール",
          "ノブレスストーリア",
          "サングトラヴェリア",
        ],
      },
      {
        rulebook: "ログ・ホライズンTRPG",
        supplements: [],
      },
    ]
  },
  {
    group: "dozin",
    system: [
      {
        rulebook: "おまじな",
        supplements: [
          "TRPGおまじな大饗宴",
          "TRPGおまじな大饗宴二次会",
          "TRPGおまじな大饗宴三次会・赤",
          "TRPGおまじな大饗宴三次会・緑",
          "TRPGおまじな大饗宴四次会",
          "TRPGおまじなSOS",
          "妖怪が一つ屋根の下TRPG『住めば都のオマジナ荘』",
          "真・眼鏡の天使TRPG『メガネリオン∞』",
          "超高速ファンタジーTRPG『30分勇者』",
          "超高速ダンジョンアタックTRPG『30分勇者II』",
        ],
      },
      {
        rulebook: "終末紀行ＲＰＧ World's End Journey",
        supplements: [
          "ランダムプレイ拡張パック",
          "ステージ拡張：海洋",
          "スキル＆コンパニオン拡張"
        ],
      },
      {
        rulebook: "灰の天地の魔導士たち",
        supplements: ["アップデート1：夜を歩む者"],
      },
      {
        rulebook: "愛用品と対話するソロＲＰＧ「つくもさんぽ」",
        supplements: []
      }
    ]
  },
  {
    group: "web",
    system: [{
      rulebook: "エモクロアTRPG",
      supplements: [{
        group: "非公式サプリメント",
        supplements: ["マギアスエイジ"]
      }],
    }
    ]
  },
]

</script>