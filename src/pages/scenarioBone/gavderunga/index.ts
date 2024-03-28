import type { ScenarioBone, ScenarioEvent } from "..";
import { getNpcAndml, getNpcString } from "..";
import { setMonsterButtons } from "../exportMonster";
import { endingList } from "./ending";
import { gavderungaGolem } from "./monster";

import { mainNpcList } from "./npc";

const mainNpcNames: string[] = mainNpcList.map((n) => n.name);
type MainNpcType = (typeof mainNpcList)[number];
type Place =
  | "冒険者ギルド支部"
  | "グランドターミナル駅"
  | "魔動列車"
  | "魔動列車を降りた場所";

const researchPart: ScenarioEvent<Place, MainNpcType> = {
  name: "列車内で自由に過ごす（調査パート）",
  place: "魔動列車",
  description: [
    `列車に乗っているNPC4人（${mainNpcNames.join(
      "・"
    )}）と話すことができます。`,
    `NPCはそれぞれ3つの情報を持っています。うち2つは初めから聞くことができますが、 &em_残りの1つは他2つを聞かないと聞くことができません 。`,
    "&br",
    `合計4つの情報を聞くことができます。GMは「メタ的だが、4つの情報を聞いた後に何か起きそうである」ことを伝えてしまって構いません。`,
    "&br",
    `もし${mainNpcNames[0]}以外の3人（${mainNpcNames
      .slice(1)
      .join(
        "・"
      )}）全員と話した場合、 &em_3人目に話しかけた相手はオーガ に成り代わられています。もしPCが疑う場合には真偽判定を行ってください。
      &br
      もし正体を看破したり【バニッシュ】などを使用した場合にはオーガ（『II』p.377『ML』p.77）1体と戦闘になります。
      詳しくは後述の「オーガとの戦闘」を確認してください。`,
    "&&data_プレイヤーに共有すべき情報",
    "◇情報収集のルール",
    "4人のNPCが、各3つの情報を持ちます。1つは当人について、1つは秘宝についてです。もう1つは、そのNPCの情報を2つとも取得するまで、タイトルもわかりません。",
    "情報の取得によって、今後の展開が変わることがあります。",
    "4回、情報収集を行うか、ある条件を満たすとイベントが発生します。ひとまず4回は調査できるものとして、どの情報を聞くか決めてください。",
    "&br",
    "◇NPCと得られる情報",
    ...mainNpcList
      .reduce((p, n) => {
        p.push(`${n.name}（${getNpcString(n)[1]}）`);
        n.info.forEach((i) => {
          if (Object.hasOwn(i, "secret")) {
            p.push(`・？？？`);
          } else {
            p.push(`・${i.title}`);
          }
        });
        return p;
      }, [] as string[])
      .filter((s) => s),
    "&&&",
    "&3 各NPCの情報リスト",
    ...mainNpcList
      .reduce((p, n) => {
        p.push(`&4 ${n.name}`, getNpcString(n)[1]);
        n.info.forEach((info, i) => {
          if (Object.hasOwn(info, "secret")) {
            p.push(
              `&&tatami_秘密：${info.title}`,
              "&br",
              `この情報は、${n.name}の他の情報を全て得ている場合のみ、得ることができます。\n`
            );
          } else {
            p.push(`&&tatami_${info.title}`);
          }
          p.push(`&4 情報：${info.title}`, ...info.description);
          // 1つ目の情報であればNPCの情報をプレイヤーに伝える
          if (i === 0) {
            p.push(
              "&br",
              "皆さんは以下のことがわかります（この細かい技能は直接シナリオに関係するわけではありません）。",
              `${n.name}の技能`,
              ...n.gino.map(([g, l]) => `・${g}技能（${l}レベル）`)
            );
          }
          p.push("&&&");
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
3人のうち情報を得ていない人がいれば、そのうち1人がオーガ。複数いる場合にはGMがランダムに決定する。
&br
以降、オーガだったNPCは登場しない。

&3 戦闘の詳細
敵はオーガ（『II』p.377『ML』p.77）1体。
NPC3人が助けてくれるため、PCは手番の終わりに「2d6」回復する。`;

export const gavderungaBone: ScenarioBone<
  Place,
  "冒険者ギルド支部長" | "セバン" | MainNpcType
>[] = [
  {
    date: 1,
    time: ["夕方（15時〜18時）"],
    event: [
      {
        name: "依頼を受ける",
        place: "冒険者ギルド支部",
        description:
          "PCたちは冒険者ギルド支部〈 &ruby_薫風,くんぷう の空〉で幾度か冒険をし、手柄を立てた冒険者だ。 &br そんな君たちは、支部長から「ちょっと来てくれ」と声をかけられ、支部の応接室で「秘密の依頼」について説明される。 &br とある貴族からの依頼で、彼が持つ秘宝をキングスフォールから彼の別荘まで運ぶため、魔動列車に載って護衛をして欲しい、という依頼だ。 &br 受けることにすれば、明日朝5時にグランドターミナル駅へ向かい、依頼人の執事の「セバン」と会って指示を仰ぐように言われる。",
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
        description:
          "朝早く起きたPCたちは、支部長が用意した馬車に乗って始発前ののグランドターミナル駅へ向かう。依頼人の執事の「セバン」の案内で、ドーデン横断鉄道のホームに止まっている臨時列車〈鉄の黒獅子号〉に乗り込む。",
        npc: [...mainNpcList, "セバン"],
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
          "魔動列車に乗り込むと、セバンが「私が依頼人の執事で、臨時列車〈鉄の黒獅子号〉の車掌も務める「セバン」です。あなたたちへの依頼は極秘の超重要任務です。くれぐれも間違いがないよう、よろしくお願いしますよ。」と挨拶をする。",
          `その後、 ${getNpcAndml(
            mainNpcList[0]
          )} が真っ先に口を開き、自己紹介を始める。`,
          "&br",
          mainNpcList
            .map((n) => `${n.name}「${n.selfDescription}」`)
            .join(" &br &br "),
        ],
        npc: [...mainNpcList, "セバン"],
      },
      {
        name: "列車内で秘宝を確認",
        place: "魔動列車",
        description: [
          "セバンの案内で、隣の客車へ行き、秘宝を確認する。",
          "秘宝は直径15cmほどの球体で、見たものはまがまがしいオーラを感じる。",
          "セバンは「私が、この客車で秘宝を見張っておきますので、皆さんは隣の客車で過ごしてください。」と言い、PCたちを元の客車へ案内する。",
        ],
        npc: [...mainNpcList, "セバン"],
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
          "戦闘後は即座に次のイベント「秘宝がなくなる」が発生する。",
        ],
        npc: mainNpcList,
      },
      {
        name: "秘宝がなくなる",
        place: "魔動列車",
        description: [
          "戦闘後、魔動列車に影響があり、軽い火災となる。",
          "戦闘に気付いてやってきていたセバンの指示で、15分ほど、他の車両にある水などを使いながら、消火活動を行う。",
          "消化活動後に戦利品の決定を行っても良い。",
          "消火が終わり、魔動列車が再び動き出した後、秘宝のある客車へ戻ったセバンが「秘宝が！」と叫ぶ。",
          "セバンが戻ってきて「犯人はあなたたちの中にいます。2時間以内に犯人が見つからなければ、全員を処して秘宝をお返しいただきます。」と言う。PCは2時間以内に犯人を指摘しなければならない。",
        ],
        npc: [...mainNpcList, "セバン"],
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
        description: [
          "さらに追加で2回、調査を行うことができる。",
          "もし戦闘が昼の時間に行われていたなら、まだ行っていない分の情報調査回数分も含め行うことができる。",
        ],
        npc: mainNpcList,
      },
      {
        name: "犯人を指摘する",
        place: "魔動列車",
        description:
          "セバンが再び客車にきて、あなたたちに「犯人はわかりましたか？」と問う。PCたちは犯人を指摘せねばならない。",
        npc: [...mainNpcList, "セバン"],
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
          "敵は1体のみです。前線エリアに配置してください。もし上級戦闘で遊ぶ場合には先頭のPCから10mの位置に配置してください。",
          setMonsterButtons(gavderungaGolem),
        ],
        npc: mainNpcList,
      },
    ],
  },
  {
    title: "エンディング",
    event: [
      {
        name: "エンディング",
        place: "魔動列車を降りた場所",
        description: [
          "エンディングは場合によって変わります。",
          "&br",
          ...endingList.map((e, i) => `- &link_#end${i},${e.pattern}`),
          "&br",
          ...endingList
            .map((e, i) => [`&3 &id_end${i},${e.pattern}`, ...e.desc])
            .flat(),
        ],
        npc: [...mainNpcList, "セバン"],
      },
    ],
  },
];
