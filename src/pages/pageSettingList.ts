import blogSettingList from "../../assets/blog.json";
import { isPageTag } from "./pageTags";

const normalPageSettingList: PageSetting[] = [
  {
    title: "トップページ",
    to: "/",
    lastmod: "2023/3/28",
    img: "ogp.webp",
    specialPage: true,
    tags: [],
  },
  {
    title: "ソード・ワールド2.5",
    to: "/sw25",
    explain:
      "このウェブサイトで多く扱われている「ソード・ワールド2.5」（SW2.5）というTRPGについて、簡単にその魅力を紹介するページです。",
    lastmod: "2023/3/14",
    tags: ["sw25"],
  },
  {
    title: "ソード・ワールド2.5 ツール一覧",
    to: "/sw25/tool",
    lastmod: "2023/3/1",
    img: "page-image/tool.webp",
    osusume: true,
    explain:
      "このサイトで公開しているツールの一覧を掲載しています。どれもソード・ワールド2.5などのTRPGで役立つものばかりなので、ぜひ使ってみてください。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 判定シミュレータ",
    to: "/sw25/tool/simulate",
    lastmod: "2023/3/1",
    img: "page-image/simulate.webp",
    osusume: true,
    explain:
      "SW2.5の判定や達成値の比べ合い、ダメージをシミュレートできるページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "オンセ募集用画像作成ツール",
    to: "/sw25/tool/bosyu",
    lastmod: "2023/3/9",
    img: "page-image/bosyu.webp",
    osusume: true,
    explain:
      "SW2.5のオンラインセッション募集時に、過不足なく情報を伝えるための画像が作れるページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 Twitterコミュニティ紹介",
    to: "/sw25/tool/community",
    lastmod: "2023/3/19",
    img: "page-image/community.webp",
    osusume: true,
    explain: "SW2.5に関するTwitterコミュニティの紹介ページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "オンラインセッション用素材",
    to: "/sw25/tool/material",
    lastmod: "2023/3/8",
    img: "page-image/material.webp",
    osusume: true,
    explain:
      "BOOTHで公開している、ココフォリアなどで使えるオンラインセッション用素材の紹介ページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 オリジナルデータ",
    to: "/sw25/data",
    img: "page-image/data.webp",
    lastmod: "2023/3/20",
    osusume: true,
    explain:
      "管理人のしゃちほこ丸が作ったソード・ワールド2.5のオリジナルデータ（魔物やアイテム・騎獣・流派など）を掲載します。",
    tags: ["sw25_moso", "me"],
  },
  {
    title: "SW2.5 初心者向け情報",
    to: "/sw25/forbeginner",
    lastmod: "2023/3/20",
    osusume: false,
    explain:
      "ソドワ初心者向けの、ソード・ワールド2.5（SW2.5）情報をまとめています。FAQや便利なリンクを掲載中です。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 おすすめサプリメント紹介",
    to: "/sw25/forbeginner/suppliment",
    page: 5,
    lastmod: "2023/3/16",
    img: "page-image/suppliment.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）のおすすめサプリメント（拡張ルールブック）の紹介ページです。発売済みのすべてのサプリメントについて、簡単な紹介と初心者へのおすすめ度を掲載しております。どれを買えばいいのか困っている方はご覧ください。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 種族の一覧と紹介",
    to: "/sw25/forbeginner/syuzoku",
    lastmod: "2023/3/28",
    // img: "page-image/suppliment.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）でキャラクターとして使える種族の一覧と、その紹介をしています。どのルールブック・サプリメントに載っているかも掲載しています。",
    tags: ["sw25"],
  },

  {
    title: "公開シナリオ一覧",
    to: "/scenario",
    lastmod: "2023/3/1",
    img: "page-image/scenario.webp",
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
    title: "シナリオメモ「とろ〜りとした甘いやつ」",
    to: "/scenario/pudding",
    img: "scenario-image/pudding.webp",
    lastmod: "2023/3/18",
    osusume: true,
    explain:
      "ソード・ワールド2.5の、「プリン」の素材を求めてお使いに行くシナリオです。自分で回すように書いたメモと、回した際のセリフ等を以下にまとめております。もし興味と機会があれば回してみてください。オリジナル設定：アルフレイム大陸における「プリン」は魔法生物プリン（オリジナル）を真似したもので、魔動機文明時代に作られたものです。現在では一部の人が好んで食べる高級品です。",
    tags: ["sw25", "sw25_moso", "scenario"],
  },
  {
    title: "管理人プロフィール",
    to: "/me",
    lastmod: "2023/3/1",
    img: "page-image/me.webp",
    explain: "管理人しゃちほこ丸の自己紹介ページです。",
    osusume: true,
    tags: ["me"],
  },
  {
    title: "しゃちほこ丸ギャラリー",
    to: "/me/gallery",
    lastmod: "2023/3/21",
    img: "page-image/gallery.webp",
    explain: "管理人しゃちほこ丸の歴代アイコンを紹介するページです。",
    tags: ["me"],
  },
  {
    title: "所持ルールブック一覧",
    to: "/me/rulebook",
    lastmod: "2023/3/1",
    img: "page-image/rulebook.webp",
    explain:
      "管理人しゃちほこ丸が所持しているルールブック、サプリメントの一覧ページです。",
    tags: ["sw25", "me"],
  },
  {
    title: "ハウスルール",
    to: "/me/houserule",
    lastmod: "2023/3/1",
    img: "page-image/house.webp",
    explain:
      "管理人しゃちほこ丸が主催するセッションでのハウスルールを掲示しているページです。",
    tags: ["me"],
  },
  {
    title: "SW2.5 ハウスルール",
    to: "/me/houserule/sw25",
    lastmod: "2023/3/1",
    img: "page-image/house.webp",
    explain:
      "管理人しゃちほこ丸が主催するSW2.5のセッションでのハウスルールを掲示しているページです。",
    tags: ["sw25", "me"],
  },
  {
    title: "ブログ",
    to: "/blog",
    lastmod: "2023/3/15",
    explain:
      "管理人しゃちほこ丸がソード・ワールド2.5などのTRPGで思ったことなどを綴っています。",
    tags: ["me"],
  },
  {
    title: "検索",
    to: "/search",
    lastmod: "2023/3/28",
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
    title: "コンタクト",
    to: "/contact",
    lastmod: "2023/3/15",
    specialPage: false,
    tags: [],
  },
  {
    title: "エラーページ",
    to: "error",
    lastmod: "2023/3/1",
    tags: [],
  },
];

const blogPageSettingList: PageSetting[] = (blogSettingList as Blog[])
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .map((b) => {
    return {
      title: b.title,
      to: "/blog/" + b.id,
      img: `blog-image/${b.id}\.webp`,
      lastmod: b.date,
      tags: b.tags.filter(isPageTag) as PageTag[],
      osusume:
        new Date(b.date + " GMT+0900").getTime() <= new Date().getTime()
          ? true
          : false,
      hidden:
        new Date(b.date + " GMT+0900").getTime() <= new Date().getTime()
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
  });

export const pageSettingList: PageSetting[] =
  normalPageSettingList.concat(blogPageSettingList);
