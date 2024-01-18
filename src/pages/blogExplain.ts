export const setBlogExplain = (b: Blog, count: number) => {
  return (
    b.andml
      .replace(/&[a-zA-Z0-9_:\/%]*\s/g, "")
      .replace(/[\s_,¥]/g, "")
      .replace(/([^。])\n/g, "$1。")
      .slice(0, count) +
    `... 公開日：${b.date} ` +
    (b.tags.indexOf("tech") >= 0
      ? `JavaScript,TypeScript,Node.js,Nuxt3,Vue3,GitHub Actions,GitHub Pages`
      : "")
  );
};
