import { searchItemImage } from "./searchItemsApi";

["ブルライト博物誌", "ドーデン博物誌", "アルフレイム"].forEach((w) => {
  searchItemImage("ソード・ワールド2.5 " + w)
    .then((d) => {
      console.log(JSON.stringify(d, null, 1));
    })
    .catch((e) => console.error(e));
});
