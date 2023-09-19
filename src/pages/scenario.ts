import { isPast } from "../util/date";

export const scenarioData: ScenarioData[] = [
  {
    title: "ウォフト=ルーバの研究所跡",
    scenarioId: "uoht",
    author: "しゃちほこ丸",
    system: "ソード・ワールド2.5",
    explain: [
      "僕自身が初心者への布教のために作り、何度か回したシナリオです。 &br 初心者GMの方でも回しやすいシナリオとなっていると思います。",
      "&br",
      '遺跡へ行く探索モノのシナリオですが、裏テーマとして "たましい" があり、「エモい」と言ってもらえるものになっているかな、と考えております。',
      "&link_https://campaign.talto.cc/talto_cal2022/calendar/,TALTOシナリオカレンダー2022 の4月18日のシナリオです。",
      "&br",
      "ココフォリアの部屋データが付属しています。",
    ],
    img: "scenario-image/hukyo.webp",
    url: [
      {
        site: "TALTO",
        url: "https://talto.cc/projects/NU47DZgkJ51cMVBsYv504",
      },
      {
        site: "シナリオ（サイト内）",
        url: "/scenario/uoht",
        hidden: !isPast("2023/10/1"),
      },
    ],
    regulation: "初期作成",
  },
  {
    title: "ふきのとうを採りに",
    scenarioId: "fukinotou",
    author: "しゃちほこ丸",
    system: "ソード・ワールド2.5",
    explain: [
      "「冬の山には薬草がいっぱいあるんだ」",
      "「ある意味、宝の山だな」",
      "「でも、油断したら、だめだ」",
      "&br",
      "駆け出しの冒険者たちは冬山の冒険へ出ることになる",
      "&br",
      "このシナリオはC102で頒布する同人誌「冒険者の旅路」のサンプルです。",
    ],
    img: "scenario-image/fukinotou.webp",
    url: [
      {
        site: "シナリオ（サイト内）",
        url: "/scenario/fukinotou",
      },
    ],
    regulation: "3〜4レベル想定",
  },
  {
    title: "Magic Steam Festival",
    scenarioId: "kitomaho",
    author: "しゃちほこ丸",
    system: "ソード・ワールド2.5",
    explain: [
      "『鉄道の都 キングスフォール』掲載の「大鉄道祭」に向けて準備が進む街で、とある事件が起きます。",
      'そしてその事件には "不思議な存在" が関わっていて……？',
      "&br フェリシモ魔法部×二足獣企画さんによる &link_https://www.felissimo.co.jp/mahoubu/kitomaho/,「きっと魔法遣いだったあなたたちへ」 というシナリオ一斉投稿企画へ参加させていただきました。",
    ],
    img: "scenario-image/kitomaho.webp",
    url: [
      {
        site: "TALTO",
        url: "https://talto.cc/projects/oO16TqB_oI8Su7LvlpVOm",
      },
    ],
    regulation: "初期作成",
  },
  {
    title: "Canción Azul　蒼の歌",
    scenarioId: "cancionAzul",
    author: "しゃちほこ丸",
    system: "エモクロアTRPG",
    explain: [
      "&link_https://hydroxytrpg.booth.pm/items/3826115,非公式サプリメント「マギアスエイジ」 を使ったファンタジーものです。 &br マギアスエイジの舞台となるスブトゥリムの南端、「南の大海」に面する港町で、漁船の失踪事件を調査するシナリオとなっています。",
      "&link_https://twitter.com/fumidori75/status/1490988828873879553,#海の日TRPGシナリオ企画 に参加させていただきました。",
    ],
    img: "scenario-image/cancionAzul.webp",
    url: [
      {
        site: "TALTO",
        url: "https://talto.cc/projects/Cv8Ixts-8BMMCVVAO5yVq",
      },
    ],
  },
  {
    title: "とろ〜りとした甘いやつ",
    scenarioId: "pudding",
    author: "しゃちほこ丸",
    system: "ソード・ワールド2.5",
    explain: [
      "「プリン」の素材を求めてお使いに行くシナリオです。",
      "自分で回すように書いたメモと、回した際のセリフ等を以下にまとめております。もし興味と機会があれば回してみてください。",
      "オリジナル設定：",
      "アルフレイム大陸における「プリン」は魔法生物プリン（オリジナル）を真似したもので、魔動機文明時代に作られたものです。現在では一部の人が好んで食べる高級品です。",
    ],
    img: "scenario-image/pudding.webp",
    url: [
      {
        site: "シナリオメモ（サイト内）",
        url: "/scenario/pudding",
      },
    ],
    regulation: "3〜4レベル想定",
  },
];
