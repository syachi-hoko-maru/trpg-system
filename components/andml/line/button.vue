<template>
  <item-button :url="Props.props">
    <slot />
  </item-button>
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

</script>