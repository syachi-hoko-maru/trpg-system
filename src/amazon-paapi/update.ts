import { createWriteStream, readFileSync, WriteStream } from "fs";
import { suppliments } from "../dict/suppliments";
import { searchItemImage } from "./searchItemsApi";
import { wait } from "../util";
import { AmazonSearchResult } from "./types";
import { bookList } from "../dict/new";
import { isPast } from "../util/date";

const amazonJsonPath = `${process.cwd()}/src/temp/amazon.json`;

const allFlag = process.argv[2] === "true";
const supplimentNames: string[] = suppliments.reduce((prev, { items }) => {
  prev.push(...items.map((i) => i.name));
  return prev;
}, [] as string[]);
bookList.forEach((book) => {
  if (
    supplimentNames.find((s) => s.indexOf(book.title) >= 0) ||
    !isPast(book.date, new Date().getTime() + 1.5 * 30 * 24 * 60 * 60 * 1000)
  )
    return;
  else supplimentNames.push(book.title);
});

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
  for (let supplimentTitle of supplimentNames) {
    const searchWord =
      "ソード・ワールド2.5 " + supplimentTitle.replace("-", "");
    const d = data.find((d) => d.name === searchWord);
    if (!d) {
      console.log(`INFO: search ${supplimentTitle}`);
      await searchItemImage(searchWord)
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
