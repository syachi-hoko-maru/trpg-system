import { RouteLocationRaw } from "../../../.nuxt/vue-router";
import { getFortuneV1 } from "./v1";

export const fortuneScoreList = [
  "超大吉",
  "大吉",
  "吉",
  "小吉",
  "末吉",
  "凶",
  "大凶",
] as const;
export type FortuneScore = (typeof fortuneScoreList)[number];
export const omikujiBasePath = "/sw25/tool/omikuji";

export type FortuneResult = {
  fortuneScore: FortuneScore;
  messageList: string[];
};
export type FortuneFunction = (id: number) => FortuneResult;

export const defaultVersion = "v1";
const latestVersion = "v1";

export const getOmikujiResultPath = (
  version: string = latestVersion
): RouteLocationRaw => {
  const id = Math.floor(
    Math.random() * 10 ** 8 + (new Date().getTime() % 10 ** 5)
  );
  const { fortuneScore } = getFortuneV1(id);
  return {
    path: omikujiBasePath + "/result_" + fortuneScoreList.indexOf(fortuneScore),
    query: {
      id,
      version,
    },
  };
};

export const sep = "：　";
