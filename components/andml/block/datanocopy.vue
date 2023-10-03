<template>
  <item-block :color="$vuetify.theme.current.colors.primary">
    <template #title>{{ props }}</template>
    <slot />
  </item-block>
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