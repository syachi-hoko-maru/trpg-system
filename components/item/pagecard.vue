<template>
  <div class="my-5">
    <card v-if="pageSettingData">
      <template #tbefore>
        <v-container class="pa-0" v-if="pageSettingData.img">
          <v-row :height="120">
            <v-col cols="3">
              <v-img :src="`${$templateText.basePath}/webp/${pageSettingData.img}`" :height="120" cover class="mb-2" />
            </v-col>
            <v-col cols="8">
              <v-row class="pt-5">
                <v-col cols="12" class="pa-0">
                  <atom-link :to="pageSettingData.to">
                    <v-card-title class="search-card-title">{{ pageSettingData.title }}</v-card-title>
                    <v-card-subtitle class="search-card-title" v-if="pageSettingData.to.indexOf('/blog/') === 0">
                      {{ pageSettingData.lastmod }}
                    </v-card-subtitle>
                  </atom-link>
                </v-col>
                <v-col cols="12" class="pa-0 mt-1">
                  <item-tags :tags="pageSettingData.tags" class="py-0" v-if="mounted" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <div v-else>
          <atom-link :to="pageSettingData.to">
            <v-card-title class="search-card-title">{{ pageSettingData.title }}</v-card-title>
          </atom-link>
          <item-tags :tags="pageSettingData.tags" class="py-0" v-if="mounted" />
        </div>
        <atom-link :to="pageSettingData.to">
          <v-card-text class="pt-0" v-if="pageSettingData.explain && pageSettingData.explain.length">
            <andml :andmls="pageSettingData.explain" />
          </v-card-text>
        </atom-link>
      </template>
    </card>
  </div>
</template>

<script setup lang="ts">
interface Props {
  pageSetting?: PageSetting,
  pagePath?: string
}
const Props = defineProps<Props>();

const { $getPageSetting, $templateText } = useNuxtApp()
const pageSettingData: PageSetting | undefined =
  Props.pageSetting
    ? Props.pageSetting
    : Props.pagePath
      ? $getPageSetting(Props.pagePath)
      : undefined

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
</script>

<style lang="scss">
.search-card-title {
  width: 100%;
}
</style>

