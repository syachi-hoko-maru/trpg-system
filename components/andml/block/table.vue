<template>
    <div class="mt-8 mb-6">
        <h4 v-if="props" class="title mb-1">
            {{ props }}
        </h4>
        <v-table v-if="!errorFlag">
            <template v-for="block of tableBlocks">
                <thead v-if="block.type === 'head'">
                    <tr v-for="line in block.lines" :key="line.items[0]">
                        <th v-for="item in line.items" :key="item"><andml-line :andmls="[item]" /></th>
                    </tr>
                </thead>
                <tbody v-if="block.type === 'normal'">
                    <tr v-for="line in block.lines" :key="line.items[0]">
                        <td v-for="item in line.items" :key="item"><andml-line :andmls="[item]" /></td>
                    </tr>
                </tbody>
            </template>
        </v-table>
        <div v-else>
            テーブルエラーが発生しました
        </div>
    </div>
</template>
  
<script setup lang="ts">
interface Props {
    props: string,
    lines: string[],
}
const Props = defineProps<Props>();

type BlockType = "head" | "normal"
type Line = { items: string[] }
type TableBlock = { lines: Line[], type: BlockType }

const tableBlocks: TableBlock[] = []

const errorFlag = ref(false)

let currentType: BlockType | null = null
let currentLines: Line[] = []

for (let line of Props.lines) {
    let type: BlockType = "normal"
    const items = line.split("|")
    if (items[0] === "") {
        // 1つ目を削除
        items.shift()

    } else {
        // | から始まっていなければエラー
        errorFlag.value = true
        break
    }
    const end = items.at(-1)
    if (end === "") {
        // | で終わっていれば最後の空白を削除
        items.pop()
    } else if (end === "h") {
        // hで終わっていればタイトル行にする
        type = "head"
        items.pop()
    }
    if (currentType === type) {
        currentLines.push({ items })
    } else {
        const lines = [{ items }]
        currentLines = lines
        currentType = type
        tableBlocks.push({
            lines,
            type
        })
    }
}
</script>
  
<style lang="scss" scoped>
.title {
    font-weight: bold;
    font-size: 1.05rem;
    text-align: center;
}
</style>