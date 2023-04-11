<template>
  <v-range-slider v-if="Array.isArray(Props.formSetting.value)" :label="Props.formSetting.label" :ticks="ticks"
    v-model="Props.formSetting.value" :min="min" :max="max" :step="1" show-ticks="always" tick-size="4">
  </v-range-slider>
  <v-slider v-else :label="Props.formSetting.label" :ticks="ticks" v-model="Props.formSetting.value" :min="min" :max="max"
    :step="1" show-ticks="always" tick-size="4">
  </v-slider>
</template>

<script setup lang="ts">
interface Props {
  formSetting: FormSettingSlider
  disabled?: boolean
}
const Props = defineProps<Props>();

let count = 0
const ticks = computed(() => {
  const result: Record<number, string> = {}
  Props.formSetting.selects.forEach((v, i) => {
    result[count] = String(v)
    count++
    if (i < Props.formSetting.selects.length - 1 && Props.formSetting.tickCount && Props.formSetting.tickCount > 1) {
      for (let j = 0; j < Props.formSetting.tickCount - 1; j++) {
        result[count] = ""
        count++
      }
    }
  })
  return result
})
const min = computed(() => Number.isNaN(Props.formSetting.selects[0]) ? Props.formSetting.selects[0] : 0)
const max = computed(() => count - 1)
</script>