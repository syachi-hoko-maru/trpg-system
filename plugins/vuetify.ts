import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#fff",
    primary: "#673ab7",
    secondary: "#381e66",
    textbp: "#fff",
    text: "#333",
    disabled: "#888",
    error: "#910f31",
    info: "#2a367a",
    surface: "#fff",
    accent: "#ff9800",
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
    textbp: "#eee",
    text: "#ddd",
    disabled: "#888",
    error: "#910f31",
    info: "#2a367a",
    surface: "#3c3c3c",
    accent: "#ff9800",
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
