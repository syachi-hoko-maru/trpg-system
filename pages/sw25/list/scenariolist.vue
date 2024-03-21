<template>
  <CardArrayByAndml :andml="andml1" />
</template>

<script setup lang="ts">
import { rulebooksAndSuppliments } from "~/src/dict/suppliments/rulebook";
import { gameTypeDict } from "~/src/dict/suppliments/suppliment";
import { pageSettingList } from "~/src/pages/pageSettingList";

const scenarioList: string[][] = rulebooksAndSuppliments.reduce((pre, curr) => {
  // シナリオとソロアドベンチャー
  curr.contents.data?.forEach((d) => {
    if (typeof d === "string") return;
    // シナリオ
    if (d.type === "scenario" && d.list.length) {
      pre.push(
        ...d.list.map((l) =>
          [
            `&3「${l.title}」`,
            `-『${curr.name}』掲載`,
            `-${l.reguration ? `成長回数${l.reguration}回` : `初期作成`}`,
          ].filter((s) => s)
        )
      );
    }
  });
  // タイトル以外のコンテンツがあれば追加
  return pre;
}, [] as string[][]);

const campaignList: string[][] = rulebooksAndSuppliments.reduce((pre, curr) => {
  if (curr.contents.campaign) {
    pre.push([
      `&3 ${curr.name}`,
      `&4 ゲーム形式`,
      `${curr.contents.campaign.gameType}形式`,
      ...gameTypeDict[curr.contents.campaign.gameType],
      `&4 概要`,
      ...curr.contents.campaign.explain,
    ]);
  }
  return pre;
}, [] as string[][]);
const soloList: string[][] = rulebooksAndSuppliments.reduce((pre, curr) => {
  // シナリオとソロアドベンチャー
  curr.contents.data?.forEach((d) => {
    if (typeof d === "string") return;
    // ソロアドベンチャー
    if (d.type === "soloAdventure" && d.list.length) {
      pre.push(
        ...d.list.map((l) =>
          [
            `&3「${l.title}」`,
            `-『${curr.name}』掲載`,
            `-${l.reguration ? `成長回数${l.reguration}回` : `初期作成`}`,
            l.createdCharacter ? "- 作成済みキャラクターを使用" : "",
            l.ruleless ? "- ルールブック不要" : "",
          ].filter((s) => s)
        )
      );
    }
  });
  // タイトル以外のコンテンツがあれば追加
  return pre;
}, [] as string[][]);

const andml1 = `
&1 このページについて
このページではソード・ワールド2.5（SW2.5/ソドワ）の &em_公式シナリオ を紹介します！
ルールブック・サプリメント（拡張ルールブック）・シナリオ集 に掲載された公式シナリオ（とキャンペーン・ソロアドベンチャー）合計 &em_${
  scenarioList.length + campaignList.length + soloList.length
}種類 を &em_レギュレーション込み で全て紹介します！
&br
「こういうレベル帯のシナリオが欲しい……！」
「あのシナリオって何に載ってるんだっけ？」
という方の参考になれば幸いです！
&br
『GMウォーロック』などムックや雑誌に掲載されたシナリオまでは網羅できていません。その点ご承知おきください。

&1 サプリメント別のシナリオ一覧
以下ではサプリメント（とシナリオ集）別にシナリオの一覧を掲載します。
下記にはレギュレーション別のシナリオ一覧もありますので、合わせてご覧ください。
&br
${rulebooksAndSuppliments
  .reduce((pre, curr) => {
    /** このサプリメントのシナリオ一覧 */
    const result: string[] = [];
    // キャンペーン
    if (curr.contents.campaign) {
      result.push(
        `-- キャンペーン「${curr.name}」（${curr.contents.campaign.gameType}形式）`
      );
    }
    // シナリオとソロアドベンチャー
    curr.contents.data?.forEach((d) => {
      if (typeof d === "string") return;
      // シナリオ
      if (d.type === "scenario") {
        result.push(
          ...d.list.map(
            (l) =>
              `-- 「${l.title}」（${
                l.reguration ? `成長回数${l.reguration}回` : `初期作成`
              }）`
          )
        );
      }
      // ソロアドベンチャー
      if (d.type === "soloAdventure" && d.list.length) {
        result.push(
          `- ソロアドベンチャー`,
          ...d.list.map(
            (l) =>
              `--「${l.title}」（${
                l.reguration ? `成長回数${l.reguration}回` : `初期作成`
              }${l.createdCharacter ? "・作成済みキャラクターを使用" : ""}${
                l.ruleless ? "・ルールブック不要" : ""
              }）`
          )
        );
      }
    });
    // タイトル以外のコンテンツがあれば追加
    if (result.length > 0) {
      pre.push(`&4 ${curr.name}`, ...result);
    }
    return pre;
  }, [] as string[])
  .join("\n")}
&1 レギュレーション別のシナリオ一覧
ここにはソロアドベンチャーとキャンペーンは掲載していません。
${rulebooksAndSuppliments
  .reduce((pre, curr) => {
    curr.contents.data?.forEach((d) => {
      if (typeof d === "string") return;
      // シナリオ
      if (d.type === "scenario") {
        pre.push(
          ...d.list.map((l) => {
            return { ...l, book: curr.name };
          })
        );
      }
    });
    return pre;
  }, [] as { title: string; reguration: number; book: string }[])
  .sort((a, b) => a.reguration - b.reguration)
  .reduce((pre, curr, i, all) => {
    if (i === 0 || all[i - 1].reguration !== curr.reguration) {
      pre.push(
        `&3 ${curr.reguration ? `成長回数${curr.reguration}回` : "初期作成"}`
      );
    }
    pre.push(`- 「${curr.title}」 &br 『${curr.book}』掲載`);
    return pre;
  }, [] as string[])
  .join("\n")}

&1 キャンペーン一覧
以下がキャンペーン（連なるシナリオ）の一覧です。
ただし、2〜3話のいわゆるショートキャンペーンは上記の「レギュレーション別のシナリオ一覧」に掲載しています。
${campaignList.flat().join("\n")}

&1 ソロアドベンチャー一覧
ソロアドベンチャーとは &em_GMなし で &em_1人で 遊ぶことができるシナリオです。
${soloList.flat().join("\n")}

&1 他の「一覧」ページ
種族・技能からオプションルールなど、いろいろな一覧をまとめています。
${pageSettingList
  .filter((p) => p.category === "list")
  .map((p) => `&button_${p.to}`)
  .join("\n")}
`;
</script>
