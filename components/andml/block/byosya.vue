<template>
  <item-block :color="$vuetify.theme.current.colors.primary">
    <template #title>描写</template>
    <i class="italic">
      <slot />
    </i>
  </item-block>
</template>

<style lang="scss" scoped>
.italic {
  font-style: italic;
}
</style>