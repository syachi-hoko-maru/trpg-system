<template>
  <card v-show="pageSetting && !pageSetting.specialPage">
    <template #title>
      <div class="d-flex align-end">
        <span v-if="pageSetting">{{ pageSetting.title }} {{ pageSetting.page ? page : "" }}</span>
        <v-spacer />
        <item-share-page :page-setting="pageSetting" icon />
      </div>
    </template>
    <template #subtitle v-if="pageSetting && pageSetting.to.indexOf('/blog/') === 0">{{ pageSetting?.lastmod }}</template>
    <template #after v-if="pageSetting && pageSetting.tags?.length">
      <item-tags v-if="pageSetting" :tags="pageSetting.tags" class="py-0" />
    </template>
  </card>
</template>

<script setup lang="ts">
interface Props {
  pageSetting?: PageSetting
}
const Props = defineProps<Props>();

const { getNowPagePage } = usePages()
const page = computed(getNowPagePage)
</script>