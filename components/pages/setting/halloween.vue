<template>
  <template v-if="new Date().getMonth() === 9 || nowPageSetting.to === '/blog/halloween'">
    <item-button @click="toggleTheme" v-if="!icon" prepend-icon="mdi-ghost">
      ハロウィンデザインに切り替える
    </item-button>
    <v-icon v-else @click="toggleTheme" icon="mdi-ghost" class="px-5 text-textbp" />
  </template>
  <template else>
    <!-- ハロウィンボタン（10月のみ出現） -->
  </template>
</template>

<script setup lang="ts">
interface Props {
  icon?: boolean
}
const Props = defineProps<Props>();

const { setSnack } = useSnack()
const { nowPageSetting } = usePages()
const { setTheme } = useDesign()

const toggleTheme = () => {
  setTheme("halloween")
  try {
    localStorage.setItem('theme', "halloween");
    setSnack("設定を保存しました")
  } catch {
    setSnack("設定の保存に失敗しました")
  }
}
</script>