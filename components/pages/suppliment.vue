<template>
  <card v-if="group && group.id">
    <template #title>
      {{ group.type }}
    </template>
    <andml v-model:andmls="explain" v-if="explain" />
    <template #pafter>
      <card v-for="item of group.items" :key="item.name" :id="item.name">
        <template #title>
          {{ item.name }}
        </template>
        <template #before>
          <div class="d-flex flex-column align-center">
            <v-rating v-model="item.ossusume" readonly size="x-small" class="px-5" half-increments />
          </div>
        </template>
        <andml :andmls="item.explain.split('\n')" />
        <item-amazon-sw25 mini :item="[item.name]" />
      </card>
    </template>
  </card>
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

</script>