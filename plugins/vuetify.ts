import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const info = "#2a367a";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#fff",
    primary: "#673ab7",
    secondary: "#381e66",
    link: info,
    textbp: "#fff",
    text: "#333",
    disabled: "#888",
    error: "#910f31",
    info: info,
    surface: "#fff",
    accent: "#ffee8c",
    warning: "#ffeb3b",
    success: "#2196f3",
  },
};
const myCustomDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#4c4c4c",
    primary: "#2d1b4f",
    secondary: "#1b1c4f",
    link: "#fff",
    textbp: "#fff",
    text: "#fff",
    disabled: "#888",
    error: "#910f31",
    info: info,
    surface: "#4c4c4c",
    accent: "#4d2694",
    warning: "#ffeb3b",
    success: "#2196f3",
  },
};
const myCustomHalloweenTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#4b3c5c",
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
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "myCustomDarkTheme",
      themes: { myCustomLightTheme, myCustomDarkTheme, myCustomHalloweenTheme },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
