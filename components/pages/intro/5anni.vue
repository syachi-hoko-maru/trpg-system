<template>
  <card>
    <template #title>
      データ入力
    </template>
    <item-forms :formSettings="formSettings" />
    <item-button @click="setImage">画像を作る</item-button>
  </card>
  <card v-show="imageUrls.length">
    <template #title>
      プレビュー
    </template>
    確認の上、保存してください。PCなら右クリック、スマホなら長押しで保存ができます。
    <canvas id="canvas_1" :width="canvasWidth" :height="canvasHeight" style="display: none;" />
    <canvas id="canvas_2" :width="canvasWidth" :height="canvasHeight" style="display: none;" />
    <canvas id="canvas_3" :width="canvasWidth" :height="canvasHeight" style="display: none;" />
    <div class="px-2 py-5" v-for="imageUrl of imageUrls">
      <item-img alt="祝5周年！　SW2.5フレーム" :src="imageUrl" />
    </div>
  </card>
</template>

<script setup lang="ts">
const { openDialogo } = useDialogo()
const { $templateText } = useNuxtApp()

const formSettings = ref([
  {
    name: "icon",
    label: "icon",
    type: "file",
    value: ""
  },
  {
    name: "fit",
    label: "合わせ",
    type: "select",
    selects: ["外側に合わせる", "内側に合わせる"],
    value: "内側に合わせる"
  },
] as FormSetting[])

const canvasWidth = 600
const canvasHeight = 600

const imageUrls = ref([] as string[])

const drawImage = async (ctx: CanvasRenderingContext2D, src: string, x1: number, y1: number, x2: number, y2: number, circle?: boolean): Promise<void> => {
  ctx.save()
  if (circle) {
    ctx.arc((x1 + x2) / 2, (y1 + y2) / 2, (x2 - x1) / 2, 0, 360 * Math.PI / 180);
    ctx.clip();
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src
    img.onload = function () {
      ctx.drawImage(img, x1, y1, x2 - x1, y2 - y1);
      ctx.restore()
      resolve()
    }
    setTimeout(reject, 5 * 1000)
  })
}

const setImage = async () => {
  console.log("start")
  try {
    for (let i = 0; i < 3; i++) {
      // 準備
      const canvas = document.getElementById(`canvas_${i + 1}`) as HTMLCanvasElement | null
      if (!canvas) throw "no canvas"
      const ctx = canvas.getContext('2d');
      if (!ctx) throw "no ctx"
      ctx.textBaseline = "bottom"
      ctx.fillStyle = "#222";
      // 準備ここまで

      const iconSrc = formSettings.value.find((form) => form.name === "icon")?.value
      const fit = formSettings.value.find((form) => form.name === "fit")?.value

      if (iconSrc && typeof iconSrc === "string") {
        if (fit === "外側に合わせる") {
          await drawImage(ctx, iconSrc, 0, 0, 600, 600, true).catch(() => {
            throw "cannot get input file image"
          })
        } else {
          await drawImage(ctx, iconSrc, 50, 50, 550, 550, true).catch(() => {
            throw "cannot get input file image"
          })
        }
      }

      await drawImage(ctx, `${$templateText.basePath}/image/sw25intro/5anni_${i + 1}.svg`, 0, 0, canvasWidth, canvasHeight, true)
        .catch(() => {
          throw "cannot get svg image"
        })


      imageUrls.value[i] = canvas.toDataURL();
      console.log(`frame ${i + 1} ok, name: ${imageUrls.value[i]}`)
    }
  } catch (err) {
    openDialogo(`予期せぬエラーが発生しました。 &itwitter まで報告いただければ幸いです。 &br ERROR: ${String(err).replace(/\s/g, "¥s")}`, "error")
  }
}

onMounted(() => {
  setImage()
})
</script>