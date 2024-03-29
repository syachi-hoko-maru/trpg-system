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
    <card-array-by-andml :andml="andml" v-if="show" />
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
本作は筆者がソード・ワールド2.5（SW2.5/ソドワ）の &em_布教セッション を行うために使用したシナリオになります。
&br
少し長めのシナリオですが、ソード・ワールド2.5の &em_基本を詰め込んで います。
説明も多めになっており、初心者プレイヤーにはおすすめのシナリオです。
&br
また、GM向けの注釈等も用意してあり、ココフォリアの部屋のデータも付属しています。
著作権の関係で配布できないBGMについてもおすすめを記述してあります。
そのため、 &em_初めてのGM挑戦にもおすすめのシナリオ となっています！
&br
シナリオとしては、初めての依頼を受けて魔動機文明時代の研究所跡へ探索に行くことになる、そんなお話です。

&2 参考文献
本作はSW2.5の前作にあたる、SW2.0のルールブック『ソード・ワールド2.0 ルールブックI 改訂版』掲載のシナリオ「バルトゥーの遺跡」をアレンジするところから始まったシナリオです。
&br
シナリオタイトルにもなっている「ウォフト=ルーバ」というキャラクターの名前は、バルトゥー（フランスによくいる名前）の綴り "Barthou" を後ろから読んだ "uohtrab" が由来になっています。
&br
大幅な改変をしておりますので、本作には「バルトゥーの遺跡」のネタバレ等は含みません。
本作を遊んでいても新鮮な気持ちでお楽しみいただけます。
また、「バルトゥーの遺跡」を遊んだことがあっても、一切問題無く遊ぶことができます。

&2 注意事項
本シナリオおよび本文中の画像を含む添付ファイルを、本シナリオのセッション以外に使うことはご遠慮ください。

&3 シナリオ改変OK
シナリオを改変して遊ぶことは、 &em_参加者が楽しめるようにする目的 において、全面的にOKです。
&br
なお、今後の参考のため、改変した内容を &itwitter へ教えていただけると助かります。
「改変したものを公開したい」という場合は &itwitter へ連絡いただければ前向きに検討いたします。

&3 配信等OK
また、該当のTRPGシステムが許す範囲において、シナリオとしては収益化を含め配信OK、場所代などをとるセッションでの使用もOKです。
その他心配な点があれば、お気軽に &itwitter までご相談ください。

&1 シナリオスペック
- プレイヤー人数
-- 3〜6人（推奨）
- 必須ルールブック
-- ルールブックⅠ
-- ルールブックII（GMのみ必須、PLは推奨）
- レギュレーション
-- 初期作成
- 想定時間
-- 5〜7時間（オンライン・ボイスセッションの場合）
- 戦闘ルール
-- 基本戦闘（推奨）
- 初心者向け

&2 選択ルール
選択ルールは特にありませんが、改変は自由に可能です。
特に遊ぶプレイヤーが全員ソード・ワールド2.5に慣れている場合には、戦闘難易度をあげるために魔物を変更するなどしても良いかもしれません。

&2 舞台
舞台はGMが好きな場所に設定することが可能です。
なるべく参加PCの都合が良い場所にすると良いでしょう。
もちろんケルディオン大陸（→『II』p. 312）にしていただいても構いません。
&br
このシナリオでの描写はハーヴェスのオリジナルの冒険者ギルド支部〈明けの明星〉を用いたものになります。
舞台を変更する場合には適宜読み替えてください。

&2 トレーラー
冒険者として踏み出すはじめの一歩
遺跡探検で彼らは"奇跡"を目にする
&br
これは1800年続いた
"たましい"の物語
&br
剣と魔法の世界
あなたの冒険が始まる
&img_/scenario-image/uoht/uoht1.webp,ソード・ワールド2.5初心者向けシナリオ「ウォフト=ルーバの研究所跡」トレーラー画像1
&img_/scenario-image/uoht/uoht2.webp,ソード・ワールド2.5初心者向けシナリオ「ウォフト=ルーバの研究所跡」トレーラー画像2
&img_/scenario-image/uoht/uoht3.webp,ソード・ワールド2.5初心者向けシナリオ「ウォフト=ルーバの研究所跡」トレーラー画像3
&img_/scenario-image/uoht/uoht4.webp,ソード・ワールド2.5初心者向けシナリオ「ウォフト=ルーバの研究所跡」トレーラー画像4

&2 シナリオの趣旨
このシナリオは初心者GM、初心者PLが “TRPG” とソード・ワールド2.5の舞台であるラクシア世界を楽しめることを第一に執筆しました。
ぜひファンタジー世界での冒険を楽しんでください！
&br
戦闘の難易度が高いシナリオではありません。
クリアするために必死になるのではなく、とにかく観光気分で（？）ファンタジー世界での冒険を楽しんでいただければと思います。
`

</script>