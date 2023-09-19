<template>
  <item-block-copy :color="$vuetify.theme.current.colors.primary" :title="props">
    <slot />
  </item-block-copy>
</template>

<script setup lang="ts">
interface Props {
  props: string,
}
const Props = defineProps<Props>();

</script>

<style lang="scss" scoped>
.italic {
  font-style: italic;
}
</style>