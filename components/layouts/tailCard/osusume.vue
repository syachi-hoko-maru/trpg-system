<template>
  <card v-if="osusumePageList.length">
    <template #title>
      {{ type === "kanren" ? "関連するページ" : type === "popular" ? "人気なページ" : "あなたにオススメのページ" }}
    </template>
    <div v-if="type === 'osusume'">
      あなたが最近見たページから、あなたにおすすめのページを表示しています。<br>
      ※この処理はあなたのブラウザ上で行われています。
    </div>
    <div v-if="type === 'popular'">
      Google Analyticsのデータから、よく表示されているページを紹介します。
    </div>
    <template #pafter>
      <item-scrollx v-if="mounted && osusumePageList.length">
        <item-pagecard v-for="op of osusumePageList" :page-setting="op" virtical />
      </item-scrollx>
      <item-button v-if="type === 'popular'" url="/search" normal-button>ページ一覧はこちら</item-button>
      <br>
    </template>
  </card>
</template>

<script setup lang="ts">
interface Props {
  type: "osusume" | "kanren" | "popular"
}
const Props = defineProps<Props>();

const { osusumePageArray, kanrenPageArray, popularPageArray } = usePages()

const osusumePageList = Props.type === "kanren" ? kanrenPageArray : Props.type === "popular" ? popularPageArray : osusumePageArray

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>

