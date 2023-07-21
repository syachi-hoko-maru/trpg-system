<template>
  <item-img :src="src" :alt="alt.replace(/¥s/g, ' ')" class="my-2" />
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

const [src, alt] = Props.props.split(",")
</script>