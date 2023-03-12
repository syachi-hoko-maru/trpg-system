<template>
  <v-textarea :label="Props.formSetting.label" v-model="Props.formSetting.value" density="comfortable"
    :hint="Props.formSetting.hint" :disabled="disabled" />
</template>

<script setup lang="ts">
interface Props {
  formSetting: FormSettingTextarea,
  disabled?: boolean
}
const Props = defineProps<Props>();

</script>