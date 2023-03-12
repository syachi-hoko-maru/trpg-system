<template>
  <card-by-data v-for="cardData of Props.cardDataArray" :cardData="cardData" :class="Props.class"
    :key="cardData.texts[0]" />
</template>


<script setup lang="ts">
interface Props {
  cardDataArray: CardData[],
  class?: string
}
const Props = defineProps<Props>()
</script>