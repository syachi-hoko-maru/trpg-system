<template>
  <v-text-field :label="Props.formSetting.label" v-model="Props.formSetting.value" :rules="rule()" density="comfortable"
    :hint="Props.formSetting.hint" :disabled="disabled" />
</template>

<script setup lang="ts">
interface Props {
  formSetting: FormSettingNumber | FormSettingString,
  disabled?: boolean
}
const Props = defineProps<Props>();

const rule = () => {
  if (Props.formSetting.type === "number") return [(v: any) => /\d+/.test(v) || '半角数字を入力してください']
  else return []
}
</script>