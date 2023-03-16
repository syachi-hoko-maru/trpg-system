<template>
  <card-list>
    <card v-for="sd of $scenarioData" :key="sd.id" :id="sd.id">
      <template #tbefore>
        <v-img :src="`${$templateText.basePath}/webp/${sd.img}`" :alt="`${sd.title}サムネイル画像`" />
      </template>
      <template #title>{{ sd.title }}</template>
      <template #subtitle>
        {{ sd.system }} / {{ sd.author }}
      </template>
      <div class="text">
        <andml :andmls="sd.explain" />
      </div>
      <item-button v-for="u of sd.url" :url="u.url" :key="u.url">
        {{ u.site }}
      </item-button>
    </card>
  </card-list>
</template>

<script setup lang="ts">
const { $templateText, $scenarioData } = useNuxtApp()
</script>