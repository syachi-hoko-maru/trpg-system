<template>
  <div :id="`scrollx${rand}`" class="d-flex flex-row align-center scrollx">
    <slot />
    <v-btn class="mx-5" color="primary" icon="mdi-arrow-left" @click="scroll" v-if="nobutton" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  nobutton?: boolean
}
const Props = defineProps<Props>();

const route = useRoute()

const rand = Math.random()

const scroll = () => {
  const scrollx = document.getElementById(`scrollx${rand}`)
  if (!scrollx) return
  scrollx.scrollTo(0, scrollY)
}

watch(route, scroll)
</script>

<style lang="scss" scoped>
div.scrollx {
  overflow-x: scroll;
}
</style>