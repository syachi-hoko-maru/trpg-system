<template>
    <ruby>
        <andml-inline-spanc :props="arr[0]" />
        <rp>(</rp>
        <rt>{{ arr[1] }}</rt>
        <rp>)</rp>
    </ruby>
</template>
  
<script setup lang="ts">
interface Props {
    props: string
}
const Props = defineProps<Props>();

const arr = Props.props.split(",")
</script>