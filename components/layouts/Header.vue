<template>
  <v-app-bar color="primary" app id="header">
    <v-app-bar-title>
      <div id="title" class="title">
        <atom-link v-if="!error" to="/" color="text-textbp">
          {{ titleprefix }}<br class="hidden-sm-and-up">{{ titlemain }}
        </atom-link>
        <template v-else>{{ titleprefix }}<br class="hidden-sm-and-up">{{ titlemain }}</template>
      </div>
    </v-app-bar-title>
    <div class="hidden-sm-and-down">
      <v-spacer />
      <atom-link :to="'/search'">
        <v-icon icon="mdi-magnify" class="px-10 text-textbp" />
      </atom-link>
    </div>
  </v-app-bar>
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
}

#title {
  white-space: normal
}
</style>