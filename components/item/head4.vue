<template>
  <h5 class="head4 mt-4 mb-2">
    <slot />
  </h5>
</template>

<style lang="scss" scoped>
h5.head4 {
  font-size: 1.05em;
  line-height: 1.2rem;
  font-weight: bold;
  margin-left: 1.3rem;

  &::before {
    content: "■";
    display: block;
    position: absolute;
    transform: translate(-1.1rem, 0);
  }
}
</style>
