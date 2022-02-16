<template lang="pug">
v-col
  template(v-for="item in items")
    FormParts(v-if="!item.hidden && (!item.option || option)", :item="item")
  v-checkbox(v-if="existOption", v-model="option", label="その他のオプションを表示する")
</template>

<script lang="ts">
import Vue from "vue";
import FormParts from "@/components/form/FormParts.vue";

export default Vue.extend({
  name: "FormPartsArray",
  components: {
    FormParts,
  },
  props: {
    items: {
      type: Array,
    },
  },
  data() {
    return {
      option: false,
    };
  },
  computed: {
    existOption() {
      if (this.items.filter((o) => o.option).length > 0) return true;
      return false;
    },
  },
});
</script>
