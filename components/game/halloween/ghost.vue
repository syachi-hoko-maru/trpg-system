<template>
    <template v-if="held">
        <div v-show="display" class="ghost" :style="style" @click="clickGhost">
            <v-icon size="40px">mdi-ghost</v-icon>
        </div>
        <card>
            <template #title>幽霊を見つけよう！</template>
            <template v-if="nowTheme !== 'halloween'">
                10月の間、このウェブサイトではハロウィンイベントとして、「ハロウィンデザイン」を用意しています。<br>
                また、「ハロウィンデザイン」の間、各ページに幽霊が隠れるようになっています。<br>
                <br>
                ハロウィンデザインへの切り替えは以下のボタンから行えます。<br>
                <pages-setting-halloween />
            </template>
            <template v-else>
                {{ message }}<br>
                <br />
                <game-halloween-score />
            </template>
            <br>
            ハロウィンイベントについて、詳しくは以下をご覧ください。
            <item-button url="/blog/halloween" />
        </card>
    </template>
</template>

<script setup lang="ts">
const { setSnack } = useSnack()
const { ok } = useLoad()
const { getNowPage } = usePages()
const { nowTheme } = useDesign()

const held = new Date().getMonth() + 1 === 10
const display = ref(false)
const style = ref("")

const ghostStatus = ref(held ? "until" : "noheld" as "exist" | "found" | "error" | "until" | "noheld")
const message = computed(() => {
    return ghostStatus.value === "noheld" ? "「ハロウィンデザイン」でないか切り替えた直後のため準備中です。ページを更新してください。" :
        ghostStatus.value === "until" ? "幽霊が隠れる準備中です。数秒で終わりますので、お待ちください。"
            : ghostStatus.value === "found" ? "このページの幽霊は見つけました。他のページも探してみてください！"
                : ghostStatus.value === "error" ? "エラーが発生しています。ページを更新してみてください。"
                    : ghostStatus.value === "exist" ? "このページに幽霊が出現しています。探してみてください。" : ""

})

const getArr = (): string[] => {
    let arr: string[] = []
    try {
        const row = localStorage.getItem("ghost2023")
        if (!row) throw "no storage"
        const rowArr = JSON.parse(row)
        if (Array.isArray(rowArr) && rowArr.length) {
            arr = rowArr
        }
    } catch (e) {
    }
    return arr
}
const clickGhost = () => {
    display.value = false
    const arr = getArr()
    try {
        arr.push(getNowPage())
        localStorage.setItem("ghost2023", JSON.stringify(arr))
        setSnack(`${arr.length}体目の幽霊を見つけました。`)
        ghostStatus.value = "found"
    } catch (e) {
        setSnack(`エラーが発生しました。`)
        ghostStatus.value = "error"
    }
}
const setGhost = () => {
    ghostStatus.value === "until"
    const arr = getArr()
    const nowPage = getNowPage()
    if (arr.indexOf(nowPage) >= 0) {
        console.log("already found ghost")
        ghostStatus.value = "found"
        return
    }
    try {
        const query = nowPage === "/" ? "section.card-div:not(.card-div .card-div)" : "div#center section.card-div:not(.card-div .card-div)"
        const cardList = document.querySelectorAll(query)
        const randomCard = cardList[Math.floor(Math.random() * cardList.length)]
        const rect = randomCard.getBoundingClientRect()
        const px = window.scrollX + Math.floor(rect.left + (rect.right - rect.left - 16 * 2 - 40) * Math.random())
        const py = window.scrollY + rect.top
        display.value = true
        style.value = `top: ${py - 20}px; left: ${px}px;`
        console.log("set ghost", px, py)
        ghostStatus.value = "exist"
    } catch (e) {
        console.log("error ghost", e)
        ghostStatus.value = "error"
    }
}

onMounted(() => {
    if (held && nowTheme.value === "halloween") {
        watch(ok, () => {
            setGhost()
        })
    }
})
</script>

<style lang="scss" scoped>
.ghost {
    position: absolute;
    z-index: 999;
    cursor: pointer;
}
</style>
