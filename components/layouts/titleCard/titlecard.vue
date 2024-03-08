<template>
  <card v-show="pageSetting && !pageSetting.specialPage" nobefore class="mt-0">
    <template #usubtitle>
      <item-pagetree
        :for-title="true"
        class="mt-0 mb-3 px-4 text-caption text-medium-emphasis"
      />
    </template>
    <template #title>
      <div class="d-flex align-end">
        <template v-for="(t, i) in titleArr">
          {{ t }}
          <br v-if="i !== titleArr.length - 1" />
        </template>
        <v-spacer />
        <item-share-page icon />
      </div>
    </template>
    <template
      #subtitle
      v-if="pageSetting && pageSetting.to.indexOf('/blog/') === 0"
      >{{
        pageSetting?.created ? pageSetting?.created : pageSetting?.lastmod
      }}</template
    >
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
  pageSetting?: PageSetting;
}
const Props = defineProps<Props>();

const { getNowPagePage } = usePages();
const page = computed(getNowPagePage);

const titleArr: ComputedRef<string[]> = computed(() => {
  const result: string[] = [];
  if (Props.pageSetting) {
    result.push(...Props.pageSetting.title.split("  "));
    if (Props.pageSetting.page?.length) {
      result.push(Props.pageSetting.page[page.value - 1]);
    }
  }
  return result;
});
</script>

<style scoped lang="scss">
div.tag {
  min-height: 46px;
}
</style>
