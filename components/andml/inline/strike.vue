<template>
  <span class="strike text-error">
    <span class="text-disabled">
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