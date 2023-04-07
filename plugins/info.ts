const infoData: { [key: string]: { title: string; description: string } } = {
  trpg: {
    title: "TRPG",
    description: `
「TRPGって何？」って方はまず以下のページをご覧ください。
&button_/trpg? こちら
&br
また、富士見書房公式 TRPG ONLINEの「TRPGとは」に掲載されている説明を見るのもおすすめです。
&button_https://fujimi-trpg-online.jp/about/trpg.html こちら
`,
  },
  sw25: {
    title: "ソード・ワールド2.5",
    description: `
ソード・ワールド2.5はファンタジー世界で冒険をするTRPGです。
&button_/sw25? 詳しくはこちら
`,
  },
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      info(props: string) {
        const data = infoData[props];
        if (data && data.title) {
          return data;
        }
        throw createError(`[Error] information of "${props}" is not found`);
      },
    },
  };
});
