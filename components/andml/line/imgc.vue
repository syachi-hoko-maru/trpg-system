<template>
  <item-img :src="`${$templateText.basePath}${imgsrc}`" :alt="alt.replace(/¥s/g, ' ')" class="my-2" />
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

const { $templateText } = useNuxtApp()

const [src, alt] = Props.props.split(",")
const imgsrc = src.endsWith(".webp") ? `/webp/${src}` : `/image/${src}`
</script>