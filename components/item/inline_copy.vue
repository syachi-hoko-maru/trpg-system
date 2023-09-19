<template>
    <span :class="type" :id="id">
        <slot />
    </span>
    <v-icon class="copy-icon" size="small" @click="copy">mdi-content-copy</v-icon>
</template>
  
<script setup lang="ts">
const { setSnack } = useSnack()
const { $copy } = useNuxtApp()

interface Props {
    type: string
}
const Props = defineProps<Props>();

const id = ref("")
const copy = () => {
    const el = document.querySelector(`span.${Props.type}#${id.value}`)
    const text = el?.textContent
    if (!text || !text.length) setSnack("エラーが発生しました")
    else $copy(text)
}
onMounted(() => {
    id.value = "span-copy-" + String(Math.floor(Math.random() * (10 ** 5)))
})

</script>
  
<style lang="scss" scoped>
.copy-icon {
    cursor: pointer;
    margin-right: 0.5rem;
}
</style>