<template>
  <card v-if="title" class="pb-2">
    <template #title>
      {{ title }}
    </template>
  </card>
  <div class="d-flex justify-space-between flex-wrap card-list flex-card-list">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}
const Props = defineProps<Props>();
</script>

<style lang="scss">
div.card-list.flex-card-list {
  width: 100%;
  align-items: stretch;

  section.card-div {
    width: calc(50% - 8px);
    margin-bottom: 20px;

    div.v-card {
      width: 100%;
      height: 100%;
      display: flex;
      top: 0;
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