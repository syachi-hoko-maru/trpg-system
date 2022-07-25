export const scenarios = [
  {
    title: "ウォフト=ルーバの研究所跡",
    hidden: false,
    system: "ソード・ワールド2.5",
    status: "公開中",
    src: "hukyo.png", // "saborima.png",
    messages: [
      "僕自身が初心者への布教のために作り、何度か回したシナリオです。<br>初心者GMの方でも回しやすいシナリオとなっていると思います。",
      '遺跡へ行く探索モノのシナリオですが、裏テーマとして "たましい" があり、「エモい」と言ってもらえるものになっているかな、と考えております。',
      "<a href='https://campaign.talto.cc/talto_cal2022/calendar/' target='_blank'>TALTOシナリオカレンダー2022</a>の4月18日のシナリオです。",
      "ココフォリアの部屋データが付属しています。",
    ],
    buttons: [
      {
        url: "https://talto.cc/projects/NU47DZgkJ51cMVBsYv504",
        text: "TALTO",
      },
    ],
    special: [],
    data: ["2〜6人用（推奨4〜5人）", "4時間程度", "初期作成"],
  },
  {
    title: "サボり魔とトモダチと迷いの森",
    hidden: false,
    system: "ソード・ワールド2.5",
    status: "公開中",
    src: "saborima.png",
    messages: [
      "『魔導の学府 ユーシズ』で追加された〈ボトルドール〉を楽しむためのシナリオです。",
      "GMレスで、1人から遊ぶことができます。",
      "オンラインセッション用の素材が付属しています。",
    ],
    buttons: [
      {
        url: "https://talto.cc/projects/pzrYcCZuMTZh69bbSmj3T",
        text: "TALTO",
      },
    ],
    specials: ["GMレス"],
    data: ["1〜6人用", "2時間程度", "初期作成 or 2〜3レベル"],
  },
  {
    title: "Canción Azul（カンシオン アスール）",
    hidden: false,
    system: "エモクロアTRPG",
    status: "執筆中（7/18公開予定）",
    src: "cancionAzul.jpeg",
    messages: [
      "<a href='https://hydroxytrpg.booth.pm/items/3826115'  target='_blank'>非公式サプリメント「マギアスエイジ」</a>を使ったファンタジーものです。<br>マギアスエイジの舞台となるスブトゥリムの南端、「南の大海」に面する港町で、漁船の失踪事件を調査するシナリオとなります。",
      "<a href='https://twitter.com/fumidori75/status/1490988828873879553'  target='_blank'>#海の日TRPGシナリオ企画</a>に参加させていただくつもりです！",
    ],
    buttons: [
      {
        // url: "https://talto.cc/projects/pzrYcCZuMTZh69bbSmj3T",
        text: "TALTO",
      },
    ],
    specials: [],
    data: ["1〜4人用", "3〜4時間程度"],
  },
  {
    id: "magicSteamFestival",
    title: "Magic Steam Festival",
    hidden: false,
    system: "ソード・ワールド2.5",
    status: "執筆中（8/8公開予定）",
    src: "kitomaho.jpeg",
    messages: [
      "『鉄道の都 キングスフォール』掲載の大鉄道祭に関するシナリオにするつもりです。",
      "フェリシモ魔法部×二足獣企画さんによる<a href='https://www.felissimo.co.jp/mahoubu/kitomaho/  target='_blank''>「きっと魔法遣いだったあなたたちへ」</a>というシナリオ一斉投稿企画へ参加させていただくつもりで、準備を進めています。",
    ],
    buttons: [
      {
        // url: "https://talto.cc/projects/pzrYcCZuMTZh69bbSmj3T",
        text: "TALTO",
      },
    ],
    specials: [],
    data: ["3〜5人用", "3時間程度", "5〜6レベル向け"],
  },
  {
    id: "pudding",
    title: "とろ〜りとしたあまいやつ",
    hidden: false,
    system: "ソード・ワールド2.5",
    status: "自分で回す用",
    src: "pudding.png",
    messages: [
      "「プリン」の素材を求めてお使いに行くシナリオです。",
      "自分で回すように書いたメモと、回した際のセリフ等を以下にまとめております。もし興味と機会があれば回してみてください。",
      "オリジナル設定：<br>アルフレイム大陸における「プリン」は魔法生物プリン（オリジナル）を真似したもので、魔動機文明時代に作られたものです。現在では一部の人が好んで食べる高級品です。",
    ],
    buttons: [
      {
        url: "/myScenario/pudding",
        text: "シナリオメモ",
      },
    ],
    specials: [],
    data: ["2〜5人用", "2〜3時間程度", "3〜4レベル向け"],
  },
];

export const scenarioById = (id) => {
  return scenarios.filter((o) => o.id === id)[0];
};
