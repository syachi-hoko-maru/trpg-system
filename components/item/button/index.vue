<template>
  <item-pagecard v-if="internalFlag && !normalButton" :pagePath="url" />
  <atom-link :to="Props.url" :button="true" v-else :disabled="disabled" :title="title" :type="type ? type : 'button'">
    <v-btn class="bg-background mt-4 mb-1" :class="class" :prepend-icon="Props.prependIcon" :color="Props.color" block
      :disabled="disabled" :elevation="$vuetify.theme.current.dark ? 5 : 3">
      <slot />
      <v-icon v-if="externalFlag" icon="mdi-open-in-new" size="x-small" />
    </v-btn>
  </atom-link>
</template>

<script setup lang="ts">
interface Props {
  url?: string,
  prependIcon?: string,
  normalButton?: boolean
  color?: string
  disabled?: boolean
  type?: LinkType
  class?: string
}
const Props = withDefaults(defineProps<Props>(), { url: "action", normalButton: false });

const externalFlag = Props.url?.startsWith("http") ? true : false
const internalFlag = (Props.url?.startsWith("/") && Props.url.indexOf("#") === -1 && Props.url.indexOf("?") === -1) ? true : false

const title = Props.url !== "action" ? `リンク "${Props.url}" へのボタン` : `アクションが起こるボタン`
</script>