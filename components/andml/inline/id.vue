<template>
  <div :id="id">
    <andml-inline-spanc :props="andml ? andml : id ? id : ''" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  props: string;
}
const Props = defineProps<Props>();

const [id, andml] = Props.props.split(",") as (string | undefined)[];
</script>

<style scoped lang="scss">
span.strike {
  text-decoration: line-through;
}
</style>
