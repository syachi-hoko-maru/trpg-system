<template>
  <template v-for="w of words" :key="w">
    <template v-if="w.startsWith('&')">
      <v-menu open-on-hover v-if="mounted">
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="word">
            {{ w.replace(/¥s/g, " ").replace(/^&/, "") }}
          </span>
        </template>
        <div class="word-card">
          <card>
            <div v-html="wordList[w.replace(/^&/, '')]" />
          </card>
        </div>
      </v-menu>
      <span v-else>
        {{ w.replace(/¥s/g, " ").replace(/^&/, "") }}
        {{ wordList[w.replace(/^&/, "")] }}
      </span>
    </template>
    <span v-else>
      {{ w.replace(/¥s/g, " ") }}
    </span>
  </template>
  <template v-if="words.length === 0">
    {{ props.replace(/¥s/g, " ") }}
  </template>
</template>

<script setup lang="ts">
import type { Ref } from "vue";

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
  Object.keys(wordList.value).forEach((key) => {
    if (word.indexOf(key) >= 0) {
      word = word.split(key).join("$$$&" + key + "$$$");
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
}
</style>
