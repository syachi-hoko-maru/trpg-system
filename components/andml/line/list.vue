<template>
  <ul>
    <li :style="`margin-left: ${listCount}rem`" :class="classList">
      <slot />
    </li>
  </ul>
</template>

<script setup lang="ts">

interface Props {
  props?: string
}
const Props = defineProps<Props>();

const listCount = ref(0)
const classList = ref("")

if (Props.props?.length && Props.props.length >= 2) {
  const len = Props.props.length
  listCount.value = len
  if (len % 2 === 0) classList.value = "whiteCircle"
} else {
  listCount.value = 1
}
</script>

<style scoped lang="scss">
li {
  margin-left: 1rem;

  &.whiteCircle {
    list-style-type: circle
  }
}
</style>