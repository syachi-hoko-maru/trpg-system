<template>
    <div data-nosnippet>
        <card>
            <template #title>
                RPG（仮）
            </template>
            <div v-if="!canvasError">
                <canvas id="game" :width="width" :height="height" />
                <div class="d-flex">
                    <item-button id="leftButton"> ← </item-button>
                    <v-spacer />
                    <item-button id="rightButton"> → </item-button>
                </div>
                <div v-if="mounted">
                    <item-button @click="() => showRule = !showRule">{{ showRule ? "遊び方を閉じる" : "遊び方を読む" }}</item-button>
                    <andml :andmls="rule" v-if="showRule" />

                    <item-button v-for="button of game?.button()" @click="button.click">{{ button.string }}</item-button>
                </div>
            </div>
            <div v-else>
                エラーが発生しました。
            </div>
        </card>
    </div>
</template>
  
<script setup lang="ts">
import { Game } from "~/src/game/rpg"
import { width, height } from "~/src/game/rpg/setting"

const canvas: Ref<HTMLCanvasElement | null> = ref(null)
const canvasError = ref(false)
const game = ref(null as Game | null)
const mounted = ref(false)
const showRule = ref(false)

const rule = `
  &2 遊び方
  `

let rightPressed = false
let leftPressed = false


// const gaming = computed(() => game.value?.gaming)

onMounted(() => {
    try {
        canvas.value = document.getElementById("game") as HTMLCanvasElement
        // const rightButton = document.getElementById("rightButton")
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
        mounted.value = true
        const ctx = canvas.value?.getContext("2d")
        if (!ctx) {
            canvasError.value = true
            return
        }
        game.value = new Game(ctx)
        document.addEventListener("keydown", (e) => game.value?.handler(e.key, "down"), false);
        document.addEventListener("keyup", (e) => game.value?.handler(e.key, "up"), false);
        try {
        } catch { }
    } catch (error) {
        console.error(error)
        canvasError.value = true
    }
})
</script>
  
<style lang="scss">
canvas#game {
    background: #333;
    display: block;
    margin: 0 auto;
    width: 100%;
    aspect-ratio: 15 / 11;
}
</style>