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
  | "me"
  | "otrpg"
  | "rm"
  | "rugby"
  | "scenario"
  | "sw25"
  | "sw25_moso"
  | "sw25_new"
  | "tech"
  | "tool"
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
  readonly category?: "list" | "bookIntro" | "forgm";
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
declare type BufferData = { type: "Buffer"; data: number[] };
declare type Secret = {
  id: string;
  title: BufferData;
  andml: BufferData;
};
declare type SecretJson = {
  list: Secret[];
  iv: BufferData;
  salt: BufferData;
};

type SupplimentBigContents =
  | "item"
  | "monster"
  | "magic"
  | "skill"
  | "tokugi"
  | "ippan"
  | "kisyoSyu";
type SupplimentContentsStr<Gino extends string, Syuzoku extends string> =
  | SupplimentBigContents
  | "god"
  | "miniMagic"
  | "ryuha"
  | "kizyu"
  | "syuzoku"
  | "sampleCharacter"
  | "npc";
type SupplimentContentsObj<Gino extends string, Syuzoku extends string> =
  | { type: "gino"; list: Gino[] }
  | {
      type: "scenario";
      list: { title: string; reguration: number }[];
    }
  | {
      type: "soloAdventure";
      list: {
        title: string;
        reguration: number;
        ruleless?: boolean;
        createdCharacter?: boolean;
      }[];
    };
type SupplimentContents<Gino extends string, Syuzoku extends string> =
  | SupplimentContentsStr<Gino, Syuzoku>
  | SupplimentContentsObj<Gino, Syuzoku>;
type SupplimentGroup<
  SupplimentList extends string,
  Gino extends string,
  Syuzoku extends string,
  Area extends string,
  BookType extends string
> = {
  id: string;
  type: string;
  explain: string;
  items: SupplimentData<SupplimentList, Gino, Syuzoku, Area, BookType>[];
};

type SupplimentOptionrule = {
  name: string;
  detail?: string[];
  customize?: boolean;
};
type GameType = "ランダムマップ" | "固定マップ" | "ストーリー";
type SupplimentData<
  SupplimentList extends string,
  Gino extends string,
  Syuzoku extends string,
  Area extends string,
  BookType extends string
> = {
  name: SupplimentList;
  ossusume: number;
  bookType: BookType;
  contents: {
    bigData?: SupplimentBigContents[];
    data?: SupplimentContents<Gino, Syuzoku>[];
    guide?: (
      | { type: "world"; list: Area[] }
      | { type: "setting"; list: string[] }
    )[];
    rule?: SupplimentOptionrule[];
    campaign?: {
      gameType: GameType;
      explain: string[];
    };
  };
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
