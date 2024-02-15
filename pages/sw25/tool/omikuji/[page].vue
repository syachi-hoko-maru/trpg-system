<template>
    <Card>
        <template #title>
            あなたの運勢
        </template>
        <Andml :andmls="andml1" />
        <ItemShare :text="shareText" :url="shareUrl" hashTag="ソドワおみくじ">結果をツイート！</ItemShare>
        <ItemButton url="/sw25/tool/omikuji" normal-button>戻る</ItemButton>
        <PagesOmikujiButton>もう一度おみくじを引く</PagesOmikujiButton>
    </Card>
    <Card>
        <template #title>
            おすすめのページ
        </template>
        <Andml :andmls="andml2" />
    </Card>
</template>

<script setup lang="ts">
import { FortuneResult, defaultVersion, omikujiBasePath, sep } from "~/src/simulater/omikuji/"
import { fortuneTypeListV1, getFortuneV1 } from "~/src/simulater/omikuji/v1";
import { isPast } from "~/src/util/date";
const { $templateText } = useNuxtApp()

const route = useRoute()
const andml1 = ref(["システムエラーが発生しました。 &br &br もう一度実行してください。"])
const shareText = ref("")
const shareUrl = ref("")

const main = async () => {
    let { id, version } = route.query

    let idNum: number = Number(id)
    if (!idNum || Number.isNaN(idNum) || !version) {
        return;
        idNum = 0
        version = defaultVersion
    }

    let fortuneResult: FortuneResult;
    try {
        switch (version) {
            case "v1":
            default:
                fortuneResult = getFortuneV1(idNum)
        }
    } catch {
        return
    }
    // console.log("change", fortuneResult.fortuneScore, id)
    andml1.value = [
        `&2 今年のSW2.5運は「 &em_${fortuneResult.fortuneScore} 」！`,
        ...
        fortuneResult
            .messageList
            .map(m => m
                .split(sep)
                .map((t, i) => {
                    switch (i) {
                        case 0:
                            return `&3 ${t}`
                        case 1:
                            return `${t}`
                        default:
                            return ""
                    }
                })
            )
            .flat(1)
    ]

    shareText.value = `〈しゃちほこの尾びれ亭〉のソドワおみくじ！
今年のSW2.5運は「${fortuneResult.fortuneScore}」！

　${fortuneResult
            .messageList[Math.floor(Math.random() * fortuneTypeListV1.length)]
            .slice(0, 20)}

詳しくはこちら！`
    shareUrl.value = encodeURIComponent(`https://trpg.syachi.work${route.fullPath}`)
}

main()

watch(route, main)

let count = 0
const mainLoop = async () => {
    await main()
    if (
        count < 10 &&
        andml1.value.length < 20
    ) {
        // if (route.query.id
        //     && Number(route.query.id)
        //     && !Number.isNaN(Number(route.query.id))
        // ) {
        setTimeout(main, 250 * count)
        count++
        // } 
    } else {
        console.log("omikuji done", route.query.id, count, andml1.value.length)
    }
}

onMounted(async () => {
    mainLoop()
})
window.addEventListener('DOMContentLoaded', mainLoop)



const andml2 = `
&3 コミュニティを広げるか！　って方向け
&button_/sw25/tool/intro
&button_/sw25/tool/community

&3 キャラクターを作るか！　って方向け
&button_/sw25/forbeginner/ytsheet

&3 シナリオを書いてみるかー！　って方向け
&button_/sw25/forbeginner/scenario
&button_/sw25/feature/harula
${!isPast("2024/1/31") ? `
&button_/blog/doden3
`: ""}

&3 この種族・技能はなに？？　って方向け
&button_/sw25/forbeginner/syuzoku
&button_/sw25/forbeginner/ginou
`
</script>