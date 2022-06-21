<template lang="pug">
div
  SyachiCard#sw25(title="ソード・ワールド2.5 ハウスルール")
  SyachiCard(title="使用可能サプリ")
    p 原則、以下のサプリが使用可能です。
    ul
      li エピックトレジャリー（ET）
      li モンストラスロア（ML）
      li アウトロープロファイルブック（OPB）
      li メイガスアーツ（MA）
    MiniTitle その他のサプリメント
    p 以下の収録データはCPごとに、他のPL次第で可能です。
    ul
      li グランゼール・キングスフォール・サイレックオード・ユーシズ収録データ
      li ヴァイスシティ・デモンズライン収録データ
      li GMウォーロック vol.1収録データ
      li リプレイ（魔神使いと影光の学舎 1,2）収録データ
      li 小魔法データ（MA収録分）
    MiniTitle SW2.0のルールブック・サプリメント
    p SW2.0関連はセッションごとに、僕が所持しているものは他のPL次第で参照可能になりえます。<br>
      | 僕の所持するものは以下で確認してください。
    Button(url="/rulebooks#SW", text="ルールブック一覧")

  SyachiCard(title="サプリ未所持の場合")
    p サプリ未所持の場合、他のPLが使うサプリの内容については簡単に解説するので安心してください。
    p なおカクヨムにてソード・ワールド2.5のサプリメント紹介をしているのでぜひご覧ください。
    Button(
      url="https://kakuyomu.jp/works/16816927859758100588",
      text="カクヨム（しゃちほこ丸の雑多な置き場）"
    )

  SyachiCard(title="ルールブック未所持の場合")
    p 基本ルールブックIを持っていない場合、<a href="https://fujimi-trpg-online.jp/download/sw25.html#sample" target='_blank'>サンプルキャラクター</a>での参加をお願いします。<br>
      | なおSW2.0のルールブックを持っている場合でも、SW2.5のものを持っていない場合はサンプルキャラクターでお願いします。

  SyachiCard(title="選択ルール")
    ul
      li 戦闘ルールは原則として基本戦闘を採用します
        ul
          li ボス戦以外では敵データは固定値を使用します
          li 自分のPCのバフ・デバフはなるべくご自身での管理をお願いします
          li エネミーのデバフに関しては忘れていたら優しくご指摘いただけるとありがたいです
          li 弱点はGM側で計算しますが、やはり忘れていたら優しくご指摘いただけるとありがたいです
      li 剣の恩寵（→『ET』）は不採用です

  SyachiCard(title="シナリオに関して")
    ul
      li いわゆる「地雷」に関しては、網羅できないため、公開しない事がほとんどです<br>個別に聞いてください
        ul
          li なるべく応募前にお願いします
          li セッションのネタバレになりうるものの場合「あるかもしれない」としか答えられない場合があります。
      li 舞台は基本的にアルフレイム大陸ですが、希望があればケルディオン大陸への変更が可能です

  SyachiCard(title="キャラクター作成の手順")
    p キャラクターシートは原則として<a href="https://yutorize.2-d.jp/ytsheet/sw2.5/?mode=making" target='_blank'>ゆとシート</a>を使用してください。
    ul
      li まず<a href="https://yutorize.2-d.jp/ytsheet/sw2.5/?mode=making" target='_blank'>ゆとシートのキャラクター能力値作成</a>を使用して能力値作成を行ってください
        ul
          li 能力値は特に指定がない場合、5回振り（セッションによっては3回）まで
          li 「名前」はDiscordと一緒にしてください
          li 「コメント」には「しゃちほこ丸卓」と入れてください（カギカッコは不要）
          li ETを持っている場合、割り振り（→『ET』）の使用もOKです
            ul
              li ダイスを振ってからでも可能とします
      li キャラシ記入する際は以下の注意点を読んでください
        ul
          li 「プレイヤー名」はDiscordと一緒にしてください
          li 「編集保護設定」はアカウントを作成して紐づけるかパスワードを設定してください
          li 初心者さんの場合、以下も特に指示がない場合はお願いします
            ul
              li 「作成レギュレーション」は編集しないでください
              li 「割り振りPt. 」「ポイント割り振りの計算式」は気にする必要ありません（追加ルール用です）
              li 「生命抵抗力」「精神抵抗力」「HP」「MP」の後の空欄は空欄のままにしてください
              li 「一般技能」は気にする必要ありません（追加ルール用です）
              li 「戦闘特技」ではチェックを入れないでください（追加ルール用です）
              li 「秘伝」は無視してください（追加ルール用です）
              li 「魔物知識」「先制力」「移動力」の後の空欄は空欄のままにしてください
              li 「武器」「防具」の専用にはチェックを入れないでください
          li 「所持金」「預金／借金」には auto と書いてください
            ul
              li 「作成レギュレーション」「収支履歴」から自動計算が行われるようになります
          li 「所持品」には必ず冒険者キットを書いてください
          li 「収支履歴」の記入をお願いします<br>
            | 例
            ul
              li ソード::-120
              li 冒険者キット::-100
              li 救命草::-30*2
      li ココフォリアにコマを作る際、特にこだわりがなければキャラクターシート右上の「出力」を使ってください
        ul
          li コピーまで進んだ上で、ココフォリア上で「Ctr + V」を押すことでココフォリア上にコマが出現します
            ul
              li Mac OSなら「Command + v」
          li 自作する場合、キャラクターメモに必ず「PL名」の記入をおねがいします

  SyachiCard(title="キャラクター作成の注意点")
    p キャラクター作成に関して、以下をおまもりください。
    ul
      li 初期作成の場合、冒険者技能レベルは最大2を遵守してください（→『I』p. 76）
      li 初期作成以外で発生する能力値成長は、最大値がその回数の半分以下になるように自由に割り振りしてOKです
        ul
          li 36回以上成長する場合、最低値がその回数の1/36（切り捨て）以上になるようにしてください
      li 〈冒険者セット〉（→『I』p.320）は必ず購入してください
      li PC発言であっても、差別用語など、見聞きした人が不快になりうる言葉の使用に関しては特に注意してください
        ul
          li PCにこのような発言をさせる場合、「『お前……』と暴言を放ちます」のようにPL発言での説明に止めるようにお願いします
          li これらの言葉を放ちそうなキャラの使用はお控えいただく可能性があります
      li その他GMの指示に従ってください

  SyachiCard(title="ハウスルール（共通）へ")
    Button(url="/houseRule#common", text="ハウスルール")
</template>

<script lang="ts">
import Vue from "vue";
import SyachiCard from "@/components/util/SyachiCard.vue";
import TwitterLink from "@/components/util/TwitterLink.vue";
import Button from "@/components/util/Button.vue";
import MiniTitle from "@/components/util/MiniTitle.vue";

export default Vue.extend({
  name: "ScenariosPage",
  components: {
    SyachiCard,
    TwitterLink,
    Button,
    MiniTitle,
  },
  mounted() {
    this.$nuxt.$emit("hiddenAmazon", false);
  },
});
</script>