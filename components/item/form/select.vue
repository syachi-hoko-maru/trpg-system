<template>
  <v-select :label="Props.formSetting.label" :items="Props.formSetting.selects" v-model="Props.formSetting.value"
    density="comfortable" :hint="Props.formSetting.hint" :disabled="disabled" />
</template>

<script setup lang="ts">
interface Props {
  formSetting: FormSettingSelect
  disabled?: boolean
}
const Props = defineProps<Props>();
</script>