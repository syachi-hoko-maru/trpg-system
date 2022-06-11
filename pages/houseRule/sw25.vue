<template lang="pug">
div
  SyachiCard(title="使用可能サプリ")
    p 原則、以下のサプリが使用可能です。
    ul
      li エピックトレジャリー（ET）
      li モンストラスロア（ML）
      li アウトロープロファイルブック（OPB）
      li メイガスアーツ（MA）
    p 以下の収録データはCPごとに、他のPL次第で可能です。
    ul
      li キングスフォール（KF）・サイレックオード（CO）収録データ
      li ヴァイスシティ（VC）・デモンズライン（DL）収録データ
      li GMウォーロック vol.1収録データ
      li リプレイ（魔神使いと影光の学舎 1,2）収録データ
      li 小魔法データ（MA収録分）
    p SW2.0関連はセッションごとに、他のPL次第で以下を参照可能です。（僕が所持しています。）
    ul 
      li 基本ルールブックI〜III・EX
      li バルバロスブック（BB）・ラクシアゴッドブック（RGB）
      li カルディアグレイス（CG）・イグニスブレイズ（IB）・ルミエルレガシィ（LL）・フォルトナコード（FC）
      li ディルフラム博物誌
      li エイジオブグリモワール（AoG）
      li フェアリーガーデン
    p ※ 基本ルールブックIを持っていない場合、サンプルキャラクターでの参加をお願いします。

  SyachiCard(title="選択ルール")
    ul
      li 戦闘ルールは上級 or 基本
      li 剣の恩寵は不採用

  SyachiCard(title="キャラクター作成")
    p キャラクター作成に関して、以下をおまもりください。
    ul
      li キャラクターシートは原則として<a href="https://yutorize.2-d.jp/ytsheet/sw2.5/?mode=making">ゆとシート</a>を使用
      li 能力値は特に指定がない場合、5回振り（セッションによっては3回）まで
        ul 
          li 振る際は<a href="https://yutorize.2-d.jp/ytsheet/sw2.5/?mode=making">ゆとシートのキャラクター能力値作成</a>を使用
          li ETの割り振りの使用もOK（ダイスを振ってからでも可能）
      li 初期作成以外で発生する能力値成長は、最大値がその回数の半分以下になるように自由に割り振りしてOK
        ul
          li 36回以上成長する場合、最低値がその回数の1/36（切り捨て）以上になるようにする

  SyachiCard
    Button(url="/houseRule", text="ハウスルールへ戻る")
</template>

<script lang="ts">
import Vue from "vue";
import SyachiCard from "@/components/util/SyachiCard.vue";
import TwitterLink from "@/components/util/TwitterLink.vue";
import Button from "@/components/util/Button.vue";

export default Vue.extend({
  name: "ScenariosPage",
  components: {
    SyachiCard,
    TwitterLink,
    Button,
  },
});
</script>