import { Ref } from "vue";
import { Banner, bannerList } from "~/src/banner/banners";

export const usePages = () => {
  const route = useRoute();
  const { $getPageSetting, $getOsusumePageList } = useNuxtApp();

  const pageArray = useState("pageArray", () => [] as string[]);
  const osusumePageArray = useState(
    "osusumePageArray",
    () => [] as PageSetting[]
  );
  const kanrenPageArray = useState(
    "kanrenPageArray",
    () => [] as PageSetting[]
  );
  const popularPageArray = useState(
    "popularPageArray",
    () => [] as PageSetting[]
  );

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
  const getNowPath = () => route.path.replace(/^(.+)\/$/, "$1");
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

  const savePage = (path?: string): boolean => {
    const p = path ? path : route.fullPath;
    if (!p) return false;
    const pageUrl = p.replace(/(.+)\/+$/, "$1");
    if (pageUrl !== pageArray.value[0]) {
      pageArray.value.unshift(pageUrl);
      console.log("save page", pageArray.value);
      return true;
    } else {
      return false;
    }
  };

  // バナー関連
  const nowBannerList = ref(
    bannerList.filter(({ to }) => to !== pageArray.value[0])
  );
  const getBanner = (): Banner => {
    return nowBannerList.value[
      Math.floor(Math.random() * nowBannerList.value.length)
    ];
  };

  /**
   * ページが変わった際の処理
   */
  const changeRoute = () => {
    const r = savePage();
    nowPageSetting.value = $getPageSetting(route.fullPath);
    osusumePageArray.value = $getOsusumePageList(
      nowPageSetting.value,
      "osusume",
      pageArray.value
    );
    kanrenPageArray.value = $getOsusumePageList(
      nowPageSetting.value,
      "kanren",
      pageArray.value
    );
    popularPageArray.value = $getOsusumePageList(
      nowPageSetting.value,
      "popular",
      pageArray.value
    );
    nowBannerList.value = bannerList.filter(
      ({ to }) => to !== pageArray.value[0]
    );
  };
  changeRoute();
  watch(route, changeRoute);

  return {
    pageArray,
    osusumePageArray,
    kanrenPageArray,
    popularPageArray,
    nowPageSetting,
    getNowPage,
    getNowPagePage,
    getNowPath,
    getQuerys,
    getQueryValue,
    getBanner,
  };
};
