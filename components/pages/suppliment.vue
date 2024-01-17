<template>
  <card v-if="group && group.id">
    <template #title>
      {{ group.type }}について
    </template>
    <andml v-model:andmls="explain" v-if="explain" />
  </card>
  <card v-for="item of group.items" :key="item.name" :id="item.name">
    <template #title>
      {{ item.name }}
    </template>
    <template #before>
      <div class="d-flex flex-column align-center">
        <v-rating v-model="item.ossusume" readonly size="x-small" class="px-5" half-increments />
      </div>
    </template>
    <andml :andmls="getExplain(item)" />
    <!-- <item-amazon-sw25 mini :item="[item.name]" /> -->
  </card>
  <CardArrayByAndml :andml="andmlend" />
</template>

<script setup lang="ts">
const { $suppliments } = useNuxtApp()

interface Props {
  num: number
}
const Props = defineProps<Props>();

const group = computed(() => {
  return $suppliments[Props.num]
})
const explain = computed(() => {
  return $suppliments[Props.num]?.explain
})

const getExplain = (item: SupplimentData<string>): string[] => {
  const result = item.explain.split("\n")
  result.splice(result.indexOf("&br"), 0, `&amazon_${item.name}`)
  return result
}

const andmlend = `
&1 ${group.value.type}まとめ
${group.value.type}に分類した${group.value.items.length}冊の中では、以下の順におすすめです！
&br
${group.value.items.map(i => `- ${i.name}（おすすめ度： ${i.ossusume >= 4 ? "&em_" : ""}${i.ossusume} ）`).join("\n")}
&br
&amazon_${group.value.items.map(i => i.name).join("・")}
`
</script>