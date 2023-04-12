<template>
  <card>
    <template #title>
      データ入力
    </template>
    <item-forms :formSettings="formSettings" />
    <item-button @click="setImage">画像を作る</item-button>
  </card>
  <pages-intro-preview :formSettings="settedFormSetting" />
</template>

<script setup lang="ts">

const { setSnack } = useSnack()

const formSettings = ref([
  {
    name: "icon",
    label: "icon",
    type: "file",
    value: ""
  },
  {
    name: "name",
    label: "name",
    type: "string",
    value: ""
  },
  {
    name: "twitter",
    label: "Twitter ID",
    type: "string",
    value: ""
  },
  {
    name: "session",
    label: "セッション形式",
    type: "check",
    value: [],
    selects: ["ボイセ", "テキセ", "半テキセ"],
  },
  {
    name: "plgm",
    label: "PL・GMの割合",
    type: "slider",
    value: 0,
    selects: ["PL寄り", "GM寄り"],
    tickCount: 4
  },
  {
    name: "rulebooks",
    label: "rulebooks & suppliment",
    type: "textarea",
    value: "",
    rows: 3,
  },
  {
    name: "tools",
    label: "tools",
    type: "textarea",
    value: "",
    rows: 1,
  },
  {
    name: "other",
    label: "other TRPG",
    type: "textarea",
    value: "",
    rows: 1,
  },
  {
    name: "rp",
    label: "RP好き？",
    type: "string",
    value: ""
  },
  {
    name: "battle",
    label: "戦闘好き？",
    type: "string",
    value: ""
  },
  {
    name: "syuzoku",
    label: "好きな種族は？",
    type: "string",
    value: ""
  },
  {
    name: "ginou",
    label: "好きな技能は？",
    type: "string",
    value: ""
  },
] as FormSetting[])

const settedFormSetting = ref([] as FormSetting[])

const setImage = () => {
  console.log("setImage")
  settedFormSetting.value = JSON.parse(JSON.stringify(formSettings.value))
}

let intervalId: NodeJS.Timer
const saveSec = 5
let mounted = false
const saveSetting = () => {
  try {
    if (!mounted) {
      return
    }
    const result: { [key: string]: unknown } = {}
    formSettings.value.forEach(item => {
      if (item.type === "file") return
      result[item.name] = item.value
    })
    const str = JSON.stringify(result);
    localStorage.setItem("intro", str)
    setSnack("データを一時保存しました")
  } catch {
    setSnack("データの一時保存に失敗しました")
  }
}
onMounted(() => {
  const valueText = localStorage.getItem("intro")
  if (valueText) {
    const valueObj = JSON.parse(valueText) as { [key: string]: string | number | boolean | [number, number] | null }
    Object.entries(valueObj).forEach(([key, value]) => {
      const group = formSettings.value.find(i => i.name === key)
      if (group) group.value = value
    })
  }
  intervalId = setInterval(saveSetting, saveSec * 1000)
  mounted = true
})
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>