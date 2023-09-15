<template>
    <CardArrayByAndml :andml="andml0" />
</template>

<script setup lang="ts">
import { isHidden } from '~/src/pages/getPageSetting';
import { isPast } from '~/src/util/date';

const { $pageSettingList } = useNuxtApp()

const shuffle = <T>(array: Array<T>) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const guestPageList = shuffle($pageSettingList.filter(page => !isHidden(page) && page.to.indexOf("/sw25/fav/") === 0))

const andml0 = `
&1 企画概要
「ここが好き！ SW2.5」とはTRPG「ソード・ワールド2.5」の &em_いろいろな楽しみ方・さまざまな魅力 をお伝えすることを目的にした企画です！
いろいろな遊び方をしている方をゲストとしてお呼びし、インタビューをしていきます！
&br
ぜひ &em_自分に合った遊び方・楽しみ方 を見つけて、ソード・ワールド2.5をもっともっと楽しんでください！

&1 ゲスト一覧
現在${guestPageList.length}人のゲストにインタビューしています！（表示順はランダムです。）
${guestPageList.map((page) => `&button_${page.to}`).join("\n")}

&1 ゲスト募集
ソード・ワールド2.5でいろんな遊び方・楽しみ方をしている方を募集しています！
「俺はこんな遊び方をしているぜ！」って方、ぜひご協力ください。
&br
興味がある方は &itwitter までDMいただければ幸いです。
他薦もお待ちしています。
`
</script>