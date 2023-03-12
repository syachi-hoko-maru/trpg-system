<template>
  <v-form v-if="show && formSettings.length !== 0">
    <item-form
      v-for="formSetting of formSettings.filter(formSetting => !(formSetting.type === 'date' && formSetting.disabled))"
      :formSetting="formSetting" :key="formSetting.name" />
  </v-form>
</template>

<script setup lang="ts">
interface Props {
  formSettings: FormSettingsWithDisable[]
}
const Props = defineProps<Props>();

const show = ref(false)
onMounted(() => {
  show.value = true
})
</script>