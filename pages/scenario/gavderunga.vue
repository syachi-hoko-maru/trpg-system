<template>
  <card-array-by-andml :andml="setsumei" />
  <card>
    <template #title>ネタバレクッション</template>
    以下はシナリオ本編となり、遊ぶ上で致命的なシナリオのネタバレが含まれます。<br />
    プレイヤーとして遊ぶ予定の方は閲覧をお控えください。<br />
    <br />
    見る場合には以下のボタンを押してください。
    <item-button @click="() => (show = !show)">
      {{ show ? "シナリオを閉じる" : "シナリオを見る" }}
    </item-button>
  </card>

  <template v-if="show">
    <card-array-by-andml :andml="scenarioFlow" />
    <item-npc-cards title="NPC一覧" :list="allNpcList" />
    <card-array-by-andml :andml="scenarioFromBone" />
  </template>
  <card>
    <template #title>他のシナリオ</template>
    しゃちほこ丸のシナリオ一覧はこちら
    <item-button url="/scenario" />
  </card>
</template>

<script setup lang="ts">
import { getNpcAndml, getSceneTitle } from "~/src/pages/scenarioBone";
import { gavderungaBone } from "~/src/pages/scenarioBone/gavderunga";
import { allNpcList } from "~/src/pages/scenarioBone/gavderunga/npc";

const show = ref(true);

const setsumei = `
&1 このシナリオについて
このシナリオはシナリオ一斉投稿企画「#ドーデン冒険録」に参加しています。
&br
ソード・ワールド2.5の同人シナリオです。
PCはとある「秘宝」を護送する魔動列車に乗り、そこで起こる事件を解決します。
&br
本シナリオのGM難易度は「少し高め」です。
もし「初GMに挑戦！」ということであれば、拙作の『ウォフト=ルーバの研究所跡』や『ふきのとうを採りに』がおすすめです。
&button_/scenario

&2 あらすじ
キングスフォールのいくつかの冒険者ギルド支部へ、貴族から秘密の依頼がくる。
彼の持つ秘宝が狙われているため、秘密裏にキングスフォールから離れた彼の別邸へと移したいのだという。
&br
ギルド支部長の信頼があついPCたちは依頼を受け、他の冒険者ギルド支部所属の冒険者たちとともに魔動列車による秘宝輸送の護衛にあたることになる。

&2 イラスト
本シナリオではNPCの立ち絵イラストに【五百式立ち絵メーカー】を使用させていただきました。
出典： &link_https://picrew.me/ja/image_maker/625876,【五百式立ち絵メーカー】 

&1 シナリオスペック
- プレイヤー人数
-- 1〜2人
- レギュレーション
-- 4〜5レベル（成長回数n回）
- 想定時間
-- 2〜3時間（オンライン・ボイセ）
- 戦闘ルール
-- 基本戦闘（推奨）
- 必須ルールブック
-- 『ルールブックⅠ』
-- 『ルールブックII』
- 必須サプリメント
-- なし
- 推奨サプリメント
-- 『鉄道の都キングスフォール』
-- 『ドーデン博物誌』

&amazon_キングスフォール・ドーデン博物誌

&3 選択ルール
なし

&3 舞台
このシナリオはアルフレイム大陸西部、ドーデン地方を舞台にして進行します。
"鉄と鋼の盟主"キングスレイ鉄鋼共和国の首都キングスフォール（『ルールブックⅠI』p.319）で依頼を受け、魔動列車（『ルールブックⅠI』p.333）に乗り込むことになります。
&br
PCは冒険者ギルド支部〈 &ruby_薫風,くんぷう の空〉で幾度か冒険したことのある、支部長から信頼される冒険者です。
なお、冒険者ギルド支部の名前はGM・PLが望むなら変更しても構いません。

&3 シナリオの着地点・趣旨
本シナリオは「マーダーミステリー風」のシナリオとなっています。
「風」ですので、推理は「楽しむ」程度ですが、そこを楽しんでいただければ幸いです。
`;

const scenarioFlow =
  "&1 シナリオの流れ\n" +
  "クリックするとそのシーンまで飛びます。\n" +
  gavderungaBone
    .map(
      (n) => `
- &link_#${getSceneTitle(n)},${getSceneTitle(n)}
${n.event.map((e) => `-- ${e.name}`).join("\n")}
`
    )
    .join("\n");

const scenarioFromBone = ref(
  gavderungaBone
    .map(
      (n) => `
&1 ${getSceneTitle(n)}
${n.event
  .map(
    (e) => `
&2 ${e.name}
&4 場所
${e.place}
&4 登場NPC
${e.npc.map((e) => `- ${getNpcAndml(e)}`).join("\n")}
&4 内容
${Array.isArray(e.description) ? e.description.join("\n") : e.description}
`
  )
  .join("\n")}
`
    )
    .join("\n")
);
</script>
