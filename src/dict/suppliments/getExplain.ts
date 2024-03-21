import { getEntries } from "~/src/util";
import type { Gino } from "../ginou";
import { gameTypeDict, supplimentContentsDict } from "./suppliment";
import { syuzoku, type Syuzoku } from "../syuzoku";
import { godList } from "../god";
import type { BookSmallType } from "./bookType";

export const getExplain = (
  item: SupplimentData<string, Gino, Syuzoku, string, BookSmallType>
): string[] => {
  const result = item.explain.split("\n");
  // 途中の改行にamazonのリンクを入れる
  result.splice(result.indexOf("&br"), 0, `&amazon_${item.name}`);
  // 内容紹介
  result.push(...getContents(item));
  return result;
};

export const getContents = (
  item: SupplimentData<string, Gino, Syuzoku, string, BookSmallType>,
  noTitle: boolean = false
) => {
  const result: string[] = [];
  if (item.contents) {
    result.push(
      // タイトル
      noTitle ? "" : `&2 『${item.name.replace(/ /g, "¥s")}』のコンテンツ`,
      // 大型サプリ用のデータ集
      ...(item.contents.bigData?.length
        ? [
            "&3 データ集",
            ...item.contents.bigData.map(
              (bd) => `- ${supplimentContentsDict[bd].name}の一覧と追加`
            ),
          ]
        : []),
      // バトルブック用のキャンペーンデータ
      ...(item.contents.campaign
        ? [
            `&3 キャンペーン`,
            `『${item.name}』は一冊ほぼ全てがキャンペーン（連なったシナリオ）となっています。`,
            `&4 ゲーム形式`,
            `${item.contents.campaign.gameType}形式`,
            ...gameTypeDict[item.contents.campaign.gameType],
            `&4 概要`,
            ...item.contents.campaign.explain,
          ]
        : []),
      //データ追加
      ...(item.contents.data?.length
        ? [
            "&3 データ追加",
            ...item.contents.data
              .map((bd) => [
                // データの名前
                `- ${
                  supplimentContentsDict[typeof bd === "string" ? bd : bd.type]
                    .name
                }${
                  typeof bd !== "string" &&
                  (bd.type === "scenario" || bd.type === "soloAdventure")
                    ? `掲載（${bd.list.length}本）`
                    : "の追加"
                }`,
                // シナリオの場合
                ...(typeof bd !== "string" && bd.type === "scenario"
                  ? bd.list?.map((l) =>
                      typeof l === "undefined"
                        ? ""
                        : `--「${l.title}」（${
                            l.reguration
                              ? `成長回数${l.reguration}回`
                              : `初期作成`
                          }）`
                    )
                  : ""),
                // ソロアドベンチャーの場合
                ...(typeof bd !== "string" && bd.type === "soloAdventure"
                  ? bd.list?.map((l) =>
                      typeof l === "undefined"
                        ? ""
                        : `--「${l.title}」（${
                            l.reguration
                              ? `成長回数${l.reguration}回`
                              : `初期作成`
                          }${
                            l.createdCharacter
                              ? "・作成済みキャラクターを使用"
                              : ""
                          }${l.ruleless ? "・ルールブック不要" : ""}）`
                    )
                  : ""),
                // 技能の場合
                ...(typeof bd !== "string" && bd.type === "gino"
                  ? bd.list?.map((l) =>
                      typeof l === "undefined" ? "" : `--${l}`
                    )
                  : ""),
                //　種族の場合
                ...(bd === "syuzoku"
                  ? getEntries(syuzoku)
                      .filter(
                        ([_, syuzokuDetail]) =>
                          syuzokuDetail.debut.replace(/（.*）/g, "") ===
                          item.name
                      )
                      .map(([syuzokuName]) => `-- ${syuzokuName}`)
                  : []),
                // 神の場合
                ...(bd === "god"
                  ? godList
                      .filter(
                        (god) =>
                          god.book &&
                          god.book.findIndex((n) => n === item.name) == 0
                      )
                      .map(
                        (god) =>
                          `-- ${god.name}（${
                            god.sword
                              ? `第${[, 1, 2, 3][god.sword]}の神`
                              : "？？？"
                          }・${["古代神", "大神", "小神"][god.type]}）`
                      )
                  : []),
              ])
              .flat(),
          ]
        : []),
      // ガイド
      ...(item.contents.guide?.length
        ? [
            "&3 ガイド",
            ...item.contents.guide
              .map((bd) => {
                if (bd.type === "setting") {
                  return [
                    "&4 設定・世界観の紹介",
                    ...bd.list.map((l) => `- ${l}について`),
                  ];
                } else if (bd.type === "world") {
                  return [
                    "&4 地域（地方・国・都市）の紹介",
                    ...bd.list.map((l) => `- ${l}`),
                  ];
                } else {
                  return [];
                }
              })
              .flat(),
          ]
        : []),
      // ルール追加
      ...(item.contents.rule?.length
        ? [
            "&3 ルール追加",
            ...item.contents.rule
              .map((bd) => [
                `- ${bd.name}`,
                ...(bd.detail ? bd.detail.map((d) => `-- ${d}`) : []),
              ])
              .flat(),
          ]
        : [])
    );
  }
  return result;
};
