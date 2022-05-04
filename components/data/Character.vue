<template lang="pug">
SyachiCard(:title="data.characterName")
  v-row(v-for="bds of basicDataSet", :key="bds")
    v-col(v-for="ds of bds", :key="data[ds.data]")
      DataTable(:title="ds.title", :data="data[ds.data]")
  hr.my-5
  v-row(v-for="ds of noryokuDataSet", :key="ds[0]")
    v-col
      DataTable(:title="ds[0]", :data="data[`sttBase${ds[5]}`]")
    v-col
      DataTable(:title="ds[1]", :data="data[`sttBase${ds[1]}`]")
      DataTable(:title="ds[2]", :data="data[`sttBase${ds[2]}`]")
    v-col
      DataTable(title="成長", :data="data[`sttGrow${ds[1]}`]")
      DataTable(title="成長", :data="data[`sttGrow${ds[2]}`]")
    v-col
      DataTable(title="器用度", :data="data[`stt${ds[6]}`]")
      DataTable(title="敏捷度", :data="data[`stt${ds[7]}`]")
    v-col
      DataTable(title="増強", :data="data[`sttAdd${ds[1]}`]")
      DataTable(title="増強", :data="data[`sttAdd${ds[2]}`]")
    v-col
      DataTable(title="器用度B", :data="data[`bonus${ds[6]}`]")
      DataTable(title="敏捷度B", :data="data[`bonus${ds[7]}`]")
  hr.my-5
</template>

<script lang="ts">
import Vue from "vue";
import SyachiCard from "@/components/util/SyachiCard.vue";
import DataTable from "@/components/data/core/DataTable.vue";

export default Vue.extend({
  components: {
    SyachiCard,
    DataTable,
  },
  props: {
    data: { type: Object },
  },
  data() {
    return {
      basicDataSet: [
        [
          { title: "種族", data: "race" },
          { title: "年齢", data: "age" },
          { title: "性別", data: "gender" },
        ],
        [
          { title: "種族特徴", data: "raceAbility" },
          { title: "穢れ", data: "" },
        ],
        [
          { title: "生まれ", data: "birth" },
          { title: "信仰", data: "faith" },
          { title: "ランク", data: "" },
        ],
      ],
      noryokuDataSet: [
        ["技", "A", "B", "器用度", "敏捷度", "Tec", "Dex", "Agi"],
        ["体", "C", "D", "筋力", "生命力", "Phy", "Str", "Vit"],
        ["心", "E", "F", "知力", "精神力", "Spi", "Int", "Mnd"],
      ],
    };
  },
});
</script>
