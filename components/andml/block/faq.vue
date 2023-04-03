<template>
  <item-block-faq :title="props">
    <slot />
  </item-block-faq>
</template>

<script setup lang="ts">
interface Props {
  props?: string
}
const Props = defineProps<Props>();
</script>