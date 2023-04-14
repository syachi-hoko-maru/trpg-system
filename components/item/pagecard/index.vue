<template>
  <div :class="virtical ? 'ma-2' : 'my-5'">
    <atom-link v-if="pageSettingData" :to="pageSettingData.to" :title="`ページ「${pageSettingData.title}」へのリンク`">
      <card>
        <template #tbefore>
          <div class="pagecard d-flex justify-start"
            :class="virtical ? 'pagecard-virtical flex-column' : 'pagecard-side'">
            <div class="pagecard-image" v-if="pageSettingData.img">
              <v-img :src="`${$templateText.basePath}/webp/${pageSettingData.img}`" height="100%" cover class="ma-0" />
            </div>
            <div class="pagecard-text ma-2" :class="!pageSettingData.img ? 'no-image' : ''">
              <div class="pagecard-title">
                {{ pageSettingData.title }}
              </div>
              <div class="text-caption text-medium-emphasis">
                最終更新日：{{ pageSettingData.lastmod }}
              </div>
              <div class="text-caption text-medium-emphasis my-1">
                {{ (Array.isArray(pageSettingData.explain) ? pageSettingData.explain.join() : pageSettingData.explain) }}
              </div>
            </div>
          </div>
        </template>
      </card>
    </atom-link>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

interface Props {
  pageSetting?: PageSetting,
  pagePath?: string
  virtical?: boolean
}
const Props = defineProps<Props>();

const { $getPageSetting } = useNuxtApp()

const pageSettingData: Ref<PageSetting | undefined> = computed(() => Props.pageSetting
  ? Props.pageSetting
  : Props.pagePath
    ? $getPageSetting(Props.pagePath)
    : undefined
)

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
</script>

<style lang="scss">
.pagecard {
  .pagecard-text {
    overflow: hidden;

    .pagecard-title {
      font-size: 1rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    &.no-image {
      width: calc(100% - 16px) !important;
      height: calc(100% - 16px) !important;
    }
  }

  &.pagecard-side {
    aspect-ratio: 100/21;

    .pagecard-image {
      width: 40%;
      height: 100%;
    }

    .pagecard-text {
      width: calc(60% - 16px);
      height: calc(100% - 16px);
    }
  }

  &.pagecard-virtical {
    aspect-ratio: 20/21;
    max-width: 65vw;
    width: 300px;

    .pagecard-image {
      width: 100%;
      height: 50%;
    }

    .pagecard-text {
      width: calc(100% - 16px);
      height: calc(50% - 16px);
    }
  }
}
</style>

