<template>
  <span>
    {{ props }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

</script>