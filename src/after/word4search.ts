export const word4search = (str: string) =>
  str
    // 特殊文字の削除
    .replace(/[\s\{\}\[\]\(\)<>\\\/\.,:;\-_'`"$&=・。、※©（）]/g, "")
    // 全ての英語を大文字にする
    .toUpperCase()
    // 全てのひらがなをカタカナにする
    .replace(/[\u3041-\u3096]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) + 0x60)
    );
