<template>
  <template v-for="w of words" :key="w">
    <template v-if="w.startsWith('&')">
      <v-menu open-on-hover v-if="mounted">
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="word">
            {{ w.replace(/^&/, "") }}
          </span>
        </template>
        <div class="word-card">
          <card>
            {{ wordList[w.replace(/^&/, "")] }}
          </card>
        </div>
      </v-menu>
      <span v-else>
        {{ w.replace(/^&/, "") }} {{ wordList[w.replace(/^&/, "")] }}
      </span>
    </template>
    <span v-else>
      {{ w }}
    </span>
  </template>
</template>

<script setup lang="ts">
interface Props {
  props: string
}
const Props = defineProps<Props>();

const wordList: { [key: string]: string } = {
  "人間": "人間はSW2.5でキャラクターとして使える種族の1つ。我々とほぼ同じ「人間」。運命に強く愛されており、1日に1回、ダイスの出目を反転させられる。",
  "エルフ": "エルフはSW2.5でキャラクターとして使える種族の1つ。高身長で尖った耳を持ち、水に強い。知力が高いため魔法が得意。",
  "ドワーフ": "ドワーフはSW2.5でキャラクターとして使える種族の1つ。低身長で男性は髭もじゃ、女性は幼い体型。炎に強い。",
  "ルーンフォーク": "ルーンフォークはSW2.5でキャラクターとして使える種族の1つ。魔動機文明時代の技術で作られた人造生命体。",
  "タビット": "タビットはSW2.5でキャラクターとして使える種族の1つ。二足歩行をするウサギの姿をしている。魔法が得意で、逆に筋力が低いため武器を扱うのは不得手。",
  "ナイトメア": "ナイトメアはSW2.5でキャラクターとして使える種族の1つ。人間などからたまに生まれる。〈穢れ〉を持って生まれてきており、忌子とされる。ツノがある。",
  "リカント": "リカントはSW2.5でキャラクターとして使える種族の1つ。いわゆる獣人で、種族特徴である［獣貌］を使うと頭を獣と同じようにできる。",
  "リルドラケン": "リルドラケンはSW2.5でキャラクターとして使える種族の1つ。いわゆる竜人で、二足歩行をする竜の姿をしている。筋力が高いため、大きな武器を使った攻撃ができるほか、尻尾を武器として使うこともできる。",
  "グラスランナー": "グラスランナーはSW2.5でキャラクターとして使える種族の1つ。子供くらいの身長しかなく、MPを持たないが、精神力が高く、魔法への耐性が高い。",
  "メリア": "メリアはSW2.5でキャラクターとして使える種族の1つ。植物から進化したとされ、頭など目立つ場所に花が咲いている。寿命が10年程度の短命種と300年程度の長命種が存在する。",
  "ティエンス": "ティエンスはSW2.5でキャラクターとして使える種族の1つ。魔法文明時代に魔物と合成して作られたとされる。近くのキャラクターと意思疎通ができる。",
  "レプラカーン": "レプラカーンはSW2.5でキャラクターとして使える種族の1つ。身長130m程度で透明化能力を持つ。",
  "シャドウ": "シャドウはSW2.5でキャラクターとして使える種族の1つ。傭兵をやることが多い種族で高身長スレンダー。",
  "ソレイユ": "ソレイユはSW2.5でキャラクターとして使える種族の1つ。太陽に愛されし種族で、高身長脳筋。ソレイユ語はボディランゲージ。",
  "アルヴ": "アルヴはSW2.5でキャラクターとして使える種族の1つ。吸血鬼が転生した姿らしく、ナイトメア同様に穢れを持つ。ひ弱で他の人族に依存しないと生きれない。",
  "ウィークリング": "ウィークリングはSW2.5でキャラクターとして使える種族の1つ。弱く生まれ、蛮族社会を追われて人族と共に生きることを選んだ蛮族。4種類（バジリスク・ガルーダ・タンノズ・ミノタウロス）が存在する。",
}
let word = Props.props
Object.keys(wordList).forEach((key) => {
  if (word.indexOf(key) >= 0) {
    word = word.split(key).join("$$$&" + key + "$$$")
  }
})

const words = word.split("$$$")

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
</script>

<style lang="scss" scoped>
span.word {
  border-bottom: 2px dashed #888;
  cursor: pointer;
}

div.word-card {
  width: 300px;
  min-width: 15vw;
  max-width: 80vw;
}
</style>