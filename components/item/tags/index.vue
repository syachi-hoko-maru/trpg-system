<template>
  <div v-if="tags.length && mounted" class="mt-0 mb-3 mx-2">
    <item-tags-tag v-for="tag, i of tags" :pageTag="tag" :pageTagSetting="$pageTagSettings[tag]" :key="tag" />
  </div>
</template>


<script setup lang="ts">
interface Props {
  tags: PageTag[]
}
const Props = defineProps<Props>();

const { $pageTagSettings } = useNuxtApp()

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>

