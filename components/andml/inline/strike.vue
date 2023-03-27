<template>
  <span class="strike" :style="`color: ${$vuetify.theme.current.colors.error};`">
    <span :style="`color: ${$vuetify.theme.current.colors.text};`">
      <andml-inline-spanc :props="props" />
    </span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

</script>

<style scoped lang="scss">
span.strike {
  text-decoration: line-through;
}
</style>