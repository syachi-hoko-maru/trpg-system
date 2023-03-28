<template>
  <card>
    <template #title>
      SW2.5の種族一覧
    </template>
    <andml :andmls="syuzokuAndml" />
  </card>
  <div v-if="Object.entries($syuzoku).length" id="各種族の紹介">
    <card v-for="[syuzoku, { explain, debut }] of Object.entries($syuzoku)" :key="syuzoku" :id="syuzoku">
      <template #title>
        {{ syuzoku }}
      </template>
      <template #subtitle>
        {{ debut }}
      </template>
      <andml :andmls="explain" />
    </card>
  </div>
</template>

<script setup lang="ts">
const { $syuzoku } = useNuxtApp()

let currentDebut = ""
const syuzokuAndml = `
以下はソード・ワールド2.5（SW2.5）に登場する種族の一覧です。
ソード・ワールド2.5については &link_/sw25,こちら をご覧ください。
` + Object.entries($syuzoku).map(([syuzoku, { debut }]) => {
  let str = ""
  if (debut !== currentDebut) {
    str += `&2 ${debut} \n`
    currentDebut = debut
  }
  str += `- &link_#${syuzoku},${syuzoku}`
  return str
}).join("\n") + `
&br
以下では &em_各種族について 簡単にですが紹介します。
なお、サプリメントについては以下をご覧ください。
&button_/sw25/forbeginner/suppliment/1 
`
</script>