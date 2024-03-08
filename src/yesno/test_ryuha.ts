import { yesnoQuestion } from ".";
import { ryuhaList } from "../dict/ryuha";
import type { RyuhaNames } from "../dict/ryuha";
import { ryuhaYesNo } from "../dict/yesno/ryuhaYesNo";

const ryuhaObj: {
  [key in RyuhaNames]?: {
    yesnoTags: readonly (keyof typeof ryuhaYesNo)[];
  };
} = Object.fromEntries(
  ryuhaList.map((r: (typeof ryuhaList)[number]) => {
    return [r.name, { yesnoTags: [...r.tags, ...r.gino] }];
  })
);
console.log(ryuhaObj);
const gene = yesnoQuestion(ryuhaObj, ryuhaYesNo, false, 2);
const yesno = () =>
  (["yes", "no", "?"] as const)[Math.floor(Math.random() * 3)];
let count = 0;
while (true) {
  const answer = yesno();
  if (count) console.log(`  回答：${answer}`);
  count++;
  const r = gene.next(answer);
  if (r.done) {
    console.log(`あなたにおすすめの流派は${r.value?.foryou}です。`);
    console.log(` 他にも${r.value?.other.join("・")}などがおすすめです。`);
    break;
  } else {
    console.log(`  候補：${r.value?.arr.join("・")}`);
    console.log(r.value.question);
  }
}
