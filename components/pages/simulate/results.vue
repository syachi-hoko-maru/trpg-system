<template>
  <card>
    <template #title>シミュレート結果</template>
    <template v-if="!Props.results.length">
      結果はまだありません。<br>
      設定を入力し、「シミュレート」ボタンを押してください。
    </template>
    <template v-else>
      ページを更新したり、タブを閉じたりすると結果は消えてしまいます。<br>
      消したくない場合は「設定済みURLをコピー」を使って設定を保存するか、「画像としてダウンロード」を使って画像として保存してください。
    </template>
    <template #pafter>
      <card v-for="result of Props.results" :key="result.label">
        <template #before>
          <div :id="`output_${Props.results.indexOf(result)}`">
            <v-card-title>{{ result.label }}の結果</v-card-title>
            <v-card-text class="pb-2">
              <div>
                実行時間: {{ formatToTimeZone(result.date, "H:mm:ss", { timeZone: "Asia/Tokyo" }) }}
              </div>
              <div>
                {{ resultStr(result) }}
              </div>
              <div v-for="[tab, args] of resultArgs(result)" :key="tab">
                <item-head2>
                  {{ tabSetting[tab].tabName }}の設定
                </item-head2>
                <div v-for="arg of args.filter(arg => arg.value)" :key="arg.name">
                  <andml :andmls="[andmls(arg)]" />
                </div>
              </div>
            </v-card-text>
            <item-sign />
          </div>
        </template>
        <v-divider class="mx-4 mb-4 pt-0" />
        <item-share text="SW2.5の判定をシミュレートしました" :url="shareUrl(result)">
          シミュレートをツイート
        </item-share>
        <item-button prepend-icon="mdi-content-copy" @click.stop="copy(result)">
          設定済みURLをコピー
        </item-button>
        <item-button prepend-icon="mdi-arrow-down-bold-circle" @click.stop="captureImage(Props.results.indexOf(result))">
          画像としてダウンロード
        </item-button>
      </card>
    </template>
  </card>
</template>

<script setup lang="ts">
import { formatToTimeZone } from "date-fns-timezone";
import html2canvas from "html2canvas";

const { tabSetting } = useSimulater()
const { openDialogo } = useDialogo()
const { setSnack } = useSnack()

const { $copy, $templateText } = useNuxtApp()

interface Props {
  results: simulateResult[]
}
const Props = defineProps<Props>();

const { getNowPath } = usePages()


const resultStr = (result: simulateResult) => `${result.label.indexOf("ダメージ") < 0 ? "成功率" : "ダメージ期待値"}: ${result.value}`
const resultArgs = (result: simulateResult) => Object.entries(result.argSetting).filter(([, args]) => args.filter(arg => arg.value).length) as [Tab, readonly FormSetting<string, string>[]][]
const andmls = (arg: FormSetting) => arg.type === 'number' || arg.type === 'select'
  ? `-${arg.label}: ${arg.value}`
  : arg.type === 'boolean'
    ? `-${arg.label}`
    : "";

const shareUrl = (result: simulateResult) => {
  const query: { [key: string]: string } = {}
  query.mode = result.mode
  resultArgs(result).forEach(([tab, args]) => {
    args.filter(arg => arg.value).forEach(arg => {
      query[`${tab}_${arg.name}`] = encodeURIComponent(String(arg.value))
    })
  })
  const queryStr = Object.entries(query).map(([key, value]) => `${key}=${value}`)
  console.log(getNowPath())
  return `${$templateText.baseUrl}${getNowPath()}?${queryStr.join("&")}`
}
const copy = (result: simulateResult) => {
  const url = shareUrl(result)
  $copy(url)
}

const captureImage = (index: number) => {
  const element = document.getElementById(`output_${index}`);
  if (!element) {
    openDialogo("要素の取得に失敗しました。", "error");
    return
  }
  element.classList.add("output")
  html2canvas(element, { windowWidth: 2000, width: 600, scale: 5 }).then(
    (canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = `result.png`;
      link.click();
      setSnack("画像をダウンロードしました")
      element.classList.remove("output")
    }
  );
}

</script>

<style scoped lang="scss">
.output {
  width: 80%;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  padding-top: 1px;
}
</style>