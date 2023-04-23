<template>
  <v-pagination v-model="mpage" :length="pageSetting.page" rounded="circle" v-if="mounted" />
  <v-alert class="my-5" type="info" :text="`「${pageSetting.title}」は長くなってしまったため、複数ページに分けております。`" />
  <card v-if="pageSetting.page && !top">
    <item-button v-if="page < pageSetting.page" :url="`${pageSetting.to}/${page + 1}`" normal-button>次のページへ</item-button>
    <item-button v-if="page > 1" :url="`${pageSetting.to}/${page - 1}`" normal-button>前のページへ</item-button>
    <item-button v-if="page >= pageSetting.page" :url="`${pageSetting.to}/1`" normal-button>最初から読む</item-button>
  </card>
</template>

<script setup lang="ts">
interface Props {
  // pageSetting: PageSetting,
  top?: boolean
}
const Props = defineProps<Props>();

const { nowPageSetting, getNowPagePage } = usePages()
const pageSetting = nowPageSetting

const mpage = ref(1)
const page = computed(() => {
  const p = getNowPagePage()
  mpage.value = p
  return p
})
const mounted = ref(false)


onMounted(() => {
  mounted.value = true
  watch(mpage, () => {
    navigateTo(`${pageSetting.value.to}/${mpage.value}`)
  })
})
</script>