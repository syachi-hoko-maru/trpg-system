<template>
    <div v-for="line of lines">
        {{ line }}
    </div>
</template>

<script setup lang="ts">
interface Props {
    lines?: string[]
    props?: string
}
const Props = defineProps<Props>();
</script>