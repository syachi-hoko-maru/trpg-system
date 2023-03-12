<template>
  <card class="mt-0">
    <item-forms :formSettings="Props.formSetting.childs"></item-forms>
  </card>
</template>

<script setup lang="ts">
interface Props {
  formSetting: FormSettingParent,
  disabled?: boolean
}
const Props = defineProps<Props>();
</script>