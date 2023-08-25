<template>
  <item-button @click="toggleTheme" v-if="!icon" prepend-icon="mdi-brightness-6">
    {{ nowTheme === "light" ? "ダークモード" : "ライトモード" }}に切り替える
  </item-button>
  <v-icon v-else @click="toggleTheme" icon="mdi-brightness-6" class="px-5 text-textbp" />
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

interface Props {
  icon?: boolean
}
const Props = defineProps<Props>();

const theme = useTheme()
const { setSnack } = useSnack()

let nowTheme: string | null = null

const toggleTheme = () => {
  try {
    nowTheme = localStorage.getItem('theme')
  } catch { }
  theme.global.name.value = nowTheme === "light" ? "myCustomDarkTheme" : "myCustomLightTheme"
  try {
    const newtheme = nowTheme === "light" ? "dark" : "light"
    localStorage.setItem('theme', newtheme);
    nowTheme = newtheme
    setSnack("設定を保存しました")
  } catch {
    setSnack("設定の保存に失敗しました")
  }
}

onMounted(() => {
  nowTheme = localStorage.getItem('theme')
})
</script>