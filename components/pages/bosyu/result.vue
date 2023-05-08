<template>
  <card :loading="loading">
    <template #title>
      <div class="pb-0">プレビュー</div>
    </template>
    <template #pbefore v-if="mounted">
      <div id="frame">
        <div id="output" :class="color" v-if="bosyuSettingsWithDisable.length">
          <item-head2>SW2.5{{ bosyuType }}募集</item-head2>
          <div v-for="data of bosyuSettingsWithDisable" :key="data.label">
            <div class="mt-2">◇ {{ data.label }}</div>
            <pages-bosyu-resultofaform :items="data.items" />
          </div>
          <item-sign />
        </div>
      </div>
    </template>
    <item-button prepend-icon="mdi-arrow-down-bold-circle" @click.stop="captureImage">ダウンロード</item-button>
  </card>
</template>

<script setup lang="ts">
import domtoimage from "dom-to-image";

interface Props {
  bosyuSettingsWithDisable: BosyuSetting
  color: string
}
const Props = defineProps<Props>();

const { bosyuSettings } = useBosyu()

const { openDialogo } = useDialogo()
const { setSnack } = useSnack()

const loading = ref(false)
const mounted = ref(false)

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


// const hissuForms = ["type", "hanni", "oubo", "regyu", "hissu"]
const captureImage = () => {
  // for (let h of hissuForms) {
  //   const formSetting = getFormSetting(h)
  //   if (!formSetting || !formSetting.value) {
  //     openDialogo(`入力内容が足りません。 &br ${formSetting?.label} は入力必須です。`, "error");
  //     return
  //   }
  // }
  // loading.value = true
  const element = document.getElementById("output");
  if (!element) {
    openDialogo("要素の取得に失敗しました。", "error");
    return
  }
  const scale = 4
  domtoimage.toPng(element, {
    width: element.clientWidth * scale,
    height: element.clientHeight * scale,
    style: {
      transform: 'scale(' + scale + ')',
      transformOrigin: 'top left',
      width: element.clientWidth + "px",
      height: element.clientHeight + "px",
    },
  }).then(
    (canvas) => {
      const link = document.createElement("a");
      link.href = canvas
      link.download = `session.png`;
      link.click();
      setSnack("画像をダウンロードしました")
      // loading.value = false
    }
  );
}

onMounted(() => {
  mounted.value = true
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