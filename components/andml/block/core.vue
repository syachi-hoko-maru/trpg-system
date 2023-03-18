<template>
  <div class="area pa-2 mt-5 mb-3" :style="`border: solid 2px ${color};`">
    <item-head2 class="title px-2"
      :style="`background-color: ${$vuetify.theme.current.colors.background}; color: ${color};`">
      {{ title }}
    </item-head2>
    <div class="text-area pt-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  color: string
}
const Props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.area {
  position: relative;
}

.area .title {
  position: absolute;
  display: inline-block;
  top: -30px;
  left: 10px;
}
</style>