<template>
  <div v-if="show">
    <game-balloons-balloon v-for="i in count" />
  </div>
</template>

<script setup lang="ts">
import { getPageSetting } from "~/src/pages/getPageSetting";

const show = ref(false);
const count = ref(20);

const set = () => {
  if (show.value) return;
  if (
    pageSetting.value.to === "/me" ||
    pageSetting.value.to === "/blog/matome"
  ) {
    count.value = 30;
  }
  show.value = true;
  setTimeout(() => {
    show.value = false;
    count.value = 20;
  }, 30 * 1000);
};

onMounted(() => {
  set();
});

const route = useRoute();
const pageSetting = ref(getPageSetting(route.fullPath));
watch(
  () => route.fullPath,
  () => {
    pageSetting.value = getPageSetting(route.fullPath);
    if (
      pageSetting.value.to === "/me" ||
      pageSetting.value.to === "/blog/matome"
    ) {
      set();
    }
  }
);
</script>
