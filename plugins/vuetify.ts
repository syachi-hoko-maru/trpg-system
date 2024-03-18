import { createVuetify } from "vuetify";
import type { ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const info = "#2a367a";

type MyThemeDifinition = ThemeDefinition & {
  colors: {
    background: string;
    bbackground: string;
    primary: string;
    secondary: string;
    link: string;
    textbp: string;
    text: string;
    disabled: string;
    error: string;
    info: string;
    surface: string;
    accent: string;
    warning: string;
    success: string;
    twitter: string;
    amazon: string;
  };
};
const myCustomLightTheme: MyThemeDifinition = {
  dark: false,
  colors: {
    background: "#eee",
    bbackground: "#ddd",
    primary: "#673ab7",
    secondary: "#381e66",
    link: info,
    textbp: "#eee",
    text: "#333",
    disabled: "#888",
    error: "#910f31",
    info: info,
    surface: "#eee",
    accent: "#ffee8c",
    warning: "#ffeb3b",
    success: "#2196f3",
    twitter: "#2196F3",
    amazon: "#f74a00",
  },
};
const myCustomDarkTheme: MyThemeDifinition = {
  dark: true,
  colors: {
    background: "#414141",
    bbackground: "#3d3d3d",
    primary: "#2d1b4f",
    secondary: "#1b1c4f",
    link: "#fdfdfd",
    textbp: "#fdfdfd",
    text: "#fdfdfd",
    disabled: "#888",
    error: "#910f31",
    info: info,
    surface: "#414141",
    accent: "#551fb8",
    warning: "#ffeb3b",
    success: "#2196f3",
    twitter: "#2196F3",
    amazon: "#f74a00",
  },
};
const myCustomHalloweenTheme: MyThemeDifinition = {
  dark: true,
  colors: {
    background: "#4b3c5c",
    bbackground: "#524363",
    primary: "#c75e08",
    secondary: "#eba050",
    link: "#fff",
    textbp: "#250b4a",
    text: "#fff",
    disabled: "#4d4854",
    error: "#910f31",
    info: info,
    surface: "#4b3c5c",
    accent: "#c73808",
    warning: "#ffeb3b",
    success: "#2196f3",
    twitter: "#c75e08",
    amazon: "#f74a00",
  },
};
const myCustomSakuraTheme: MyThemeDifinition = {
  dark: false,
  colors: {
    background: "#fff5fe",
    bbackground: "#fff0fd",
    primary: "#ff6ef0",
    secondary: "#e67adb",
    link: info,
    textbp: "#fff5fe",
    text: "#333",
    disabled: "#888",
    error: "#910f31",
    info: info,
    surface: "#fff5fe",
    accent: "#ffee8c",
    warning: "#ffeb3b",
    success: "#2196f3",
    twitter: "#2196F3",
    amazon: "#f74a00",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "myCustomDarkTheme",
      themes: {
        myCustomLightTheme,
        myCustomDarkTheme,
        myCustomHalloweenTheme,
        myCustomSakuraTheme,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
