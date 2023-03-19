<template>
  <card-array-by-andml :andml="andmls1" />
  <card>
    <template #title>データ入力</template>
    <template #pbefore>
      <card v-for="data of bosyuSettingsWithDisable" :key="data.label">
        <template #title> {{ data.label }} </template>
        <item-forms :formSettings="data.items" />
      </card>
    </template>
    <div class="mt-10 mb-5">
      <andml :andmls="andmls2" />
      <item-button @click="saveSetting">
        一時保存する
      </item-button>
    </div>
  </card>
  <card>
    <item-form-select v-if="colorFormSetting.value" :form-setting="colorFormSetting" />
    <item-button @click="showResult">
      画像を表示する
    </item-button>
  </card>
  <pages-bosyu-result v-if="result.length" :bosyuSettingsWithDisable="result" :color="color" />
</template>

<script setup lang="ts">
import * as lodash from "lodash";
import { Ref } from "vue";
const { cloneDeep } = lodash;

const { bosyuSettings } = useBosyu()
const { setSnack } = useSnack()

const { $setDisable } = useNuxtApp()

const saveSec = 10
const andmls1 = `
&1 使い方
以下から情報を選択して、募集を作り、下記の『画像を表示する』から入力結果を確認の上、ダウンロードしてご利用ください。
選択式になっているものの多くは、 &br_自分で文字を書き換えることが可能 です。 
&br
なお、 &em_「募集しても人が集まらない……」 という方は以下のページもご覧ください。
&button_/sw25/tool/community
`
const andmls2 = `
入力内容は${saveSec}秒に1回程度、自動保存されます。
手動で保存したい場合には以下のボタンを押してください。
 &br 
保存はブラウザに対してなされます。 &link_https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage,（参考）
データがサーバーなど、あなたのPCやスマホ、タブレットなどの外部へ送られることはありません。 
 &br 
なお、 &em_このデータは消えてしまうことがあります 。
あらかじめご了承ください。
`

const bosyuSettingsWithDisable = computed(() => bosyuSettings.map(bosyuSetting => {
  bosyuSetting.value.items = $setDisable(bosyuSetting.value.items)
  return bosyuSetting.value
}))

const colorData = {
  "white": "ホワイト",
  "black": "ブラック",
  "navy": "ネイビー",
  "green": "グリーン",
  "yellow": "レモンイエロー",
  "sakura": "桜",
  "sunset": "夕焼け",
  "lavender": "ラベンダー",
  "wine": "ワインレッド",
} as const
const color = ref("white")
const colorFormSetting: Ref<FormSettingSelect> = ref({
  name: "color" as const,
  label: "色の選択" as const,
  type: "select" as const,
  value: "",
  selects: []
})

const result = ref([] as BosyuSetting);
const showResult = () => {
  result.value = cloneDeep(bosyuSettingsWithDisable.value)

  const index = Object.values(colorData).indexOf(colorFormSetting.value.value as any)
  if (index < 0) return
  else color.value = Object.keys(colorData)[index]
}
let mounted = false
const saveSetting = () => {
  try {
    if (!mounted) {
      return
    }
    const result: { [key: string]: string | number | boolean | [number, number] | null } = {}
    bosyuSettingsWithDisable.value.forEach(obj => {
      obj.items.map(item => {
        result[obj.name + "_" + item.name] = item.value
      })
    })
    const str = JSON.stringify(result);
    localStorage.setItem("bosyu", str)
    setSnack("データを一時保存しました")
  } catch {
    setSnack("データの一時保存に失敗しました")
  }
}

let intervalId: NodeJS.Timer
onMounted(() => {
  colorFormSetting.value = {
    name: "color" as const,
    label: "色の選択" as const,
    type: "select" as const,
    value: "ホワイト",
    selects: Object.values(colorData)
  }
  const valueText = localStorage.getItem("bosyu")
  if (valueText) {
    const valueObj = JSON.parse(valueText) as { [key: string]: string | number | boolean | [number, number] | null }
    Object.entries(valueObj).forEach(([key, value]) => {
      const gname = key.split("_")[0]
      const group = bosyuSettingsWithDisable.value.filter(g => g.name === gname)
      if (group.length) {
        const fname = key.split("_")[1]
        const form = group[0].items.find(form => form.name === fname)
        if (form) {
          form.value = value
        }
      }
    })
  }
  mounted = true

  intervalId = setInterval(saveSetting, saveSec * 1000)
})
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

