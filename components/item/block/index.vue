<template>
  <div class="area pa-3 mt-10 mb-5 ml-5 mr-2" :style="`border: solid 3px ${color};`">
    <h4 class="title pa-2 pb-1" :style="`background-color: ${color}; color: ${$vuetify.theme.current.colors.text};`">
      <slot name="title" />
    </h4>
    <div class="text-area pt-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  color: string
}
const Props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.area {
  position: relative;

  .title {
    position: absolute;
    display: inline-block;
    font-weight: bold;
    font-size: 1.1rem;
    top: -17px;
    left: -20px;
  }
}
</style>