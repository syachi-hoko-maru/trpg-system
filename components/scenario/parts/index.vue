<template lang="pug">
div
  template(v-if="line.type === ''")
    br(v-if="line.text === ''")
    div(v-else-if="line.text === 'GMInfo'") === GM向け情報 =======
    div(v-else-if="line.text === '/GMInfo'") ====================
    div(v-else, v-html="line.text")
</template>

<script lang="ts">
import Vue from "vue";

import Scene from "~/components/scenario/parts/SceneExplainText.vue";
import NormalText from "~/components/scenario/parts/NormalText.vue";
import GMInfo from "~/components/scenario/parts/GMInfoText.vue";

export default Vue.extend({
  name: "partsComponent",
  components: {
    Scene,
    NormalText,
    GMInfo,
  },
  props: {
    line: {
      type: Object,
      required: true,
    },
  },
});
</script>