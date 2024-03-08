<template>
  <v-file-input
    :label="formSetting.label"
    density="comfortable"
    show-size
    @change="change"
  />
</template>

<script setup lang="ts">
interface Props {
  formSetting: FormSettingFile;
  disabled?: boolean;
}
const Props = defineProps<Props>();

const change = (event: Event) => {
  // console.log("change!")
  try {
    const target = event.target as HTMLInputElement;
    if (!target) throw "file error";
    // console.log(999)

    const files = target.files;
    // console.log(files)
    if (!files || files.length === 0) return;

    const file = files[0];
    // console.log(files[0])

    const reader = new FileReader();
    reader.onload = () => {
      // console.log(reader.result)
      if (typeof reader.result === "string")
        Props.formSetting.value = reader.result;
      else throw "file type error";
    };
    reader.readAsDataURL(file);
  } catch (err) {
    console.error(err);
  }
};
</script>
