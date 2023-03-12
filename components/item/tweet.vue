<template>
  <blockquote class="twitter-tweet" data-theme="dark">
    <slot />
  </blockquote>
</template>

<script setup lang="ts">
useHead({
  script: [{
    async: true,
    src: "https://platform.twitter.com/widgets.js",
  }]
})
onMounted(() => (window as any).twttr && (window as any).twttr.widgets.load)
</script>