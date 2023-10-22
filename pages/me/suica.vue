<template>
    <Card>
        <template #title>
            スイカゲームみたいなの！
        </template>
        <canvas v-show="mounted" id="suica" :width="game.width" :height="game.height" />
        <div v-if="errored">エラーが発生しました</div>
    </Card>
</template>

<script setup lang="ts">
import { SuicaGame } from '~/src/game/suica/Game'

declare global {
    interface Window {
        show: () => any;
    }
}

const mounted = ref(false)
const errored = ref(false)
const game: SuicaGame = new SuicaGame()

onMounted(() => {
    const canvas: HTMLCanvasElement | null = document.getElementById("suica") as HTMLCanvasElement | null
    const ctx: CanvasRenderingContext2D | null | undefined = canvas?.getContext("2d")
    if (!canvas || !ctx) {
        errored.value = true
        return
    }
    game.setCanvas(canvas, ctx)
    // ボタンの設定
    // rightButton?.addEventListener("touchstart", () => keyHandler("Right", "down"))
    // rightButton?.addEventListener("mousedown", () => keyHandler("Right", "down"))
    // rightButton?.addEventListener("mouseup", () => keyHandler("Right", "up"))
    // rightButton?.addEventListener("touchend", () => keyHandler("Right", "up"))
    // rightButton?.addEventListener("touchcancel", () => keyHandler("Right", "up"))
    // const leftButton = document.getElementById("leftButton")
    // leftButton?.addEventListener("touchstart", () => keyHandler("Left", "down"))
    // leftButton?.addEventListener("mousedown", () => keyHandler("Left", "down"))
    // leftButton?.addEventListener("mouseup", () => keyHandler("Left", "up"))
    // leftButton?.addEventListener("touchend", () => keyHandler("Left", "up"))
    // leftButton?.addEventListener("touchcancel", () => keyHandler("Left", "up"))

    game.start()
    mounted.value = true

    window.show = () => { game.show() }

})
</script>

<style lang="scss">
canvas#suica {
    display: block;
    margin: 0 auto;
    width: 100%;
}
</style>