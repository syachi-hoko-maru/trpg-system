<template>
  <card-array-by-andml :andml="caution" />
  <card>
    <template #title>ネタバレクッション</template>
    以下にはシナリオのネタバレが含まれます。<br>
    プレイヤーとして遊ぶ予定の方はご覧をお控えください。<br>
    <br>
    見る場合には以下のボタンを押してください。
    <item-button @click="() => show = !show">
      {{ show ? "シナリオを閉じる" : "シナリオを見る" }}
    </item-button>
  </card>
  <card-array-by-andml :andml="andml" v-if="show" />
  <card>
    <template #title>他のシナリオ</template>
    しゃちほこ丸のシナリオ一覧はこちら
    <item-button url="/scenario" />
  </card>
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

const show = ref(false)

const caution = `
&1 シナリオメモについて
「シナリオメモ」はシナリオにする手間を惜しみつつ、一応公開しているものです。
自分用のメモと、回した際に使ったセリフをてきと〜にまとめたものになっております。
もし遊ばれる際はバンバン改変してください！
&br
一本道シナリオですのでその点もご注意ください。
`

</script>