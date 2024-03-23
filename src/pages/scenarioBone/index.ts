import { title } from "process";
import type { Gino } from "~/src/dict/ginou";
import type { RyuhaNames } from "~/src/dict/ryuha";
import type { SyuzokuWithRare } from "~/src/dict/syuzoku";

export type NpcData = {
  name: string;
  syuzoku?: SyuzokuWithRare;
  syuzokuDetail?: string;
  gender: "男" | "女";
  age?: number | "？";
  gino?: (Gino | [Gino, number] | [Gino, number, string[]])[];
  ryuha?: RyuhaNames;
  img?: string;
  description?: string;
  selfDescription?: string;
};

export type ScenarioBone<Place extends string, Npc extends string | NpcData> = {
  event: ScenarioEvent<Place, Npc>[];
} & ScenarioBoneBase;

type ScenarioBoneBase =
  | {
      date: number;
      time: (typeof timeBandList)[number][];
      title?: string;
    }
  | {
      date?: number;
      time?: (typeof timeBandList)[number][];
      title: string;
    };

export type ScenarioEvent<
  Place extends string,
  Npc extends string | NpcData
> = {
  name: string;
  place: Place;
  description: string | string[];
  npc: Npc[];
};

export type Monster = {
  name: string;
  initiative?: number;
  externalUrl?: string;
  /** ダウンロードしたHTMLのリンク（「html/ytsheet/」は省略する） */
  myUrl?: string;
  status: { label: string; value?: number; max: number }[];
  commands?: string;
};

export const timeBandList = [
  "未明（0時〜3時）",
  "早朝（3時〜6時）",
  "朝（6時〜9時）",
  "昼前（9時〜12時）",
  "昼過ぎ（12時〜15時）",
  "夕方（15時〜18時）",
  "夜のはじめ頃（18時〜21時）",
  "夜遅く（21時〜24時）",
] as const;

export const getSceneTitle = (b: ScenarioBoneBase): string => {
  if (typeof b.title === "string") {
    return b.title;
  } else if (typeof b.date === "number" && Array.isArray(b.time)) {
    return b.date + "日目" + b.time.join("・");
  } else {
    return "";
  }
};
export const getNpcAndml = (d: string | NpcData): string => {
  if (typeof d === "string") {
    return d;
  }
  const [name, details]: [string, string] = getNpcString(d);
  return `&npcInfo_${name}（${details}）,${details},${d.img},${d.description}`;
};

export const getNpcString = (d: string | NpcData): [string, string] => {
  if (typeof d === "string") {
    return [d, ""];
  }
  const details: string[] = [
    d.syuzoku ? d.syuzoku : "任意",
    d.gender,
    d.age ? d.age.toString() : "",
    getGino(d),
  ].filter((s) => s);
  return [d.name, details.join("/")];
};

const getGino = (d: NpcData): string => {
  return d.gino ? (Array.isArray(d.gino[0]) ? d.gino[0][0] : d.gino[0]) : "";
};
