<template lang="pug">
div
  SyachiCard(title="SW2.5 判定シミュレーター")
    v-form
      v-switch(v-model="damageMode", label="ダメージ計算モード")
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
      template(v-if="damageMode")
        v-select(v-model="teiko", :items="teikoList", label="抵抗", dense)
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
          label="クリティカルレイなどの出目が1回だけ+される効果",
          :rules="rules.numberRule",
          dense
        )
        v-text-field(
          v-model="hissatsu",
          label="《必殺攻撃》などの出目がクリティカル後も+される効果",
          :rules="rules.numberRule",
          dense
        )
      v-btn(block, @click="simulate") シミュレート

  SyachiCard(v-for="(result, i) in results", :key="i")
    v-col
      | 能動側基準値 {{ result.nodo }}
      | & 受動側基準値 {{ result.zyudo }}
      template(v-if="!result.damage")
        hr.my-2
      |
      | → 能動側が勝つ確率 {{ result.win }}
      template(v-if="result.damage")
        br
        span(v-if="result.teiko == '半減' || result.teiko == '必中'") & 抵抗 {{ result.teiko }}
        | & 威力 {{ result.keyNumber }}
        | & 追加ダメージ {{ result.additionalDamage }}
        | & クリティカル値 {{ result.criticalNumber }}
        span(v-if="result.criticalRay") & クリティカルレイなど {{ result.criticalRay }}
        span(v-if="result.hissatsu") & 必殺攻撃など {{ result.hissatsu }}
        hr.my-2
        | => ダメージ期待値 {{ result.damage }}
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
      damageMode: true,
      nodo: 6,
      zyudo: 4,
      teiko: "消滅（武器による攻撃も含む）",
      teikoList: ["消滅（武器による攻撃も含む）", "半減", "必中"],
      keyNumber: 10,
      additionalDamage: 3,
      criticalNumber: 10,
      criticalRay: 0,
      hissatsu: 0,
      results: [] as any[],
      rules: {
        numberRule: [
          (v: any) => !!v || "入力必須です",
          (v: any) => /\d+/.test(v) || "半角数字を入力してください",
        ],
        keyNumberRule: [
          (v: any) => !!v || "入力必須です",
          (v: any) => /\d+/.test(v) || "半角数字を入力してください",
          (v: any) => v > 0 || "0以上の数字を入力してください",
          (v: any) => v <= 100 || "100以下の数字を入力してください",
        ],
        criticalNumberRule: [
          (v: any) => !!v || "入力必須です",
          (v: any) => /\d+/.test(v) || "半角数字を入力してください",
          (v: any) => v >= 7 || "7以上の数字を入力してください",
        ],
      },
      keyNumberTable: [
        // 0
        [0, 0, 0, 0, 1, 2, 2, 3, 3, 4, 4],
        // 1
        [0, 0, 0, 0, 1, 2, 3, 3, 3, 4, 4],
        [0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4],
        [0, 0, 0, 1, 1, 2, 3, 4, 4, 4, 5],
        [0, 0, 0, 1, 2, 2, 3, 4, 4, 5, 5],
        [0, 0, 1, 1, 2, 2, 3, 4, 5, 5, 5],
        [0, 0, 1, 1, 2, 3, 3, 4, 5, 5, 5],
        [0, 0, 1, 1, 2, 3, 4, 4, 5, 5, 6],
        [0, 0, 1, 2, 2, 3, 4, 4, 5, 6, 6],
        [0, 0, 1, 2, 3, 3, 4, 4, 5, 6, 7],
        [0, 1, 1, 2, 3, 3, 4, 5, 5, 6, 7],
        // 11
        [0, 1, 2, 2, 3, 3, 4, 5, 6, 6, 7],
        [0, 1, 2, 2, 3, 4, 4, 5, 6, 6, 7],
        [0, 1, 2, 3, 3, 4, 4, 5, 6, 7, 7],
        [0, 1, 2, 3, 4, 4, 4, 5, 6, 7, 8],
        [0, 1, 2, 3, 4, 4, 5, 5, 6, 7, 8],
        [0, 1, 2, 3, 4, 4, 5, 6, 7, 7, 8],
        [0, 1, 2, 3, 4, 5, 5, 6, 7, 7, 8],
        [0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8],
        [0, 1, 2, 3, 4, 5, 6, 7, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        // 21
        [0, 1, 2, 3, 4, 6, 6, 7, 8, 9, 10],
        [0, 1, 2, 3, 5, 6, 6, 7, 8, 9, 10],
        [0, 2, 2, 3, 5, 6, 7, 7, 8, 9, 10],
        [0, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10],
        [0, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10],
        [0, 2, 3, 4, 5, 6, 8, 8, 9, 9, 10],
        [0, 2, 3, 4, 6, 6, 8, 8, 9, 9, 10],
        [0, 2, 3, 4, 6, 6, 8, 9, 9, 10, 10],
        [0, 2, 3, 4, 6, 7, 8, 9, 9, 10, 10],
        [0, 2, 4, 4, 6, 7, 8, 9, 10, 10, 10],
        // 31
        [0, 2, 4, 5, 6, 7, 8, 9, 10, 10, 11],
        [0, 3, 4, 5, 6, 7, 8, 10, 10, 10, 11],
        [0, 3, 4, 5, 6, 8, 8, 10, 10, 10, 11],
        [0, 3, 4, 5, 6, 8, 9, 10, 10, 11, 11],
        [0, 3, 4, 5, 7, 8, 9, 10, 10, 11, 12],
        [0, 3, 5, 5, 7, 8, 9, 10, 11, 11, 12],
        [0, 3, 5, 6, 7, 8, 9, 10, 11, 12, 12],
        [0, 3, 5, 6, 7, 8, 10, 10, 11, 12, 13],
        [0, 4, 5, 6, 7, 8, 10, 11, 11, 12, 13],
        [0, 4, 5, 6, 7, 9, 10, 11, 11, 12, 13],
        // 41
        [0, 4, 6, 6, 7, 9, 10, 11, 12, 12, 13],
        [0, 4, 6, 7, 7, 9, 10, 11, 12, 13, 13],
        [0, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        [0, 4, 6, 7, 8, 10, 10, 11, 12, 13, 14],
        [0, 4, 6, 7, 9, 10, 10, 11, 12, 13, 14],
        [0, 4, 6, 7, 9, 10, 10, 12, 13, 13, 14],
        [0, 4, 6, 7, 9, 10, 11, 12, 13, 13, 15],
        [0, 4, 6, 7, 9, 10, 12, 12, 13, 13, 15],
        [0, 4, 6, 7, 10, 10, 12, 12, 13, 14, 15],
        [0, 4, 6, 8, 10, 10, 12, 12, 13, 15, 15],
        // 51
        [0, 5, 7, 8, 10, 10, 12, 12, 13, 15, 15],
        [0, 5, 7, 8, 10, 11, 12, 12, 13, 15, 15],
        [0, 5, 7, 9, 10, 11, 12, 12, 14, 15, 15],
        [0, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16],
        [0, 5, 7, 10, 10, 11, 12, 13, 14, 16, 16],
        [0, 5, 8, 10, 10, 11, 12, 13, 15, 16, 16],
        [0, 5, 8, 10, 11, 11, 12, 13, 15, 16, 17],
        [0, 5, 8, 10, 11, 12, 12, 13, 15, 16, 17],
        [0, 5, 9, 10, 11, 12, 12, 14, 15, 16, 17],
        [0, 5, 9, 10, 11, 12, 13, 14, 15, 16, 18],
        // 61
        [0, 5, 9, 10, 11, 12, 13, 14, 16, 17, 18],
        [0, 5, 9, 10, 11, 13, 13, 14, 16, 17, 18],
        [0, 5, 9, 10, 11, 13, 13, 15, 17, 17, 18],
        [0, 5, 9, 10, 11, 13, 14, 15, 17, 17, 18],
        [0, 5, 9, 10, 12, 13, 14, 15, 17, 18, 18],
        [0, 5, 9, 10, 12, 13, 15, 15, 17, 18, 19],
        [0, 5, 9, 10, 12, 13, 15, 16, 17, 19, 19],
        [0, 5, 9, 10, 12, 14, 15, 16, 17, 19, 19],
        [0, 5, 9, 10, 12, 14, 16, 16, 17, 19, 19],
        [0, 5, 9, 10, 12, 14, 16, 17, 18, 19, 19],
        // 71
        [0, 5, 9, 10, 13, 14, 16, 17, 18, 19, 20],
        [0, 5, 9, 10, 13, 15, 16, 17, 18, 19, 20],
        [0, 5, 9, 10, 13, 15, 16, 17, 19, 20, 21],
        [0, 6, 9, 10, 13, 15, 16, 18, 19, 20, 21],
        [0, 6, 9, 10, 13, 16, 16, 18, 19, 20, 21],
        [0, 6, 9, 10, 13, 16, 17, 18, 19, 20, 21],
        [0, 6, 9, 10, 13, 16, 17, 18, 20, 21, 22],
        [0, 6, 9, 10, 13, 16, 17, 19, 20, 22, 23],
        [0, 6, 9, 10, 13, 16, 18, 19, 20, 22, 23],
        [0, 6, 9, 10, 13, 16, 18, 20, 21, 22, 23],
        // 81
        [0, 6, 9, 10, 13, 17, 18, 20, 21, 22, 23],
        [0, 6, 9, 10, 14, 17, 18, 20, 21, 22, 24],
        [0, 6, 9, 11, 14, 17, 18, 20, 21, 23, 24],
        [0, 6, 9, 11, 14, 17, 19, 20, 21, 23, 24],
        [0, 6, 9, 11, 14, 17, 19, 21, 22, 23, 24],
        [0, 7, 10, 11, 14, 17, 19, 21, 22, 23, 25],
        [0, 7, 10, 12, 14, 17, 19, 21, 22, 24, 25],
        [0, 7, 10, 12, 14, 18, 19, 21, 22, 24, 25],
        [0, 7, 10, 12, 15, 18, 19, 21, 22, 24, 26],
        [0, 7, 10, 12, 15, 18, 19, 21, 23, 25, 26],
        // 91
        [0, 7, 11, 13, 15, 18, 19, 21, 23, 25, 26],
        [0, 7, 11, 13, 15, 18, 20, 21, 23, 25, 27],
        [0, 8, 11, 13, 15, 18, 20, 22, 23, 25, 27],
        [0, 8, 11, 13, 16, 18, 20, 22, 23, 25, 28],
        [0, 8, 11, 14, 16, 18, 20, 22, 23, 26, 28],
        [0, 8, 11, 14, 16, 19, 20, 22, 23, 26, 28],
        [0, 8, 12, 14, 16, 19, 20, 22, 24, 26, 28],
        [0, 8, 12, 15, 16, 19, 20, 22, 24, 27, 28],
        [0, 8, 12, 15, 17, 19, 20, 22, 24, 27, 29],
        [0, 8, 12, 15, 18, 19, 20, 22, 24, 27, 30],
      ],
    };
  },
  methods: {
    dice() {
      return Math.ceil(Math.random() * 6);
    },
    twoDice() {
      return this.dice() + this.dice();
    },
    simulate() {
      const trial = 10 ** 5;
      this.diceCount = 0;
      this.diceSum = 0;
      let count = 0;
      let countHalf = 0;
      for (let i = 0; i < trial; i++) {
        const nodoDice = this.twoDice();
        this.diceCount++;
        this.diceSum += nodoDice;
        // 能動自動失敗
        if (nodoDice == 2) continue;

        // 「抵抗：必中」の場合を処理する
        if (this.teiko == "必中") {
          count++;
          continue;
        }

        const zyudoDice = this.twoDice();
        this.diceCount++;
        this.diceSum += zyudoDice;
        // 受動自動成功
        if (zyudoDice == 12) {
          if (this.teiko == "半減") countHalf++;
          continue;
        }
        // 能動自動成功 or 受動自動失敗
        if (nodoDice == 12 || zyudoDice == 2) {
          count++;
          continue;
        }
        // 普通に上回る
        if (nodoDice + Number(this.nodo) > zyudoDice + Number(this.zyudo)) {
          count++;
        } else {
          if (this.teiko == "半減") countHalf++;
        }
      }
      let damageCount = 0;
      if (this.damageMode) {
        for (let j = 0; j < count; j++) {
          damageCount += this.damage();
        }
        for (let h = 0; h < countHalf; h++) {
          if (this.teiko == "半減") damageCount += this.damage("half");
        }
      }
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
        damage: damageCount / trial,
        kitaichi: this.diceSum / this.diceCount,
      });
    },
    damage(half?: string) {
      const key = this.keyNumberTable[Number(this.keyNumber)];
      let damageDice = this.twoDice();
      this.diceCount++;
      this.diceSum += damageDice;
      // クリティカルレイ or 必殺攻撃
      if (this.criticalRay || this.hissatsu) {
        damageDice += Number(this.criticalRay) + Number(this.hissatsu);
        if (damageDice > 12) damageDice = 12;
      }
      // 自動失敗
      if (damageDice == 2) return 0;
      // 成功した場合
      let tempDamage = 0;
      tempDamage += key[damageDice - 2] + Number(this.additionalDamage);
      // 半減の場合はクリティカルしないのでここで返す
      if (!half) {
        return Math.ceil(tempDamage / 2);
      }
      // クリティカル処理
      criticalLoop: while (true) {
        if (damageDice >= this.criticalNumber) {
          tempDamage += key[damageDice - 2];
        } else {
          break criticalLoop;
        }
        damageDice = this.twoDice();
        this.diceCount++;
        this.diceSum += damageDice;

        // 必殺攻撃
        if (this.hissatsu) {
          damageDice += Number(this.hissatsu);
          if (damageDice > 12) damageDice = 12;
        }
      }
      return tempDamage;
    },
  },
});
</script>
