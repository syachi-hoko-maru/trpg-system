<template>
  <card v-show="imageUrl">
    <template #title>
      プレビュー
    </template>
    <canvas id="canvas" :width="canvasWidth" :height="canvasHeight" style="width: 100%;" />
  </card>
</template>

<script setup lang="ts">
interface Props {
  formSettings: FormSetting[]
}
const Props = defineProps<Props>();

const { setSnack } = useSnack()
const { $templateText } = useNuxtApp()

const canvasWidth = 1200
const canvasHeight = 1600

const imageUrl = ref("")

type SetTextOption = {
  right?: boolean
  top?: boolean
  defaultFontSize?: number
}
const setText = (ctx: CanvasRenderingContext2D, name: string, x1: number, y1: number, x2: number, y2: number, option?: SetTextOption) => {
  ctx.save()
  const form = Props.formSettings.find((form) => form.name === name)
  if (!form) return
  let text = ""
  if (form.type === "string" || form.type === "textarea") text += form.value
  if (form.name === "twitter" && text && !text.startsWith("@")) text = "@" + text


  if (option?.right) ctx.textAlign = "right"
  if (option?.top) ctx.textBaseline = "top"

  let lines = text.replace(/\n+$/, "").split("\n")

  const dx = Math.abs(x1 - x2)
  const dy = Math.abs(y1 - y2)

  let fontSize = option?.defaultFontSize || 40
  if (fontSize * lines.length * 1.5 > dy) {
    fontSize = dy / (lines.length * 1.5)
  }
  mainLoop: while (true) {
    if (fontSize <= 0) {
      break
    }
    ctx.font = `${fontSize}px font`;

    for (let line of lines) {
      const lineWidth = ctx.measureText(line).width
      if (lineWidth > dx) {
        fontSize -= 2.5
        continue mainLoop
      }
    }
    break
  }

  lines.forEach((line, i) => {
    ctx.fillText(line, x1, y1 + i * (dy - fontSize) / lines.length);
  })
  console.log(text, fontSize)

  ctx.restore()
}

const set3 = (ctx: CanvasRenderingContext2D) => {
  ctx.save()
  const x1 = 470.07
  const x2 = 1025.07
  const dx = Math.abs(x2 - x1)
  const y = 464.84

  const form = Props.formSettings.find((form) => form.name === "plgm")
  if (!form) return

  let value = 0
  if (!Number.isNaN(Number(form.value))) value = Number(form.value)

  const basePoint = x1 + dx / 4 * value
  ctx.beginPath();
  ctx.moveTo(basePoint, y);
  ctx.lineTo(basePoint - 15, y + 40);
  ctx.lineTo(basePoint + 15, y + 40);
  ctx.closePath();
  ctx.fill()
  ctx.restore()
  console.log(form.value)
}

const setCheck = (ctx: CanvasRenderingContext2D) => {
  const form = Props.formSettings.find((form) => form.name === "session")
  if (!form || !Array.isArray(form.value) || form.value.length === 0) return

  const drawCheck = (sx: number) => {
    const x = sx + 10
    const y = 391.45 + 20
    const size = 1.2
    ctx.save()
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 15 * size, y - 15 * size);
    ctx.lineTo(x - 9 * size, y - 21 * size);
    ctx.lineTo(x + 1 * size, y - 11 * size);
    ctx.lineTo(x + 25 * size, y - 30 * size);
    ctx.closePath();
    ctx.fill()
    ctx.restore()
  }

  form.value.forEach((v) => {
    if (v === "ボイセ") drawCheck(410.37)
    if (v === "テキセ") drawCheck(698.04)
    if (v === "半テキセ") drawCheck(990.47)
  })
}

const setImage = () => {
  try {
    // 準備
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    if (!canvas) throw "no canvas"
    const ctx = canvas.getContext('2d');
    if (!ctx) throw "no ctx"
    ctx.textBaseline = "bottom"
    ctx.fillStyle = "#222";

    // 画像の読み込み
    const img = new Image();
    img.src = `${$templateText.basePath}/sw25intro/intro.svg`
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      imageUrl.value = canvas.toDataURL();

      set3(ctx)
      setCheck(ctx)

      setText(ctx, "name", 518, 304, 1105, 200, { defaultFontSize: 55 })
      setText(ctx, "twitter", 1105, 310, 515, 360, { top: true, right: true, defaultFontSize: 30 })
      setText(ctx, "rulebooks", 150, 600, 1105, 880, { top: true })
      setText(ctx, "tools", 150, 920, 1105, 1000, { top: true })
      setText(ctx, "other", 150, 1070, 1105, 1150, { top: true })

      const qax = 420
      const qafontSize = 45
      const qay = 1225
      const qady = 80
      setText(ctx, "rp", qax, qay, 1105, qay - qady, { defaultFontSize: qafontSize })
      setText(ctx, "battle", qax, qay + qady, 1105, qay, { defaultFontSize: qafontSize })
      setText(ctx, "syuzoku", qax, qay + qady * 2, 1085, qay + qady, { defaultFontSize: qafontSize })
      setText(ctx, "ginou", qax, qay + qady * 3, 1055, qay + qady * 2, { defaultFontSize: qafontSize })
    }

    // const link = document.createElement("a");
    // link.href = canvasUrl
    // link.download = `result.png`;
    // link.click();
    // setSnack("画像をダウンロードしました")
  } catch (err) {
    console.error(err)
  }
}

watch(Props, () => {
  console.log(Props.formSettings)
  setImage()
})

onMounted(() => {
  setImage()
})
</script>