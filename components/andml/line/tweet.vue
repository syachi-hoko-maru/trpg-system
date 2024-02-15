<template>
    <ItemTweet :path="props ? props : ''"></ItemTweet>
</template>

<script setup lang="ts">
interface Props {
    props?: string
}
const Props = defineProps<Props>();
</script>