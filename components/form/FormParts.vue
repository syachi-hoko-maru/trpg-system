<template lang="pug">
div
  v-text-field(
    v-if="item.type == 'number'",
    v-model="item.value",
    :label="item.label",
    :rules="rules.numberRule",
    dense
  )
  v-select(
    v-else-if="Array.isArray(item.type)",
    v-model="item.value",
    :label="item.label",
    :items="item.type",
    dense
  )
  v-switch.d-inline(
    v-else-if="item.type == 'switch'",
    v-model="item.value",
    :label="item.label",
    :items="item.type",
    dense
  )
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Form",
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      rules: {
        numberRule: [
          // (v: any) => !!v || "入力必須です",
          (v: any) => /\d+/.test(v) || "半角数字を入力してください",
        ],
      },
    };
  },
});
</script>
