<template>
  <card>
    <template #title>
      設定
    </template>
    <pages-setting-darkmode />
    <pages-setting-halloween />
    <item-button v-if="pageArray && pageArray.length >= 2" :to="pageArray[1]">
      1つ前のページへ戻る
    </item-button>
  </card>
  <card>
    <template #title>
      管理者向け設定
    </template>
    <item-forms :formSettings="forms" />
    <item-button @click="changeDate">時間を設定する</item-button>
  </card>

  <!-- <game /> -->
</template>

<script setup lang="ts">
import { getHash } from "~/src/util";
import { settedTime } from "~/src/util/date"

const { pageArray } = usePages()
const { setSnack } = useSnack()

const forms = ref([{
  name: "nowDate",
  label: "現在時刻（設定用）",
  type: "string",
  value: ""
}, {
  name: "password",
  label: "管理者パスワード",
  type: "string",
  value: ""

}] as FormSettingString[])

const changeDate = async () => {
  const hash = await getHash(forms.value[1].value).catch(e => "")
  if (hash === "2f5101a71d278dda8021bb4a33932a7a95f485683abe774f565c65f171f001f7") {
    settedTime.setValue(forms.value[0].value)
    console.log(settedTime.value)
    setSnack("時間を設定しました")
  } else {
    setSnack("パスワードが違います")
  }
}
</script>