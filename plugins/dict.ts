import { wordList } from "~~/src/dict";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      wordList,
    },
  };
});
