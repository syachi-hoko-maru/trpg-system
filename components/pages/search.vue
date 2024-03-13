<template>
  <div v-for="result of showArr" :key="result.title">
    <item-pagecard :pageSetting="result" />
  </div>
  <template v-if="arr.length > (defaultCount ? defaultCount : 10)">
    <item-head2>{{ arr.length }}件中{{ showArr.length }}件を表示中</item-head2>
    <item-button v-if="arr.length > showArr.length" @click="showCount++">
      もっと見る
    </item-button>
  </template>
</template>

<script setup lang="ts">
import { isHidden } from "~/src/pages/getPageSetting";

interface Props {
  results: PageSetting[];
  defaultCount?: number;
  step?: number;
}
const Props = defineProps<Props>();

const showCount = ref(0);

const arr = computed(() =>
  Props.results.filter((r) => !isHidden(r) && !r.noSearch)
);
const showArr = computed(() =>
  arr.value.slice(
    0,
    (Props.defaultCount ? Props.defaultCount : 10) +
      (Props.step ? Props.step : 10) * showCount.value
  )
);

watch(Props.results, () => {
  showCount.value = 0;
});
</script>
