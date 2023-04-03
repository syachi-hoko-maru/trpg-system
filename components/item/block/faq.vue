<template>
  <item-block :color="$vuetify.theme.current.colors.info">
    <template #title>
      {{ blockTitle }}
    </template>
    <slot />
  </item-block>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}
const Props = defineProps<Props>()

const blockTitle = computed(() => Props.title ? `Q. ${Props.title}` : "Question")
</script>