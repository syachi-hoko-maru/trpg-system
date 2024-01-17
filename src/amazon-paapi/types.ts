export type TypeProductAdvertisingAPIv1 = {
  ApiClient: ApiClient;
  DefaultApi: DefaultApi;
  SearchItemsRequest: SearchItemsRequest;
};
export type AmazonSearchFunction = <Word extends string>(
  word: Word
) => Promise<AmazonSearchResult<Word>>;
export type AmazonSearchResult<T extends string> = {
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
type SearchItemsRequest = {
  new (): {
    PartnerTag: string;
    PartnerType: "Associates";
    Keywords: string;
    ItemCount: number;
    Resources: "Images.Primary.Large"[];
    SearchIndex: "Books";
  };
};
