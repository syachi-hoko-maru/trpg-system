import { iconImages } from "../dict/icons";
import { bookList } from "../dict/new";
import { fortuneScoreList } from "../simulater/omikuji";
import { isPast, sortByDate } from "../util/date";
import {
  blogPageSettingList,
  secretgPageSettingList,
} from "./blogPageSettingList";

export const pageSettingList: PageSetting[] = [
  {
    title: "トップページ",
    to: "/",
    lastmod: "2024/1/18",
    img: "page-image/main.webp",
    specialPage: true,
    tags: [],
    noamazon: true,
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
      "ソード・ワールド2.5（SW2.5/ソドワ）というTRPGについて、簡潔にその魅力を紹介するページです。ソード・ワールド2.5の魅力を「種族・技能の数の多さ」「世界観の充実」など5つ紹介。ソドワ初心者の方必見です。ファンタジーが好きな方、ソード・ワールド2.5で遊びましょう！　TRPG初心者向け情報やその他ソドワに役立つツール・情報へのリンクもあります。",
    lastmod: "2024/3/18",
    tags: ["sw25"],
  },
  {
    title: "ここが好き！ SW2.5",
    to: "/sw25/fav",
    img: "page-image/fav.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）というTRPGのさまざまな魅力を伝えるべく、いろいろな方法でソード・ワールド2.5を楽しんでいる皆さんにインタビューをしていくシリーズです。あなたなりの遊び方が見つかります！",
    lastmod: "2023/9/15",
    tags: ["sw25"],
  },
  {
    title: "ここが好き！ SW2.5  ゲスト：DKPさん",
    to: "/sw25/fav/dkp",
    img: "page-image/fav_dkp.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）というTRPGのさまざまな魅力を伝えるべく、「ナラティブTRPGとして遊ぶ」「オンラインコンベンションを開催」「シナリオを無料公開＆シナリオ集頒布」「世界観を深める」などなどいろいろな活動をしていらっしゃるDKPさんにインタビューしました。",
    lastmod: "2023/8/5",
    tags: ["sw25"],
  },
  {
    title: "ここが好き！ SW2.5  ゲスト：ハリィさん",
    to: "/sw25/fav/harry",
    img: "page-image/fav_harry.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）というTRPGのさまざまな魅力を伝えるべく、「ルールブックを買うとGMをしてくれる」「ハルーラガイドの作成」などの活動をしていらっしゃるハリィさんにインタビューしました。",
    lastmod: "2023/8/9",
    tags: ["sw25"],
  },
  {
    title: "ここが好き！ SW2.5  ゲスト：Dagonさん",
    to: "/sw25/fav/dagon",
    img: "page-image/fav_dagon.webp",
    imgdirs: ["other/dagon"],
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）というTRPGのさまざまな魅力を伝えるべく、「オリジナル大陸」「ソード・ワールド2.5雑談コミュニティ」などなどいろいろな活動をしていらっしゃる、アルヴを愛してやまないDagonさんにインタビューしました。",
    lastmod: "2023/9/15",
    tags: ["sw25"],
  },
  {
    title: "ここが好き！ SW2.5  ゲスト：たかはるさん",
    to: "/sw25/fav/takaharu",
    img: "page-image/fav_takaharu.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）というTRPGのさまざまな魅力を伝えるべく、「ハルーラガイド」「Welcome to らくしあ！」などなどいろいろな活動をしていらっしゃる、たかはるさんにインタビューしました。SW2.5のイラスト付きシナリオの無料公開もあります！",
    lastmod: "2023/10/15",
    tags: ["sw25"],
  },
  {
    title: "ソード・ワールド2.5 ツール一覧",
    to: "/sw25/tool",
    lastmod: "2023/4/15",
    img: "page-image/tool.webp",
    osusume: true,
    explain:
      "このサイトで公開しているTRPG用ツールの一覧を掲載しるページです。どれもソード・ワールド2.5（SW2.5/ソドワ）などのTRPGで役立つものです。公開中のツール：SW2.5自己紹介シート（画像メイカー）・SW2.5判定期待値&ダメージ期待値シミュレータ・オンラインセッション募集用画像作成ツール、など。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 自己紹介シート 画像メイカー&配布",
    to: "/sw25/tool/intro",
    // lastmod: "2023/4/15",
    lastmod: "2023/12/27",
    img: "page-image/intro.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）の自己紹介シートを作ることができるページです。TwitterなどのSNSでシェアしてソドワに関する自己紹介をするのに使えます。ぜひ活用してください。",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 判定シミュレータ",
    to: "/sw25/tool/simulate",
    lastmod: "2023/3/1",
    img: "page-image/simulate.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のシミュレートできるページです。判定や達成値の比べ合い、ダメージの期待値がわかります。クリティカル（C値）にも対応しています。",
    tags: ["sw25", "tool"],
    category: "forgm",
  },
  {
    title: "オンセ募集用画像作成ツール",
    to: "/sw25/tool/bosyu",
    lastmod: "2023/5/8",
    img: "page-image/bosyu.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のオンラインセッション募集時に、過不足なく情報を伝えるための画像が作れるページです。過不足のない情報には応募者を増やす効果が期待できます。テキスト出力にも対応しました。",
    tags: ["sw25", "tool"],
    category: "forgm",
  },
  {
    title: "SW2.5 Twitterコミュニティ紹介",
    to: "/sw25/tool/community",
    lastmod: "2023/3/19",
    img: "page-image/community.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）に関するTwitterコミュニティの紹介ページです。ソドワを一緒に遊んでくれる人を探している方向けのものと、ソドワ雑談がしたい方向けのものがあります。",
    tags: ["sw25", "tool"],
  },
  {
    title: "TRPG/SW2.5 オンラインセッション用素材",
    to: "/sw25/tool/material",
    lastmod: "2024/3/19",
    img: "page-image/material.webp",
    imgdirs: ["material"],
    osusume: true,
    explain:
      "TRPG、特にソード・ワールド2.5（SW2.5/ソドワ）で遊ぶ際、ココフォリアのルーム素材などとして使えるイラスト素材を無料公開しています。現在公開しているもの：ダンジョンマップ素材・SW2.5ルールサマリー・SW2.5冒険登録証・依頼書・『ユーシズ』サプリのボトルドールシート・冒険者ギルド支部のランチメニュー。基本オンラインセッション（オンセ）用ですが、オフセでも使用できます。",
    tags: ["sw25", "tool"],
    category: "forgm",
  },
  {
    title: "診断メイカーまとめ",
    to: "/sw25/tool/shindan",
    lastmod: "2023/6/7",
    img: "page-image/shindan.webp",
    osusume: true,
    explain:
      "TRPG、特にソード・ワールド2.5（SW2.5/ソドワ）関連の「診断メイカー」をいろいろ作ってきたので、これらをまとめて紹介します！　ランダムシナリオメイカーや異世界転生診断、ChatGPTを使ったTRPGシステムのアイデアなど。",
    tags: ["sw25", "tool"],
  },
  {
    title: "謹賀新年！ ソドワおみくじ！！",
    to: "/sw25/tool/omikuji",
    lastmod: "2024/1/6",
    img: "page-image/omikuji.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）の運勢を占う「ソドワおみくじ」です！ あなたの今年の運勢は？　相性の良い種族・技能は？　占ってみましょう。",
    tags: ["sw25", "tool"],
  },
  ...fortuneScoreList.map((f, i) => ({
    title: `謹賀新年！ SW2.ソドワおみくじ！！ ${f}`,
    to: `/sw25/tool/omikuji/result_${i}`,
    lastmod: "2024/1/6",
    img: `page-image/omikuji_${i}.webp`,
    osusume: false,
    noSearch: true,
    noGoogleIndex: true,
    explain: `あなたの今年の運勢は${f}！？　ソード・ワールド2.5（SW2.5/ソドワ）の運勢を占う「ソドワおみくじ」です！`,
    tags: ["sw25", "tool"],
  })),
  {
    title: "「祝5周年！　SW2.5フレーム」をアイコンにつけよう",
    to: "/sw25/tool/5anni",
    lastmod: "2023/7/9",
    img: "page-image/5anni.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）は2023年7月20日に5周年を迎えます！　これを記念したフレームをTwitterなどの丸型アイコンに付けることができるページです。ウェブサイト上でつけることもできますし、ダウンロードして使うこともできます。ぜひご利用ください。一緒にソード・ワールド2.5の5周年を盛り上げましょう！",
    tags: ["sw25", "tool"],
  },
  {
    title: "SW2.5 オリジナルデータ",
    to: "/sw25/data",
    img: "page-image/data.webp",
    lastmod: "2023/11/5",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のオリジナルデータを掲載しているページです。オリジナル魔物・オリジナルアイテム・オリジナル騎獣・オリジナル流派・オリジナル種族・オリジナル技能・オリジナル魔法・オリジナルルール……などのデータがあります。",
    tags: ["sw25_moso", "me"],
  },
  {
    title: "SW2.5 同人サプリメント「シナノシマ 妖との戦い」（仮）",
    to: "/sw25/data/shinano",
    img: "page-image/shinano.webp",
    lastmod: "2024/3/27",
    // osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）で和風ファンタジーを遊ぶために管理人が考えた舞台「シナノシマ」（いわゆるオリジナル大陸）の世界設定、そのオリジナル技能・オリジナル種族・オリジナル流派などを紹介します。ソード・ワールドにおけるオリジナル設定やオリジナル要素が好きな方はぜひご覧ください。",
    tags: ["sw25_moso", "me"],
  },
  {
    title: "SW2.5 オリジナル技能「ガーディナー」と陰陽術",
    to: "/sw25/data/shinano/guardiner",
    img: "page-image/shinano.webp",
    lastmod: "2024/3/28",
    // osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）におけるオリジナル技能、陰陽術という魔法を使って戦う「ガーディナー」技能についての解説ページです。ソード・ワールドにおけるオリジナル設定やオリジナル要素が好きな方はぜひご覧ください。",
    tags: ["sw25_moso", "me"],
  },
  {
    title: "SW2.5 オリジナル種族「クローリー」",
    to: "/sw25/data/shinano/crawley",
    img: "page-image/shinano.webp",
    lastmod: "2024/3/28",
    // osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）におけるオリジナル種族、鳥の姿を持つ「クローリー」についての解説ページです。ソード・ワールドにおけるオリジナル設定やオリジナル要素が好きな方はぜひご覧ください。",
    tags: ["sw25_moso", "me"],
  },
  {
    title: "ライのハーヴェスWALKER（ソード・ワールド2.5）",
    to: "/sw25/data/walker",
    img: "page-image/walker.webp",
    lastmod: "2024/3/14",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のハーヴェス周辺を、オリジナル設定たっぷりで、冒険者「ライ」が紹介します！",
    tags: ["sw25_moso"],
  },
  {
    title: '"ラグーンの村" ブラーラ @ライのハーヴェスWALKER',
    to: "/sw25/data/walker/blara",
    img: "page-image/walker_blara.webp",
    lastmod: "2024/3/14",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のハーヴェス周辺を、オリジナル設定たっぷりで、冒険者「ライ」が紹介します！",
    tags: ["sw25_moso"],
  },
  {
    title: "SW2.5 銭湯（せんとう）ルール",
    to: "/sw25/data/bath",
    img: "page-image/bath.webp",
    imgdirs: ["other/bath"],
    lastmod: "2023/10/11",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のオリジナル「せんとう」ルールとして作成した「銭湯ルール」を紹介しています。銭湯・温泉・公衆浴場・サウナ……での情報収集を行うためのルールです。ぜひシナリオに組み込んで、遊んでみてください！！",
    tags: ["sw25_moso", "me"],
  },
  {
    title: "SW2.5 初心者向け情報",
    to: "/sw25/forbeginner",
    img: "page-image/forbeginner.webp",
    lastmod: "2024/3/18",
    osusume: false,
    explain:
      "ソドワ初心者・TRPG初心者向けのソード・ワールド2.5（SW2.5/ソドワ）情報をまとめているページです。種族や技能などの一覧と紹介、一緒に遊ぶ人を探すのに役立つツール、おすすめサプリメントの紹介など。シナリオの準備の仕方などGM向けの情報もあり。FAQや便利なリンク集も掲載。",
    tags: ["sw25"],
  },
  /*
  {
    title: "SW2.5 キャラビルドのやり方をわかりやすく解説",
    to: "/sw25/forbeginner/build",
    lastmod: "2023/12/30",
    img: "page-image/build.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）でキャラクターのビルド（データ構成）の作り方を初心者向けにわかりやすく解説していきます。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 近接タイプの「考え方」",
    to: "/sw25/forbeginner/build/warrior",
    lastmod: "2023/12/30",
    img: "page-image/warrior.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）において、前線に出て敵と近い距離で戦うキャラクターを作る際に気をつけるべきことについて解説します。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 前衛に立つキャラクターについて",
    to: "/sw25/forbeginner/build/front",
    lastmod: "2023/12/30",
    img: "page-image/front.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）において、戦士以外も含む、前線に出るキャラクターを作る際に気をつけるべきことについて解説します。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 遠隔アタッカータイプの「考え方」",
    to: "/sw25/forbeginner/build/remote_attacker",
    lastmod: "2023/12/30",
    img: "page-image/remote_attacker.webp",
    osusume: true,
    explain: "",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 魔法使い系技能の使い方",
    to: "/sw25/forbeginner/build/magic",
    lastmod: "2023/12/30",
    img: "page-image/magic.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）で魔法使い系技能（ソーサラー・コンジャラー・プリースト・マギテック・フェアリーテイマー・ドルイド・デーモンルーラー）の使い方を初心者向けにわかりやすく解説していきます。もちろんマギシューやウィザードについても解説します。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 魔法アタッカータイプの「考え方」",
    to: "/sw25/forbeginner/build/magic_attacker",
    lastmod: "2023/12/30",
    img: "page-image/magic_attacker.webp",
    osusume: true,
    explain: "",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 ヒーラータイプの「考え方」",
    to: "/sw25/forbeginner/build/healer",
    lastmod: "2023/12/30",
    img: "page-image/healer.webp",
    osusume: true,
    explain: "",
    tags: ["sw25"],
  },*/
  {
    title: "SW2.5 種族の一覧と紹介",
    to: "/sw25/forbeginner/syuzoku",
    lastmod: "2023/9/14",
    img: "page-image/syuzoku.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）でキャラクターとして使える種族の一覧と、その紹介をしているページです。どのルールブック・サプリメントに載っているかも掲載しています。人間・エルフ・ドワーフなど、ルールブックIIやIIIで追加されるメリア・ティエンスなど、サプリメントで追加されるアルヴ・ソレイユ・スプリガン・アビスボーン・フロウライトなども掲載しています。希少種についても掲載しています！",
    tags: ["sw25"],
    category: "list",
  },
  {
    title: "SW2.5 技能の一覧と紹介",
    to: "/sw25/forbeginner/ginou",
    lastmod: "2024/1/18",
    img: "page-image/ginou.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）でキャラクターが使える技能の一覧と、その紹介をしているページです。どのルールブック・サプリメントに載っているかも掲載しています。",
    tags: ["sw25"],
    category: "list",
  },
  {
    title: "SW2.5 ラクシアの神の一覧と紹介",
    to: "/sw25/forbeginner/god",
    lastmod: "2024/1/12",
    img: "page-image/god.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）の舞台「ラクシア」の神の一覧と紹介のページです。ライフォス・ティダン・アステリア・ハルーラ・エイリャークなどなど……。掲載ルールブック・サプリメントも紹介！　旧版である「ソード・ワールド2.0」に登場した神も紹介！",
    tags: ["sw25"],
    category: "list",
  },
  {
    title: "SW2.5 オプションルールの一覧と紹介",
    to: "/sw25/forbeginner/optionrule",
    created: "2024/3/21",
    lastmod: "2024/3/21",
    img: "page-image/optionrule.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のオプションルールを紹介するです。サプリメントで追加された追加ルールの一覧を掲載。『エピックトレジャリー』掲載の「熟練戦闘」「ポイント割り振り」「トレジャードロップ」など。武具（武器・防具）の加工",
    tags: ["sw25"],
    category: "list",
  },
  {
    title: "SW2.5 流派の一覧と紹介",
    to: "/sw25/forbeginner/ryuha",
    created: "2024/1/21",
    lastmod: "2024/3/15",
    img: "page-image/ryuha.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）の流派の一覧と紹介ページです。戦闘特技などを拡張し、より複雑な戦闘スタイル等をデータで表わせるルール「流派」。登場サプリメントも全て掲載。ユーシズ・バトルマスタリー・ブルライト博物誌・ドーデン博物誌より。詳細説明・技能別おすすめ流派・YesNo診断あり。",
    tags: ["sw25"],
    category: "list",
  },
  {
    title: "SW2.5 おすすめサプリメント紹介",
    to: "/sw25/forbeginner/suppliment",
    page: [
      "はじめに",
      "大型サプリ",
      "キャラビルドサプリ",
      "ツアーサプリ",
      "バトルブックサプリ",
    ],
    lastmod: "2024/3/18",
    img: "page-image/suppliment.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のおすすめサプリメント（拡張ルールブック）の紹介ページです。発売済みの全てのサプリメントについて、簡単な紹介と初心者へのおすすめ度を掲載しております。どれを・どれから買えばいいのか困っている方はご覧ください。",
    tags: ["sw25"],
    category: "bookIntro",
  },
  {
    title: "SW2.5のおすすめサプリメントをランキング形式で紹介！",
    to: "/sw25/forbeginner/suppliment/ranking",
    lastmod: "2024/3/17",
    img: "page-image/ranking.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のサプリメントの初心者向けおすすめ度ランキングを紹介！　4位：デモンズライン等・3位：メイガスアーツ・2位：モンストラスロア。気になる1位は……？　どのサプリを買えばいいか迷っている人、必見です！",
    tags: ["sw25"],
    category: "bookIntro",
  },
  {
    title: "ルールブック・サプリメントは紙と電子書籍、どちらが良いの？",
    to: "/sw25/forbeginner/booktype",
    lastmod: "2023/10/12",
    img: "page-image/booktype.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のルールブックやサプリメントは紙と電子書籍のどっちが良いのか。どちらも使っている視点からメリット・デメリットを解説します。",
    tags: ["sw25"],
    category: "bookIntro",
  },
  {
    title: "「異世界冒険者ガイド」ってどんな本？",
    to: "/sw25/forbeginner/isekai",
    lastmod: "2023/5/11",
    img: "page-image/isekai.webp",
    osusume: true,
    explain:
      "グループSNEから出ている「異世界冒険者ガイド」シリーズについて、「どんな人におすすめ？」「どう役立つの？」を紹介します。ソード・ワールド2.5（SW2.5/ソドワ）に興味ある人にはとにかくおすすめです！　シリーズ3冊（「異世界冒険ガイド きみならどうする!?　はじめての冒険」「異世界武器ペディア ウェポンストーリーズ」「異世界冒険ガイド きみならどうする!?　街での冒険」）を全て紹介します。",
    tags: ["sw25"],
    category: "bookIntro",
  },
  {
    title: "SW2.5 ゆとシートの使い方を画像付きでわかりやすく解説！",
    to: "/sw25/forbeginner/ytsheet",
    lastmod: "2023/5/23",
    img: "page-image/ytsheet.webp",
    imgdirs: ["ytsheet"],
    osusume: true,
    explain:
      "キャラクターシートを作れるサービス「ゆとシート」の使い方を画像を使いながら紹介します。キャラクターシートの作り方をルールブックに添いながら説明していきます。ココフォリア（CCFOLIA）へのコマ出力の仕方やテキスト整形の仕方も説明します。ソード・ワールド2.5（SW2.5/ソドワ）の初心者必見です。",
    noamazon: true,
    tags: ["sw25"],
  },
  {
    title: "SW2.5 初心者向けFAQ",
    to: "/sw25/forbeginner/faq",
    lastmod: "2024/3/18",
    img: "page-image/faq.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）の初心者の方がよく抱くだろう疑問に対する回答を載せています。「ソード・ワールド2.5はクトゥルフ神話TRPG（CoC）とは関係がありますか？」「ソード・ワールド2.5を遊ぶのにルールブックは必須ですか？」「ソード・ワールド2.5と他のファンタジーTRPGとの違いはなんですか？」など",
    tags: ["sw25"],
  },
  {
    title: "SW2.5 初心者向け便利なリンク集",
    to: "/sw25/forbeginner/links",
    lastmod: "2023/4/15",
    img: "page-image/links.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）の初心者の方へ役立つだろうリンクを多数掲載しています。ソドワ初心者の方はぜひご覧ください！",
    tags: ["sw25"],
    noamazon: true,
  },
  {
    title: "SW2.5 シナリオの探し方とおすすめシナリオ【初心者GM向け】",
    to: "/sw25/forbeginner/scenario",
    lastmod: "2023/9/19",
    img: "page-image/osusume-scenario.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）の初心者GM向けに、「シナリオを探す方法」と「無料公開されているおすすめシナリオ」9本を紹介しています。おすすめシナリオは初心者に限らず、経験者でも参考になるシナリオばかりです。「HO（ハンドアウト）」やオリジナル大陸などの要素を持つシナリオも紹介しています。「ソード・ワールド2.5のGMをやってみたい」「ソドワのおすすめシナリオが知りたい」という方は必見です。",
    tags: ["sw25", "scenario"],
    noamazon: true,
    category: "forgm",
  },
  {
    title: "SW2.5特集",
    to: "/sw25/feature",
    created: "2023/12/30",
    lastmod: "2023/12/30",
    // img: "page-image/.webp",
    osusume: false,
    explain: "ソード・ワールド2.5についての特集ページです。",
    tags: ["sw25"],
  },
  {
    title: "女子高生×部活×SW2.5 無料マンガ だいすろーる！ 紹介",
    to: "/sw25/feature/comic",
    created: "2023/11/17",
    lastmod: "2024/1/23",
    img: "page-image/comic.webp",
    osusume: true,
    explain:
      "TRPGが登場する、グループSNE監修の無料マンガ「だいすろーる！」の紹介です！　ソード・ワールド2.5（SW2.5/ソドワ）がバンバン出てきます！　女子高生たちのゆるふわしたTRPGライフを漫画で読んで楽しみましょう。TRPGあるあるも多数！　ついにコミック単行本も発売！！",
    tags: ["sw25", "trpg"],
    category: "bookIntro",
  },
  {
    title: "ソード・ワールド2.5 新刊情報と刊行予想",
    to: "/sw25/feature/new",
    img: "page-image/new.webp",
    osusume: true,
    explain: `ソード・ワールド2.5（SW2.5/ソドワ）のサプリメントやリプレイなど関連書籍の新刊情報と刊行予想をまとめています。${bookList
      .filter((b) => !isPast(b.date))
      .map(
        (b) => `『${b.title}』（${b.dispDate ? b.dispDate : b.date}発売予定）`
      )
      .join(
        "・"
      )}。「ソドワの新刊っていつ出るの？」「今後はどんなサプリが出そうなの？」って方、必見です。`,
    lastmod: "2024/3/18",
    tags: ["sw25_new", "sw25_moso"],
    category: "bookIntro",
  },
  {
    title: "SW2.5 2023年に発売されたサプリメントや関連本のまとめ！！",
    to: "/sw25/feature/year2023",
    created: "2023/12/30",
    lastmod: "2023/12/30",
    img: "page-image/2023.webp",
    osusume: true,
    explain:
      "2023年に発売されたソード・ワールド2.5（SW2.5/ソドワ）のサプリメントやシナリオ集・リプレイ・関連本、計9冊をまとめて紹介します！　他にも2023年に起きたソード・ワールド関連のことをまとめています。",
    tags: ["sw25"],
  },
  {
    title: "SW2.5同人シナリオ集「冒険者の旅路」【C102】",
    to: "/sw25/feature/c102",
    lastmod: "2023/12/27",
    img: "projects/c102/book.webp",
    osusume: true,
    explain:
      "2023年の夏コミ（C102）でソード・ワールド2.5（SW2.5/ソドワ）の同人シナリオ集が出ました。現在、通販と電子版の頒布をしています。「冒険者の旅路」には4人の作者によるシナリオ6本とキャンペーン1本が掲載。初期作成〜14レベルまでの幅広いレベル帯で遊ぶことができます。企画：幻想書斎（DKP）、協力：灰かぶりのねずみ亭（たかはる）、後援：鳩麦開卓所（十一里あるく）。執筆：しゃちほこ丸・どっかのだれか・りあ・DKP、編集：DKP、表紙イラスト：たつみ。",
    tags: ["sw25", "scenario"],
  },
  {
    title: "めちゃくちゃ役立つ同人誌 『ハルーラガイド』を手に入れろ！",
    to: "/sw25/feature/harula",
    created: "2023/11/21",
    lastmod: "2023/12/27",
    img: isPast("2023/12/10")
      ? "page-image/harula.webp"
      : "page-image/harula_saihan.webp",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）の初心者GM向けの同人誌『ハルーラガイド』の紹介です。ゲームマスターをする際の「コツ」をコラム15個とそれに対応したシナリオ5本から解説してくださいます。めちゃくちゃ良い同人誌なのでぜひ手に取ってください。通販11月21日から12月10日まで！　電子版の頒布もされています。",
    tags: ["sw25", "scenario"],
    category: "forgm",
  },
  {
    title: "SW2.5いろいろな「一覧」",
    to: "/sw25/list",
    created: "2024/3/22",
    lastmod: "2024/3/22",
    // img: "page-image/.webp",
    osusume: false,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）について、いろいろなものの一覧ページです。種族・技能・神・流派・オプションルールなどの一覧を紹介します！",
    tags: ["sw25"],
  },
  {
    title: "SW2.5サプリメントとシナリオ集の一覧と紹介",
    to: "/sw25/list/supplimentlist",
    created: "2024/3/29",
    lastmod: "2024/3/29",
    img: "page-image/supplimentlist.webp",
    noGoogleIndex: true,
    osusume: false,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のサプリメント（拡張ルールブック）やシナリオ集の一覧と内容紹介をするページです。",
    tags: ["sw25"],
    category: "list",
  },
  {
    title: "SW2.5公式シナリオの一覧と紹介",
    to: "/sw25/list/scenariolist",
    created: "2024/4/5",
    lastmod: "2024/4/5",
    img: "page-image/scenariolist.webp",
    osusume: false,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のサプリメント（拡張ルールブック）やシナリオ集に掲載されている公式シナリオの一覧とレギュレーション（成長回数）を紹介をするページです。",
    tags: ["sw25"],
    category: "list",
  },
  {
    title: "SW2.5モノクロマティカの神の一覧と紹介",
    to: "/sw25/list/monochroGod",
    created: "2024/3/22",
    lastmod: "2024/3/22",
    img: "page-image/monochroGod.webp",
    osusume: false,
    explain:
      "ソーど・ワールド2.5サプリメント『泡沫世界モノクロマティカ』の舞台である「モノクロマティカ」に登場する5柱の神々について、契約印や祝福も含めて紹介します。",
    tags: ["sw25"],
    category: "list",
  },
  {
    title: "公開シナリオ一覧",
    to: "/scenario",
    lastmod: "2023/3/8",
    img: "page-image/scenario2.webp",
    imddirs: ["scenario-image"],
    osusume: true,
    explain:
      "管理人しゃちほこ丸が公開しているTRPGのシナリオの一覧です。ソード・ワールド2.5（SW2.5/ソドワ）やエモクロアTRPGのシナリオを無料で公開しています。TRPGでファンタジーな冒険をしましょう。",
    tags: ["sw25", "scenario", "me"],
  },
  {
    title: "シナリオ「ウォフト=ルーバの研究所跡」",
    to: "/scenario/uoht",
    img: "scenario-image/uoht/uoht4.webp",
    imddirs: ["scenario-image/uoht"],
    lastmod: "2023/10/1",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のシナリオ『ウォフト=ルーバの研究所跡』を無料公開中。初心者向けシナリオ。布教用シナリオ。初期作成。ネタバレフィルターあり。",
    tags: ["sw25", "scenario"],
  },
  {
    title: "シナリオ「ふきのとうを採りに」from 同人シナリオ集「冒険者の旅路」",
    to: "/scenario/fukinotou",
    img: "scenario-image/fukinotou.webp",
    imddirs: ["scenario-image/fukinotou"],
    lastmod: "2023/7/12",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のシナリオ『ふきのとうを採りに』を無料公開中。初心者向けシナリオで、2023年の夏コミ（C102）で頒布する同人誌『冒険者の旅路』のサンプルとなっています。ネタバレフィルターあり。",
    tags: ["sw25", "scenario"],
  },
  {
    title:
      "シナリオ「護送列車とガブディランガの秘宝」from シナリオ一斉投稿企画「#ドーデン冒険録」",
    to: "/scenario/gavderunga",
    img: "scenario-image/gavderunga.webp",
    imddirs: ["scenario-image/gavderunga"],
    created: "2024/4/1",
    lastmod: "2024/4/1",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のシナリオ『護送列車とガブディランガの秘宝』を無料公開中。舞台はドーデン地方。貴族の持つ秘宝を魔動列車で移動する。ネタバレフィルターあり。",
    tags: ["sw25", "scenario"],
  },

  {
    title: "シナリオメモ「とろ〜りとした甘いやつ」",
    to: "/scenario/pudding",
    img: "scenario-image/pudding.webp",
    imddirs: ["scenario-image/pudding"],
    lastmod: "2023/3/18",
    osusume: true,
    explain:
      "ソード・ワールド2.5（SW2.5/ソドワ）のシナリオを公開しているページです。「プリン」の素材を求めてお使いに行きます。自分で回すように書いたメモと、回した際のセリフ等を以下にまとめております。",
    tags: ["sw25", "sw25_moso", "scenario"],
  },
  {
    title: "ブログ",
    to: "/blog",
    img: "page-image/blog.webp",
    lastmod: "2023/9/19",
    explain:
      "ブログのトップページです。ブログでは管理人しゃちほこ丸がソード・ワールド2.5（SW2.5/ソドワ）などのTRPGの知見や感想、最新情報などを公開していきます。",
    tags: ["me"],
  },
  // ここにブログ記事をぶち込む
  ...blogPageSettingList,
  {
    title: "管理人プロフィール",
    to: "/me",
    lastmod: "2024/1/7",
    img: "page-image/me.webp",
    imgdirs: ["other/me"],
    explain:
      "管理人しゃちほこ丸の自己紹介ページです。TRPGについてやTRPG以外の趣味（海外サッカー観戦やアニメ鑑賞など）をまとめています。",
    osusume: false,
    tags: ["me"],
  },
  {
    title: "しゃちほこ丸ギャラリー",
    to: "/me/gallery",
    lastmod: iconImages
      .map((i) => i.date)
      .filter((d) => isPast(d))
      .sort(sortByDate(true))[0],
    img: "page-image/gallery.webp",
    imgdirs: ["icon-image"],
    explain: "管理人しゃちほこ丸の歴代アイコンを紹介するページです。",
    tags: ["me"],
  },
  {
    title: "しゃちほこ丸のスキル・経験",
    to: "/me/skills",
    created: "2024/1/15",
    lastmod: "2024/1/16",
    img: "page-image/me.webp",
    osusume: false,
    noSearch: true,
    noGoogleIndex: true,
    explain:
      "しゃちほこ丸（@syachi_hoko_trp）のスキルや経験に関するページ。ウェブプログラミング（Node.js/TypeScript/Vue）など。",
    tags: ["me", "tech"],
  },
  {
    title: "セッション",
    to: "/me/session",
    lastmod: "2023/4/28",
    // img: "page-image/me.webp",
    explain: "管理人しゃちほこ丸が主催するTRPGセッションに関するページです。",
    osusume: false,
    noSearch: true,
    noGoogleIndex: true,
    tags: ["me", "trpg"],
  },
  {
    title: "SW2.5マダミス『断ち切られるべき呪い』概要・募集要項",
    to: "/me/session/sw25murder",
    lastmod: "2023/4/28",
    img: "page-image/sw25murder.webp",
    explain:
      "ネタバレ無。ソード・ワールド2.5（SW2.5/ソドワ）×マーダーミステリー（マダミス）という最強の掛け算、『断ち切られるべき呪い』（ゲームマスタリーマガジン VOL.10 付録）をしゃちほこ丸が主催する際に確認していただくページです。",
    osusume: false,
    noSearch: true,
    noGoogleIndex: true,
    tags: ["me", "sw25"],
  },
  {
    title: "所持ルールブック一覧",
    to: "/me/rulebook",
    lastmod: "2023/9/12",
    img: "page-image/rulebook.webp",
    explain:
      "管理人しゃちほこ丸が所持しているルールブック・サプリメントの一覧ページです。クトゥルフ神話TRPG（CoC）やソード・ワールド（SW/ソドワ）、シノビガミやインセイン、アリアンロッドやダブルクロス（DX）などのルールブックを所持しています。",
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
    noamazon: true,
  },
  {
    title: "SW2.5 ハウスルール",
    to: "/me/houserule/sw25",
    lastmod: "2023/4/9",
    img: "page-image/house.webp",
    explain:
      "管理人しゃちほこ丸が主催するソード・ワールド2.5（SW2.5/ソドワ）のセッションでのハウスルールを掲示しているページです。ソード・ワールド2.5におけるトラブル防止のためのルールになっているのでよければ参考にしてください。",
    tags: ["sw25", "me"],
    noamazon: true,
  },
  {
    title: "検索・ページ一覧",
    to: "/search",
    img: "page-image/search.webp",
    lastmod: "2023/9/14",
    specialPage: true,
    noSearch: true,
    explain: "",
    tags: [],
  },
  {
    title: "設定",
    to: "/setting",
    lastmod: "2023/3/1",
    specialPage: true,
    noSearch: true,
    noGoogleIndex: true,
    explain:
      "当ウェブサイトのライトモード/ダークモードの切り替え設定ができるページです。",
    tags: [],
  },
  {
    title: "サイトポリシー",
    to: "/policy",
    lastmod: "2023/3/29",
    specialPage: true,
    noSearch: true,
    noGoogleIndex: true,
    explain:
      "当ウェブサイトのサイトポリシーを掲載しています。本サイトはTRPGのファンサイトです。本サイトへのリンクは自由に掲載できます。Googleアナリティクスを使用しています。",
    tags: [],
    noamazon: true,
  },
  {
    title: "コンタクト",
    to: "/me/contact",
    lastmod: "2023/9/14",
    specialPage: false,
    noSearch: true,
    noGoogleIndex: true,
    explain:
      "管理人しゃちほこ丸の連絡先メールアドレス及びTwitterアカウントを掲載しています。",
    tags: [],
    noamazon: true,
  },
  {
    title: "エラーページ",
    to: "error",
    lastmod: "2023/3/1",
    hiddenFlag: true,
    noSearch: true,
    noGoogleIndex: true,
    explain: "エラーが発生した際に表示されるページです。",
    tags: [],
    noamazon: true,
  },
  ...secretgPageSettingList,
] as PageSetting[];
// .map((page) => {
//   // 未来に公開予定のページはおすすめにせず、hiddenFlagにする
//   if (!isPast(page.lastmod)) {
//     page.osusume = false;
//     page.hiddenFlag = true;
//   }
//   return page as PageSetting;
// });
