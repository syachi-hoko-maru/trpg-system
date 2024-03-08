<template>
  <ItemBannerBase
    v-if="banner"
    :title="banner.title"
    :img="banner.img"
    :to="banner.to"
  />
</template>

<script setup lang="ts">
import { bannerList } from "~/src/banner/banners";
import { getPageSetting } from "~/src/pages/getPageSetting";
interface Props {
  name?: string;
}
const Props = defineProps<Props>();
const { getBanner } = usePages();

const banner = ref(
  Props.name
    ? bannerList.find(({ name }) => name === Props.name)
    : bannerList[0]
);

onMounted(() => {
  if (Props.name) return;
  banner.value = getBanner();
});

const route = useRoute();
const pageSetting = ref(getPageSetting(route.fullPath));
watch(
  () => route.fullPath,
  () => {
    pageSetting.value = getPageSetting(route.fullPath);
    banner.value = getBanner();
    while (banner.value.to === pageSetting.value.to) {
      banner.value = getBanner();
    }
  }
);
</script>
