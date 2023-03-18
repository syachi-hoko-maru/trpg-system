<template>
  <component v-for="(data, i) of dataArray" :is="data.component" :props="data.props"
    :key="(data.andml ? data.andml : ``) + i">
    <andml-inline :andml="data.andml" />
  </component>
</template>


<script setup lang="ts">
import { Ref } from 'vue';
import { AndmlData, AndmlScript } from '~~/types/andml';

interface Props {
  andmls: string[]
}
const Props = defineProps<Props>();

// lineの処理
const andmlLineScriptArray: AndmlScript[] = [
  { script: "button_", component: resolveComponent("AndmlLineButton") },
  { script: "date_", component: resolveComponent("AndmlLineDate") },
  { script: "amazon_", component: resolveComponent("AndmlLineAmazon") },
  { script: "2", component: resolveComponent("AndmlLineHead2") },
]

const setLineComponent = (andml: string): AndmlData => {
  if (andml.startsWith("-")) {
    const reg = new RegExp(`^(-+)\s*([^-].*)$`)
    return {
      props: andml.replace(reg, "$1"),
      andml: andml.replace(reg, "$2"),
      component: resolveComponent("AndmlLineList")
    }
  }
  if (andml.startsWith(`//`)) {
    return {
      andml: "",
      component: resolveComponent("AndmlLineP")
    }
  }
  for (let script of andmlLineScriptArray) {
    if (andml.startsWith(`&${script.script}`)) {
      if (script.script.endsWith("_")) {
        const reg = new RegExp(`^&${script.script}([^\\s]+)(\\s+(.*))?$`)
        const matchArray = andml.match(reg)
        if (!matchArray) throw createError(`[Error] AndmlLineScript "${andml}" is not found`)
        return {
          props: matchArray[1],
          andml: matchArray[3],
          component: script.component
        }
      } else {
        const reg = new RegExp(`^&${script.script}\\s*(.*)$`)
        const matchArray = andml.match(reg)
        if (!matchArray) throw createError(`[Error] AndmlLineScript "${andml}" is not found`)
        return {
          andml: matchArray[1],
          component: script.component
        }
      }
    }
  }
  return {
    andml,
    component: resolveComponent("AndmlLineP")
  }
}
const dataArray: Ref<AndmlData[]> = computed(() => Props.andmls.map(setLineComponent))
</script>