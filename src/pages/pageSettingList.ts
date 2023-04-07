import blogSettingList from "../../assets/blog.json";
import { isPageTag } from "./pageTags";

const normalPageSettingList: PageSetting[] = [
  {
    title: "トップページ",
    to: "/",
    lastmod: "2023/3/28",
    img: "page-image/main.webp",
    specialPage: true,
    tags: [],
  },
  {
    title: "TRPGって何？　TRPGの始め方まで詳しく解説",
    to: "/trpg",
    lastmod: "2023/4/7",
    osusume: true,
    img: "page-image/trpg.webp",
    tags: ["trpg"],
  },
  {
    title: "ソード・ワールド2.5とは",
    to: "/sw25",
    img: "page-image/about.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）というTRPGについて、簡潔にその魅力を紹介するページです。初心者向け情報やその他ソドワに役立つツール・情報へのリンクもあります。",
    lastmod: "2023/4/3",
    tags: ["sw25"],
  },
  {
    title: "ソード・ワールド2.5 新刊情報と刊行予想",
    to: "/sw25/new",
    img: "page-image/new.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）のサプリメントやリプレイなど関連書籍の新刊情報と刊行予想をまとめています。「ソドワの新刊っていつ出るの？」「今後はどんなサプリが出そうなの？」って方、必見です。",
    lastmod: "2023/4/6",
    tags: ["sw25_new", "sw25_moso"],
  },
  {
    title: "ソード・ワールド2.5 ツール一覧",
    to: "/sw25/tool",
    lastmod: "2023/3/1",
    img: "page-image/tool.webp",
    osusume: true,
    explain:
      "このサイトで公開しているTRPG用ツールの一覧を掲載しるページです。どれもソード・ワールド2.5（SW2.5）などのTRPGで役立つものです。判定シミュレータやオンラインセッション募集用画像作成ツールなど。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 判定シミュレータ",
    to: "/sw25/tool/simulate",
    lastmod: "2023/3/1",
    img: "page-image/simulate.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）のシミュレートできるページです。判定や達成値の比べ合い、ダメージの期待値がわかります。クリティカル（C値）にも対応しています。",
    tags: ["sw25", "tool"],
  },
  {
    title: "オンセ募集用画像作成ツール",
    to: "/sw25/tool/bosyu",
    lastmod: "2023/3/9",
    img: "page-image/bosyu.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）のオンラインセッション募集時に、過不足なく情報を伝えるための画像が作れるページです。過不足のない情報には応募者を増やす効果が期待できます。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 Twitterコミュニティ紹介",
    to: "/sw25/tool/community",
    lastmod: "2023/3/19",
    img: "page-image/community.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）に関するTwitterコミュニティの紹介ページです。ソドワを一緒に遊んでくれる人を探している方向けのものと、ソドワ雑談がしたい方向けのものがあります。",
    tags: ["sw25", "tool"],
  },
  {
    title: "オンラインセッション用素材",
    to: "/sw25/tool/material",
    lastmod: "2023/3/8",
    img: "page-image/material.webp",
    osusume: true,
    explain:
      "TRPG、特にソード・ワールド2.5（SW2.5）で遊ぶ際にココフォリアなどで使えるオンラインセッション用素材の紹介ページです。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 オリジナルデータ",
    to: "/sw25/data",
    img: "page-image/data.webp",
    lastmod: "2023/3/20",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）のオリジナルデータを掲載しているページです。管理人のしゃちほこ丸が作った魔物・アイテム・騎獣・流派などのデータがあります。",
    tags: ["sw25_moso", "me"],
  },
  {
    title: "SW2.5 初心者向け情報",
    to: "/sw25/forbeginner",
    img: "page-image/forbeginner.webp",
    lastmod: "2023/4/3",
    osusume: false,
    explain:
      "ソドワ初心者やTRPG初心者向けにソード・ワールド2.5（SW2.5）情報をまとめているページです。種族や技能の紹介、おすすめサプリメントの紹介、FAQや便利なリンクを掲載中です。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 種族の一覧と紹介",
    to: "/sw25/forbeginner/syuzoku",
    lastmod: "2023/4/3",
    img: "page-image/syuzoku.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）でキャラクターとして使える種族の一覧と、その紹介をしているページです。どのルールブック・サプリメントに載っているかも掲載しています。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 技能の一覧と紹介",
    to: "/sw25/forbeginner/ginou",
    lastmod: "2023/4/5",
    img: "page-image/ginou.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）でキャラクターが使える技能の一覧と、その紹介をしているページです。どのルールブック・サプリメントに載っているかも掲載しています。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 おすすめサプリメント紹介",
    to: "/sw25/forbeginner/suppliment",
    page: 5,
    lastmod: "2023/4/4",
    img: "page-image/suppliment.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）のおすすめサプリメント（拡張ルールブック）の紹介ページです。発売済みの全てのサプリメントについて、簡単な紹介と初心者へのおすすめ度を掲載しております。どれを・どれから買えばいいのか困っている方はご覧ください。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 初心者向けFAQ",
    to: "/sw25/forbeginner/faq",
    lastmod: "2023/4/3",
    img: "page-image/faq.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）の初心者の方がよく抱くだろう疑問に対する回答を載せています。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 初心者向け便利なリンク集",
    to: "/sw25/forbeginner/links",
    lastmod: "2023/4/3",
    img: "page-image/links.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）の初心者の方へ役立つだろうリンクを掲載しています。",
    tags: ["sw25"],
  },
  {
    title: "公開シナリオ一覧",
    to: "/scenario",
    lastmod: "2023/3/1",
    img: "page-image/scenario.webp",
    explain:
      "管理人しゃちほこ丸が公開しているTRPGシナリオの一覧です。ソード・ワールド2.5（SW2.5）やエモクロアTRPGのシナリオを公開しています。",
    tags: ["sw25", "scenario", "me"],
  },
  {
    title: "シナリオメモ「とろ〜りとした甘いやつ」",
    to: "/scenario/pudding",
    img: "scenario-image/pudding.webp",
    lastmod: "2023/3/18",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）のシナリオを公開しているページです。「プリン」の素材を求めてお使いに行きます。自分で回すように書いたメモと、回した際のセリフ等を以下にまとめております。",
    tags: ["sw25", "sw25_moso", "scenario"],
  },
  {
    title: "管理人プロフィール",
    to: "/me",
    lastmod: "2023/4/3",
    img: "page-image/me.webp",
    explain:
      "管理人しゃちほこ丸の自己紹介ページです。TRPGについてやTRPG以外の趣味（海外サッカー観戦やアニメ鑑賞など）をまとめています。",
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
      "管理人しゃちほこ丸が所持しているルールブック・サプリメントの一覧ページです。クトゥルフ神話TRPGやソード・ワールドなどのルールブックを所持しています。",
    tags: ["sw25", "me"],
  },
  {
    title: "ハウスルール",
    to: "/me/houserule",
    lastmod: "2023/3/1",
    img: "page-image/house.webp",
    explain:
      "管理人しゃちほこ丸が主催するTRPGセッションでのハウスルールを掲示しているページです。",
    tags: ["me"],
  },
  {
    title: "SW2.5 ハウスルール",
    to: "/me/houserule/sw25",
    lastmod: "2023/3/1",
    img: "page-image/house.webp",
    explain:
      "管理人しゃちほこ丸が主催するソード・ワールド2.5（SW2.5）のセッションでのハウスルールを掲示しているページです。",
    tags: ["sw25", "me"],
  },
  {
    title: "ブログ",
    to: "/blog",
    lastmod: "2023/3/15",
    explain:
      "ブログのトップページです。ブログでは管理人しゃちほこ丸がソード・ワールド2.5（SW2.5）などのTRPGの知見や感想、最新情報などを公開していきます。",
    tags: ["me"],
  },
  {
    title: "検索・ページ一覧",
    to: "/search",
    lastmod: "2023/3/28",
    specialPage: true,
    explain:
      "当ウェブサイトのページ一覧の確認や、サイト内検索ができるページです。",
    tags: [],
  },
  {
    title: "設定",
    to: "/setting",
    lastmod: "2023/3/1",
    specialPage: true,
    explain:
      "当ウェブサイトのライトモード/ダークモードの切り替え設定ができるページです。",
    tags: [],
  },
  {
    title: "サイトポリシー",
    to: "/policy",
    lastmod: "2023/3/29",
    specialPage: true,
    explain:
      "当ウェブサイトのサイトポリシーを掲載しています。本サイトはTRPGのファンサイトです。本サイトへのリンクは自由に掲載できます。Googleアナリティクスを使用しています。",
    tags: [],
  },
  {
    title: "コンタクト",
    to: "/contact",
    lastmod: "2023/3/15",
    specialPage: false,
    explain:
      "管理人しゃちほこ丸の連絡先メールアドレス及びTwitterアカウントを掲載しています。",
    tags: [],
  },
  {
    title: "エラーページ",
    to: "error",
    lastmod: "2023/3/1",
    hidden: true,
    explain: "エラーが発生した際に表示されるページです。",
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
