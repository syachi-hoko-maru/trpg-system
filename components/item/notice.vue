<template>
    <card :nobefore="nobefore" v-if="andml1">
        <template #title>
            {{ title }}
        </template>
        <andml :andmls="andml1" />
    </card>
</template>

<script setup lang="ts">
import { isPast } from '~/src/util/date';

interface Props {
    title: string
    nobefore?: boolean
}
const Props = defineProps<Props>();


const andml1 = (!isPast("2023-08-12") ? `
&3 C102にソード・ワールド2.5シナリオ集が出ます！
2023年8月12日（土）東京ビックサイトで行われるコミックマーケットに、僕も執筆に参加しているソード・ワールド2.5同人誌『冒険者の旅路』がでます！
&em_シナリオ6本とキャンペーン1つが入ったシナリオ集 です。
&br
現在サンプルとしてシナリオを無料公開中です。
&button_/scenario/fukinotou
// &button_/search?word=夏コミ&sort=recent 詳しくはこちら
`: "") +
    (isPast("2023-07-10") && !isPast("2023-07-27") ? `
&3 ソード・ワールド2.5の5周年記念フレーム！
2023年7月20日（木）にソード・ワールド2.5が &em_5周年を迎える ことを記念して、アイコンフレームを作成する機能を公開しています。
ぜひ使ってください！
&button_/sw25/tool/5anni
`: "") +
    (!isPast("2023-07-27") ? `
&3 最新サプリメント『アーケインレリック』特集中！
2023年7月20日（木）発売予定のソード・ワールド2.5最新サプリメント『アーケインレリック』について最新情報をまとめています！
&button_/search?tag=sw25_new&sort=recent 詳しくはこちら
`: "") 
</script>