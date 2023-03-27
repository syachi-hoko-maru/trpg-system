import { ginouWordList } from "./ginou";
import { syuzokuWordList } from "./syuzoku";

export const wordList: () => WordList = () =>
  Object.assign(syuzokuWordList(), ginouWordList());
