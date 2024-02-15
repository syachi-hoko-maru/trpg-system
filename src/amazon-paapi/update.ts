import { createWriteStream, readFileSync, WriteStream } from "fs";
import { suppliments } from "../dict/suppliments";
import { getSearchWord, searchItemImage } from "./searchItemsApi";
import { wait } from "../util";
import { AmazonSearchResult, SearchIndex, SearchObj } from "./types";
import { bookList } from "../dict/new";
import { isPast } from "../util/date";

const amazonJsonPath = `${process.cwd()}/src/temp/amazon.json`;

const allFlag = process.argv[2] === "true";
// searchListの作成
const searchList: SearchObj[] = suppliments.reduce((prev, { items }) => {
  prev.push(
    ...items.map(
      (i) =>
        ({
          prefix: "ソード・ワールド2.5",
          word: i.name,
          index: "Books",
        } as const)
    )
  );
  return prev;
}, [] as SearchObj[]);
bookList.forEach((book) => {
  if (
    searchList.find((s) => s.word.indexOf(book.title) >= 0) ||
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
      await wait(1000);
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
