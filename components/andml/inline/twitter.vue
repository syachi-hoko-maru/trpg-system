<template>
  <span>
    <atom-link to="https://twitter.com/syachi_hoko_trp" :color="color" :deco="deco"
      title="twitter account @syachi_hoko_trp">Twitter（@syachi_hoko_trp）</atom-link>
  </span>
</template>

<script setup lang="ts">
interface Props {
  color?: string
  deco?: boolean
}
const Props = withDefaults(defineProps<Props>(), { deco: true });
</script>