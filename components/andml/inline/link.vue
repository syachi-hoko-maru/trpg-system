<template>
  <atom-link :to="arr[0]" :deco="true">
    {{ arr[1] }}
  </atom-link>
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

const arr = Props.props.split(",")
</script>