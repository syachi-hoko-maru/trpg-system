<template>
  <component :is="component">

    <slot />
  </component>
</template>

<script setup lang="ts">
import { resolveComponent, onMounted, watch, shallowRef } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const component = shallowRef(resolveComponent('card-list-incard'))

onMounted(() => {
  const { sm, lgAndUp, name } = useDisplay();
  component.value = sm.value || lgAndUp.value ? resolveComponent('card-list-col') : resolveComponent('card-list-incard')
  watch(name, () => {
    component.value = sm.value || lgAndUp.value ? resolveComponent('card-list-col') : resolveComponent('card-list-incard')
  })
})

</script>