<template>
    <card :nobefore="nobefore" v-if="andml1">
        <template #title>
            {{ title }}
        </template>
        <andml :andmls="andml1" />
    </card>
</template>

<script setup lang="ts">
import { pageSettingList } from '~/src/pages/pageSettingList';
import { isPast, sortByDate } from '~/src/util/date';

interface Props {
    title: string
    nobefore?: boolean
}
const Props = defineProps<Props>();

const newSW25NewPage: PageSetting | undefined = pageSettingList
    .filter(p =>
        p.tags.indexOf("sw25_new") >= 0
        && isPast(p.lastmod)
        && !isPast(p.lastmod, new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)))
    .sort((a, b) => sortByDate(true)(a.lastmod, b.lastmod))[0]

const andml1 =
    (!isPast("2023/12/10") ? `
&3 『ハルーラガイド』の紙版が再販されます！
ソード・ワールド2.5の同人誌『ハルーラガイド』の紙版の再販が決まり、 &em_12月10日まで 通販の予約が受付中とのことです！
ぜひこの機会に確認・入手してください！
&button_/sw25/feature/harula
`: "")
    + (!isPast("2024/1/31") ? `
&3 同人シナリオ集『冒険者の旅路』通販受付中
夏コミで頒布したソード・ワールド2.5同人シナリオ集『冒険者の旅路』が &em_通販 と &em_電子版 で頒布中です。
&em_シナリオ6本とキャンペーン1つ が入ったシナリオ集です。
&br
詳しくは以下のページをご覧ください。
&button_/sw25/feature/c102
`: "")
    + (newSW25NewPage?.to ? `
&3 ソード・ワールド2.5最新情報¥s続々更新中
ソード・ワールド2.5の新刊情報（最新サプリメントやシナリオ集などの情報）を続々と更新しています！
&br
ぜひ見てみてください。
&button_${newSW25NewPage.to}
&button_/search/?tag=sw25_new&sort=recent 最新情報一覧（更新順）はこちら

`: "")

</script>