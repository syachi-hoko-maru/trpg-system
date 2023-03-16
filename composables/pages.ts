export const usePages = () => {
  const route = useRoute();

  const pageArray = useState("pageArray", () => [] as string[]);

  const getNowPage = () => pageArray.value[0];
  const getNowPagePage = (): number => {
    const qp = Number(
      Array.isArray(route.params.page)
        ? route.params.page[0]
        : route.params.page
    );
    if (Number.isNaN(qp)) return 1;
    else return qp;
  };
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
  };

  return {
    pageArray,
    getNowPage,
    getNowPagePage,
    getNowPath,
    getQuerys,
    getQueryValue,
    savePage,
  };
};
