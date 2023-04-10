<template>
  <card v-if="osusumePageList.length">
    <template #title>
      {{ type === "kanren" ? "関連するページ" : "あなたにオススメのページ" }}
    </template>
    <template #pbefore>
      <item-scrollx>
        <item-pagecard v-for="op of osusumePageList" :page-setting="op" virtical />
      </item-scrollx>
    </template>
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

const { osusumePageArray, kanrenPageArray } = usePages()

const osusumePageList = Props.type === "kanren" ? kanrenPageArray : osusumePageArray

</script>

