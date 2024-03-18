<template>
  <card-array-by-andml :andml="andmls1" />
  <card>
    <template #title>データ入力</template>
    <template #pbefore>
      <card v-for="data of bosyuSettingsWithDisable" :key="data.label">
        <template #title> {{ data.label }} </template>
        <item-forms :formSettings="data.items" />
      </card>
    </template>
    <div class="mt-10 mb-5">
      <andml :andmls="andmls2" />
      <item-button @click="saveSetting"> 一時保存する </item-button>
    </div>
  </card>
  <card>
    <div class="my-5">
      <item-form-select
        v-if="colorFormSetting.value"
        :form-setting="colorFormSetting"
      />
      <item-button @click="showResult"> 画像を表示する </item-button>
    </div>
  </card>
  <pages-bosyu-result :bosyuSettingsWithDisable="result" :color="color" />
  <pages-bosyu-text />
</template>

<script setup lang="ts">
import type { Ref } from "vue";

const { bosyuSettings } = useBosyu();
const { setSnack } = useSnack();

const { $setDisable } = useNuxtApp();

const saveSec = 15;
const andmls1 = `
&1 このページについて
ソード・ワールド2.5（SW2.5/ソドワ）のオンラインセッション募集時に、 &em_過不足なく情報を伝える ための画像・テキストが作れるページです。
&br
過不足のない情報には &em_応募者を増やす効果が期待 できます。
&br
なお、 &em_「募集しても人が集まらない……」 という方は以下のページもご覧ください。
&button_/sw25/tool/community

&2 使い方
&3 フォーム入力
まずは以下のフォームで情報を選択・入力し、募集情報を完成させてください。
&br
なお、選択式になっているものの多くは、 &br_自分で文字を書き換えることが可能 です。 
書き換えられないものも、後述の『プレビュー』にて変更が可能です。

&3 プレビューと画像出力
下記の『画像を表示する』ボタンを押すと、『プレビュー』が表示されます。
&br
『プレビュー』表示を書き換えると、画像出力も変化します。
&br
『プレビュー』下部にある『ダウンロード』ボタンを押すことで &em_画像として保存 することができます。

&3 テキスト出力
Discordなど、文字数制限がない場所では、テキスト出力も便利です。
『プレビュー』の下にあるので、こちらも活用してください。
&br
なお、『プレビュー』で書き換えた内容は、こちらには &em_反映されません。
あらかじめご了承いただき、送信前に書き換えをお願いします。
`;

const andmls2 = `
入力内容は${saveSec}秒に1回程度、自動保存されます。
手動で保存したい場合には以下のボタンを押してください。
&br 
保存はブラウザに対してなされます。 &link_https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage,（参考）
データがサーバーなど、あなたのPCやスマホ、タブレットなどの外部へ送られることはありません。 
&br 
なお、 &em_このデータは消えてしまうことがあります 。
あらかじめご了承ください。
`;

const bosyuSettingsWithDisable = computed(() =>
  bosyuSettings.map((bosyuSetting) => {
    bosyuSetting.value.items = $setDisable(bosyuSetting.value.items);
    return bosyuSetting.value;
  })
);

const colorData = {
  white: "ホワイト",
  black: "ブラック",
  navy: "ネイビー",
  green: "グリーン",
  yellow: "レモンイエロー",
  sakura: "桜",
  sunset: "夕焼け",
  lavender: "ラベンダー",
  wine: "ワインレッド",
} as const;
const color = ref("white");
const colorFormSetting: Ref<FormSettingSelect> = ref({
  name: "color" as const,
  label: "色の選択" as const,
  type: "select" as const,
  value: "",
  selects: [],
});

const result = ref([] as BosyuSetting);
const showResult = () => {
  result.value = JSON.parse(JSON.stringify(bosyuSettingsWithDisable.value));
  const index = Object.values(colorData).indexOf(
    colorFormSetting.value.value as any
  );
  if (index < 0) return;
  else color.value = Object.keys(colorData)[index];
};
let mounted = false;
const saveSetting = () => {
  try {
    if (!mounted) {
      return;
    }
    const result: { [key: string]: unknown } = {};
    bosyuSettingsWithDisable.value.forEach((obj) => {
      obj.items.map((item) => {
        result[obj.name + "_" + item.name] = item.value;
      });
    });
    const str = JSON.stringify(result);
    localStorage.setItem("bosyu", str);
    setSnack("データを一時保存しました");
  } catch {
    setSnack("データの一時保存に失敗しました");
  }
};

let intervalId: NodeJS.Timeout;
onMounted(() => {
  colorFormSetting.value = {
    name: "color" as const,
    label: "色の選択" as const,
    type: "select" as const,
    value: "ホワイト",
    selects: Object.values(colorData),
  };
  const valueText = localStorage.getItem("bosyu");
  if (valueText) {
    const valueObj = JSON.parse(valueText) as {
      [key: string]: string | number | boolean | [number, number] | null;
    };
    Object.entries(valueObj).forEach(([key, value]) => {
      const gname = key.split("_")[0];
      const group = bosyuSettingsWithDisable.value.filter(
        (g) => g.name === gname
      );
      if (group.length) {
        const fname = key.split("_")[1];
        const form = group[0].items.find((form) => form.name === fname);
        if (form) {
          form.value = value;
        }
      }
    });
  }
  mounted = true;

  intervalId = setInterval(saveSetting, saveSec * 1000);
});
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>
