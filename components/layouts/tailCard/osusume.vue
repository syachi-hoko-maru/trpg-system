<template>
  <card v-if="osusumePageList.length">
    <template #title>
      {{ type === "kanren" ? "関連するページ" : "あなたにオススメのページ" }}
    </template>
    <item-scrollx>
      <atom-link v-for="op of osusumePageList" :key="op.to" :to="op.to">
        <card class="mx-3 osusume-card">
          <template #tbefore v-if="op.img">
            <v-img :src="`${$templateText.basePath}/webp/${op.img}`" :alt="op.title" />
          </template>
          <template #title v-else>
            {{ op.title }}
          </template>
          <andml v-if="op.explain" :andmls="Array.isArray(op.explain) ? op.explain : [op.explain]" />
        </card>
      </atom-link>
    </item-scrollx>
    <item-button v-if="type !== 'kanren'" url="/search" normal-button>ページ一覧はこちら</item-button>
  </card>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

interface Props {
  pageSetting: PageSetting
  type?: "osusume" | "kanren"
}
const Props = defineProps<Props>();

const { pageArray } = usePages()
const { $pageSettingList, $scenarioData, $templateText } = useNuxtApp()

const shuffle = <T>(array: Array<T>) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const osusumePageList: Ref<PageSetting[]> = computed(() => {
  const nowPath = Props.pageSetting.to
  // 隠しページでなく説明があり、かつ今表示していないページ
  const dataList = $pageSettingList.filter(page => !page.hidden && page.explain && page.to !== nowPath)
  // 関連ならtagの一致を調べる
  if (Props.type === "kanren") {
    const kanrenDataList: { pageSetting: PageSetting, kanren: number }[] = shuffle(dataList).map(pageSetting => {
      let kanren = 0
      for (let tag of Props.pageSetting.tags) {
        if (pageSetting.tags.indexOf(tag) >= 0) {
          // タグが含まれる時
          kanren += 2
        } else if (pageSetting.tags.join("").indexOf(tag) >= 0) {
          // 親タグが含まれる時
          kanren += 1
        }
      }
      if (pageSetting.to.indexOf(Props.pageSetting.to) >= 0) {
        // このページが親ページの時
        kanren += 3
      } else if (Props.pageSetting.to.indexOf(pageSetting.to) >= 0) {
        // このページが子ページの時
        kanren += 2
      }
      return { pageSetting, kanren }
    })
      .sort((a, b) => -a.kanren + b.kanren)
      .slice(0, 10)
    console.log(kanrenDataList)
    return kanrenDataList.map(d => d.pageSetting).slice(0, 5)
  } else {
    // おすすめ
    const osusumeDataList = dataList.filter(page => page.img && page.osusume)
    // 作者がしゃちほこ丸のシナリオを表示する
    if (nowPath.indexOf("scenario") === -1) {
      $scenarioData.filter(sd => sd.author === "しゃちほこ丸").forEach(sd => {
        osusumeDataList.push({
          title: sd.title,
          to: `/scenario#${sd.id}`,
          explain: sd.explain,
          img: sd.img,
          osusume: true,
          lastmod: "",
          tags: []
        })
      })
    }
    return shuffle(osusumeDataList).filter(page => pageArray.value.slice(0, osusumeDataList.length - 9).indexOf(page.to)).slice(0, 5)
  }
  return []
})

</script>

<style lang="scss">
div.osusume-card {
  max-width: 65vw;
  width: 300px;
  max-height: 55vw;
  height: 300px;
  overflow: hidden;
}
</style>