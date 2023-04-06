import { ginouWordList } from "./ginou";
import { syuzokuWordList } from "./syuzoku";

export const wordList: () => WordList = () =>
  Object.assign(syuzokuWordList(), ginouWordList(), {
    流派: "ソード・ワールド2.5における流派は、より多彩な戦闘スタイルを実現するための戦闘特技や魔法のようなもの。サプリメントによって追加された。",
    キャンペーン:
      "TRPGでは同じメンバー、同じキャラクターで続けて遊ぶことをキャンペーンという。",
  });
