<template lang="pug">
.my-5
  template(v-if="box.type === 'break'")
    br
  template(v-else)
    components(:is="box.type ? box.type : 'Normal'")
      template(v-for="line in box.lines")
        br(v-if="line === '' && box.type !== ''")
        div(
          v-else,
          v-for="string in strings(line)",
          :class="string.class",
          v-html="string.str"
        )
</template>

<script lang="ts">
import Vue from "vue";

import SceneExplain from "~/components/scenario/parts/SceneExplainText.vue";
import Normal from "~/components/scenario/parts/NormalText.vue";
import GMInfo from "~/components/scenario/parts/GMInfoText.vue";

export default Vue.extend({
  name: "partsComponent",
  components: {
    SceneExplain,
    Normal,
    GMInfo,
  },
  props: {
    box: {
      type: Object,
      required: true,
    },
  },
  methods: {
    strings(line: string) {
      return [{ str: line }];
    },
  },
});
</script>