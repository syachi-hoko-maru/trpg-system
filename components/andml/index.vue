
<template>
  <component :is="d.component" v-for="d of dataArray" :props="d.props" :lines="d.andmls">
    <andml-line :andmls="d.andmls" />
  </component>
</template>


<script setup lang="ts">
import { AndmlBlockData, AndmlScript } from "~~/types/andml";

interface Props {
  andmls: string | string[]
}
const Props = defineProps<Props>();

const andmlArray = computed(() => Array.isArray(Props.andmls) ? Props.andmls : Props.andmls.split("\n"))

// lineの処理
const andmlBlockScriptArray: AndmlScript[] = [
  { script: "noandml", component: resolveComponent("AndmlBlockNoandml") },
  { script: "byosya", component: resolveComponent("AndmlBlockByosya") },
  { script: "forgm", component: resolveComponent("AndmlBlockForgm") },
  { script: "info", component: resolveComponent("AndmlBlockInfo") },
  { script: "faq_", component: resolveComponent("AndmlBlockFaq") },
  { script: "gray", component: resolveComponent("AndmlBlockGray") },
];

const setBlockComponent = (andmls: string[]): AndmlBlockData[] => {
  const result: AndmlBlockData[] = []
  let blockFlag = false
  mainLoop:
  for (let andml of andmls) {
    if (andml.startsWith("&&&")) {
      blockFlag = false
      continue mainLoop
    }
    for (let script of andmlBlockScriptArray) {
      if (andml.startsWith(`&&${script.script}`)) {
        const props: string = script.script.endsWith("_") ? andml.replace(`&&${script.script}`, "") : ""
        result.push({ andmls: [], component: script.component, props })
        blockFlag = true

        continue mainLoop
      }
    }
    if (blockFlag) {
      if (result[result.length - 1].andmls) {
        result[result.length - 1].andmls.push(andml)
      } else {
        console.error("error! andml block error")
      }
    } else {
      result.push({ andmls: [andml], component: resolveComponent("AndmlBlockDiv") })
      blockFlag = true
    }
  }
  return result
}
const dataArray = computed(() => setBlockComponent(andmlArray.value))
</script>
