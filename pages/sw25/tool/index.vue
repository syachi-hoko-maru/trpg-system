<template>
  <card-array-by-andml :andml="andml1" />
  <card-list>
    <card v-for="page of toolPages" :key="page.to">
      <template #tbefore>
        <v-img :src="`${$templateText.basePath}/${page.img}`" />
      </template>
      <template #title>
        {{ page.title }}
      </template>
      <div class="text">
        {{ page.explain }}
      </div>
      <item-button :to="page.to">
        こちら
      </item-button>
    </card>
    <card-array-by-andml :andml="andml2" />
  </card-list>
</template>

<script setup lang="ts">

const { $templateText, $pageSettingList } = useNuxtApp()

const toolPages = $pageSettingList.filter(page => page.to.startsWith("/sw25/tool/"))

const andml1 = `
このウェブサイトでは &info_sw25 を遊ぶのに役立つツールを公開しています。

&2 権利表示
これらのツールは、「北沢慶」「グループSNE」及び「株式会社KADOKAWA」が権利を有する『ソード・ワールド2.5』の二次創作物です。
（C）北沢慶／グループSNE

&2 利用にあたって
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
</script>

