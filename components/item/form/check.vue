<template>
  <div class="mb-2">
    <label>{{ formSetting.label }}</label>
    <v-checkbox v-for="select of formSetting.selects" class="checkbox" v-model="model" :label="select" :value="select"
      density="compact" :disabled="disabled" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  formSetting: FormSettingCheck
  disabled?: boolean
}
const Props = defineProps<Props>();

const model = ref([] as string[])

watch(model, () => {
  Props.formSetting.value = model.value
})
</script>

<style lang="scss" scoped>
.checkbox {
  margin-bottom: -25px;
}
</style>