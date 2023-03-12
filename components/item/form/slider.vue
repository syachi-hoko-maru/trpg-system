<template>
  <v-range-slider :label="Props.formSetting.label" :ticks="Props.formSetting.selects" v-model="Props.formSetting.value"
    :min="Props.formSetting.selects[0]" :max="Props.formSetting.selects[Props.formSetting.selects.length - 1]" :step="1"
    show-ticks="always" tick-size="4">
  </v-range-slider>
</template>

<script setup lang="ts">
interface Props {
  formSetting: FormSettingSlider
  disabled?: boolean
}
const Props = defineProps<Props>();

</script>