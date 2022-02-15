<template lang="pug">
div(:class="inline ? 'd-inline' : ''")
  a(v-if="inline", :href="url") {{ text }}
  Botton(v-else, :url="url", :text="text")
</template>

<script>
import Botton from "~/components/util/Button.vue";

export default {
  name: "TwitterLink",
  components: {
    Botton,
  },
  props: {
    yti: {
      type: Boolean,
    },
    inline: {
      type: Boolean,
    },
  },
  computed: {
    url() {
      if (this.yti) return "https://twitter.com/syachi_hoko_yti";
      return "https://twitter.com/syachi_hoko_trp";
    },
    text() {
      if (this.yti) return "Twitter（しゃちほこ丸の屋台）";
      return "Twitter";
    },
  },
};
</script>
