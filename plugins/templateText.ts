const templateText = {
  name: "しゃちほこ丸",
  title: "TRPGギルド支部〈しゃちほこの尾びれ亭〉",
  basePath: "/trpg-system",
  baseUrl: "https://syachi-hoko-maru.github.io/trpg-system",
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      templateText,
    },
  };
});
