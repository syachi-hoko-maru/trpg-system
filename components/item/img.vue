<template>
  <v-img :src="src" :lazy-src="src" :alt="alt" :width="width" :height="height" :cover="cover" />
</template>

<script setup lang="ts">
interface Props {
  src: string,
  alt: string,
  width?: string,
  height?: string,
  cover?: boolean
}
const Props = defineProps<Props>();
</script>

<style scoped lang="scss">
img.image {
  width: 100%;
}
</style>