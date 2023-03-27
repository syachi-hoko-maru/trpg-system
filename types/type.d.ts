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
  | "me";
declare type PageSetting = {
  readonly title: string;
  readonly to: string;
  readonly page?: number;
  readonly lastmod: string;
  readonly img?: string;
  readonly osusume?: boolean;
  readonly explain?: string | string[];
  readonly hidden?: boolean;
  readonly specialPage?: boolean;
  readonly tags: PageTag[];
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
  id: string;
  author: string;
  system: "ソード・ワールド2.5" | "エモクロアTRPG";
  explain: string[];
  img: string;
  url: { site: "TALTO" | "シナリオメモ"; url: string }[];
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
  andml: string;
};

type SupplimentGroup = {
  id: string;
  type: string;
  explain: string;
  items: Suppliment[];
};

type Suppliment = {
  name: string;
  ossusume: number;
  explain: string;
};

type WordList = { [key: string]: string };
