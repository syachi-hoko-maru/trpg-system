<template>
  <layouts-menu-sideframe bottom side="right">
    <card nobefore class="mt-0" v-if="nowPageSetting.to !== '/search'">
      <template #title>検索</template>
      <andml :andmls="andml1" />
      <v-text-field label="検索キーワード" v-model="word" density="comfortable" class="mt-3" />
      <item-button :url="`/search?word=${word}`" :disabled="!word" type="right">
        検索する
      </item-button>
    </card>
    <card nobefore class="mt-0">
      <template #title>おすすめのページ</template>
      <div v-for="op of osusumePageArray" class="mb-3">
        <atom-link :to="op.to" :title="`ページ「${op.title}」へのリンク`" type="right">
          <v-responsive :aspect-ratio="40 / 21">
            <v-img :src="`${$templateText.basePath}/webp/${op.img}`" :alt="`ページ「${op.title}」のサムネイル画像`" height="100%"
              cover />
          </v-responsive>
        </atom-link>
      </div>
    </card>
    <card nobefore class="mt-0">
      <template #title>タグ一覧</template>
      <template #pbefore>
        クリックでタグのついたページ一覧を見ることができます。
      </template>
      <template #after>
        <v-list density="compact" nav class="bg-background text-text">
          <template v-for="(tag, i) in $pageTags" :key="tag">
            <atom-link :to="`/search?tag=${tag}`" :title="`タグ「${$pageTagSettings[tag].label}」がついたページ一覧へのリンク`"
              type="right">
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
      <item-button prepend-icon="mdi-content-copy" @click.stop="() => $copy($templateText.baseUrl + nowPageSetting.to)">
        このページのURLをコピー
      </item-button>
    </card>
  </layouts-menu-sideframe>
</template>

<script setup lang="ts">
const { osusumePageArray, nowPageSetting } = usePages()
const word = ref("")

const samplewords = ["ソード・ワールド2.5", "初心者", "エンシェントブルー", "SW2.5 サプリメント", "SW2.5 新刊", "SW2.5 種族", "SW2.5 技能", "オンセ 素材", "デモンズライン"]

const shuffle = <T>(array: Array<T>) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const setAndml = (word: string) => `「 &link_/search?word=${word.replace(/\s/g, "and")},${word.replace(/\s/g, "¥s")} 」`

const andml1 = ref(`
${(samplewords).slice(0, 3).map(setAndml).join()}など気になるワードを検索してみてください。
`)

const route = useRoute()
onMounted(() => {
  watch(route, () => {
    andml1.value = `
${shuffle(samplewords).slice(0, 3).map(setAndml).join()}など気になるワードを検索してみてください。
`
  })
})
</script>