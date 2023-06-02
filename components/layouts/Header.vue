<template>
  <div id="header" :style="`background-color: ${$vuetify.theme.current.colors.primary};`">
    <div>
      <h1 id="title" class="text-h6 ma-0">
        <atom-link v-if="!error" to="/" color="text-textbp" title="トップページへのリンク（タイトル）">
          {{ titleprefix }}<br class="hidden-sm-and-up">{{ titlemain }}
        </atom-link>
        <template v-else>{{ titleprefix }}<br class="hidden-sm-and-up">{{ titlemain }}</template>
      </h1>
    </div>
    <div>
      <div class="darkmode-icon">
        <pages-setting-darkmode icon />
      </div>
      <div class="search-icon">
        <atom-link :to="'/search'" title="検索ページへのリンクアイコン">
          <v-icon icon="mdi-magnify" class="px-5 text-textbp" />
        </atom-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error?: boolean
}
const Props = defineProps<Props>();

const { $templateText } = useNuxtApp()
const titleprefix = $templateText.title.replace(/〈.*$/, "")
const titlemain = $templateText.title.replace(/^.*〈/, "〈")

</script>

<style lang="scss" scoped>
#header {
  width: 100vw;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  >div {
    padding: 0 20px;
    display: flex;
  }
}

h1#title {
  white-space: normal;
  display: block;
  font-weight: normal;
}

.darkmode-icon {
  @media screen and (max-width: 600px) {
    display: none;
  }
}

.search-icon {
  @media screen and (max-width: 350px) {
    display: none;
  }
}
</style>