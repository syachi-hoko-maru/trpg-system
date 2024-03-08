<template>
  <div v-if="pageSetting.page">
    <div style="height: 58px">
      <v-pagination
        v-model="mpage"
        :length="pageSetting.page.length"
        rounded="circle"
        v-if="mounted"
      />
    </div>
    <v-alert
      class="my-5"
      type="info"
      :text="`「${pageSetting.title}」は長くなってしまったため、複数ページに分けております。`"
    />
    <card v-if="pageSetting.page.length && !top">
      <item-button
        v-if="page < pageSetting.page.length"
        :url="`${pageSetting.to}/${page + 1}`"
        normal-button
        >次のページへ</item-button
      >
      <item-button
        v-if="page > 1"
        :url="`${pageSetting.to}/${page - 1}`"
        normal-button
        >前のページへ</item-button
      >
      <item-button
        v-if="page >= pageSetting.page.length"
        :url="`${pageSetting.to}/1`"
        normal-button
        >最初から読む</item-button
      >
    </card>
  </div>
</template>

<script setup lang="ts">
import { getPageSetting } from "~/src/pages/getPageSetting";

interface Props {
  // pageSetting: PageSetting,
  top?: boolean;
}
const Props = defineProps<Props>();

const { getNowPagePage } = usePages();
const route = useRoute();
const pageSetting = ref(getPageSetting(route.fullPath));
watch(
  () => route.fullPath,
  () => {
    pageSetting.value = getPageSetting(route.fullPath);
  }
);

const mpage = ref(1);
const page = computed(() => {
  const p = getNowPagePage();
  mpage.value = p;
  return p;
});
const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
  watch(mpage, () => {
    navigateTo(`${pageSetting.value.to}/${mpage.value}`);
  });
});
</script>
