<template>
  <span>
    {{ info.title }}
    <span class="infoIcon">
      <v-icon icon="mdi-information" size="x-small" class="bg-background infoIconIcon"
        @click.stop="openDialogo(info.description)" />
    </span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

const { $info } = useNuxtApp()
const info = $info(Props.props)

const { openDialogo } = useDialogo()

</script>

<style scoped lang="scss">
span.infoIcon {
  position: relative;
  margin-right: 0.5rem;

  .infoIconIcon {
    position: absolute;
    top: -0.25rem;
    left: -0.25rem;
  }
}
</style>
