import "dotenv/config";
import { AmazonSearchFunction, TypeProductAdvertisingAPIv1 } from "./types";

const ProductAdvertisingAPIv1 =
  require("./src/index") as TypeProductAdvertisingAPIv1;

const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;
if (!accessKey || !secretKey) {
  console.error("no accessKey or secretKey");
  process.exit(0);
}
defaultClient.accessKey = accessKey;
defaultClient.secretKey = secretKey;
defaultClient.host = "webservices.amazon.co.jp";
defaultClient.region = "us-west-2";

const api = new ProductAdvertisingAPIv1.DefaultApi();
const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
searchItemsRequest["PartnerTag"] = "syachihokotrp-22";
searchItemsRequest["PartnerType"] = "Associates";
searchItemsRequest["SearchIndex"] = "Books";

export const searchItemImage: AmazonSearchFunction = <Word extends string>(
  keyword: Word
) => {
  searchItemsRequest["Keywords"] = keyword;
  searchItemsRequest["ItemCount"] = 1;
  searchItemsRequest["Resources"] = ["Images.Primary.Large"];

  return api.searchItems(searchItemsRequest).then(
    (data) => {
      return {
        name: keyword,
        url: data.SearchResult.Items[0].DetailPageURL,
        image: data.SearchResult.Items[0].Images.Primary.Large,
      };
    },
    (error) => {
      throw error;
    }
  );
};
