<template>
  <atom-link :to="pageSettingData.to" v-if="pageSettingData">
    <card class="my-5">
      <template #tbefore>
        <v-container class="pa-0" v-if="pageSettingData.img">
          <v-row :height="120">
            <v-col cols="3">
              <v-img :src="`${$templateText.basePath}/webp/${pageSettingData.img}`" :height="120" cover />
            </v-col>
            <v-col cols="8">
              <v-row class="pt-5">
                <v-card-title class="search-card-title">{{ pageSettingData.title }}</v-card-title>
                <v-card-subtitle class="search-card-title" v-if="pageSettingData.to.indexOf('/blog/') === 0">
                  {{ pageSettingData.lastmod }}
                </v-card-subtitle>
                <item-tags :tags="pageSettingData.tags" class="py-0" v-if="mounted" />
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <div v-else>
          <v-card-title class="search-card-title">{{ pageSettingData.title }}</v-card-title>
          <item-tags :tags="pageSettingData.tags" class="py-0" v-if="mounted" />
        </div>
        <v-card-text class="pt-0" v-if="pageSettingData.explain && pageSettingData.explain.length">
          <andml :andmls="pageSettingData.explain" />
        </v-card-text>
      </template>
    </card>
  </atom-link>
</template>

<script setup lang="ts">
interface Props {
  pageSetting?: PageSetting,
  pagePath?: string
}
const Props = defineProps<Props>();

const { $pageSettingList, $templateText } = useNuxtApp()
const pageSettingData: PageSetting | undefined =
  Props.pageSetting
    ? Props.pageSetting
    : Props.pagePath
      ? $pageSettingList.filter(({ to }) => Props.pagePath?.replace(/^(.+)#.*$/, "$1").replace(/^(.+)?.*$/, "$1").replace(/^(.+)\/\d+$/, "$1").replace(/^(.+)\/+$/, "$1") === to)[0]
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

