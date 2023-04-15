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
    lastmod: "2023/4/9",
    osusume: true,
    img: "page-image/trpg.webp",
    explain:
      "TRPG初心者向けに「TRPGとは何か」「TRPGの魅力」「TRPGの始め方」を詳しく解説しています。クトゥルフ神話TRPGなどのおすすめのTRPGシステムを5つ比較しながら解説します。「TRPGって何だろう？」「ルールブックを買ってみたけど誰と遊ぼう……」という方向け。TRPG経験者も「TRPGとは」を解説する際の参考に、ぜひみていってください。",
    tags: ["trpg"],
  },
  {
    title: "ソード・ワールド2.5とは",
    to: "/sw25",
    img: "page-image/about.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）というTRPGについて、簡潔にその魅力を紹介するページです。ソドワ初心者の方必見です。ファンタジーが好きな方、ソード・ワールド2.5で遊びましょう！　TRPG初心者向け情報やその他ソドワに役立つツール・情報へのリンクもあります。",
    lastmod: "2023/4/15",
    tags: ["sw25"],
  },
  {
    title: "ソード・ワールド2.5 新刊情報と刊行予想",
    to: "/sw25/new",
    img: "page-image/new.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）のサプリメントやリプレイなど関連書籍の新刊情報と刊行予想をまとめています。「ソドワの新刊っていつ出るの？」「今後はどんなサプリが出そうなの？」って方、必見です。",
    lastmod: "2023/4/15",
    tags: ["sw25_new", "sw25_moso"],
  },
  {
    title: "ソード・ワールド2.5 ツール一覧",
    to: "/sw25/tool",
    lastmod: "2023/4/15",
    img: "page-image/tool.webp",
    osusume: true,
    explain:
      "このサイトで公開しているTRPG用ツールの一覧を掲載しるページです。どれもソード・ワールド2.5（SW2.5）などのTRPGで役立つものです。公開中のツール：SW2.5自己紹介シート（画像メイカー）・SW2.5判定期待値&ダメージ期待値シミュレータ・オンラインセッション募集用画像作成ツール、など。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 自己紹介シート 画像メイカー&配布",
    to: "/sw25/tool/intro",
    lastmod: "2023/4/15",
    img: "page-image/intro.webp",
    osusume: true,
    hidden: false,
    explain:
      "ソード・ワールド2.5（SW2.5）の自己紹介シートを作ることができるページです。TwitterなどのSNSでシェアしてソドワに関する自己紹介をするのに使えます。ぜひ活用してください。",
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
    title: "TRPG オンラインセッション用素材",
    to: "/sw25/tool/material",
    lastmod: "2023/4/15",
    img: "page-image/material.webp",
    osusume: true,
    explain:
      "TRPG、特にソード・ワールド2.5（SW2.5）で遊ぶ際、ココフォリアなどで使えるイラスト素材を無料公開しています。現在公開しているもの：ダンジョンマップ素材・SW2.5冒険登録証・依頼書・『ユーシズ』サプリのボトルドールシート・冒険者ギルド支部のランチメニュー。基本オンセ用ですが、オフセでも使用できます。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 オリジナルデータ",
    to: "/sw25/data",
    img: "page-image/data.webp",
    lastmod: "2023/3/20",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5・ソドワ）のオリジナルデータを掲載しているページです。管理人のしゃちほこ丸が作った魔物・アイテム・騎獣・流派などのデータがあります。",
    tags: ["sw25_moso", "me"],
  },
  {
    title: "SW2.5 初心者向け情報",
    to: "/sw25/forbeginner",
    img: "page-image/forbeginner.webp",
    lastmod: "2023/4/15",
    osusume: false,
    explain:
      "ソドワ初心者・TRPG初心者向けのソード・ワールド2.5（SW2.5）情報をまとめているページです。種族や技能の一覧と紹介、おすすめサプリメントの紹介、FAQや便利なリンクを掲載中です。",
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
    title: "SW2.5 おすすめサプリメントランキング",
    to: "/sw25/forbeginner/suppliment/ranking",
    lastmod: "2023/4/17",
    img: "page-image/ranking.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5・ソドワ）のサプリメントの初心者向けおすすめ度ランキングを紹介！　4位：デモンズライン・3位：メイガスアーツ・2位：モンストラスロア。気になる1位は……？　どのサプリを買えばいいか迷っている人、必見です！",
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
    lastmod: "2023/4/15",
    img: "page-image/links.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5）の初心者の方へ役立つだろうリンクを多数掲載しています。ソドワ初心者の方はぜひご覧ください！",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 シナリオの探し方とおすすめシナリオ【初心者GM向け】",
    to: "/sw25/forbeginner/scenario",
    lastmod: "2023/4/15",
    img: "page-image/osusume-scenario.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5・ソドワ）の初心者GMの方向けに、シナリオを探す方法と無料公開されているおすすめシナリオを掲載しています。おすすめシナリオは初心者に限らず、経験者でも参考になるシナリオばかりです。「ソード・ワールド2.5のGMをやってみたい」「ソード・ワールド2.5のおすすめシナリオが知りたい」という方は必見です。",
    tags: ["sw25", "scenario"],
  },
  {
    title: "公開シナリオ一覧",
    to: "/scenario",
    lastmod: "2023/4/8",
    img: "page-image/scenario.webp",
    osusume: true,
    explain:
      "管理人しゃちほこ丸が公開しているTRPGのシナリオの一覧です。ソード・ワールド2.5（SW2.5）やエモクロアTRPGのシナリオを公開しています。TRPGでファンタジーな冒険をしましょう。",
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
    lastmod: "2023/4/12",
    img: "page-image/me.webp",
    explain:
      "管理人しゃちほこ丸の自己紹介ページです。TRPGについてやTRPG以外の趣味（海外サッカー観戦やアニメ鑑賞など）をまとめています。",
    osusume: false,
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
    lastmod: "2023/4/9",
    img: "page-image/house.webp",
    explain:
      "管理人しゃちほこ丸が主催するTRPGセッションでのハウスルールを掲示しているページです。TRPGにおけるトラブル防止のためのルールになっているのでよければ参考にしてください。",
    tags: ["me"],
  },
  {
    title: "SW2.5 ハウスルール",
    to: "/me/houserule/sw25",
    lastmod: "2023/4/9",
    img: "page-image/house.webp",
    explain:
      "管理人しゃちほこ丸が主催するソード・ワールド2.5（SW2.5）のセッションでのハウスルールを掲示しているページです。ソード・ワールド2.5におけるトラブル防止のためのルールになっているのでよければ参考にしてください。",
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
].map((page) => {
  if (new Date(page.lastmod + " GMT+0900").getTime() > new Date().getTime()) {
    page.osusume = false;
    page.hidden = true;
  }
  return page as PageSetting;
});

let count = 0;
const blogPageSettingList: PageSetting[] = (blogSettingList as Blog[])
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .map((b, i) => {
    const dateFlag =
      new Date(b.date + " GMT+0900").getTime() <= new Date().getTime();
    if (dateFlag) count++;
    return {
      title: b.title,
      to: "/blog/" + b.id,
      img: `blog-image/${b.id}\.webp`,
      lastmod: b.date,
      tags: b.tags.filter(isPageTag) as PageTag[],
      osusume: count <= 10 && dateFlag ? true : false,
      hidden: dateFlag ? false : true,
      explain:
        `「${b.title}」に関するブログ記事です。` +
        b.andml
          .replace(/&[^\s]*\s/g, "")
          .replace(/[\s_]/g, "")
          .replace(/\n/g, " &br ")
          .slice(0, 100) +
        `（公開日：${b.date}）`,
    };
  });

export const pageSettingList: PageSetting[] =
  normalPageSettingList.concat(blogPageSettingList);
