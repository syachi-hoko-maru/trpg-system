<template>
  <item-textlink :to="arr[0]">
    {{ arr[1].replace(/¥s/g, " ") }}
  </item-textlink>
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

const arr = Props.props.split(",")
</script>