<template>
  <div v-for="result of results.filter(r => !isHidden(r))" :key="result.title">
    <item-pagecard :pageSetting="result" />
  </div>
</template>

<script setup lang="ts">
import { isHidden } from '~/src/pages/getPageSetting';

interface Props {
  results: PageSetting[]
}
const Props = defineProps<Props>();

</script>