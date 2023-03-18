<template>
  <card-array-by-andml :andml="caution" />
  <card-array-by-andml :andml="andml" />
</template>

<script setup lang="ts">
import scenario from "@/assets/scenario.json"

const { params } = useRoute()

const andml = ref("")
const id: string = Array.isArray(params.id) ? params.id[0] : params.id

const blog: { id: string, andml: string } | undefined = (scenario as { id: string, andml: string }[]).find(blo => blo.id === id)

if (!(
  blog
  && blog.andml && typeof blog.andml === "string"
)) {
  showError("")
} else {
  andml.value = blog.andml
}

const caution = `
&1 シナリオメモについて
「シナリオメモ」はシナリオにする手間を惜しみつつ、一応公開しているものです。
自分用のメモと、回した際に使ったセリフをてきと〜にまとめたものになっております。
もし遊ばれる際はバンバン改変してください！
&br
一本道シナリオですのでその点もご注意ください。
`

</script>