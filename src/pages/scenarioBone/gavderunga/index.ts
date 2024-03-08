import type { ScenarioBone, ScenarioEvent } from "..";
import { getNpcAndml, getNpcString } from "..";

import { mainNpcList } from "./npc";

const mainNpcNames: string[] = mainNpcList.map((n) => n.name);
type MainNpcType = (typeof mainNpcList)[number];
type Place = "冒険者ギルド支部" | "グランドターミナル駅" | "魔動列車";

const researchPart: ScenarioEvent<Place, MainNpcType> = {
  name: "列車内で自由に過ごす（調査パート）",
  place: "魔動列車",
  description: [
    `列車に乗っているNPC4人（${mainNpcNames.join(
      "・"
    )}）と話すことができます。`,
    `NPCはそれぞれ3つの情報を持っています。うち2つは初めから聞くことができますが、 &em_残りの1つは他2つを聞かないと聞くことができません 。`,
    "&br",
    `昼前と昼過ぎの2回で、それぞれ2つ、合計4つの情報を聞くことができます。`,
    "&br",
    `もし${mainNpcNames[0]}以外の3人（${mainNpcNames
      .slice(1)
      .join(
        "・"
      )}）全員と話す場合、 &em_3人目に話しかけた相手はオーガ に成り代わられています。もしPCが疑う場合には真偽判定を行ってください。
      &br
      もし正体を看破したり【バニッシュ】などを使用した場合にはオーガ（『II』p.377『ML』p.77）1体と戦闘になります。
      詳しくは後述の「オーガとの戦闘」を確認してください。`,
    ...mainNpcList
      .reduce((p, n) => {
        p.push(`&3 ${n.name}`, getNpcString(n)[1]);
        n.info.forEach((i) => {
          if (Object.hasOwn(i, "secret")) {
            p.push(
              `&&tatami_秘密：${i.title}`,
              "&br",
              `この情報は、${n.name}の他の情報を全て得ている場合のみ、得ることができます。\n`
            );
          } else {
            p.push(`&&tatami_${i.title}`);
          }
          p.push(`&4 情報：${i.title}`, ...i.description, `&&&`);
        });
        return p;
      }, [] as string[])
      .filter((s) => s),
  ],
  npc: mainNpcList,
};

const monster = `
&3 オーガが化けていた人
オーガが化けていたのは${mainNpcNames[0]}以外の3人（${mainNpcNames
  .slice(1)
  .join("・")}）のうちの1人。
&br
すでに3人全員から情報を得ているのであれば、最後に話した人がオーガ。
3人のうち情報を得ていない人がいれば、そのうち1人がオーガ。複数いる場合にはランダムに決定する。
&br
以降、オーガだったNPCは登場しない。

&3 戦闘の詳細
敵はオーガ（『II』p.377『ML』p.77）1体。
NPC3人が助けてくれるため、PCは手番の終わりに「2d6」回復する。`;

export const gavderungaBone: ScenarioBone<
  Place,
  "冒険者ギルド支部長" | MainNpcType
>[] = [
  {
    date: 1,
    time: ["夕方（15時〜18時）"],
    event: [
      {
        name: "依頼を受ける",
        place: "冒険者ギルド支部",
        description: "",
        npc: ["冒険者ギルド支部長"],
      },
    ],
  },
  {
    date: 2,
    time: ["早朝（3時〜6時）"],
    event: [
      {
        name: "列車に乗り込む",
        place: "グランドターミナル駅",
        description: "",
        npc: mainNpcList,
      },
    ],
  },
  {
    date: 2,
    time: ["朝（6時〜9時）"],
    event: [
      {
        name: "列車の乗員と自己紹介をかわす",
        place: "魔動列車",
        description: [
          `魔動列車に乗ると、 ${getNpcAndml(
            mainNpcList[0]
          )} が真っ先に口を開き、自己紹介を始めます。`,
          "&br",
          mainNpcList
            .map((n) => `${n.name}「${n.selfDescription}」`)
            .join(" &br &br "),
        ],
        npc: mainNpcList,
      },
      {
        name: "列車内で秘宝を確認",
        place: "魔動列車",
        description: [
          "依頼主の執事で車掌の「セバン」の案内で秘宝を確認します。",
          "秘宝は直径50cmほどの球体で、見たものはまがまがしいオーラを感じることでしょう。",
        ],
        npc: mainNpcList,
      },
    ],
  },
  {
    date: 2,
    time: ["昼前（9時〜12時）", "昼過ぎ（12時〜15時）"],
    event: [researchPart],
  },
  {
    date: 2,
    time: ["夕方（15時〜18時）"],
    event: [
      {
        name: "オーガとの戦闘",
        place: "魔動列車",
        description: [
          `${getNpcAndml(
            mainNpcList[0]
          )} が神聖魔法【バニッシュ】を使用し、オーガとの戦闘になる。`,
          monster,
          "&3 戦闘後",
          "もし戦闘が昼の時間に行われていたなら、まだ行っていない分の情報調査を行うことができる。",
        ],
        npc: mainNpcList,
      },
      {
        name: "秘宝がなくなる",
        place: "魔動列車",
        description: [""],
        npc: mainNpcList,
      },
    ],
  },
  {
    date: 2,
    time: ["夜のはじめ頃（18時〜21時）"],
    event: [
      {
        name: "犯人を推理する（調査パート）",
        place: "魔動列車",
        description: "",
        npc: mainNpcList,
      },
      {
        name: "犯人を指摘する",
        place: "魔動列車",
        description: "",
        npc: mainNpcList,
      },
      {
        name: "犯人と戦う（ボス戦）",
        place: "魔動列車",
        description: [
          "犯人を指摘すると、指摘があっていたかを問わず、犯人が名乗り出る。",
          "犯人がその目的を告げ、「ガブディランガの秘宝」を取り出す。",
          "&br",
          "突然、「ガブディランガの秘宝」は禍々しいオーラを放ち、回転を始めた。",
          "&br",
          "刹那、黒き雷鳴が轟く。",
          "魔動列車は火に包まれる。",
          "&br",
          "－戦闘開始－",
          "&br",
        ],
        npc: mainNpcList,
      },
    ],
  },
  {
    title: "エンディング",
    event: [
      {
        name: "冒険者ギルド支部への帰還",
        place: "冒険者ギルド支部",
        description: "",
        npc: ["冒険者ギルド支部長"],
      },
      {
        name: "リザルト",
        place: "冒険者ギルド支部",
        description: "",
        npc: [],
      },
    ],
  },
];
