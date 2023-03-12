export const usePages = () => {
  const route = useRoute();

  const pageArray = useState("pageArray", () => [] as string[]);
  // const changePageFuncArray = useState(
  //   "changePageFuncArray",
  //   () => [] as { key: string; func: () => void }[]
  // );

  const getNowPage = () => pageArray.value[0];
  const getNowPath = () =>
    getNowPage()?.replace(/\?.*$/, "").replace(/#.*$/, "");
  const getQuerys = () => {
    const queryStr = getNowPage().match(/^.*\?([^:\/]+)$/);
    if (!queryStr) return [];
    return queryStr[1].split("&").map((str) => {
      const result: { [key: string]: string } = {};
      const [key, value] = str.split("=");
      result[key] = value;
      return result;
    });
    // .filter(({ value }) => value);
  };
  const getQueryValue = (query: string) => {
    const find = getQuerys().find((a) => Object.keys(a)[0] === query);
    if (!find) return null;
    else return find[query];
  };

  const savePage = (path?: string) => {
    const p = path ? path : route.fullPath;
    if (!p) return;
    const pageUrl = p.replace(/(.+)\/+$/, "$1");
    if (pageUrl !== pageArray.value[0]) pageArray.value.unshift(pageUrl);
    console.log("save page", pageArray.value);
    // changePageFuncArray.value.forEach(({ key, func }) => {
    //   console.log(key);
    //   func();
    // });
  };
  // const saveChangePageFunc = (key: string, func: () => void) => {
  //   const i = changePageFuncArray.value.findIndex((obj) => key === obj.key);
  //   if (i >= 0) {
  //     changePageFuncArray.value[i].func = func;
  //   } else {
  //     changePageFuncArray.value.push({ key, func });
  //   }
  // };

  return {
    pageArray,
    getNowPage,
    getNowPath,
    getQuerys,
    getQueryValue,
    savePage,
    // saveChangePageFunc,
  };
};
