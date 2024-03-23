import type { Monster } from ".";

export const getChatPalette = (monster: Monster): string => {
  if (!monster.commands) {
    return "";
  }
  if (typeof monster.commands === "string") {
    return monster.commands;
  }
  const arr: string[] = [];
  return arr.join("");
};

export const getCharacter = (monster: Monster): string => {
  const obj = {
    kind: "character",
    data: {
      name: monster.name,
      playerName: "GM",
      memo: "",
      initiative: monster.initiative ? monster.initiative : -1,
      externalUrl: monster.externalUrl
        ? monster.externalUrl
        : "https://trpg.syachi.work/",
      status: monster.status,
      params: [
        { label: "生命抵抗修正", value: "0" },
        { label: "精神抵抗修正", value: "0" },
        { label: "回避修正", value: "0" },
        { label: "命中修正", value: "0" },
        { label: "打撃修正", value: "0" },
      ],
      faces: [],
      x: 0,
      y: 0,
      z: 0,
      angle: 0,
      width: 4,
      height: 4,
      active: true,
      secret: false,
      invisible: false,
      hideStatus: false,
      color: "",
      roomId: null,
      commands: monster.commands,
      speaking: true,
    },
  };
  return JSON.stringify(obj);
};

export const setMonsterButtons = (monster: Monster): string => {
  const result: string[] = [];
  if (monster.externalUrl)
    result.push(`&button_${monster.externalUrl} 敵データ（ゆとシート）`);
  /**
  if (monster.myUrl)
    result.push(
      `&button_https://trpg.syachi.work/html/ytsheet/${monster.myUrl} 敵データ（ゆとシート出力HTML）`
    ); */
  if (getChatPalette(monster))
    result.push(
      `&copy_${getChatPalette(monster).replace(
        /\s/g,
        "¥s"
      )} ココフォリア用のチャットパレットをコピーする`
    );
  result.push(
    `&copy_${getCharacter(monster).replace(
      /\s/g,
      "¥s"
    )} ココフォリア用のコマデータをコピーする`
  );
  return result.join("\n");
};
