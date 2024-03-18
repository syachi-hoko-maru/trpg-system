<template>
  <item-block :color="$vuetify.theme.current.colors.info">
    <template #title>
      <span> Q&A </span>
    </template>
    <dl>
      <dt>Q.</dt>
      <dd class="title">{{ title }}</dd>
    </dl>
    <dl>
      <dt>A.</dt>
      <dd>
        <slot />
      </dd>
    </dl>
  </item-block>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}
const Props = defineProps<Props>();
</script>

<style lang="scss" scoped>
dl {
  display: flex;
  align-items: baseline;
  margin: 10px 0;

  dt {
    font-size: 1.3rem;
    width: 2rem;
  }

  dd {
    &.title {
      font-size: 1.2rem;
    }

    margin-right: 1rem;
    width: calc(100% - 3rem);
  }
}
</style>
