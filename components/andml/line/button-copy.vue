<template>
  <item-button @click="$copy(Props.props.replace(/¥s/g, ' '))">
    <slot />
  </item-button>
</template>

<script setup lang="ts">
const { $copy } = useNuxtApp();
interface Props {
  props: string;
}
const Props = defineProps<Props>();
</script>
