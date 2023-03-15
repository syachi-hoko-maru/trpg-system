<template>
  <card v-if="osusumePageList.length">
    <template #title>
      {{ type === "kanren" ? "関連するページ" : "おすすめのページ" }}
    </template>
    <template #pbefore>
      <div id="osusume" class="d-flex flex-row">
        <atom-link v-for="op of osusumePageList" :key="op.to" :to="op.to">
          <card class="mx-3 osusume-card">
            <template #tbefore>
              <v-img :src="`${$templateText.basePath}/${op.img}`" :alt="op.title" />
            </template>
            <andml v-if="op.explain" :andmls="Array.isArray(op.explain) ? op.explain : [op.explain]" />
          </card>
        </atom-link>
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

interface Props {
  pageSetting: PageSetting
  type?: "osusume" | "kanren"
}
const Props = defineProps<Props>();

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
  // おすすめで、かつ今表示していないページ
  const dataList = $pageSettingList.filter(page => !page.hidden && page.explain && page.to !== nowPath)
  // 関連ならtagの一致を調べる
  if (Props.type === "kanren") {
    if (Props.pageSetting.tags.length === 0) return []
    return dataList.filter(page => {
      for (let tag of page.tags) {
        if (Props.pageSetting.tags.indexOf(tag) >= 0) {
          return true
        }
      }
      return false
    }).slice(0, 5)
  }
  // 作者がしゃちほこ丸のシナリオを表示する
  else if (nowPath.indexOf("scenario") === -1) {
    $scenarioData.filter(sd => sd.author === "しゃちほこ丸").forEach(sd => {
      dataList.push({
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
  return shuffle(dataList).filter(page => page.osusume).slice(0, 5)
})
</script>

<style lang="scss">
div#osusume {
  // width: 1800px;
  max-height: calc(55vw + 40px);
  height: 340px;
  overflow-x: scroll;
}

div.osusume-card {
  max-width: 65vw;
  width: 300px;
  max-height: 55vw;
  height: 300px;
  overflow: hidden;
}
</style>