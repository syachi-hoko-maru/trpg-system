<template>
    <card-array-by-andml :andml="setsumei" />
    <card>
        <template #title>ネタバレクッション</template>
        以下はシナリオ本編となり、遊ぶ上で致命的なシナリオのネタバレが含まれます。<br>
        プレイヤーとして遊ぶ予定の方は閲覧をお控えください。<br>
        <br>
        見る場合には以下のボタンを押してください。
        <item-button @click="() => show = !show">
            {{ show ? "シナリオを閉じる" : "シナリオを見る" }}
        </item-button>
    </card>
    <card-array-by-andml :andml="andml" v-if="show" />
    <card>
        <template #title>他のシナリオ</template>
        しゃちほこ丸のシナリオ一覧はこちら
        <item-button url="/scenario" />
    </card>
</template>
  
<script setup lang="ts">
import scenario from "@/assets/scenario.json"
import { isPast } from "~/src/util/date";

const { params } = useRoute()

const andml = ref("")
const id: string = "fukinotou"

const blog: { id: string, andml: string } | undefined = (scenario as { id: string, andml: string }[]).find(blo => blo.id === id)

if (!(
    blog
    && blog.andml && typeof blog.andml === "string"
)) {
    showError("")
} else {
    andml.value = blog.andml
}

const show = ref(false)

const setsumei = `
&1 このシナリオについて
このシナリオはC102で頒布する同人シナリオ集『冒険者の旅路』のサンプルです。
&br
初春の山に「ふきのとう」を採りに行くシナリオです。
初心者向けのシナリオとなっています。

&2 冒険者の旅路について
同人シナリオ集『冒険者の旅路』は &link_https://twitter.com/DKP71603706,DKPさん のサークル、「幻想書斎」から出ます！
&br
このシナリオ集には &em_シナリオ6本とキャンペーン1本が収録予定 で、レベル2〜14まで、幅広いレベル帯で遊べます。
&br
このうちシナリオ2本をサンプルとして &em_無料公開 しています。
&br
もう1本のシナリオ「黎明のシンデレラ」（りあ作）は以下から遊ぶことができます。
&button_?　現在準備中です。しばらくお待ちください。
// &button_ シナリオ「黎明のシンデレラ」
&br
頒布するのは2023年の夏コミ（C102）の1日目、 &em_8月12日（土） です。
&br
場所は &em_東地区¥s"Ｖ"¥sブロック¥s36b です。
詳しくは以下の「コミケWebカタログ」をご覧ください。
&button_https://webcatalog-free.circle.ms/Circle/17321634 コミケWebカタログ

&2 通販もあります！
C102に行けないよって方のために、通販もあります！
ソード・ワールド2.5をしていらっしゃるハリィさん（ &link_https://twitter.com/swrpglove,Twitter ）のお店「HarryHarry」での通販です。
&br
${isPast("2023/7/20") ? "ぜひぜひご予約ください。" : "7月20日（木）12時予約開始予定です！"}
&button_https://harryharry.base.shop/items/76512992 通販はこちら


&1 シナリオスペック
- プレイヤー人数
-- 2～4人
-- PC1人以上がレンジャー技能を持つことが望ましい
- 必須ルールブック
-- 基本Ⅰ・Ⅱ
- レギュレーション
-- 初期作成
- 想定時間
-- 3〜5時間（オンライン・ボイセ）
- 戦闘ルール
-- 基本戦闘（推奨） or 上級戦闘
- 初心者向け

&2 選択ルール
- バトルギミックの使用
-- 詳しくは『４）各種表』の『★イベント「戦闘になる」ついて』を参照
- GMのサプリメント使用（バトルマスタリー）
-- フェローデータに影響します

&2 舞台
このシナリオはアルフレイム大陸南部、ブルライト地方を舞台にして進行します。
ハーヴェス王国の首都ハーヴェス（基本ルールブックⅠ、379P）で依頼を受け、ディガッド山脈（基本ルールブックⅠ、381P）の山麓のモンテス村へ行くこととなります。

&2 トレーラー
「冬の山には薬草がいっぱいあるんだ」
「ある意味、宝の山だな」
「でも、油断したら、だめだ」
&br
駆け出しの冒険者たちは冬山の冒険へ出ることになる

&2 NPC一覧
- ベア・モンテス（ドワーフ／男／60歳）
-- 村長であり、今回の依頼主。
-- 妻は温泉宿「ファーベルトの湯」を経営しており、冒険者たちを泊めてくれる。
- ノア・アスター（人間／男／30）
-- ディガッド山脈の山々に篭って修行をしている、【ダイケホーン双霊氷法】の使い手。

&2 シナリオの着地点・趣旨
このシナリオは初心者GM、初心者PLが “TRPG” とソード・ワールドの部隊であるラクシア世界を楽しめることを第一に執筆しました。
いろいろな判定を駆使して冒険を進めていくことになるので、戦闘重視の方は少し冗長に感じるかもしれません。
`

</script>