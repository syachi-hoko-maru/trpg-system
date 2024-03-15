import { readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import type { RawBlog } from "./gene/index";
import { blogImgDir, blogJSON, imageDir, webpDir } from "../util/pathList";
import { getFileListFromDir, isSameWebpImage } from "../util/file";

// 不要なブログ画像の削除
/** ブログリスト */
const blogs = JSON.parse(
  readFileSync(blogJSON, "utf-8")
) as unknown as RawBlog[];
// blogJSONに記載がない画像を削除する
readdirSync(blogImgDir).forEach((img) => {
  /** ブログリストにあるか */
  const index = blogs.findIndex(
    (b) => b.img.replace(/blog-image\/(.+)\.webp/, "$1.png") === img
  );
  if (index >= 0) {
    return;
  } else {
    // 削除する
    console.log(`delete ${img}`);
    rmSync(blogImgDir + "/" + img);
  }
});

// 不要なwebpの削除
const webpList = getFileListFromDir(webpDir, (s: string) =>
  s.endsWith(".webp")
);
const imgList = getFileListFromDir(
  imageDir,
  (s: string) => s.endsWith(".png") || s.endsWith(".jpg") || s.endsWith(".jpeg")
);
webpList.forEach((webp) => {
  let deleteFlag = true;
  for (let img of imgList) {
    if (isSameWebpImage(webp.replace(webpDir, imageDir), img)) {
      deleteFlag = false;
      break;
    }
  }
  if (deleteFlag) {
    rmSync(webp);
  }
});
