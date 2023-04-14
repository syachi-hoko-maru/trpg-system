<template>
  <v-carousel show-arrows v-model="item" hide-delimiters height="90%" class="carousel">
    <template v-slot:prev="{ props }">
      <v-btn icon="mdi-chevron-left" size="small" @click="props.onClick" />
    </template>
    <template v-slot:next="{ props }">
      <v-btn icon="mdi-chevron-right" size="small" @click="props.onClick" />
    </template>
    <v-carousel-item width="100%"
      v-for="pageSetting of $pageSettingList.filter(p => p.osusume && p.img).sort((a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime()).splice(0, 10)">
      <atom-link :to="pageSetting.to" :title="`ページ「${pageSetting.title}」へのリンク`">
        <card class="ma-2" nobefore>
          <template #tbefore>
            <v-responsive :aspect-ratio="40 / 21">
              <v-img :src="$templateText.basePath + '/webp/' + pageSetting.img" height="100%" cover />
            </v-responsive>
            <div class="text text-caption text-medium-emphasis ma-3">
              {{ pageSetting.explain }}
            </div>
          </template>
        </card>
      </atom-link>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
const item = ref(0)
const itemCount = 10

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