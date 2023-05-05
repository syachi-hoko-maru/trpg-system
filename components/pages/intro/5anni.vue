<template>
  <card>
    <template #title>
      データ入力
    </template>
    <item-forms :formSettings="formSettings" />
    <item-button @click="setImage">画像を作る</item-button>
  </card>
  <card v-show="imageUrl">
    <template #title>
      プレビュー
    </template>
    確認の上、保存してください。PCなら右クリック、スマホなら長押しで保存ができます。
    <canvas id="canvas" :width="canvasWidth" :height="canvasHeight" style="display: none;" />
    <item-img v-if="imageUrl" alt="ソード・ワールド2.5自己紹介シート" :src="imageUrl" />
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
] as FormSetting[])

const canvasWidth = 600
const canvasHeight = 600

const imageUrl = ref("")

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
    // 準備
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    if (!canvas) throw "no canvas"
    const ctx = canvas.getContext('2d');
    if (!ctx) throw "no ctx"
    ctx.textBaseline = "bottom"
    ctx.fillStyle = "#222";
    // 準備ここまで

    const iconSrc = formSettings.value.find((form) => form.name === "icon")?.value
    if (iconSrc && typeof iconSrc === "string") {
      await drawImage(ctx, iconSrc, 50, 50, 550, 550, true).catch(() => {
        throw "cannot get input file image"
      })
    }

    await drawImage(ctx, `${$templateText.basePath}/image/sw25intro/5anni.svg`, 0, 0, canvasWidth, canvasHeight, true)
      .catch(() => {
        throw "cannot get svg simage"
      })


    imageUrl.value = canvas.toDataURL();
    console.log(imageUrl.value)
    console.log("ok")
  } catch (err) {
    openDialogo(`予期せぬエラーが発生しました。 &itwitter まで報告いただければ幸いです。 &br ERROR: ${String(err).replace(/\s/g, "¥s")}`, "error")
  }
}

onMounted(() => {
  setImage()
})
</script>