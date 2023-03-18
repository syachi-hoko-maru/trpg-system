<template>
  <item-button :url="shareUrl" prepend-icon="mdi-twitter" color="blue">
    <slot />
  </item-button>
</template>

<script setup lang="ts">
const { $templateText } = useNuxtApp()

interface Props {
  url?: string,
  text: string
}
const Props = defineProps<Props>();

const shareUrl = computed(() => `https://twitter.com/share?url=${Props.url ? Props.url : $templateText.baseUrl}&text=${encodeURIComponent(Props.text)}&related=@syachi_hoko_trp&hashtags=${encodeURIComponent("TRPGギルド支部しゃちほこの尾びれ亭")}`)
</script>