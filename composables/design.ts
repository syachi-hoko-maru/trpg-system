import { useTheme } from "vuetify/lib/framework.mjs";
import { nowDate } from "~/src/util/date";

const themeKeyList = ["light", "dark", "halloween", "sakura"] as const;
type ThemeKey = (typeof themeKeyList)[number];
const themeDict: { [key in ThemeKey]: { vuetify: string } } = {
  light: { vuetify: "myCustomLightTheme" },
  dark: { vuetify: "myCustomDarkTheme" },
  halloween: { vuetify: "myCustomHalloweenTheme" },
  sakura: { vuetify: "myCustomSakuraTheme" },
};
const isThemeKey = (T: string): T is ThemeKey => {
  return themeKeyList.some((k) => k === T);
};

export const useDesign = () => {
  const theme = useTheme();
  const nowTheme = useState("nowTheme", () => "dark" as ThemeKey);

  /**
   * テーマを設定する
   * @param themeKey
   */
  const setTheme = (key: string | null): ThemeKey => {
    let themeKey: ThemeKey;
    if (key && isThemeKey(key)) {
      // const month = themeDict[key].month;
      // if (
      //   Array.isArray(month) &&
      //   month.indexOf(nowDate().getMonth() + 1) === -1
      // ) {
      //   // 期間外ならダークモードにする
      //   themeKey = "dark";
      // } else {
      themeKey = key;
      // }
    } else {
      themeKey = "dark";
    }

    nowTheme.value = themeKey;
    theme.global.name.value = themeDict[themeKey].vuetify;
    return themeKey;
  };

  const toggleTheme = (): ThemeKey => {
    if (nowTheme.value === "dark") {
      return setTheme("light");
    } else {
      return setTheme("dark");
    }
  };

  return {
    nowTheme,
    setTheme,
    toggleTheme,
  };
};
