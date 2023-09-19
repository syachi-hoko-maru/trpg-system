<template>
  <item-button :prepend-icon="type.icon" @click="dice">{{ type.type }}を振る</item-button>
  <p>結果：{{ result }}</p>
</template>

<script setup lang="ts">
import { ndice } from '~/src/simulater/dice';

interface Props {
  props: string
}
const Props = defineProps<Props>();

const result = ref("")
const type = computed(() => Props.props === "1d"
  ? {
    type: "1d6",
    icon: "mdi-dice-6",
    count: 1
  }
  : {
    type: "2d6",
    icon: "mdi-dice-multiple",
    count: 2
  }
)

const dice = () => {
  const arr: number[] = ndice(type.value.count, 6)
  result.value = `${arr.reduce((p, c) => p + c, 0)} ← ${JSON.stringify(arr)}`
}
</script>