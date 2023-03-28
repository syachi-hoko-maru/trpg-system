<template>
  <div :id="id">
    <v-card class="my-5" :class="Props.class ? Props.class : 'bg-background text-text'" elevation="3">
      <v-row v-if="Props.loading" class="cardLoading align-center justify-center">
        <v-progress-circular :size="70" :width="7" indeterminate color="primary" />
      </v-row>
      <slot name="tbefore" />
      <div v-if="$slots.title" class="pt-4 pb-1">
        <h2 class="text-h5 px-4 py-0 my-0">
          <slot name="title" />
        </h2>
        <v-card-subtitle v-if="$slots.subtitle">
          <slot name="subtitle" />
        </v-card-subtitle>
      </div>
      <slot name="before" />
      <div class="px-4" v-if="$slots.pbefore">
        <slot name="pbefore" />
      </div>
      <v-card-text v-if="$slots.default" class="pt-1">
        <slot name="default" />
      </v-card-text>
      <div class="px-4" v-if="$slots.pafter">
        <slot name="pafter" />
      </div>

      <slot name="after" />
    </v-card>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  class?: string
  loading?: boolean
}
const Props = defineProps<Props>()
</script>

<style scoped>
.cardLoading {
  position: absolute;
  z-index: 1020;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(128, 128, 128, 0.5);
}
</style>