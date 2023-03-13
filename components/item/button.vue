<template>
  <item-pagecard v-if="internalFlag && !normalButton" :pagePath="url" />
  <atom-link :to="Props.url" :button="true" v-else>
    <v-btn class="bg-background mt-4 mb-1" :prepend-icon="Props.prependIcon" block>
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
}
const Props = withDefaults(defineProps<Props>(), { url: "action", normalButton: true });

const externalFlag = Props.url?.startsWith("http") ? true : false
const internalFlag = Props.url?.startsWith("/") ? true : false

</script>