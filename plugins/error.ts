export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (err, context) => {
    console.error("vue error", err, context);
  };
});
