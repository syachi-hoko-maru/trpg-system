type GinoData = {
  name: string;
  explain: string;
  debut: string;
  type: readonly ("前衛" | "戦士系" | "魔法使い系" | "探索系" | "スキル系")[];
} & (
  | {
      magic?: string;
    }
  | {
      magic?: undefined;
    }
) &
  (
    | {
        skill?: readonly string[];
      }
    | {
        skill?: undefined;
      }
  );
export const ginou = [
  {
    name: "ファイター",
    explain:
      "武器を持ち、鎧を着て戦うオーソドックスな戦士。タンク（壁役）を担うこともある。",
    debut: "ルールブックI",
    type: ["前衛", "戦士系"],
  },
  {
    name: "グラップラー",
    explain:
      "パンチやキック、投げなどの技を使い、手数を武器に戦う拳闘士。防具はほとんどつけられない。",
    debut: "ルールブックI",
    type: ["前衛", "戦士系"],
  },
  {
    name: "フェンサー",
    explain: "軽い武器と防具を使い、急所を狙って戦う軽戦士。",
    debut: "ルールブックI",
    type: ["前衛", "戦士系"],
  },
  {
    name: "シューター",
    explain:
      "弓や弩を使って戦う射手。マギテック技能と合わせればガンを使うこともできる。",
    debut: "ルールブックI",
    type: ["戦士系"],
  },
  {
    name: "ソーサラー",
    explain: "真語魔法には炎を打つといった、攻撃魔法が多い。",
    debut: "ルールブックI",
    type: ["魔法使い系"],
    magic: "真語魔法",
  },
  {
    name: "コンジャラー",
    explain:
      "操霊魔法にはバフ・デバフを与える効果や、ゴーレムを操る魔法などがある。",
    debut: "ルールブックI",
    type: ["魔法使い系"],
    magic: "操霊魔法",
  },
  {
    name: "プリースト",
    explain:
      "神聖魔法は神官が神から与えられたもので、HPの回復や呪いの解除など癒すものが多い。",
    debut: "ルールブックI",
    type: ["魔法使い系"],
    magic: "神聖魔法",
  },
  {
    name: "マギテック",
    explain:
      "魔動機術は魔動機文明時代に発展したテクノロジーで、シューター技能と組み合わせてガンを扱うものが多い。",
    debut: "ルールブックI",
    type: ["魔法使い系"],
    magic: "魔動機術",
  },
  {
    name: "スカウト",
    explain: "探索や戦闘での先制判定で活躍する斥候。",
    debut: "ルールブックI",
    type: ["探索系"],
  },
  {
    name: "レンジャー",
    explain: "野外での探索やポーションや薬草の使用で活躍する野伏。",
    debut: "ルールブックI",
    type: ["探索系"],
  },
  {
    name: "セージ",
    explain: "知識で冒険を助ける学者。",
    debut: "ルールブックI",
    type: ["探索系"],
  },
  {
    name: "フェアリーテイマー",
    explain: "妖精魔法は妖精の力を借りるため、多様な魔法が使用できる。",
    debut: "ルールブックII",
    type: ["魔法使い系"],
    magic: "妖精魔法",
  },
  {
    name: "エンハンサー",
    explain:
      "練技は呼吸の操作によって体に動物的な力を宿し、能力値などを上昇させる。主に補助動作で使用し、MPを消費する。",
    debut: "ルールブックII",
    type: ["スキル系"],
    skill: ["練技"],
  },
  {
    name: "バード",
    explain:
      "呪歌はバフ・デバフを行いつつ、楽素を貯める。終律はダメージを与えたり回復をするが楽素を消費する。どちらも主動作で使用する。",
    debut: "ルールブックII",
    type: ["スキル系"],
    skill: ["呪歌", "終律"],
  },
  {
    name: "ライダー",
    explain:
      "騎芸は騎獣と共に戦うための技術。主に補助動作で使用する。騎獣にはホース（馬）やペガサスなどの幻獣、魔動機であるバイクなど幅広いものがある。",
    debut: "ルールブックIII",
    type: ["スキル系"],
    skill: ["騎芸"],
  },
  {
    name: "アルケミスト",
    explain:
      "賦術はマテリアルカードを消費してバフ・デバフなどを行う。主動作でも補助動作でも使用可能だが、補助動作だとペナルティがかかる。マテリアルカードを買う必要があるため、金使いが荒くなる。",
    debut: "ルールブックIII",
    type: ["スキル系"],
    skill: ["賦術"],
  },
  {
    name: "ドルイド",
    explain:
      "森羅魔法は味方を強化したり、精霊の力で敵に物理ダメージを与えるものが多い。シンボリック・ロアと呼ばれる大技がいくつかあり、ロマンもある。",
    debut: "モンストラスロア",
    type: ["魔法使い系"],
    magic: "森羅魔法",
  },
  {
    name: "デーモンルーラー",
    explain:
      "招異魔法は魔神の力を借りるもので、禁術とされることもある。自身を強化したり、魔神を使役したりできる。",
    debut: "モンストラスロア",
    type: ["魔法使い系"],
    magic: "招異魔法",
  },
  {
    name: "ジオマンサー",
    explain:
      "相域は命脈点と呼ばれる戦闘中に自動で貯まるリソースを使用してさまざまな効果を及ぼす。対象がランダムに決まるという他にはない特徴がある。",
    debut: "メイガスアーツ",
    type: ["スキル系"],
    skill: ["相域"],
  },
  {
    name: "ウォーリーダー",
    explain:
      "鼓咆は味方にバフを与え、陣気をためる。陣卒は自分にバフを与え、陣気を消費する。陣卒の中には「ウォーリーダー技能レベル + 知力ボーナス」で先制判定が可能になるものもあり強力。",
    debut: "メイガスアーツ",
    type: ["スキル系"],
    skill: ["鼓咆", "陣卒"],
  },
  {
    name: "バトルダンサー",
    explain:
      "舞うように戦う戦士。射撃武器以外の全ての武器の使用が可能で、戦闘特技が1つ多く使えるが、防具はほとんど着られない。同じくバトルダンサー掲載の「流派」と相性が良い。",
    debut: "バトルマスタリー",
    type: ["前衛", "戦士系"],
  },
] as const satisfies Readonly<GinoData[]>;

const wordList: WordList = {};
ginou.forEach((value) => {
  const explainAndDebut = `<br>${value.explain}<br>（初出：${value.debut}）`;
  let word = `${value.name}はソード・ワールド2.5でキャラクターが使える技能の1つ。`;
  if ("magic" in value && value.magic) {
    word += `<br>${value.magic}という魔法の系統を使う魔法使い。`;
    wordList[
      value.magic
    ] = `${value.magic}はソード・ワールド2.5で${value.name}技能を持つキャラクターが使える魔法の系統。${explainAndDebut}`;
  } else if ("skill" in value && value.skill?.length) {
    word += `
    <br>
    ${value.skill.join("・")}が使える技能。
    ${value.name}は1レベルあたり${value.skill?.join(
      "・"
    )}を1つを選択して使えるようになる。`;
    value.skill.forEach((ski) => {
      wordList[ski] = `${value.skill?.join("・")}はソード・ワールド2.5で${
        value.name
      }技能を持つキャラクターが使える。${explainAndDebut}`;
    });
  }
  word += explainAndDebut;
  wordList[value.name] = word;
});

export const ginouWordList = () => wordList;
export type Gino = (typeof ginou)[number]["name"];
