<template>
  <card>
    <template #title>
      設定
    </template>
    <item-button @click="toggleTheme">
      {{ theme.global.current.value.dark ? "ライトモード" : "ダークモード" }}に切り替える
    </item-button>
    <item-button v-if="pageArray && pageArray.length >= 2" :to="pageArray[1]">
      1つ前のページへ戻る
    </item-button>

  </card>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "myCustomLightTheme" : "myCustomDarkTheme"
  localStorage.setItem('theme', theme.global.current.value.dark ? "dark" : "light");
}

const { pageArray } = usePages()

const { $templateText } = useNuxtApp()
</script>