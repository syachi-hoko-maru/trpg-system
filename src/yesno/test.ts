import { yesnoQuestion } from ".";
import { syuzoku } from "../dict/syuzoku";
import { syuzokuYesNo } from "../dict/yesno/syuzokuYesNo";

const gene = yesnoQuestion(syuzoku, syuzokuYesNo);
const yesno = () =>
  (["yes", "no", "?"] as const)[Math.floor(Math.random() * 3)];
let count = 0;
while (true) {
  const answer = yesno();
  if (count) console.log(`  回答：${answer}`);
  count++;
  const r = gene.next(answer);
  if (r.done) {
    console.log(`あなたにおすすめの種族は${r.value?.foryou}です。`);
    console.log(` 他にも${r.value?.other.join("・")}などがおすすめです。`);
    break;
  } else {
    console.log(`  候補：${r.value?.arr.join("・")}`);
    console.log(r.value.question);
  }
}
