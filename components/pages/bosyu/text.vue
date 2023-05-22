<template>
  <card>
    <template #title>
      <div class="pb-0">テキスト出力</div>
    </template>
    以下をコピーするか、下にある『コピー』ボタンを押してください。
    <v-textarea label="テキスト出力結果" v-model="text" density="comfortable" readonly auto-grow class="my-5" />
    <item-button prepend-icon="mdi-arrow-down-bold-circle" @click.stop="() => $copy(text)">コピー</item-button>
  </card>
</template>

<script setup lang="ts">
interface Props {
  bosyuSettingsWithDisable: BosyuSetting
}
const Props = defineProps<Props>();

const text = ref("")

const { bosyuSettings } = useBosyu()

const getFormSetting = (itemName: string): FormSetting | null => {
  let result: FormSetting | null = null
  bosyuSettings.forEach(d => {
    const item = d.value.items.find(i => i.name === itemName)
    if (item) result = item
  })
  return result
}

const bosyuType = computed(() => {
  const type = getFormSetting("type")
  if (type?.type === "combo" && ["ボイセ", "テキセ", "半テキセ"].indexOf(type?.value) >= 0) {
    return type.value
  }
  return "オンセ"
})

const setText = () => {
  const arr: string[] = []
  arr.push(`『SW2.5 ${bosyuType.value}募集』`)
  Props.bosyuSettingsWithDisable.forEach(formSettingGroup => {
    arr.push(`\n◇ ${formSettingGroup.label}`)
    formSettingGroup.items.forEach(formSetting => {
      if (formSetting.value) {
        if (formSetting.value === true) {
          arr.push(`${formSetting.label}`)
        } else if (Array.isArray(formSetting.value) && formSetting.type==="slider" && formSetting.name === "count") {
          arr.push(`${formSetting.label}: ${formSetting.selects[formSetting.value[0]]}〜${formSetting.selects[formSetting.value[1]]}`)
        } else if (typeof formSetting.value === "string" && (formSetting.value.length > 10 || formSetting.value.indexOf("\n") >= 0)) {
          arr.push(`${formSetting.label}: \n${formSetting.value}`)
        } else {
          arr.push(`${formSetting.label}: ${formSetting.value}`)
        }
      }
    })
  })
  text.value = arr.join("\n")
}

onMounted(() => {
  setText()
  watch(Props.bosyuSettingsWithDisable, setText)
})
</script>

<style scoped lang="scss">
#frame {
  width: 90%;
  max-width: 600px;
  overflow-x: scroll;
  margin: auto;
  padding: 0;
  border: 3px #888 solid;

  #output {
    width: 600px;
    padding: 20px;
    padding-top: 1px;
    overflow-x: scroll;

    div.pre-wrap {
      white-space: pre-wrap;
    }

    &.white {
      background-color: #fff;
      color: #333
    }

    &.black {
      background-color: #333;
      color: #fff
    }


    &.navy {
      background-color: rgb(0, 0, 111);
      color: #fff
    }

    &.green {
      background-color: rgb(10, 62, 0);
      color: #fff
    }

    &.yellow {
      background-color: rgb(255, 235, 165);
      color: #333
    }

    &.sakura {
      background: linear-gradient(to right,
          rgb(255, 183, 183), 40%,
          #ffd6d6);
      color: #333
    }

    &.sunset {
      background: linear-gradient(rgb(0, 0, 104), 70%, rgb(216, 58, 58));
      color: #fff
    }

    &.lavender {
      background: linear-gradient(rgb(201, 196, 244), 50%, #fff);
      color: #9c7c3d
    }

    &.wine {
      background: linear-gradient(#633142, 50%, rgb(191, 0, 29));
      color: #fff
    }

  }
}
</style>