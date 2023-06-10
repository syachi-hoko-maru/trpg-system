<template>
  <h4 class="head3 mt-4 mb-2">
    <slot />
  </h4>
</template>

<style lang="scss" scoped>
h4.head3 {
  font-size: 1.25em;
  line-height: 1.5rem;
  font-weight: bold;
  margin-left: 1.5rem;

  &::before {
    content: '◆';
    display: block;
    position: absolute;
    transform: translate(-1.5rem, 0)
  }
}
</style>