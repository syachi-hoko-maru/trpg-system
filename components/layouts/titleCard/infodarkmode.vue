<template>
  <v-alert class="my-5" type="info">
    現在デフォルトをダークモードに変更しています。<br>
    {{ $vuetify.theme.current.dark ? "ライトモード" : "ダークモード" }}へ切り替える場合は以下をクリック。<br>
    <br>
    ※ フッターにある「設定ページ」からも切り替えが可能です。
    <pages-setting-darkmode />
  </v-alert>
</template>