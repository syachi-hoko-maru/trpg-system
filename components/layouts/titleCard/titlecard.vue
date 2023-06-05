<template>
  <card v-show="pageSetting && !pageSetting.specialPage" nobefore class="mt-0">
    <template #usubtitle>
      <item-pagetree :for-title="true" class="mt-0 mb-2" />
    </template>
    <template #title>
      <div class="d-flex align-end">
        <span v-if="pageSetting">{{ pageSetting.title }} {{ pageSetting.page ? page : "" }}</span>
        <v-spacer />
        <item-share-page :page-setting="pageSetting" icon />
      </div>
    </template>
    <template #subtitle v-if="pageSetting && pageSetting.to.indexOf('/blog/') === 0">{{ pageSetting?.lastmod }}</template>
    <template #after>
      <div class="tag">
        <template v-if="pageSetting && pageSetting.tags?.length">
          <item-tags v-if="pageSetting" :tags="pageSetting.tags" class="py-0" />
        </template>
      </div>
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

<style scoped lang="scss">
div.tag {
  height: 46px
}
</style>