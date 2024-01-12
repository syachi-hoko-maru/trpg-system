export const syuzokuYesNo = {
  剣の加護: {
    question:
      "ソード・ワールドといえば剣。「剣の加護」を持つ種族は好きですか？",
  },
  大きめ: {
    question: "背の高い種族は好きですか？",
  },
  小さめ: {
    question: "背の低い種族は好きですか？",
  },
  動植物: {
    question: "動植物をモチーフにした種族は好きですか？",
  },
  動物: {
    question: "いわゆる獣人は好きですか？",
    parent: ["動植物"],
  },
  植物: {
    question: "植物モチーフの種族は好きですか？",
    parent: ["動植物"],
  },
  龍: {
    question: "ドラゴンは好きですか？",
    parent: ["動物"],
  },
  穢れ: {
    question: "魂に穢れを持った種族は好きですか？",
  },
  蛮族: {
    question: "蛮族は好きですか？",
    parent: ["穢れ"],
  },
  魔神関連: {
    question: "魔神に関連した種族は好きですか？",
  },
  岩: {
    question: "鉱石モチーフの種族は好きですか？",
  },
  妖精が見えない: {
    question: "妖精を見たいですか？",
    reverse: true,
  },
  神が見えない: {
    question: "神の声が聞こえる種族は好きですか？",
    reverse: true,
  },
  人造: {
    question: "技術によって作られた種族は好きですか？",
  },
  青白い肌: {
    question: "青白い肌の種族は好きですか？",
  },
  ファンタジー常連: {
    question: "ファンタジー常連の種族が好きですか？",
  },
} as const satisfies YesnoDefine;
