<template lang="pug">
v-col
  template(v-for="item in items")
    //- 斬り返しなど用
    template(v-if="item.type == 'form'")
      v-switch.d-inline(
        v-model="formSwitchObject[item.name]",
        :label="item.label",
        @change="change(item.name)",
        dense
      )
      template(v-if="formSwitchObject[item.name]")
        .mini-form.px-5.pt-2.mb-6
          template(
            v-for="it in items.filter((o) => o.group === item.group && o.type !== 'form')"
          )
            FormParts(v-if="!it.hidden && (!it.option || option)", :item="it")
    FormParts(
      v-else-if="!item.hidden && (!item.option || option)",
      :item="item"
    )
  v-checkbox(v-if="existOption", v-model="option", label="その他のオプションを表示する")
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import FormParts from "@/components/form/FormParts.vue";

export default Vue.extend({
  name: "FormPartsArray",
  components: {
    FormParts,
  },
  props: {
    items: {
      type: Array as PropType<FormItem[]>,
    },
  },
  data() {
    return {
      formSwitchObject: {},
      option: false,
    };
  },
  computed: {
    existOption() {
      if (this.items.filter((o) => o.option).length > 0) return true;
      return false;
    },
  },
  methods: {
    change() {},
  },
});
</script>

<style lang="scss" scoped>
.mini-form {
  border-left: 3px solid white;
}
</style>
