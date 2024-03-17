export const bookTypes = {
  大型: ["大型サプリ"],
  中型: ["ビルディングブック系", "ラクシアライフ"],
  ツアー: ["ツアーサプリ", "博物誌", "見聞録", "リプレイ&サプリ"],
  バトルブック: ["バトルブック", "デュオアドベンチャー", "シナリオ集"],
} as const;

export type BookLargeType = keyof typeof bookTypes;
export type BookSmallType = (typeof bookTypes)[keyof typeof bookTypes][number];
