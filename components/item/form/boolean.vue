<template>
  <v-switch :label="Props.formSetting.label" v-model="Props.formSetting.value" color="primary" density="compact"
    :disabled="disabled" />
</template>

<script setup lang="ts">
interface Props {
  formSetting: FormSettingBoolean
  disabled?: boolean
}
const Props = defineProps<Props>();
</script>