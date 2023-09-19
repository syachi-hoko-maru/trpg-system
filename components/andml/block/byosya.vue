<template>
  <item-block-copy :color="$vuetify.theme.current.colors.primary" title="描写">
    <template #title>描写</template>
    <i class="italic">
      <slot />
    </i>
  </item-block-copy>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.italic {
  font-style: italic;
}
</style>