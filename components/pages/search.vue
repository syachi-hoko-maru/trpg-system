<template>
  <div v-for="result of results.filter(r => !r.hidden)" :key="result.title">
    <item-pagecard :pageSetting="result" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  results: PageSetting[]
}
const Props = defineProps<Props>();

</script>

