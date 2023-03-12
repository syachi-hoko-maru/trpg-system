<template>
  <card-array-by-data :cardDataArray="cardDataArray" :class="Props.class" />
</template>


<script setup lang="ts">
interface Props {
  andml: string
  class?: string
}
const Props = defineProps<Props>()

const andmlArray = Props.andml.split("\n")
const cardDataArray: CardData[] = [{ title: "", texts: [] }]
let nowIndex = 0
andmlArray.forEach((andml, i) => {
  if (andml === "" && i === 0) return
  if (andml.startsWith("&1 ")) {
    if (cardDataArray[cardDataArray.length - 1].title || cardDataArray[cardDataArray.length - 1].texts.length) nowIndex++
    cardDataArray[nowIndex] = { title: andml.replace("&1 ", ""), texts: [] }
  }
  else cardDataArray[nowIndex].texts.push(andml)
})

</script>