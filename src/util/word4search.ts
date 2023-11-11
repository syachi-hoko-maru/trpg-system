const splitKey = ",";
const dict: { [key: string]: string[] } = {
  // SW2.5
  ソードワールド: ["ソード", "ワールド"],
  ソドワ: ["ソード", "ワールド"],
  SW: ["ソード", "ワールド"],
  ソドワニュース: ["ソード", "ワールド", "ニュース"],
  ハンドアウトソドワ: ["ハンドアウト", "ソード", "ワールド"],
  ナラティブソドワ: ["ナラティブ", "ソード", "ワールド"],
  // SW2.5用語
  デーモンルーラー: ["デーモンルーラー", "魔神"],
  // TRPG用語
  サプリメント: ["サプリ"],
  オンセ: ["オンラインセッション"],
  ボイセ: ["ボイスセッション"],
  テキセ: ["テキストセッション"],
  オフセ: ["対面セッション"],
  オフラインセッション: ["対面セッション"],
  // その他
  アニメポケットモンスター: ["アニメ", "ポケモン"],
  ポケットモンスター: ["ポケモン"],
};
export const word4search = (str: string): string[] =>
  str
    // 特殊文字の削除して分割
    .replace(
      /[\s\t\{\}\[\]\(\)<>\\\/\.,:;\-_'`"$&=!?・。、※©（）『』「」［］【】！？×＜＞：；…%〜]/g,
      splitKey
    )
    // 全ての英語を大文字にして、その後分割
    // .replace(/[a-z]+/g, (e) => `${e.toUpperCase() + ","}`)
    .toUpperCase()
    .replace(/[A-Za-z]+/g, (e) => splitKey + e + splitKey)
    // 全ての数字で分割
    .replace(/[01-9]+/g, (e) => {
      if (e.length <= 2) {
        return "";
      }
      return splitKey + e + splitKey;
    })
    // カタカナを分割する
    .replace(/[ァ-ンヴー]+/g, (ch) => {
      return splitKey + ch + splitKey;
    })
    // 全てのひらがなをで分割して、カタカナにする
    .replace(/[ぁ-んゔ]+/g, (ch) => {
      return splitKey + String.fromCharCode(ch.charCodeAt(0) + 0x60) + splitKey;
    })
    .split(splitKey)
    .filter((s) => ((s && !s.match(/[ァ-ンヴー]/)) || s.length > 1) == true)
    .map((s) => {
      if (dict[s]) return dict[s];
      return s;
    })
    .flat();
