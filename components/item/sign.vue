<template>
  <div class="pl-4 mt-1 text-right text-caption caption">{{ $templateText.title }}</div>
</template>

<script setup lang="ts">
const { $templateText } = useNuxtApp()

</script>
<style scoped>
.caption {
  color: #888;
}
</style>