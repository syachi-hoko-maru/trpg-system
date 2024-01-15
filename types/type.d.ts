declare type CardData = {
  title?: string;
  texts: string[];
};

declare type MenuCategory = {
  readonly categoryName: string;
  readonly pageList: Page[];
  readonly hidden?: boolean;
};
declare type MenuPage = {
  readonly icon: string;
  readonly title: string;
  readonly to: string;
  readonly disabled?: boolean;
  readonly hidden?: boolean;
};

declare type PageTag =
  | "sw25"
  | "sw25_new"
  | "sw25_moso"
  | "tool"
  | "scenario"
  | "rm"
  | "rugby"
  | "me"
  | "trpg";
declare type PageSetting = {
  readonly title: string;
  readonly to: string;
  readonly page?: string[];
  readonly lastmod: string;
  readonly created?: string;
  readonly img?: string;
  readonly imgdirs?: string[];
  osusume?: boolean;
  readonly explain?: string | string[];
  hiddenFlag?: boolean;
  noSearch?: boolean;
  readonly specialPage?: boolean;
  readonly tags: PageTag[];
  readonly noamazon?: boolean;
};
declare type PageTagSetting = {
  readonly label: string;
  readonly explanation: string;
};
declare type PageTagSettings = {
  readonly [tag in PageTag]: PageTagSetting;
};

declare type ScenarioData = {
  title: string;
  scenarioId: string;
  author: string;
  system: "ソード・ワールド2.5" | "エモクロアTRPG";
  explain: string[];
  img: string;
  url: {
    site: "TALTO" | "シナリオメモ（サイト内）" | "シナリオ（サイト内）";
    url: string;
    hidden?: boolean;
  }[];
} & (
  | {
      system: "ソード・ワールド2.5";
      regulation: string;
    }
  | {}
) &
  (
    | {
        author: "しゃちほこ丸";
        create: string;
        update?: string;
      }
    | {}
  );

declare type Blog = {
  id: string;
  title: string;
  tags: PageTag[];
  date: string;
  date2: string;
  andml: string;
  img: string;
};

type SupplimentGroup<SupplimentList extends string> = {
  id: string;
  type: string;
  explain: string;
  items: SupplimentData<SupplimentList>[];
};

type SupplimentData<SupplimentList extends string> = {
  name: SupplimentList;
  ossusume: number;
  explain: string;
};

type WordList = { [key: string]: string };

type LinkType =
  | "menu"
  | "right"
  | "tailcard"
  | "pageindex"
  | "pagecard"
  | "button"
  | "text"
  | "share"
  | "twitter_account"
  | "carousel";

type SearchJSON = { [pageTo: string]: [string, number][] };
type SearchResult = { pageSetting: PageSetting; kanren: number };
