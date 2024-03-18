import { createWriteStream, readFileSync, WriteStream } from "fs";
import { supplimentList } from "../dict/suppliments/suppliment";
import { searchItemImage } from "./searchItemsApi";
import { wait } from "../util";
import type { AmazonSearchResult, SearchObj } from "./types";
import { bookList } from "../dict/new";
import { isPast } from "../util/date";

const amazonJsonPath = `${process.cwd()}/src/temp/amazon.json`;

const allFlag = process.argv[2] === "true";
// searchListの作成
/** 検索文字列のリスト */
const searchList: SearchObj[] = supplimentList.reduce((prev, suppliment) => {
  prev.push({
    prefix: "ソード・ワールド2.5",
    word: suppliment.name,
    index: "Books",
  } as const);
  return prev;
}, [] as SearchObj[]);
// 新刊情報から取得
bookList.forEach((book) => {
  if (
    searchList.find((s) => s.word.indexOf(book.title) >= 0) ||
    // 発売1.5ヶ月前以降なら
    !isPast(book.date, new Date().getTime() + 1.5 * 30 * 24 * 60 * 60 * 1000)
  )
    return;
  else
    searchList.push({
      prefix: "ソード・ワールド2.5",
      word: book.title,
      index: "Books",
    });
});
// その他
searchList.push(
  ...([
    {
      prefix: "あらたとしひら",
      word: "だいすろーる！1",
      index: "Books",
    },
    {
      prefix: "グループSNE",
      word: "GMウォーロックvol.12",
      index: "Books",
    },
    {
      prefix: "",
      word: "本当は〇〇な物語メーカー ヨタバナ",
      index: "Books",
    },
    {
      prefix: "",
      word: "ダンジョンズ&ドラゴンズ アウトローたちの誇り",
      index: "AmazonVideo",
    },
  ] as SearchObj[])
);
// searchListの作成ここまで

/** 検索結果 */
let data: AmazonSearchResult<string>[] = [];
if (!allFlag) {
  console.log("INFO: try to get amazon.json");
  try {
    data = JSON.parse(readFileSync(amazonJsonPath, "utf-8"));
    console.log("INFO: success to get amazon.json ");
  } catch (e) {
    console.log("INFO: error to get amazon.json ");
  }
}

let firstLine = true;
const writable: WriteStream = createWriteStream(amazonJsonPath);
writable.write("[\n");
(async () => {
  for (let searchItem of searchList) {
    const d = data.find(
      (d) => d.name === searchItem.word && d.prefix === searchItem.prefix
    );
    if (!d) {
      console.log(`INFO: search ${searchItem.word}`);
      await searchItemImage(searchItem)
        .then((r) => {
          if (firstLine) {
            firstLine = false;
          } else {
            writable.write(",\n");
          }
          writable.write(JSON.stringify(r));
        })
        .catch((e) => {
          console.error("Error:", e);
          writable.write("]");
          writable.end();
          process.exit(1);
        });
      await wait(1500);
    } else {
      if (firstLine) {
        firstLine = false;
      } else {
        writable.write(",\n");
      }
      writable.write(JSON.stringify(d));
    }
  }
  writable.write("\n]");
  writable.end();
})();
