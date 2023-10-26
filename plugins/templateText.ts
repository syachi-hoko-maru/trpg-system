const templateText = {
  name: "しゃちほこ丸",
  title: "TRPGギルド支部〈しゃちほこの尾びれ亭〉",
  basePath: "",
  baseUrl: "https://trpg.syachi.work",
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      templateText,
    },
  };
});
