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
    background: "#3c3c3c",
    primary: "#2d1b4f",
    secondary: "#1b1c4f",
    link: "#eee",
    textbp: "#eee",
    text: "#ddd",
    disabled: "#888",
    error: "#910f31",
    info: info,
    surface: "#3c3c3c",
    accent: "#700000",
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
      themes: { myCustomLightTheme, myCustomDarkTheme },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
