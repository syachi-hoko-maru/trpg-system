<template>
  <card-array-by-andml :andml="andml1" />
  <item-pagesindex title="SW2.5 ツール一覧" :page-setting-list="toolPages">
    <card-array-by-andml :andml="andml2" />
  </item-pagesindex>
  <card-array-by-andml :andml="andml3" />
</template>

<script setup lang="ts">

const { $pageSettingList } = useNuxtApp()

const toolPages = $pageSettingList.filter(page => page.to.startsWith("/sw25/tool/") && !page.hidden)

const andml1 = `
&1 このページについて
このウェブサイトでは &info_sw25 を &em_遊ぶのに役立つツール を公開しています。
ここではこれらのツールについてまとめています。
&br
「ソード・ワールド2.5って何？」という方は &link_/sw25,こちら をご覧ください。

&1 利用にあたって
利用にあたって特に連絡など不要です。
&link_http://www.arclight.co.jp/trpg-rights/,二次創作活動のガイドライン など、 &em_SW2.5の規約に沿う限りにおいて 、自由に使用してください。
ただし、これらのツールの自作発言はおやめください。
`

const andml2 = `
&1 SW2.5ランダムシナリオメイカー
診断メイカーの診断です。
TRPG「ソード・ワールド2.5」のシナリオを自動生成します。
&button_https://shindanmaker.com/1123981 こちら
`

const andml3 = `
&1 その他のページ
このウェブサイトにはツール以外でもソード・ワールド2.5に関連するページがあります。
よければご覧ください。
&button_/search?tag=sw25 こちら
`
</script>

