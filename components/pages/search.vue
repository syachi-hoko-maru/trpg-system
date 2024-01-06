<template>
  <div v-for="result of showArr" :key="result.title">
    <item-pagecard :pageSetting="result" />
  </div>
  <template v-if="arr.length > 10">
    <item-head2>{{ arr.length }}件中{{ showArr.length }}件を表示中</item-head2>
    <item-button v-if="arr.length > showArr.length" @click="showCount++">もっと見る</item-button>
  </template>
</template>

<script setup lang="ts">
import { isHidden } from '~/src/pages/getPageSetting';

interface Props {
  results: PageSetting[]
}
const Props = defineProps<Props>();

const showCount = ref(0)

const arr = computed(() => Props.results.filter(r => !isHidden(r) && !r.noSearch))
const showArr = computed(() => arr.value.slice(0, (showCount.value + 1) * 10))

watch(Props.results, () => {
  showCount.value = 0
})

</script>