export type TypeProductAdvertisingAPIv1 = {
  ApiClient: ApiClient;
  DefaultApi: DefaultApi;
  SearchItemsRequest: SearchItemsRequest;
};
export type AmazonSearchFunction = (
  word: SearchObj
) => Promise<AmazonSearchResult<string>>;
export type AmazonSearchResult<T extends string> = {
  prefix?: string;
  name: T;
  url: string;
  image: AmazonImage;
};
type ApiClient = {
  instance: {
    accessKey: string;
    secretKey: string;
    host: string;
    region: string;
  };
};
type DefaultApi = {
  new (): {
    searchItems: (searchItemsRequest: {}) => Promise<{
      SearchResult: SearchResult;
    }>;
  };
};
type SearchResult = {
  TotalResultCount: number;
  SearchURL: string;
  Items: {
    ASIN: string;
    DetailPageURL: string;
    Images: {
      Primary: {
        Large: AmazonImage;
      };
    };
  }[];
};
type AmazonImage = {
  URL: string;
  Height: number;
  Width: number;
};
// https://webservices.amazon.com/paapi5/documentation/locale-reference/japan.html
export type SearchIndex = "All" | "Books" | "AmazonVideo";
type SearchItemsRequest = {
  new (): {
    PartnerTag: string;
    PartnerType: "Associates";
    Keywords: string;
    ItemCount: number;
    // https://webservices.amazon.com/paapi5/documentation/resources.html
    Resources: ("Images.Primary.Large" | string)[];
    SearchIndex: SearchIndex;
  };
};

export type SearchObj = {
  prefix?: string;
  word: string;
  index: SearchIndex;
};
