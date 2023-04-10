<template>
  <layouts-menu-sideframe bottom side="right">
    <card nobefore class="mt-0">
      <template #title>おすすめのページ</template>
      <div v-for="op of osusumePageArray" class="mb-3">
        <atom-link :to="op.to">
          <v-img :src="`${$templateText.basePath}/webp/${op.img}`" width="100%" cover />
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
  </layouts-menu-sideframe>
</template>

<script setup lang="ts">
const { osusumePageArray } = usePages()
</script>