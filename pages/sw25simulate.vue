<template lang="pug">
div
  SyachiCard(title="SW2.5 判定シミュレーター")
    v-form
      v-select(v-model="mode", :items="modeList", label="モード")
      FormPartsArray(:items="modeItems")
      v-btn(block, @click="simulate") シミュレート

  SyachiCard(v-for="history in histories", :key="i")
    template(v-for="d in history.data")
      template(v-if="d.value && d.value != 0") {{ d.label }}: {{ d.value }}<br>
    br
    template(v-for="(r, i) in history.result")
      | {{ Object.keys(r)[0] }}: {{ Object.values(r)[0] }}
      br(v-if="i !== history.result.length")
</template>

<script lang="ts">
import Vue from "vue";
import SyachiCard from "@/components/util/SyachiCard.vue";
import FormPartsArray from "@/components/form/FormPartsArray.vue";

type History = {
  data: {}[];
  result: {}[];
};

export default Vue.extend({
  name: "SW25SimulatePage",
  components: { SyachiCard, FormPartsArray },
  data() {
    return {
      mode: "ダメージ期待値",
      modeList: ["ダメージ期待値", "判定成否", "ダメージ"],
      histories: [] as Array<History>,
      items: [
        {
          name: "nodo",
          value: 5,
          label: "能動側基準値",
          type: "number",
          group: "hantei",
          option: false,
          hidden: false,
        },
        {
          name: "zyudo",
          value: 4,
          label: "受動側基準値",
          type: "number",
          group: "hantei",
          option: false,
          hidden: false,
        },
        {
          name: "nodoKoteichi",
          value: false,
          label: "能動側で固定値（基準値+7）を利用する",
          type: "switch",
          group: "hantei",
          option: true,
          hidden: false,
        },
        {
          name: "zyudoKoteichi",
          value: false,
          label: "受動側で固定値（基準値+7）を利用する",
          type: "switch",
          group: "hantei",
          option: true,
          hidden: false,
        },
        {
          name: "nodoYakushi",
          value: 0,
          label: "〈強力タビットにんじん〉など能動側の出目のうち1つを固定する",
          type: "number",
          group: "hantei",
          option: true,
          hidden: false,
        },
        {
          name: "zyudoYakushi",
          value: 0,
          label: "受動側の出目のうち1つを固定する",
          type: "number",
          group: "hantei",
          option: true,
          hidden: false,
        },
        {
          name: "nodoGf",
          value: false,
          label: "能動側の出目を2dではなく1d*2とする",
          type: "switch",
          group: "hantei",
          option: true,
          hidden: false,
        },
        {
          name: "zyudoGf",
          value: false,
          label: "受動側の出目を2dではなく1d*2とする",
          type: "switch",
          group: "hantei",
          option: true,
          hidden: false,
        },
        {
          name: "teiko",
          value: "消滅（武器による攻撃も含む）",
          label: "抵抗",
          type: ["消滅（武器による攻撃も含む）", "半減", "必中"],
          group: "teiko",
          option: false,
          hidden: false,
        },
        {
          name: "keyNumber",
          value: 10,
          label: "威力",
          type: "number",
          group: "damage",
          option: false,
          hidden: false,
        },
        {
          name: "additionalDamage",
          value: 4,
          label: "追加ダメージ",
          type: "number",
          group: "damage",
          option: false,
          hidden: false,
        },
        {
          name: "criticalNumber",
          value: 10,
          label: "C値",
          type: "number",
          group: "damage",
          option: false,
          hidden: false,
        },
        {
          name: "bougo",
          value: 0,
          label: "防護点などのダメージ減少",
          type: "number",
          group: "damage",
          option: false,
          hidden: false,
        },

        {
          name: "criticalRay",
          value: 0,
          label: "【クリティカルレイ】などで1回だけ出目が+する",
          type: "number",
          group: "damage",
          option: true,
          hidden: false,
        },
        {
          name: "hissatsu",
          value: 0,
          label: "《必殺攻撃》などで出目がクリティカル後も+する",
          type: "number",
          group: "damage",
          option: true,
          hidden: false,
        },
        {
          name: "yakushi",
          value: 0,
          label: "〈薬師道具セット〉などで1回だけ出目のうち1つを固定する",
          type: "number",
          group: "damage",
          option: true,
          hidden: false,
        },
        {
          name: "gf",
          value: false,
          label: "出目を2dではなく1d*2とする",
          type: "switch",
          group: "damage",
          option: true,
          hidden: false,
        },
      ] as FormItem[],
    };
  },
  computed: {
    modeItems(): FormItem[] {
      let groups: string[] = [];
      switch (this.mode) {
        case "ダメージ期待値":
          groups = ["hantei", "teiko", "damage"];
          break;
        case "判定成否":
          groups = ["hantei"];
          break;
        case "ダメージ":
          groups = ["damage"];
          break;
      }
      return this.items
        .filter((o) => !o.hidden)
        .filter((o) => groups.indexOf(o.group) >= 0);
    },
  },
  methods: {
    value(name: string): FormValue {
      return this.items.filter((o) => o.name === name)[0].value;
    },
    simulate() {
      const trial = 10 ** 5;
      const result = [] as {}[];
      // 出目のリセット
      let count = 0;
      let countHalf = 0;

      if (this.mode == "ダメージ期待値" || this.mode == "判定成否") {
        [, countHalf, count] = this.$hanteiSimulate(
          trial,
          Number(this.value("nodo")) - Number(this.value("zyudo")),
          {
            nodoKoteichi: Boolean(this.value("nodoKoteichi")),
            zyudoKoteichi: Boolean(this.value("zyudoKoteichi")),
            nodoYakushi: Number(this.value("nodoYakushi")),
            zyudoYakushi: Number(this.value("zyudoYakushi")),
            teiko: String(this.value("teiko")),
            nodoGf: Boolean(this.value("nodoGf")),
            zyudoGf: Boolean(this.value("zyudoGf")),
          }
        );
        result.push({
          判定勝利: `${Math.round((count / trial) * 1000) / 10}%`,
        });
      } else if (this.mode == "ダメージ") {
        count = trial;
      }
      let damageCount = 0;
      if (this.mode == "ダメージ期待値" || this.mode == "ダメージ") {
        for (let j = 0; j < count; j++) {
          damageCount += this.$damage(
            Number(this.value("keyNumber")),
            Number(this.value("additionalDamage")),
            Number(this.value("criticalNumber")),
            {
              half: false,
              criticalRay: Number(this.value("criticalRay")),
              hissatsu: Number(this.value("hissatsu")),
              yakushi: Number(this.value("yakushi")),
              gf: Boolean(this.value("gf")),
              bougo: Number(this.value("bougo")),
            }
          );
        }
        if (String(this.value("teiko")) == "半減") {
          for (let h = 0; h < countHalf; h++) {
            damageCount += this.$damage(
              Number(this.value("keyNumber")),
              Number(this.value("additionalDamage")),
              Number(this.value("criticalNumber")),
              {
                half: true,
                criticalRay: Number(this.value("criticalRay")),
                hissatsu: Number(this.value("hissatsu")),
                yakushi: Number(this.value("yakushi")),
                gf: Boolean(this.value("gf")),
                bougo: Number(this.value("bougo")),
              }
            );
          }
        }
        result.push({
          ダメージ: damageCount / trial,
        });
      }
      const data = JSON.parse(JSON.stringify(this.modeItems));
      this.histories.unshift({
        data,
        result,
      });
    },
  },
});
</script>
