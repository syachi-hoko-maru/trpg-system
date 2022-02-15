<template lang="pug">
.my-3(justify="center", align="center")
  NuxtLink(:to="url", v-if="internal")
    v-btn(block) {{ text }}
  a(:href="url", target="_blank", v-else)
    v-btn(block, outlined) {{ text }}
</template>

<script>
export default {
  name: "Botton",
  props: {
    url: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  computed: {
    internal() {
      if (!this.url.match(/^http[s]+/)?.length) return true;
      return false;
    },
  },
};
</script>
