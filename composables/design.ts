import { useTheme } from "vuetify/lib/framework.mjs";

const themeKeyList = ["light", "dark", "halloween"] as const;
type ThemeKey = (typeof themeKeyList)[number];
const themeDict: { [key in ThemeKey]: string } = {
  light: "myCustomLightTheme",
  dark: "myCustomDarkTheme",
  halloween: "myCustomHalloweenTheme",
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
      themeKey = key;
    } else {
      themeKey = "dark";
    }
    nowTheme.value = themeKey;
    theme.global.name.value = themeDict[themeKey];
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
