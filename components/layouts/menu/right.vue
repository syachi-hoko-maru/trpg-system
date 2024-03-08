<template>
  <layouts-menu-sideframe bottom side="right">
    <card nobefore class="mt-0" v-if="pageSetting.to !== '/search'">
      <template #title>検索</template>
      <item-searchbox />
    </card>
    <card nobefore class="mt-0">
      <template #title>おすすめのページ</template>
      <div v-for="op of osusumePageArray" class="mb-3">
        <atom-link
          :to="op.to"
          :title="`ページ「${op.title}」へのリンク`"
          type="right"
        >
          <v-responsive :aspect-ratio="40 / 21" v-if="op.img">
            <item-img
              :src="op.img"
              :alt="`ページ「${op.title}」のサムネイル画像`"
              height="100%"
              cover
            />
          </v-responsive>
        </atom-link>
      </div>
    </card>
    <!-- <item-amazon-box /> -->
    <card nobefore class="mt-0">
      <template #title>タグ一覧</template>
      <template #pbefore>
        クリックでタグのついたページ一覧を見ることができます。
      </template>
      <template #after>
        <item-tags-list />
      </template>
    </card>
    <card nobefore class="mt-0">
      <template #title>最近更新されたページ</template>
      <template #before>
        <v-list density="compact" nav class="bg-background text-text">
          <template
            v-for="page in $pageSettingList
              .filter((p) => !isHidden(p) && !p.noSearch)
              .sort(
                (a, b) =>
                  -new Date(a.lastmod).getTime() + new Date(b.lastmod).getTime()
              )
              .slice(0, 10)"
            :key="page.to"
          >
            <item-textlink :to="page.to">
              <v-list-item>
                <v-list-item-title v-text="page.title" />
              </v-list-item>
            </item-textlink>
          </template>
        </v-list>
      </template>
    </card>
    <card nobefore class="mt-0">
      <template #title>シェア</template>
      <item-share-page>ツイート</item-share-page>
      <item-button
        prepend-icon="mdi-content-copy"
        @click.stop="() => $copy($templateText.baseUrl + pageSetting.to)"
      >
        このページのURLをコピー
      </item-button>
    </card>
  </layouts-menu-sideframe>
</template>

<script setup lang="ts">
import { getPageSetting, isHidden } from "~/src/pages/getPageSetting";

const { osusumePageArray } = usePages();
const route = useRoute();
const pageSetting = ref(getPageSetting(route.fullPath));
watch(
  () => route.fullPath,
  () => {
    pageSetting.value = getPageSetting(route.fullPath);
  }
);
</script>
