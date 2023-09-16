
<template>
  <span v-for="data, i of dataArray" :key="i">
    <component :is="data.component" :props="data.props" />
  </span>
</template>


<script setup lang="ts">
import { AndmlScript, AndmlData } from "~~/types/andml";

interface Props {
  andml: string
}
const Props = withDefaults(defineProps<Props>(), {
  andml: ""
});

// inlineの処理
const andmlInlineScriptArray: AndmlScript[] = [
  // 強調・打ち消し
  { script: "em_", component: resolveComponent("AndmlInlineEmc") },
  { script: "strike_", component: resolveComponent("AndmlInlineStrike") },
  // ルビ
  { script: "ruby_", component: resolveComponent("AndmlInlineRubyc") },
  // 補足情報
  { script: "info_", component: resolveComponent("AndmlInlineInfo") },
  { script: "hantei_", component: resolveComponent("AndmlInlineEmc") },
  // リンク
  { script: "link_", component: resolveComponent("AndmlInlineLink") },
  { script: "itwitter", component: resolveComponent("AndmlInlineTwitter") },
  // 改行
  { script: "br", component: resolveComponent("AndmlInlineBr") },
]

const setInlineComponent = (andml: string): AndmlData => {
  for (let script of andmlInlineScriptArray) {
    if (andml.startsWith(`&${script.script}`)) {
      if (script.script.endsWith("_")) {
        const reg = new RegExp(`&${script.script}([^\\s]+)`)
        // console.log(andml, reg)
        const matchArray = andml.match(reg)
        if (!matchArray) throw createError(`[Error] AndmInlLineScript "${andml}" is not found`)
        return {
          props: matchArray[1],
          component: script.component
        }
      } else {
        const reg = new RegExp(`&${script.script}`)
        const matchArray = andml.match(reg)
        if (!matchArray) throw createError(`[Error] AndmInlLineScript "${andml}" is not found`)
        return {
          component: script.component
        }
      }
    }
  }
  return {
    props: andml,
    component: resolveComponent("AndmlInlineSpanc")
  }
}

const dataArray: AndmlData[] = Props.andml.split(" ").map(setInlineComponent)
</script>