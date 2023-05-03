<template>
  <card class="card-list">
    <template #title v-if="title">
      {{ title }}
    </template>
    <template #pbefore>
      <div class="pt-5">
        <slot />
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}
const Props = defineProps<Props>();
</script>