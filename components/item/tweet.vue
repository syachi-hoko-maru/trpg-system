<template>
  <div v-if="flag" class="bg-white tweet">
    <blockquote
      class="twitter-tweet"
      data-lang="ja"
      data-dnt="true"
      data-theme="dark"
    >
      <a :href="pathCheck(Props.path)"></a>
    </blockquote>
  </div>
  <div v-else>
    <ItemTextlink :to="Props.path">{{ Props.path }}</ItemTextlink>
  </div>
</template>
<script setup lang="ts">
interface Props {
  path: string;
}
const Props = defineProps<Props>();
const flag = ref(false);

useHead({
  script: [
    {
      async: true,
      src: "https://platform.twitter.com/widgets.js",
    },
  ],
});

const regExp = /(https:\/\/twitter.com\/[A-Za-z01-9_-]+\/status\/\d+)[^\d]*.*/;
const pathCheck = (path: string | undefined): string | undefined => {
  if (path) {
    path = path.replace("x.com", "twitter.com");
    if (regExp.test(path)) {
      return path.replace(regExp, "$1");
    }
  }
  return undefined;
};

onMounted(() => {
  flag.value = true;
  if (pathCheck(Props.path) && (window as any).twttr) {
    (window as any).twttr.widgets.load();
  } else {
    flag.value = false;
  }
});
</script>

<style scoped lang="scss">
div.tweet {
  padding: calc(12px - 10px) 12px;
  margin: 16px 0;
  border-radius: 12px;
}
</style>
