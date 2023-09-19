<template>
  <span class="serif">
    <ItemInlineCopy type="serif">
      <andml-inline-spanc :props="props" />
    </ItemInlineCopy>
  </span>
</template>

<script setup lang="ts">

interface Props {
  props: string
}
const Props = defineProps<Props>();

</script>

<style lang="scss" scoped>
span.serif {
  font-weight: 600;
}
</style>