<template>
  <div>
    <item-form-input v-if="Props.formSetting.type === 'number' || Props.formSetting.type === 'string'"
      :formSetting="Props.formSetting" :disabled="disabled" />
    <item-form-boolean v-else-if="Props.formSetting.type === 'boolean'" :formSetting="Props.formSetting"
      :disabled="disabled" />
    <item-form-select v-else-if="Props.formSetting.type === 'select'" :formSetting="Props.formSetting"
      :disabled="disabled" />
    <item-form-combo v-else-if="Props.formSetting.type === 'combo'" :formSetting="Props.formSetting"
      :disabled="disabled" />
    <item-form-slider v-else-if="Props.formSetting.type === 'slider'" :formSetting="Props.formSetting"
      :disabled="disabled" />
    <item-form-textarea v-else-if="Props.formSetting.type === 'textarea'" :formSetting="Props.formSetting"
      :disabled="disabled" />
    <item-form-date v-else-if="Props.formSetting.type === 'date'" :formSetting="Props.formSetting" />
    <item-form-parent v-else-if="Props.formSetting.type === 'parent'" :formSetting="Props.formSetting"
      :disabled="disabled" />
    <p v-else>エラー</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  formSetting: FormSetting | FormSettingsWithDisable
}
const Props = defineProps<Props>();

const disabled = computed(() => {
  if (
    (Props.formSetting as FormSettingsWithDisable).disabled
    // && !(Props.formSetting.value
    //   && (Props.formSetting.value !== "0")
    //   && Props.formSetting.type !== "date"
    // )
  ) {
    return true
  }
  return false
})
</script>