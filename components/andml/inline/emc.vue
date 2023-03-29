<template>
  <em class="em" :style="`background: linear-gradient(transparent 50%, ${$vuetify.theme.current.colors.accent} 50%);`">
    <andml-inline-spanc :props="props" />
  </em>
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

</script>

<style scoped lang="scss">
em.em {
  font-style: normal;
  font-weight: bold;
}
</style>