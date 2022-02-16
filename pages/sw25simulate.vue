<template lang="pug">
div
  SyachiCard(title="SW2.5 判定シミュレーター")
    v-form
      v-select(v-model="mode", :items="modeList", label="モード")
      v-col(v-if="mode == 'ダメージ期待値' || mode == '判定成否'")
        v-text-field(
          v-model="nodo",
          label="能動側基準値",
          :rules="rules.numberRule",
          dense
        )
        v-text-field(
          v-model="zyudo",
          label="受動側基準値",
          :rules="rules.numberRule",
          dense
        )
        v-switch.d-inline(v-model="nodoKoteichi", label="能動側で固定値を利用する", dense)
        v-switch.d-inline(v-model="zyudoKoteichi", label="受動側で固定値を利用する", dense)
      v-col(v-if="mode == 'ダメージ期待値'")
        v-select(v-model="teiko", :items="teikoList", label="抵抗", dense)
      v-col(v-if="mode == 'ダメージ期待値' || mode == 'ダメージ'")
        v-text-field(
          v-model="keyNumber",
          label="威力",
          :rules="rules.keyNumberRule",
          dense
        )
        v-text-field(
          v-model="additionalDamage",
          label="追加ダメージ",
          :rules="rules.numberRule",
          dense
        )
        v-text-field(
          v-model="criticalNumber",
          label="C値",
          :rules="rules.criticalNumberRule",
          dense
        )
        v-text-field(
          v-model="criticalRay",
          label="【クリティカルレイ】などの1回だけ出目が+される効果",
          :rules="rules.numberRule",
          dense
        )
        v-text-field(
          v-model="hissatsu",
          label="《必殺攻撃》などの出目がクリティカル後も+される効果",
          :rules="rules.hissatsuNumberRule",
          dense
        )
        v-text-field(
          v-model="yakushi",
          label="〈薬師道具セット〉などの1回だけ出目のうち1つを固定する効果",
          :rules="rules.numberRule",
          dense
        )

      v-btn(block, @click="simulate") シミュレート

  SyachiCard(v-for="(result, i) in results", :key="i")
    v-col
      template(v-if="result.win")
        | 能動側基準値 {{ result.nodo }}
        | &nbsp;& 受動側基準値 {{ result.zyudo }}
        template(v-if="!result.damage")
          hr.my-2
        |
        | &nbsp;→&nbsp;能動側が勝つ確率 {{ result.win }}
      template(v-if="result.win && result.damage")
        br
        | &&nbsp;
      template(v-if="result.damage")
        span(v-if="result.teiko == '半減' || result.teiko == '必中'") & 抵抗 {{ result.teiko }}
        | 威力 {{ result.keyNumber }}
        | &nbsp;&&nbsp;	追加ダメージ {{ result.additionalDamage }}
        | &nbsp;&&nbsp;	クリティカル値 {{ result.criticalNumber }}
        span(v-if="result.criticalRay && result.criticalRay != 0") &nbsp;&&nbsp;	クリティカルレイなど {{ result.criticalRay }}
        span(v-if="result.hissatsu && result.hissatsu != 0") &nbsp;&&nbsp;	必殺攻撃など {{ result.hissatsu }}
        span(v-if="result.yakushi && result.yakushi != 0") &nbsp;&&nbsp;	薬師道具セットなど {{ result.yakushi }}
        hr.my-2
        | &nbsp;=>&nbsp;ダメージ期待値 {{ result.damage }}
      //- br
      //- | ※ 期待値 {{ result.kitaichi }}
</template>

<script lang="ts">
import Vue from "vue";
import SyachiCard from "@/components/util/SyachiCard.vue";

