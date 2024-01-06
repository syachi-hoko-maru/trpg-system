<template>
    <ItemButton @click.stop="omikuji" color="red">
        <slot />
    </ItemButton>
</template>

<script setup lang="ts">
import { getOmikujiResultPath } from "~/src/simulater/omikuji/"

const omikuji = () => {
    navigateTo(getOmikujiResultPath())
}
</script>