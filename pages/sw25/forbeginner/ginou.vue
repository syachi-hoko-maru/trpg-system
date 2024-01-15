<template>
  <card>
    <template #title>
      SW2.5の技能一覧
    </template>
    <andml :andmls="syuzokuAndml" />
  </card>
  <div v-if="Object.entries($ginou).length" id="各技能の紹介">
    <card v-for="value of $ginou" :key="value.name">
      <template #title>
        {{ value.name }}
      </template>
      <template #subtitle>
        初出：{{ value.debut }}
      </template>
      <template #pbefore>
        <item-tags-chip v-for="t of value.type" :label="t" />
      </template>
      <div v-if="'magic' in value && value.magic">
        使用魔法：{{ value.magic }}
      </div>
      <andml v-if="value.explain" :andmls="value.explain" />
      <div v-else>
        現在解説を準備中です。
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
const { $ginou } = useNuxtApp()

let currentDebut = ""
const syuzokuAndml = `
以下はソード・ワールド2.5（SW2.5）に登場する技能の一覧です。
「ソドワにはどんな技能があるの？」「〇〇って技能はどのルルブ（ルールブック）に載っているの？」という方向けに情報まとめています。
&br
「技能」というのは他のゲームにおける「クラス」や「ジョブ」のようなものです。
ソード・ワールド2.5では1人のキャラクターが複数の技能を持つことができます。
&br
ソード・ワールド2.5については &link_/sw25,こちら をご覧ください。
またソード・ワールド2.5初心者向け情報は &link_/sw25/forbeginner,こちら にまとめてありますので合わせてご覧ください。
` + ($ginou).map(({ name, debut, type }) => {
  let str = ""
  if (debut !== currentDebut) {
    str += `&2 ${debut} \n`
    currentDebut = debut
  }
  str += `- &link_#${name},${name}（${type.join("・")}）`
  return str
}).join("\n") + `
&br
以下では &em_各技能について 簡単にですが紹介します。
なお、サプリメントについては以下をご覧ください。
&button_/sw25/forbeginner/suppliment/1 
&br
ソード・ワールド2.5に登場する &em_種族 については以下をご覧ください。
&button_/sw25/forbeginner/syuzoku
`

</script>