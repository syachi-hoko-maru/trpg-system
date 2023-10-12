<template>
  <div class="page-card-div" :class="virtical ? 'ma-2' : 'my-5'">
    <atom-link v-if="pageSettingData" :to="pageSettingData.to + (pageSettingData.page?.length ? '/1/' : '')"
      :title="`ページ「${pageSettingData.title}」へのリンク（ページカード）`" type="pagecard" :disabled="isHidden(pageSettingData)">
      <card :comingsoon="isHidden(pageSettingData)" :elevation="6" nobefore>
        <template #tbefore>
          <div class="pagecard d-flex justify-start page-card-incard"
            :class="virtical ? 'pagecard-virtical flex-column' : 'pagecard-side'">
            <div class="pagecard-image" v-if="pageSettingData.img">
              <item-img :src="pageSettingData.img" :alt="`ページ「${pageSettingData.title}」のサムネイル画像`" height="100%" cover
                class="ma-0" />
            </div>
            <div class="pagecard-text" :class="!pageSettingData.img ? 'no-image' : ''">
              <div class="pagecard-title">
                {{ pageSettingData.title }}
              </div>
              <div class="text-caption text-medium-emphasis">
                <template v-if="!isHidden(pageSettingData) && pageSettingData.to.indexOf('/blog/') === 0">
                  投稿日：{{ pageSettingData.lastmod }}
                </template>
                <template v-else-if="!isHidden(pageSettingData)">
                  最終更新日：{{ pageSettingData.lastmod }}
                </template>
                <template v-else>
                  公開予定日：{{ pageSettingData.lastmod }}
                </template>
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
import { isHidden } from '~/src/pages/getPageSetting';

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
div.page-card-div {
  transition: .3s;

  &:hover {
    opacity: 0.8;
    transform: scale(1.02);
  }

  .pagecard {
    .pagecard-text {
      overflow: hidden;
      margin: 8px;

      &.no-image {
        width: calc(100% - 16px) !important;
        height: calc(100% - 16px) !important;
      }

      .pagecard-title {
        font-size: 1rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

        @media screen and (max-width: 600px) {
          font-size: 0.8rem;
        }
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

        @media screen and (max-width: 600px) {
          margin: 4px;
          width: calc(60% - 8px);
          height: calc(100% - 8px);
        }
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
}
</style>