export default Vue.extend({
  name: "SW25SimulatePage",
  components: { SyachiCard },
  data() {
    return {
      diceCount: 0,
      diceSum: 0,
      mode: "ダメージ期待値",
      modeList: ["ダメージ期待値", "判定成否", "ダメージ"],
      nodo: 6,
      nodoKoteichi: false,
      zyudo: 4,
      zyudoKoteichi: false,
      teiko: "消滅（武器による攻撃も含む）",
      teikoList: ["消滅（武器による攻撃も含む）", "半減", "必中"],
      keyNumber: 10,
      additionalDamage: 3,
      criticalNumber: 10,
      criticalRay: 0,
      hissatsu: 0,
      yakushi: 0,
      results: [] as any[],
      rules: {
        numberRule: [
          // (v: any) => !!v || "入力必須です",
          (v: any) => /\d+/.test(v) || "半角数字を入力してください",
        ],
        keyNumberRule: [
          // (v: any) => !!v || "入力必須です",
          (v: any) => /\d+/.test(v) || "半角数字を入力してください",
          (v: any) => v >= 0 || "0以上の数字を入力してください",
          (v: any) => v <= 100 || "100以下の数字を入力してください",
        ],
        criticalNumberRule: [
          (v: any) => !!v || "入力必須です",
          (v: any) => /\d+/.test(v) || "半角数字を入力してください",
          (v: any) => v >= 7 || "7以上の数字を入力してください",
        ],
        hissatsuNumberRule: [
          // (v: any) => !!v || "入力必須です",
          (v: any) => /\d+/.test(v) || "半角数字を入力してください",
          (v: any) => v >= 0 || "0以上の数字を入力してください",
          (v: any) => v < 10 || "10未満の数字を入力してください",
        ],
      },
    };
  },
  methods: {
    simulate() {
      const trial = 10 ** 5;
      // 出目のリセット
      let count = 0;
      let countHalf = 0;
      if (this.mode == "ダメージ期待値" || this.mode == "判定成否") {
        [, countHalf, count] = this.$hanteiSimulate(
          trial,
          this.nodo - this.zyudo,
          {
            nodoKoteichi: this.nodoKoteichi,
            zyudoKoteichi: this.zyudoKoteichi,
            teiko: this.teiko,
          }
        );
      } else if (this.mode == "ダメージ") {
        count = trial;
      }
      let damageCount = 0;
      if (this.mode == "ダメージ期待値" || this.mode == "ダメージ") {
        for (let j = 0; j < count; j++) {
          damageCount += this.$damage(
            this.keyNumber,
            this.additionalDamage,
            this.criticalNumber,
            {
              half: false,
              criticalRay: this.criticalRay,
              hissatsu: this.hissatsu,
              yakushi: this.yakushi,
            }
          );
        }
        if (this.teiko == "半減") {
          for (let h = 0; h < countHalf; h++) {
            damageCount += this.$damage(
              this.keyNumber,
              this.additionalDamage,
              this.criticalNumber,
              {
                half: true,
                criticalRay: this.criticalRay,
                hissatsu: this.hissatsu,
                yakushi: this.yakushi,
              }
            );
          }
        }
      }
      if (this.mode == "ダメージ期待値") {
        this.results.unshift({
          nodo: this.nodo,
          zyudo: this.zyudo,
          win: `${Math.round((count / trial) * 1000) / 10}%`,
          teiko: this.teiko,
          keyNumber: this.keyNumber,
          additionalDamage: this.additionalDamage,
          criticalNumber: this.criticalNumber,
          criticalRay: this.criticalRay,
          hissatsu: this.hissatsu,
          yakushi: this.yakushi,
          damage: damageCount / trial,
          kitaichi: this.diceSum / this.diceCount,
        });
      } else if (this.mode == "判定成否") {
        this.results.unshift({
          nodo: this.nodo,
          zyudo: this.zyudo,
          win: `${Math.round((count / trial) * 1000) / 10}%`,
        });
      } else if (this.mode == "ダメージ") {
        this.results.unshift({
          keyNumber: this.keyNumber,
          additionalDamage: this.additionalDamage,
          criticalNumber: this.criticalNumber,
          criticalRay: this.criticalRay,
          hissatsu: this.hissatsu,
          yakushi: this.yakushi,
          damage: damageCount / trial,
          kitaichi: this.diceSum / this.diceCount,
        });
      }
    },
  },
});
</script>
