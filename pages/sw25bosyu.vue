<template lang="pug">
div
  SyachiCard(title="SW2.5のオンセ募集画像を作る")
    p 以下から情報を選択して、募集を作り、下記の『プレビュー』からダウンロードしてご利用ください。
    v-form(align="center")
      v-text-field(v-model="scenarioName", label="シナリオ名", dense)
      v-text-field(v-model="scenarioWiterName", label="シナリオ作者名", dense)
      v-range-slider(
        v-model="number",
        :tick-labels="[1, 2, 3, 4, 5, 6, 7, 8]",
        label="募集人数",
        min="1",
        max="8",
        ticks="always",
        tick-size="4",
        full-width
      )
      v-radio-group(v-model="dayType")
        v-radio(value="set", label="日付を決めて募集する", dense)
        v-radio(value="adjust", label="日程すり合わせで募集する", dense) 
      template(v-if="dayType === 'set'")
        v-btn.my-3(block, @click="overlay = 'day'") 日付を設定する
        v-btn.my-3(block, @click="overlay = 'startTime'") 開始時間を設定する
        v-btn.my-3(block, @click="overlay = 'endTime'") 終了時間を設定する
      v-overlay(:value="overlay", opacity="1")
        v-row(align="center")
          v-date-picker(v-if="overlay === 'day'", v-model="day")
          v-time-picker(
            v-else-if="overlay === 'startTime'",
            v-model="startTime"
          )
          v-time-picker(v-else-if="overlay === 'endTime'", v-model="endTime")
        v-row(align="center")
          v-btn.my-5(block, @click="overlay = ''") 閉じる
      v-combobox(
        v-model="sessionStyle",
        label="形式",
        :items="['テキセ', 'ボイセ']",
        dense,
        clearable
      )
      v-combobox(
        v-model="regulation",
        label="レギュレーション",
        :items="['初期作成', '3〜4レベル', '4〜5レベル', '5〜6レベル', '6〜7レベル', '7〜8レベル', '8〜9レベル', '10〜11レベル', '11〜12レベル', '12〜13レベル', '13〜14レベル', '14〜15レベル', '15Aレベル', '15Bレベル', '15Cレベル']",
        dense,
        clearable
      )
      v-combobox(
        v-model="rulebooks",
        label="必須ルルブ・サプリ",
        :items="rulebookList",
        dense,
        clearable,
        multiple
      )
      v-combobox(
        v-model="suppliments",
        label="使用可能ルルブ・サプリ",
        :items="otherRulebookList",
        dense,
        clearable,
        multiple
      )
      v-textarea(v-model="explain", label="概要・その他")
  SyachiCard(title="プレビュー")
    p 以下で確認してダウンロードしてご利用ください。
    SyachiCard#canvas(:title="title")
      dl
        template(v-if="scenarioName")
          dt シナリオ名
          dd {{ scenarioName }}
            template(v-if="scenarioWiterName !== ''") （{{ scenarioWiterName }}）
        dt 募集人数
        dd
          template(v-if="number[0] !== number[1]") {{ number[0] }}〜{{ number[1] }}人
          template(v-else) {{ number[0] }}人
        template(v-if="dayType === 'adjust' || (day && startTime)")
          dt 日時
          dd(v-if="dayType === 'adjust'") すり合わせ
          dd(v-else) {{ dayShape(day) }} {{ timeShape(startTime) }}〜{{ timeShape(endTime) }}
        template(v-if="sessionStyle")
          dt 形式
          dd {{ sessionStyle }}
        template(v-if="regulation")
          dt レギュレーション
          dd {{ regulation }}
        template(v-if="rulebooks.length")
          dt 必須ルルブ・サプリ
          dd {{ rulebooks.join('・') }}
        template(v-if="suppliments.length")
          dt 使用可ルルブ・サプリ
          dd {{ suppliments.join('・') }}
      template(v-if="explain")
        MiniTitle シナリオ概要・その他
        div {{ explain }}
    v-btn(block, @click="captureImage") ダウンロード
</template>

<script lang="ts">
import Vue from "vue";
import html2canvas from "html2canvas";

import SyachiCard from "@/components/util/SyachiCard.vue";
import Button from "~/components/util/Button.vue";
import MiniTitle from "@/components/util/MiniTitle.vue";

export default Vue.extend({
  components: { SyachiCard, Button, MiniTitle },
  data() {
    let day = "";
    const dayMatch = new Date().toISOString().match(/\d{4}-\d{1,2}-\d{1,2}/);
    if (dayMatch && dayMatch.length) day = dayMatch[0];
    else day = "2022-7-20";
    return {
      scenarioName: "",
      scenarioWiterName: "",
      number: [3, 4],
      overlay: "",
      dayType: "",
      day: day,
      startTime: "21:00",
      endTime: "24:00",
      sessionStyle: "",
      regulation: "",
      rulebookList: [
        "I",
        "II",
        "III",
        "ET",
        "ML",
        "MA",
        "CBB",
        "OPB",
      ] as string[],
      rulebooks: [] as string[],
      suppliments: [] as string[],
      explain: "",
    };
  },
  computed: {
    title() {
      if (this.sessionStyle.indexOf("ボイセ") >= 0) return "SW2.5ボイセ募集";
      else if (this.sessionStyle.indexOf("半テキセ") >= 0)
        return "SW2.5半テキセ募集";
      else if (this.sessionStyle.indexOf("テキセ") >= 0)
        return "SW2.5テキセ募集";
      else return "SW2.5オンセ募集";
    },
    otherRulebookList() {
      // @ts-ignore
      return this.rulebookList.filter(
        (rulebook: string) => this.rulebooks.indexOf(rulebook) === -1
      );
    },
  },
  methods: {
    dayShape(day: string) {
      return day.replace(/\d+-0*(\d+)-0*(\d+)/, "$1月$2日");
    },
    timeShape(time: string) {
      return time.replace(/0*(\d+):(\d+)/, "$1時$2分").replace("00分", "");
    },
    captureImage() {
      // console.log("aaa");
      const element = document.getElementById("canvas");
      // console.log(element);
      if (!element) return;
      html2canvas(element, { windowWidth: 1500, width: 536.5 }).then(
        (canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL();
          link.download = `session.png`;
          link.click();
        }
      );
    },
  },
});
</script>

<style lang="scss">
#canvas > div {
  background-color: #333;
}
dt {
  margin-left: 0;
  float: left;
}
dd {
  margin-left: 10rem;
}
</style>