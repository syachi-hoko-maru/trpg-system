<template lang="pug">
.my-3(justify="center", align="center")
  NuxtLink(:to="url", v-if="type == 'internal'")
    v-btn(block) {{ text }}
  a(:href="url", target="_blank", v-else-if="type == 'external'")
    v-btn(block, outlined) {{ text }}
  v-btn(block, v-else) {{ text }}
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
    type() {
      if (!this.url) {
        return "none";
      } else if (!this.url.match(/^http[s]+/)?.length) {
        return "internal";
      } else {
        return "external";
      }
    },
  },
};
</script>
