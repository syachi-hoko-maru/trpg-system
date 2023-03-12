import blogSettingList from "assets/blog.json";
import { isPageTag, pageTags } from "./pageTags";

const normalPageSettingList: PageSetting[] = [
  {
    title: "トップページ",
    to: "/",
    img: "ogp.png",
    specialPage: true,
    tags: [],
  },
  {
    title: "ソード・ワールド2.5",
    to: "/sw25",
    tags: ["sw25"],
  },
  {
    title: "ソード・ワールド2.5 ツール一覧",
    to: "/sw25/tool",
    img: "page-image/tool.png",
    osusume: true,
    explain: "このサイトで公開しているツールの一覧を掲載しています。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 判定シミュレータ",
    to: "/sw25/tool/simulate",
    img: "page-image/simulate.png",
    osusume: true,
    explain:
      "SW2.5の判定や達成値の比べ合い、ダメージをシミュレートできるページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "オンセ募集用画像作成ツール",
    to: "/sw25/tool/bosyu",
    img: "page-image/bosyu.png",
    osusume: true,
    explain:
      "SW2.5のオンラインセッション募集時に過不足なく情報を伝えるための画像が作れるページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 Twitterコミュニティ紹介",
    to: "/sw25/tool/community",
    img: "page-image/community.png",
    osusume: true,
    explain: "SW2.5に関するTwitterコミュニティの紹介ページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "オンラインセッション用素材",
    to: "/sw25/tool/material",
    img: "page-image/material.png",
    osusume: true,
    explain: "BOOTHで公開しているオンラインセッション用素材の紹介ページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 オリジナルデータ",
    to: "/sw25/data",
    // osusume: true,
    hidden: true,
    explain: "管理人のしゃちほこ丸が作ったのオリジナルデータを掲載します。",
    tags: ["sw25", "me"],
  },
  {
    title: "SW2.5 初心者向け情報",
    to: "/sw25/forbeginner",
    // osusume: true,
    hidden: true,
    explain: "ソドワ初心者向けの、ソード・ワールド2.5情報をまとめています。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 おすすめサプリメント紹介",
    to: "/sw25/forbeginner/suppliment",
    // osusume: true,
    hidden: true,
    explain:
      "SW2.5のおすすめサプリメント（拡張ルールブック）の紹介ページです。",
    tags: ["sw25"],
  },
  {
    title: "公開シナリオ一覧",
    to: "/scenario",
    img: "page-image/scenario.png",
    explain: "管理人しゃちほこ丸が公開しているシナリオ一覧です。",
    tags: ["sw25", "scenario", "me"],
  },
  {
    title: "おすすめシナリオ",
    to: "/scenario/osusume",
    osusume: true,
    explain: "管理人しゃちほこ丸がおすすめのSW2.5シナリオ一覧です。",
    tags: ["sw25", "scenario"],
    hidden: true,
  },
  {
    title: "管理人の自己紹介",
    to: "/me",
    img: "page-image/me.png",
    explain: "管理人しゃちほこ丸の自己紹介ページです。",
    osusume: true,
    tags: ["me"],
  },
  {
    title: "所持ルールブック一覧",
    to: "/me/rulebook",
    img: "page-image/rulebook.png",
    explain:
      "管理人しゃちほこ丸が所持しているルールブック、サプリメントの一覧ページです。",
    tags: ["sw25", "me"],
  },
  {
    title: "ハウスルール",
    to: "/me/houserule",
    img: "page-image/house.png",
    explain:
      "管理人しゃちほこ丸が主催するセッションでのハウスルールを掲示しているページです。",
    tags: ["me"],
  },
  {
    title: "SW2.5 ハウスルール",
    to: "/me/houserule/sw25",
    img: "page-image/house.png",
    explain:
      "管理人しゃちほこ丸が主催するSW2.5のセッションでのハウスルールを掲示しているページです。",
    tags: ["sw25", "me"],
  },
  {
    title: "ブログ",
    to: "/blog",
    tags: ["me"],
  },
  {
    title: "検索",
    to: "/search",
    specialPage: true,
    tags: [],
  },
  {
    title: "設定",
    to: "/setting",
    specialPage: true,
    tags: [],
  },
  {
    title: "サイトポリシー",
    to: "/policy",
    specialPage: true,
    tags: [],
  },
  {
    title: "エラーページ",
    to: "error",
    tags: [],
  },
];

const blogPageSettingList: PageSetting[] = (blogSettingList as Blog[]).map(
  (b) => {
    return {
      title: b.title,
      to: "/blog/" + b.id,
      img: `blog-image/${b.id}.png`,
      tags: b.tags.filter(isPageTag) as PageTag[],
      osusume: true,
      hidden:
        new Date(b.date + "GMT+09:00").getTime() <= new Date().getTime()
          ? false
          : true,
      explain: b.andml
        .replace(/&[^\s]*\s/g, "")
        .replace(/[\s_]/g, "")
        .replace(/\n/g, " &br ")
        .slice(0, 120),
    };
  }
);

export const pageSettingList: PageSetting[] =
  normalPageSettingList.concat(blogPageSettingList);
