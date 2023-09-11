<template>
  <div class="mt-5 mb-7">
    <iframe v-if="embedId" width="560" height="315" :src="`https://www.youtube.com/embed/${embedId}`"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
    <div v-else>
      この動画はなんらかのエラーにより再生ができません。申し訳ございません。
    </div>
    <item-button :url="Props.props">YouTubeで見る</item-button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

let embedId = ref("")
const urlPatterns: {
  reg: RegExp;
  id: string;
}[] = [
    // https://www.youtube.com/embed/アイディー のとき
    { reg: /^https:?\/\/www.youtube.com\/embed\/([^?]+)(\?.*)?$/, id: "$1" },
    // https://youtu.be/アイディー?si=何か のとき
    { reg: /^https:?\/\/youtu.be\/([^?]+)(\?.*)?$/, id: "$1" },
    // https://www.youtube.com/watch?v=アイディー のとき
    { reg: /^https:?\/\/www\.youtube\.com\/watch\?v=([^?&=]+)(&.+)*$/, id: "$1" }
  ]

for (let urlPattern of urlPatterns) {
  if (urlPattern.reg.test(Props.props)) {
    embedId.value = Props.props.replace(urlPattern.reg, urlPattern.id)
  }
}
</script>

<style scoped lang="scss">
iframe {
  width: 100%;
}
</style>