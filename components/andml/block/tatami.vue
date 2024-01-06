<template>
    <div v-show="flag">
        <slot />
    </div>
    <ItemButton @click="button">{{ flag ? "閉じる" : props }}</ItemButton>
</template>

<script setup lang="ts">
interface Props {
    props?: string
    lines?: string[]
}
const Props = defineProps<Props>();

const flag = ref(false)
const button = () => {
    flag.value = !flag.value
    console.log("button")
}
</script>