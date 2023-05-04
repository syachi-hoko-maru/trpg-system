<template>
  <v-img :src="src" :lazy-src="src" :alt="alt" :class="class" :width="width" :height="height" :aspect-ratio="aspectRatio"
    :cover="cover" />
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
</script>