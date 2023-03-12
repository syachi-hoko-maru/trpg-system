export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (err, context) => {
    console.log("vue error", err, context);
  };
});
