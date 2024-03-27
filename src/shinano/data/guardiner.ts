type EffectLikeMagicTarget =
  | "1体"
  | "1体全"
  | "1体X"
  | "儀式"
  | { range: number; max: number };
type EffectLikeMagic = {
  move: "主" | "補助" | "補助（戦闘準備）";
  mp: number;
  time: number | "一瞬" | "特殊";
  teiko: "必中" | "半減" | "消滅" | "任意" | "なし";
} & (
  | {
      target: "術者" | { range: number; max: number };
      range: "術者";
      form: "-";
    }
  | {
      target: EffectLikeMagicTarget;
      range: number;
      form: "起点指定" | "射撃" | "貫通" | "突進";
    }
  | {
      target: EffectLikeMagicTarget;
      range: "接触";
      form: "-";
    }
);
type Onmyojutsu = {
  name: string;
  ruby: string;
  type: "-" | "土" | "水・氷" | "火" | "風" | "光" | "闇";
  gaiyo: string;
  effect: string;
} & EffectLikeMagic &
  (
    | { gishiki?: false }
    | {
        gishiki: true;
        hatsudo: number;
        shiyo: number;
      }
  );
export const onmyojutsuData: {
  level: number;
  list: Onmyojutsu[];
}[] = [
  {
    level: 1,
    list: [
      {
        name: "妖祓儀",
        ruby: "ヨウフツノギ",
        type: "-",
        gaiyo: "妖を祓う力を味方に授ける。",
        move: "補助",
        mp: 2,
        target: "1体全",
        range: 10,
        form: "起点指定",
        time: 1,
        teiko: "任意",
        effect: "対象の近接攻撃が妖に命中するようになります。",
      },
      {
        name: "土幻壁",
        ruby: "ドゲンヘキ",
        type: "土",
        gaiyo: "土の幻で壁を作り味方を守る。",
        move: "主",
        mp: 3,
        target: { range: 5, max: 5 },
        range: 10,
        form: "起点指定",
        time: 3,
        teiko: "任意",
        effect: "対象の防護点を+1します。",
      },
      {
        name: "氷幻檻",
        ruby: "ヒョウゲンカン",
        type: "水・氷",
        gaiyo: "氷の幻で檻を作り妖の行動を封じる。",
        move: "主",
        mp: 3,
        target: "1体X",
        range: 10,
        form: "起点指定",
        time: 1,
        teiko: "消滅",
        effect:
          "対象となった妖は主動作のたびに1d6をし、2以下なら行動できなくなります。",
      },
      {
        name: "火幻丸",
        ruby: "カゲンガン",
        type: "火",
        gaiyo: "火の幻で砲丸を作り攻撃する。",
        move: "主",
        mp: 5,
        target: "1体",
        range: 20,
        form: "射撃",
        time: "一瞬",
        teiko: "半減",
        effect: "対象に「威力10+魔力」点の火属性の魔法ダメージを与えます。",
      },
      {
        name: "風幻温",
        ruby: "フウゲンオン",
        type: "風",
        gaiyo: "風の幻で味方を温め力を与える。",
        move: "主",
        mp: 3,
        target: "1体",
        range: 10,
        form: "起点指定",
        time: 2,
        teiko: "任意",
        effect: "対象のHPを「威力0+魔力」点だけ回復します。",
      },
      {
        name: "助式儀",
        ruby: "ジョシキノギ",
        type: "-",
        gaiyo: "儀式を行う。",
        move: "補助",
        mp: 1,
        target: "儀式",
        range: 10,
        form: "起点指定",
        time: 1,
        teiko: "なし",
        effect:
          "儀式の儀式達成値を2点上昇させます。この魔法は1ラウンドに1回だけ使用できます。",
      },
    ],
  },
  {
    level: 2,
    list: [
      {
        name: "土行豪壁",
        ruby: "ドギョウゴウヘキ",
        type: "土",
        gishiki: true,
        hatsudo: 7,
        shiyo: 3,
        gaiyo: "儀式による土の力で強固な壁を作り味方を守る。",
        move: "主",
        mp: 2,
        target: { range: 20, max: 10 },
        range: 10,
        form: "起点指定",
        time: 3,
        teiko: "任意",
        effect: "対象が妖から受けるダメージを全て-2点します。",
      },
      {
        name: "水幻泡",
        ruby: "スイゲンホウ",
        type: "水・氷",
        gaiyo: "水の幻で泡を作り水中での行動を可能にする。",
        move: "主",
        mp: 2,
        target: "1体全",
        range: "接触",
        form: "-",
        time: 6,
        teiko: "任意",
        effect:
          "対象は水中で呼吸ができるようになり、水中にいることによる制限を受けなくなります。",
      },
      {
        name: "火幻傷",
        ruby: "カゲンショウ",
        type: "火",
        gaiyo: "火の幻で火傷を負わせる。",
        move: "主",
        mp: 4,
        target: "1体",
        range: "接触",
        form: "-",
        time: 2,
        teiko: "消滅",
        effect:
          "対象は1点の火属性の魔法ダメージを受け、近接攻撃によって与えるダメージが-1点されます。",
      },
      {
        name: "風幻刃",
        ruby: "フウゲンジン",
        type: "風",
        gaiyo: "風の幻で刃を作り出しダメージを与える。",
        move: "主",
        mp: 4,
        target: "1体",
        range: 10,
        form: "起点指定",
        time: 2,
        teiko: "任意",
        effect:
          "対象に「威力0+魔力」点（クリティカル値：9）の風属性の魔法ダメージを与えます。",
      },
      {
        name: "即式儀",
        ruby: "ソクシキノギ",
        type: "-",
        gaiyo: "儀式を行う。",
        move: "主",
        mp: 1,
        target: "儀式",
        range: 10,
        form: "起点指定",
        time: 1,
        teiko: "なし",
        effect:
          "儀式の儀式達成値を「2d+ガーディナー技能レベル+精神抵抗力ボーナス」点上昇させます。",
      },
    ],
  },
  {
    level: 3,
    list: [
      {
        name: "水行清泉",
        ruby: "スイギョウセイセン",
        type: "水・氷",
        gishiki: true,
        hatsudo: 9,
        shiyo: 4,
        gaiyo: "儀式による水の力で味方を癒す。",
        move: "主",
        mp: 2,
        target: { range: 20, max: 10 },
        range: 10,
        form: "起点指定",
        time: 3,
        teiko: "任意",
        effect:
          "対象の受けている効果を、儀式達成値を達成値として解除を試みることができます。",
      },
      {
        name: "土幻根",
        ruby: "ドゲンコン",
        type: "土",
        gaiyo: "土の幻で根を張り回復する。",
        move: "主",
        mp: 3,
        target: "術者",
        range: "術者",
        form: "-",
        time: "特殊",
        teiko: "任意",
        effect: "対象は次の手番の開始時にHPを10点かMPを5点、回復します。",
      },
      {
        name: "火幻纏",
        ruby: "カゲンテン",
        type: "火",
        gaiyo: "火の幻を纏う。",
        move: "補助",
        mp: 3,
        target: "1体",
        range: "接触",
        form: "-",
        time: 1,
        teiko: "消滅",
        effect:
          "対象による近接攻撃または陰陽術を使用してダメージの決定に威力表を使用する時、威力を10増やす。",
      },
      {
        name: "風幻波",
        ruby: "フウゲンハ",
        type: "風",
        gaiyo: "風の幻で妖の存在を把握する。",
        move: "補助",
        mp: 3,
        target: { range: 50, max: 100 },
        range: "術者",
        form: "-",
        time: "一瞬",
        teiko: "必中",
        effect:
          "対象範囲内に妖がいるかどうかがわかります。どこにいるか、何体いるか、どんな妖かは分かりません。",
      },
    ],
  },
];
