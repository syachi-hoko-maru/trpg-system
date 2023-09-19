<template>
  <span class="hantei"
    :style="`background: linear-gradient(transparent 50%, ${$vuetify.theme.current.colors.accent} 50%);`">
    <ItemInlineCopy type="hantei">
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
span.hantei {
  font-weight: 600;
}
</style>