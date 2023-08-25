<template>
  <template v-if="new Date().getMonth() === 9">
    <item-button @click="toggleTheme" v-if="!icon" prepend-icon="mdi-ghost">
      {{ nowTheme === "halloween" ? "ダークモード" : "ハロウィーンモード" }}に切り替える
    </item-button>
    <v-icon v-else @click="toggleTheme" icon="mdi-ghost" class="px-5 text-textbp" />
  </template>
  <template else>
    <!-- ハロウィンボタン（10月のみ出現） -->
  </template>
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
  theme.global.name.value = nowTheme === "halloween" ? "myCustomDarkTheme" : "myCustomHalloweenTheme"
  try {
    const newtheme = nowTheme === "halloween" ? "dark" : "halloween"
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