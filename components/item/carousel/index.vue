<template>
  <v-carousel show-arrows v-model="item" hide-delimiters height="90%" class="carousel">
    <template v-slot:prev="{ props }">
      <v-btn icon="mdi-chevron-left" size="small" @click="props.onClick" />
    </template>
    <template v-slot:next="{ props }">
      <v-btn icon="mdi-chevron-right" size="small" @click="props.onClick" />
    </template>
    <v-carousel-item width="100%" v-for="pageSetting of pageSettingList">
      <atom-link :to="pageSetting.to" :title="`ページ「${pageSetting.title}」へのリンク`" type="carousel">
        <card class="ma-2" nobefore>
          <template #tbefore>
            <v-responsive :aspect-ratio="40 / 21">
              <item-img :src="$templateText.basePath + '/webp/' + pageSetting.img"
                :alt="`ページ「${pageSetting.title}」のサムネイル画像`" height="100%" cover v-if="!hidden" />
            </v-responsive>
            <div class="text text-caption text-medium-emphasis ma-3">
              <template v-if="!hidden">
                {{ pageSetting.explain }}
              </template>
            </div>
          </template>
        </card>
      </atom-link>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
interface Props {
  pageSettingList: PageSetting[]
  hidden?: boolean
}
const Props = defineProps<Props>()

const item = ref(0)
const itemCount = Props.pageSettingList.length

const scrollCarousel = () => {
  if (item.value === itemCount - 1) item.value = 0
  else item.value++
}
let timer: NodeJS.Timeout
onMounted(() => {
  timer = setTimeout(scrollCarousel, 2 * 1000)
  watch(item, () => {
    clearTimeout(timer)
    timer = setTimeout(scrollCarousel, 2 * 1000)
  })
})
</script>

<style lang="scss" scoped>
.carousel {
  margin-top: -20px;
}

.text {
  height: 3.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>