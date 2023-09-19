<template>
    <item-block :color="color">
        <template #title>{{ title }}</template>
        <div :id="id">
            <slot />
        </div>
        <item-button v-if="id" @click="copy">{{ title }}をコピーする</item-button>
    </item-block>
</template>
  
<script setup lang="ts">
const { setSnack } = useSnack()
const { $copy } = useNuxtApp()

interface Props {
    color: string,
    title: string
}
const Props = defineProps<Props>();

const id = ref("")
const copy = () => {
    const text: string[] = []
    const el = document.getElementById(id.value)
    el?.querySelectorAll("p,ul,h3,h4").forEach((e) => {
        if (e.tagName === "UL") {
            let t = ""
            const li = e.querySelector("li")
            if (!li) {
                text.push("")
                return
            }
            const mlStr = getComputedStyle(li).marginLeft
            // liのmargin-leftを弄る場合にはここも変更する！！
            const mlNum = Number(mlStr.replace(/^(\d+)px$/, "$1")) / 16 - 1
            for (let i = 0; i < mlNum; i++) {
                t += "　"
            }
            t += "・" + e.textContent
            text.push(t)
        } else {
            if (e.tagName === "H3") text.push("", "")
            if (e.tagName === "H4") text.push("", "", "")
            if (e.textContent) {
                text.push(e.textContent)
                if (e.tagName === "H3" || e.tagName === "H4") text.push("")
            }
            else text.push("")
        }
    })
    if (!text || !text.length) setSnack("エラーが発生しました")
    else $copy(text.join("\n"))
}
onMounted(() => {
    id.value = String(Math.floor(Math.random() * (10 ** 5)))
})
</script>
  
<style lang="scss" scoped>
.italic {
    font-style: italic;
}
</style>