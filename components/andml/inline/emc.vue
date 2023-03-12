<template>
  <em class="em">
    {{ props }}
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
  background: linear-gradient(transparent 80%, rgb(236, 154, 96) 20%);
  font-style: normal;
}
</style>