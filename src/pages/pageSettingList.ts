import blogSettingList from "../../assets/blog.json";
import { isPageTag, pageTags } from "./pageTags";

const normalPageSettingList: PageSetting[] = [
  {
    title: "トップページ",
    to: "/",
    lastmod: "2023/3/1",
    img: "ogp.png",
    specialPage: true,
    tags: [],
  },
  {
    title: "ソード・ワールド2.5",
    to: "/sw25",
    lastmod: "2023/3/1",
    tags: ["sw25"],
  },
  {
    title: "ソード・ワールド2.5 ツール一覧",
    to: "/sw25/tool",
    lastmod: "2023/3/1",
    img: "page-image/tool.png",
    osusume: true,
    explain:
      "このサイトで公開しているツールの一覧を掲載しています。どれもソード・ワールド2.5などのTRPGで役立つものばかりなので、ぜひ使ってみてください。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 判定シミュレータ",
    to: "/sw25/tool/simulate",
    lastmod: "2023/3/1",
    img: "page-image/simulate.png",
    osusume: true,
    explain:
      "SW2.5の判定や達成値の比べ合い、ダメージをシミュレートできるページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "オンセ募集用画像作成ツール",
    to: "/sw25/tool/bosyu",
    lastmod: "2023/3/9",
    img: "page-image/bosyu.png",
    osusume: true,
    explain:
      "SW2.5のオンラインセッション募集時に、過不足なく情報を伝えるための画像が作れるページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 Twitterコミュニティ紹介",
    to: "/sw25/tool/community",
    lastmod: "2023/3/8",
    img: "page-image/community.png",
    osusume: true,
    explain: "SW2.5に関するTwitterコミュニティの紹介ページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "オンラインセッション用素材",
    to: "/sw25/tool/material",
    lastmod: "2023/3/8",
    img: "page-image/material.png",
    osusume: true,
    explain:
      "BOOTHで公開している、ココフォリアなどで使えるオンラインセッション用素材の紹介ページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 オリジナルデータ",
    to: "/sw25/data",
    lastmod: "2023/3/1",
    // osusume: true,
    hidden: true,
    explain:
      "管理人のしゃちほこ丸が作った魔物やアイテム、騎獣などのオリジナルデータを掲載します。",
    tags: ["sw25", "me"],
  },
  {
    title: "SW2.5 初心者向け情報",
    to: "/sw25/forbeginner",
    lastmod: "2023/3/13",
    // osusume: true,
    hidden: true,
    explain: "ソドワ初心者向けの、ソード・ワールド2.5情報をまとめています。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 おすすめサプリメント紹介",
    to: "/sw25/forbeginner/suppliment",
    lastmod: "2023/3/13",
    img: "page-image/suppliment.png",
    osusume: true,
    explain:
      "SW2.5のおすすめサプリメント（拡張ルールブック）の紹介ページです。発売済みのすべてのサプリメントについて、簡単な紹介と初心者へのおすすめ度を掲載しております。",
    tags: ["sw25"],
  },
  {
    title: "公開シナリオ一覧",
    to: "/scenario",
    lastmod: "2023/3/1",
    img: "page-image/scenario.png",
    explain:
      "管理人しゃちほこ丸が公開しているシナリオ一覧です。ソード・ワールド2.5やエモクロアTRPGのシナリオを公開しています。",
    tags: ["sw25", "scenario", "me"],
  },
  {
    title: "おすすめシナリオ",
    to: "/scenario/osusume",
    lastmod: "2023/3/1",
    osusume: true,
    explain: "管理人しゃちほこ丸がおすすめのSW2.5シナリオ一覧です。",
    tags: ["sw25", "scenario"],
    hidden: true,
  },
  {
    title: "管理人の自己紹介",
    to: "/me",
    lastmod: "2023/3/1",
    img: "page-image/me.png",
    explain: "管理人しゃちほこ丸の自己紹介ページです。",
    osusume: true,
    tags: ["me"],
  },
  {
    title: "所持ルールブック一覧",
    to: "/me/rulebook",
    lastmod: "2023/3/1",
    img: "page-image/rulebook.png",
    explain:
      "管理人しゃちほこ丸が所持しているルールブック、サプリメントの一覧ページです。",
    tags: ["sw25", "me"],
  },
  {
    title: "ハウスルール",
    to: "/me/houserule",
    lastmod: "2023/3/1",
    img: "page-image/house.png",
    explain:
      "管理人しゃちほこ丸が主催するセッションでのハウスルールを掲示しているページです。",
    tags: ["me"],
  },
  {
    title: "SW2.5 ハウスルール",
    to: "/me/houserule/sw25",
    lastmod: "2023/3/1",
    img: "page-image/house.png",
    explain:
      "管理人しゃちほこ丸が主催するSW2.5のセッションでのハウスルールを掲示しているページです。",
    tags: ["sw25", "me"],
  },
  {
    title: "ブログ",
    to: "/blog",
    lastmod: "2023/3/10",
    explain: "管理人しゃちほこ丸が思ったことを綴っています。",
    tags: ["me"],
  },
  {
    title: "検索",
    to: "/search",
    lastmod: "2023/3/1",
    specialPage: true,
    explain: "当ウェブサイトの内容を検索できます。",
    tags: [],
  },
  {
    title: "設定",
    to: "/setting",
    lastmod: "2023/3/1",
    specialPage: true,
    tags: [],
  },
  {
    title: "サイトポリシー",
    to: "/policy",
    lastmod: "2023/3/7",
    specialPage: true,
    tags: [],
  },
  {
    title: "エラーページ",
    to: "error",
    lastmod: "2023/3/1",
    tags: [],
  },
];

const blogPageSettingList: PageSetting[] = (blogSettingList as Blog[]).map(
  (b) => {
    return {
      title: b.title,
      to: "/blog/" + b.id,
      img: `blog-image/${b.id}.png`,
      lastmod: b.date,
      tags: b.tags.filter(isPageTag) as PageTag[],
      osusume:
        new Date(b.date + "GMT+09:00").getTime() <= new Date().getTime()
          ? true
          : false,
      hidden:
        new Date(b.date + "GMT+09:00").getTime() <= new Date().getTime()
          ? false
          : true,
      explain:
        `「${b.title}」に関するブログ記事です。` +
        b.andml
          .replace(/&[^\s]*\s/g, "")
          .replace(/[\s_]/g, "")
          .replace(/\n/g, " &br ")
          .slice(0, 100),
    };
  }
);

export const pageSettingList: PageSetting[] =
  normalPageSettingList.concat(blogPageSettingList);
