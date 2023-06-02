<template>
  <card :class="Props.class" :nobefore="nobefore">
    <template #title>{{ Props.cardData.title }}</template>
    <andml :andmls="Props.cardData.texts" />
  </card>
</template>


<script setup lang="ts">
interface Props {
  cardData: CardData
  class?: string
  nobefore?: boolean
}
const Props = defineProps<Props>()
</script>