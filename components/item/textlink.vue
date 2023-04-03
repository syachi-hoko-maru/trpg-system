<template>
  <span class="textlink">
    <atom-link :to="to" :deco="true" :color="colorClass">
      <slot />
    </atom-link>
  </span>
</template>

<script setup lang="ts">
interface Props {
  to: string
  color?: string
}
const Props = defineProps<Props>();

const colorClass = Props.color ? Props.color : "text-info"
</script>

<style lang="scss" scoped>
span.textlink {
  font-style: normal;
  font-weight: bold;
}
</style>
