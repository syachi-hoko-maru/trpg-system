<template>
  <v-container class="pa-0">
    <v-row>
      <v-col cols="12" sm="3" class="py-0">
        <item-form-select :form-setting="monthSetting" />
      </v-col>
      <v-col cols="12" sm="7" class="py-0" @click="daychange">
        <item-form-select
          :form-setting="daySetting"
          :disabled="!monthSetting.value"
        />
      </v-col>
      <v-col cols="12" sm="2" class="py-0">
        <v-btn depressed elevation="2" fab icon size="small" @click="reset">
          <v-icon icon="mdi-close" />
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { nowDate } from "~/src/util/date";

interface Props {
  formSetting: FormSettingDate;
}
const Props = defineProps<Props>();

const today = nowDate();

const setNumberArray = (end: number, start: number = 1) => {
  const result: string[] = [];
  for (let i = start; i <= end; i++) {
    result.push(String(i));
  }
  return result;
};

const monthSetting: Ref<FormSettingSelect> = ref({
  name: "month",
  label: "年月",
  type: "select",
  selects: setNumberArray(12, today.getMonth() + 1)
    .map((m) => `${m}月`)
    .concat(
      setNumberArray(today.getMonth() + 1, 1).map(
        (m) => `${today.getFullYear() + 1}年${m}月`
      )
    ),
  value: "",
} as FormSettingSelect);

const getYoubi = (monthSetting: FormSettingSelect, d: string | number) => {
  const yearSetting = monthSetting.value.replace(/^(\d+年)?\d+月$/, "$1");
  let year: string;
  if (yearSetting) year = yearSetting.replace("年", "");
  else year = String(today.getFullYear());
  const month = monthSetting.value.replace(/^(\d+年)?(\d+)月$/, "$2");
  const date = new Date(`${year}/${month}/${d}`);
  const dayOfWeek = date.getDay();
  return ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
};
const dayCount = (monthSetting: FormSettingSelect) => {
  const month = monthSetting.value.replace(/^.*(\d)+月$/, "$1");
  if (month === "2") return 29;
  if (["4", "6", "9", "11"].indexOf(month) >= 0) return 30;
  return 31;
};
const getDays = () =>
  setNumberArray(dayCount(monthSetting.value)).map(
    (d) =>
      `${monthSetting.value.value}${d}日（${getYoubi(monthSetting.value, d)}）`
  );

const daySetting: Ref<FormSettingSelect> = ref({
  name: "date",
  label: "日",
  type: "select",
  selects: [],
  value: "",
} as FormSettingSelect);

// const startTimeSetting: Ref<FormSettingSelect> = ref({
//   name: "startTime",
//   label: "開始時間",
//   type: "select",
//   selects: setNumberArray(23, 0).map(v => [`${v}:00`, `${v}:30`]).flat(),
//   value: "21:00"
// } as FormSettingSelect)

// onMounted(() => {
//   console.log("aaa")
//   Props.formSetting.value = ""//monthSetting.value.value + daySetting.value.value //+ startTimeSetting.value.value
//   ready.value = true
// })

watch(monthSetting.value, (v) => {
  daySetting.value.value = "";
  Props.formSetting.value = "";
  if (v) daySetting.value.selects = getDays();
  watch(daySetting.value, ({ value }) => {
    Props.formSetting.value = value;
  });
});
const daychange = () => {
  daySetting.value.value = "";
  Props.formSetting.value = "";
};

const reset = () => {
  daySetting.value.value = "";
  monthSetting.value.value = "";
  Props.formSetting.value = "";
};
</script>
