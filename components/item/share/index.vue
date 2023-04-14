<template>
  <item-button v-if="!icon" :url="shareUrl" prepend-icon="mdi-twitter" color="blue">
    <slot />
  </item-button>
  <atom-link v-else :to="shareUrl" button title="ページをTwitterでシェア">
    <v-icon icon="mdi-twitter" class="pa-1" color="blue" size="small" />
  </atom-link>
</template>

<script setup lang="ts">
const { $templateText } = useNuxtApp()

interface Props {
  url?: string,
  text: string,
  icon?: boolean
}
const Props = defineProps<Props>();

const shareUrl = computed(() => `https://twitter.com/share?url=${Props.url ? Props.url : $templateText.baseUrl}&text=${encodeURIComponent(Props.text)}&related=@syachi_hoko_trp&hashtags=${encodeURIComponent("TRPGギルド支部しゃちほこの尾びれ亭")}`)
</script>