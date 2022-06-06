<template lang="pug">
v-app(dark)
  v-navigation-drawer(v-model="drawer", temporary, app)
    v-list
      v-list-item(
        v-for="(item, i) in items",
        :key="item.title",
        :to="item.to",
        router,
        exact
      )
        v-list-item-action
          v-icon {{ item.icon }}
        v-list-item-content
          v-list-item-title(v-text="item.title")
  v-app-bar(clipped-left, app)
    v-app-bar-nav-icon(@click.stop="drawer = !drawer")
    v-toolbar-title しゃちほこ丸のTRPGシステム
  v-main
    v-container
      v-row(justify="center", align="center")
        v-col(cols="12", sm="8", md="6")
          Nuxt
          SyachiCardAmazon
  v-footer(absolute, app)
    span &copy; {{ new Date().getFullYear() }} しゃちほこ丸（
      TwitterLink(inline)
      | ）
</template>

<script>
import TwitterLink from "@/components/util/TwitterLink.vue";
import SyachiCardAmazon from "@/components/util/SyachiCardAmazon.vue";

export default {
  name: "DefaultLayout",
  components: {
    TwitterLink,
    SyachiCardAmazon,
  },
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-book",
          title: "Rulebooks",
          to: "/rulebooks",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Projects",
          to: "/projects",
        },
        {
          icon: "mdi-book",
          title: "Scenario",
          to: "/scenario",
        },

        {
          icon: "mdi-math-integral-box",
          title: "SW2.5 Simulator",
          to: "/sw25simulate",
        },
      ],
    };
  },
};
</script>
