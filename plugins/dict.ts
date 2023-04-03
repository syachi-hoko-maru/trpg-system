import { wordList } from "~~/src/dict";
import { ginou } from "~~/src/dict/ginou";
import { syuzoku } from "~~/src/dict/syuzoku";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      wordList,
      syuzoku,
      ginou,
    },
  };
});
