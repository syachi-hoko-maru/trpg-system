<template>
  <v-chip size="small" link class="mx-2 my-1">
    <v-icon start icon="mdi-label" /> {{ label }}
  </v-chip>
</template>

<script setup lang="ts">
interface Props {
  label: string
}
const Props = defineProps<Props>();

</script>