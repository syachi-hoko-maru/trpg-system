<template>
  <v-combobox v-if="Props.formSetting.selects.length" :label="Props.formSetting.label" v-model="value"
    :items="Props.formSetting.selects" density="comfortable" :disabled="disabled" clearable hint="自由に文字を入力することも可能です"
    :multiple="Props.formSetting.multiple" />
</template>

<script setup lang="ts">
interface Props {
  formSetting: FormSettingCombo
  disabled?: boolean
}
const Props = defineProps<Props>();

const value = ref(Props.formSetting.multiple ? Props.formSetting.value.split("・").filter(s => s) as string[] : Props.formSetting.value)

watch(value, (v) => {
  if (typeof v === "string") {
    Props.formSetting.value = v
  } else {
    Props.formSetting.value = Props.formSetting.selects.filter(s => s && v.indexOf(s) >= 0).join("・")
  }
})
</script>