<template>
    <div class="gray">
        <slot />
    </div>
</template>

<style scoped lang="scss">
div.gray {
    background-color: rgba($color: #888888, $alpha: 0.5);
    padding: 0.5rem;
    margin: 0.5rem
}
</style>