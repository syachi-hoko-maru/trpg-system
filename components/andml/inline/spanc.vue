<template>
  <template v-for="w of words" :key="w">
    <!-- 辞書がある単語の場合 -->
    <template v-if="w.startsWith('&')">
      <!-- 辞書（mountedした場合） -->
      <v-menu open-on-hover v-if="mounted">
        <!-- 通常表示される部分 -->
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="word">
            {{ w.replace(/¥s/g, " ").replace(/^&/, "") }}
          </span>
        </template>
        <!-- クリック・ホバー時に表示される部分 -->
        <div class="word-card">
          <card>
            <div class="word-card-title my-2">
              <v-icon icon="mdi-book" size="large" />
              {{ w.replace(/¥s/g, " ").replace(/^&/, "") }}
            </div>
            <div v-html="wordList[w.replace(/^&/, '')]" />
          </card>
        </div>
      </v-menu>
      <!-- mounted前の場合のみ使用する -->
      <span v-else>
        {{ w.replace(/¥s/g, " ").replace(/^&/, "") }}
        {{ wordList[w.replace(/^&/, "")] }}
      </span>
    </template>
    <!-- 何でもない単語の場合 -->
    <span v-else>
      {{ w.replace(/¥s/g, " ") }}
    </span>
  </template>
  <!-- 文字がない場合 -->
  <template v-if="words.length === 0">
    {{ props.replace(/¥s/g, " ") }}
  </template>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { getKeys } from "~/src/util";

interface Props {
  props: string;
}
const Props = defineProps<Props>();

const { $wordList } = useNuxtApp();

const words: Ref<string[]> = ref([]);
const wordList: Ref<WordList> = ref({});

const setWords = () => {
  wordList.value = $wordList();
  let word = Props.props;
  const keys: string[] = [];
  // keyごとに探していく
  getKeys(wordList.value).forEach((key) => {
    // keyがkeysに含まれていれば飛ばす
    if (keys.findIndex((k) => k.indexOf(key.toString()) >= 0) >= 0) return;
    if (word.indexOf(key.toString()) >= 0) {
      word = word.split(key.toString()).join("$$$&" + key + "$$$");
      keys.push(key.toString());
    }
  });
  words.value = word.split("$$$");
};

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
  setWords();
});
</script>

<style lang="scss" scoped>
span.word {
  background-image: linear-gradient(
    to right,
    #888,
    #888 6px,
    transparent 6px,
    transparent 15px
  );
  background-size: 15px 1px;
  background-position: left bottom;
  background-repeat: repeat-x;
  cursor: pointer;
}

div.word-card {
  width: 300px;
  min-width: 15vw;
  max-width: 80vw;
  div.word-card-title {
    font-size: 1.25rem;
  }
}
</style>
