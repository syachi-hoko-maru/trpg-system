import { wordList } from "~~/src/dict";
import { syuzoku } from "~~/src/dict/syuzoku";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      wordList,
      syuzoku,
    },
  };
});
