import { Ref } from "vue";

export const usePages = () => {
  const route = useRoute();
  const { $getPageSetting } = useNuxtApp();

  const pageArray = useState("pageArray", () => [] as string[]);

  const getNowPage = () => route.fullPath;

  const nowPageSetting: Ref<PageSetting> = ref($getPageSetting(route.fullPath));

  const getNowPagePage = (): number => {
    const qp = Number(
      Array.isArray(route.params.page)
        ? route.params.page[0]
        : route.params.page
    );
    if (Number.isNaN(qp)) return 1;
    else return qp;
  };
  const getNowPath = () => route.path;
  const getQuerys = () =>
    Object.entries(route.query).map(([key, value]) => {
      const result: { [key: string]: string } = {};
      if (Array.isArray(value)) result[key] = value.join("");
      else if (value) result[key] = value;
      return result;
    });

  const getQueryValue = (query: string) => {
    const foundObj = getQuerys().find((a) => Object.keys(a)[0] === query);
    if (!foundObj) return null;
    else return foundObj[query];
  };

  const savePage = (path?: string) => {
    const p = path ? path : route.fullPath;
    if (!p) return;
    const pageUrl = p.replace(/(.+)\/+$/, "$1");
    if (pageUrl !== pageArray.value[0]) {
      pageArray.value.unshift(pageUrl);
      console.log("save page", pageArray.value);
    }
  };

  const changeRoute = () => {
    nowPageSetting.value = $getPageSetting(route.fullPath);
    savePage();
  };
  changeRoute();
  watch(route, changeRoute);

  return {
    pageArray,
    nowPageSetting,
    getNowPage,
    getNowPagePage,
    getNowPath,
    getQuerys,
    getQueryValue,
  };
};
