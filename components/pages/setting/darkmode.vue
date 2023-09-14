<template>
  <item-button @click="click" v-if="!icon" prepend-icon="mdi-brightness-6">
    {{ nowTheme !== "dark" ? "ダークモード" : "ライトモード" }}に切り替える
  </item-button>
  <v-icon v-else @click="click" icon="mdi-brightness-6" class="px-5 text-textbp" />
</template>

<script setup lang="ts">
interface Props {
  icon?: boolean
}
const Props = defineProps<Props>();

const { setSnack } = useSnack()
const { toggleTheme, nowTheme } = useDesign()

const click = () => {
  const theme = toggleTheme()
  try {
    localStorage.setItem('theme', theme);
    setSnack("設定を保存しました")
  } catch {
    console.error("設定の保存に失敗しました")
    setSnack("設定の保存に失敗しました")
  }
}
</script>