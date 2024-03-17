import { getPageSetting } from "../../pages/getPageSetting";
import type { Gino } from "../ginou";
import { supplimentList } from "./suppliment";
import type { Syuzoku } from "../syuzoku";
import { bookTypes, type BookLargeType } from "./bookType";

const pageSetting: PageSetting | undefined = getPageSetting(
  "/sw25/forbeginner/suppliment"
);
const lastmod: string = pageSetting.lastmod ? pageSetting.lastmod : "2024/3/15";

const getSuppliment = (bt: BookLargeType) =>
  supplimentList.filter((s) => bookTypes[bt].find((bt) => bt === s.bookType));
const getSupplimentList = (bt: keyof typeof bookTypes): string =>
  bookTypes[bt]
    .map((t) =>
      [
        `- ${t}`,
        ...supplimentList
          .filter((s) => s.bookType === t)
          .map((b) => `-- ${b.name}`),
      ].join("\n")
    )
    .join("\n");

export const suppliments: SupplimentGroup<
  string,
  Gino,
  Syuzoku,
  string,
  (typeof bookTypes)[keyof typeof bookTypes][number]
>[] = [
  {
    id: "big",
    type: "大型サプリ",
    explain: `
前述の通り大規模なデータ・ルールの追加があるサプリです。
更新日（${lastmod}）現在${getSuppliment("大型").length}冊出てます。
&br
${getSupplimentList("大型")}
&br
それぞれの解説をしていきます。
&br
ちなみにこれらはだいたい夏の終わり頃に出ることが多いです。
なので「夏の大型サプリ」とか「秋の大型サプリ」とか言われることがあります。
    `,
    items: getSuppliment("大型"),
  },
  {
    id: "cb",
    type: "キャラビルドサプリ等",
    explain: `
キャラクターを作る補助的なサプリなどで、小/中規模なデータ・ルールの追加があります。
更新日（${lastmod}）現在${getSuppliment("中型").length}冊出てます。
&br
${getSupplimentList("中型")}`,
    items: getSuppliment("中型"),
  },
  {
    id: "tour",
    type: "ツアーサプリ",
    explain: `
1つの地方もしくは都市に絞って &em_世界観や設定を詳細に解説 するサプリで、 &em_シナリオが掲載 されているものも多いです。
その地方特有の &em_アイテムや騎獣、流派 が載っているものがあります
&br
更新日（${lastmod}）現在${getSuppliment("ツアー").length}冊出てます。
&br
${getSupplimentList("ツアー")}
&br
これらは基本的には世界観重視です。 &em_1つの街で育っていく物語をしたいなら買うのもあり だし、 &em_惹かれたものを買えばいい と思います。
が、Twitterなどで対応したセッションの募集もそれほどないですし、 &em_他のものを優先したほうがいい かもしれません。
ということで全体的におすすめ度が低めです。
  `,
    items: getSuppliment("ツアー"),
  },
  {
    id: "bb",
    type: "バトルブックサプリ",
    explain: `
1つの大きなシナリオ（キャンペーン）となっているサプリです。
&em_GMなしで1人でも遊ぶことができる のが特徴です。
更新日（${lastmod}）現在${getSuppliment("バトルブック").length}冊出てます。
&br
${getSupplimentList("バトルブック")}
`,
    items: getSuppliment("バトルブック"),
  },
];
