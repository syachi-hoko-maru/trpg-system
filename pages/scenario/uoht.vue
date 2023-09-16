<template>
    <card-array-by-andml :andml="setsumei" />
    <card>
        <template #title>ネタバレクッション</template>
        以下はシナリオ本編となり、遊ぶ上で致命的なシナリオのネタバレが含まれます。<br>
        プレイヤーとして遊ぶ予定の方は閲覧をお控えください。<br>
        <br>
        閲覧する場合には以下のボタンを押してください。
        <item-button @click="() => show = !show">
            {{ show ? "シナリオを閉じる" : "シナリオを見る" }}
        </item-button>
    </card>
    <card-array-by-andml :andml="andml" v-if="true" />
    <card>
        <template #title>他のシナリオ</template>
        しゃちほこ丸のシナリオ一覧はこちら
        <item-button url="/scenario" />
    </card>
</template>
  
<script setup lang="ts">
import scenario from "@/assets/scenario.json"

const andml = ref("")
const id: string = "uoht"

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
本作はSW2.5の前作にあたるSW2.0のルールブック、「ソード・ワールド2.0 ルールブックI 改訂版」掲載のシナリオ「バルトゥーの遺跡」を元に、考えたものとなります。
&br
ウォフト=ルーバという名前は、バルトゥー（フランスによくいる名前）の綴り "Barthou" を後ろから読んだ "uohtrab" をもとにしています。
大幅な改変をしておりますので本作には「バルトゥーの遺跡」のネタバレ等は含みません。
本作を遊んでいても新鮮な気持ちでお楽しみいただけます。


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

&2 シナリオの着地点・趣旨
このシナリオは初心者GM、初心者PLが “TRPG” とソード・ワールドの部隊であるラクシア世界を楽しめることを第一に執筆しました。
いろいろな判定を駆使して冒険を進めていくことになるので、戦闘重視の方は少し冗長に感じるかもしれません。
`

</script>