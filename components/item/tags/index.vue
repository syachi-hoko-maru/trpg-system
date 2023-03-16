<template>
  <div v-if="tags.length" class="mt-0 mb-3 mx-2">
    <item-tags-tag v-for="tag, i of tags" :pageTag="tag" :pageTagSetting="$pageTagSettings[tag]" :key="`${tag}_${i}`" />
  </div>
</template>


<script setup lang="ts">
interface Props {
  tags: PageTag[]
}
const Props = defineProps<Props>();

const { $pageTagSettings } = useNuxtApp()
</script>

