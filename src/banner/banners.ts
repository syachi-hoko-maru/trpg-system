import { isPast } from "../util/date";

export type Banner = {
  name: string;
  title: string;
  to: string;
  img: string;
  isValid: boolean;
};

export const bannerList: Banner[] = [
  {
    name: "c102",
    title:
      "ソード・ワールド2.5同人シナリオ集「冒険者の旅路」通販&電子版、頒布中！",
    to: "/sw25/c102",
    img: "/banner-image/c102-2.webp",
    isValid: !isPast("2024/8/12"),
  },
  {
    name: "halloween",
    title: "ハロウィンイベント実施中",
    to: "/blog/halloween",
    img: "/banner-image/halloween.webp",
    isValid: isPast("2023/9/30") && !isPast("2023/10/31"),
  },
  {
    name: "fav",
    title: "ここが好き！ ソード・ワールド2.5展開中",
    to: "/sw25/fav",
    img: "/banner-image/fav.webp",
    isValid: true,
  },
  {
    name: "intro",
    title: "SW2.5 自己紹介シートを作ろう！",
    to: "/sw25/tool/intro",
    img: "/banner-image/intro.webp",
    isValid: true,
  },
  {
    name: "simulate",
    title: "SW2.5 判定シミュレータ公開中！",
    to: "/sw25/tool/simulate",
    img: "/banner-image/simulate.webp",
    isValid: true,
  },
  {
    name: "community",
    title: "ソード・ワールド2.5Twitterコミュニティ！",
    to: "/sw25/tool/community",
    img: "/banner-image/community.webp",
    isValid: true,
  },
  {
    name: "material",
    title: "TRPGオンラインセッション用素材、公開中！",
    to: "/sw25/tool/material",
    img: "/banner-image/material.webp",
    isValid: true,
  },
  {
    name: "forbeginner",
    title: "ソード・ワールド2.5初心者向け情報、多数公開中",
    to: "/sw25/forbeginner",
    img: "/banner-image/forbeginner.webp",
    isValid: true,
  },
  {
    name: "suppliment",
    title: "ソード・ワールド2.5おすすめサプリメント！",
    to: "/sw25/forbeginner/suppliment/1",
    img: "/banner-image/suppliment.webp",
    isValid: true,
  },
  {
    name: "osusume-scenario",
    title: "ソード・ワールド2.5シナリオの探し方とおすすめシナリオ！",
    to: "/sw25/forbeginner/scenario",
    img: "/banner-image/osusume-scenario.webp",
    isValid: true,
  },
  {
    name: "data",
    title: "ソード・ワールド2.5オリジナルデータ公開中",
    to: "/sw25/data",
    img: "/banner-image/data.webp",
    isValid: true,
  },
  {
    name: "comic",
    title: "女子高生×部活×SW2.5 無料マンガ だいすろーる！ 紹介",
    to: "/sw25/comic",
    img: "/banner-image/comic.webp",
    isValid: isPast("2023/11/17"),
  },
  {
    name: "scenario",
    title: "TRPGシナリオ公開中！",
    to: "/scenario",
    img: "/banner-image/scenario.webp",
    isValid: true,
  },
].filter((b) => b.isValid);
