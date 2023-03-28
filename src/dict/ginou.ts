export const ginou: {
  [key: string]: {
    explain: string;
    debut: string;
    type: ("前衛" | "戦士系" | "魔法使い系" | "探索系" | "スキル系")[];
    magic?: string;
    skill?: string;
  };
} = {
  ファイター: {
    explain:
      "武器を持ち、鎧を着て戦うオーソドックスな戦士。タンク（壁役）を担うこともある。",
    debut: "ルールブックI",
    type: ["前衛", "戦士系"],
  },
  グラップラー: {
    explain: "パンチやキック、投げなどの技を使い、手数を武器に戦う拳闘士。",
    debut: "ルールブックI",
    type: ["前衛", "戦士系"],
  },
  フェンサー: {
    explain: "軽い武器と防具を使い、急所を狙って戦う軽戦士。",
    debut: "ルールブックI",
    type: ["前衛", "戦士系"],
  },
  シューター: {
    explain:
      "弓や弩を使って戦う射手。マギテック技能と合わせればガンを使うこともできる。",
    debut: "ルールブックI",
    type: ["戦士系"],
  },
  ソーサラー: {
    explain: "真語魔法には炎を打つといった、攻撃魔法が多い。",
    debut: "ルールブックI",
    type: ["魔法使い系"],
    magic: "真語魔法",
  },
  コンジャラー: {
    explain:
      "操霊魔法にはバフ・デバフを与える効果や、ゴーレムを操る魔法などがある。",
    debut: "ルールブックI",
    type: ["魔法使い系"],
    magic: "操霊魔法",
  },
  プリースト: {
    explain:
      "神聖魔法は神官が神から与えられたもので、HPの回復や呪いの解除など癒すものが多い。",
    debut: "ルールブックI",
    type: ["魔法使い系"],
    magic: "神聖魔法",
  },
  マギテック: {
    explain:
      "魔動機術は魔動機文明時代に発展したテクノロジーで、シューター技能と組み合わせてガンを扱うものが多い。",
    debut: "ルールブックI",
    type: ["魔法使い系"],
    magic: "魔動機術",
  },
  スカウト: {
    explain: "探索や戦闘での先制判定で活躍する斥候。",
    debut: "ルールブックI",
    type: ["探索系"],
  },
  レンジャー: {
    explain: "野外での探索やポーションや薬草の使用で活躍する野伏。",
    debut: "ルールブックI",
    type: ["探索系"],
  },
  セージ: {
    explain: "知識で冒険を助ける学者。",
    debut: "ルールブックI",
    type: ["探索系"],
  },
  フェアリーテイマー: {
    explain: "妖精魔法は妖精の力を借りるため、多様な魔法が使用できる。",
    debut: "ルールブックII",
    type: ["魔法使い系"],
    magic: "妖精魔法",
  },
  エンハンサー: {
    explain: "",
    debut: "ルールブックII",
    type: ["スキル系"],
  },
  バード: {
    explain: "",
    debut: "ルールブックII",
    type: ["スキル系"],
  },
  ライダー: {
    explain: "",
    debut: "ルールブックIII",
    type: ["スキル系"],
  },
  アルケミスト: {
    explain: "",
    debut: "ルールブックIII",
    type: ["スキル系"],
  },
  ドルイド: {
    explain:
      "森羅魔法は味方を強化したり、精霊の力で敵に物理ダメージを与えるものが多い。",
    debut: "モンストラスロア",
    type: ["魔法使い系"],
    magic: "森羅魔法",
  },
  デーモンルーラー: {
    explain:
      "招異魔法は魔神の力を借りるもので、自身を強化したり、魔神を使役したりできる。",
    debut: "モンストラスロア",
    type: ["魔法使い系"],
    magic: "招異魔法",
  },
  ジオマンサー: {
    explain: "",
    debut: "メイガスアーツ",
    type: ["スキル系"],
  },
  ウォーリーダー: {
    explain: "",
    debut: "メイガスアーツ",
    type: ["スキル系"],
  },
  バトルダンサー: {
    explain: "",
    debut: "バトルマスタリー",
    type: ["前衛", "戦士系"],
  },
};

const wordList: WordList = {};
Object.entries(ginou).forEach(([key, value]) => {
  const explainAndDebut = `<br>${value.explain}<br>（初出：${value.debut}）`;
  let word = `${key}はソード・ワールド2.5でキャラクターが使える技能の1つ。`;
  if (value.magic) {
    word += `<br>${value.magic}という魔法の系統を使う魔法使い。`;
    wordList[
      value.magic
    ] = `${value.magic}はソード・ワールド2.5で${key}技能を持つキャラクターが使える魔法の系統。${explainAndDebut}`;
  }
  word += explainAndDebut;
  wordList[key] = word;
});

export const ginouWordList = () => wordList;
