<template>
  <item-button
    v-if="!icon"
    :url="shareUrl"
    prepend-icon="mdi-twitter"
    class="bg-twitter"
  >
    <slot />
  </item-button>
  <atom-link
    v-else
    :to="shareUrl"
    button
    title="ページをTwitterでシェア"
    type="share"
  >
    <v-icon
      icon="mdi-twitter"
      class="pa-1 text-twitter"
      :size="size ? size : 'small'"
    />
  </atom-link>
</template>

<script setup lang="ts">
const { $templateText } = useNuxtApp();

interface Props {
  url?: string;
  text: string;
  icon?: boolean;
  hashTag?: string;
  size?: string;
  color?: string;
}
const Props = defineProps<Props>();

const hashtags = `&hashtags=${encodeURIComponent(
  Props.hashTag ? Props.hashTag : "TRPGギルド支部しゃちほこの尾びれ亭"
)}`;
const shareUrl = computed(
  () =>
    `https://twitter.com/share?url=${
      Props.url ? Props.url : $templateText.baseUrl
    }&text=${encodeURIComponent(
      Props.text
    )}&related=@syachi_hoko_trp${hashtags}`
);
</script>
