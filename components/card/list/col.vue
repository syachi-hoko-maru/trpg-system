<template>
  <div class="d-flex justify-space-between flex-wrap" id="flex-card-list">
    <slot />
  </div>
</template>

<style lang="scss">
#flex-card-list {
  width: 100%;
  align-items: stretch;

  >div {
    width: calc(50% - 8px);

    >div.v-card {
      width: 100%;
      height: calc(100% - 40px);
      display: flex;
      flex-direction: column;

      >div.v-card-text {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .text {
          flex-grow: 1;
        }
      }

      >div:not(.v-card-text) {
        flex-grow: 0;
      }
    }
  }
}
</style>