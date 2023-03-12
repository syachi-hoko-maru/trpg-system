<template>
  <card :class="Props.class">
    <template #title>{{ Props.cardData.title }}</template>
    <andml :andmls="Props.cardData.texts" />
  </card>
</template>


<script setup lang="ts">
interface Props {
  cardData: CardData
  class?: string
}
const Props = defineProps<Props>()
</script>