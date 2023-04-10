<template>
  <layouts-menu-sideframe bottom side="right">
    <card nobefore class="mt-0" v-if="nowPageSetting.to !== '/search'">
      <template #title>検索</template>
      <v-text-field label="検索キーワード" v-model="word" density="comfortable" />
      <item-button :url="`/search?word=${word}`" :disabled="!word">
        検索する
      </item-button>
    </card>
    <card nobefore class="mt-0">
      <template #title>おすすめのページ</template>
      <div v-for="op of osusumePageArray" class="mb-3">
        <atom-link :to="op.to">
          <v-responsive :aspect-ratio="40 / 21">
            <v-img :src="`${$templateText.basePath}/webp/${op.img}`" height="100%" cover />
          </v-responsive>
        </atom-link>
      </div>
    </card>
    <card nobefore class="mt-0">
      <template #title>タグ一覧</template>
      <template #before>
        <v-list density="compact" nav class="bg-background text-text">
          <template v-for="(tag, i) in $pageTags" :key="tag">
            <atom-link :to="`/search?tag=${tag}`">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-label" />
                </template>
                <v-list-item-title v-text="$pageTagSettings[tag].label" />
              </v-list-item>
            </atom-link>
          </template>
        </v-list>
      </template>
    </card>
    <card nobefore class="mt-0">
      <template #title>最近更新されたページ</template>
      <template #before>
        <v-list density="compact" nav class="bg-background text-text">
          <template
            v-for="page in $pageSettingList.filter(p => !p.hidden).sort((a, b) => -new Date(a.lastmod).getTime() + new Date(b.lastmod).getTime()).slice(0, 10)"
            :key="page.to">
            <atom-link :to="page.to">
              <v-list-item>
                <v-list-item-title v-text="page.title" />
              </v-list-item>
            </atom-link>
          </template>
        </v-list>
      </template>
    </card>

  </layouts-menu-sideframe>
</template>

<script setup lang="ts">
const { osusumePageArray, nowPageSetting } = usePages()
const word = ref("")
</script>