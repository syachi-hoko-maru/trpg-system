export const setBlogExplain = (b: Blog, count: number) => {
  return (
    b.andml
      .replace(/&[a-zA-Z0-9_:\/%]*\s?/g, "")
      .replace(/[\s_,]/g, "")
      .replace(/\n/g, " &br ")
      .slice(0, count) + `... 公開日：${b.date} `
  );
};
