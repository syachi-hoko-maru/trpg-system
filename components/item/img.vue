<template>
  <v-img :src="imgsrc" :lazy-src="imgsrc" :alt="alt" :class="class" :width="width" :height="height"
    :aspect-ratio="aspectRatio" :cover="cover" />
</template>

<script setup lang="ts">
interface Props {
  src: string,
  alt: string,
  class?: string,
  width?: string,
  height?: string,
  cover?: boolean
  aspectRatio?: string
}
const Props = defineProps<Props>();

const { $templateText } = useNuxtApp()

const imgsrc: string | null = Props.src.startsWith("http")
  ? Props.src
  : Props.src.startsWith("/")
    ? Props.src.endsWith(".webp")
      ? `${$templateText.basePath}/webp${Props.src}`
      : `${$templateText.basePath}/image${Props.src}`
    : Props.src.endsWith(".webp")
      ? `${$templateText.basePath}/webp/${Props.src}`
      : `${$templateText.basePath}/image/${Props.src}`
</script>