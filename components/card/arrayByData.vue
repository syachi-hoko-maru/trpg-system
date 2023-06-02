<template>
  <card-by-data v-for="cardData of Props.cardDataArray" :cardData="cardData" :class="Props.class" :key="cardData.texts[0]"
    :nobefore="nobefore" />
</template>


<script setup lang="ts">
interface Props {
  cardDataArray: CardData[],
  class?: string,
  nobefore?: boolean
}
const Props = defineProps<Props>()
</script>