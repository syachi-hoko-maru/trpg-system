<template>
  <item-amazon-sw25 mini :item="item" />
</template>

<script setup lang="ts">

interface Props {
  props?: string
}
const Props = defineProps<Props>();

const item = ref([] as string[])
if (Props.props) {
  item.value = Props.props.split("・")
}
</script>

