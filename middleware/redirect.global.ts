export default defineNuxtRouteMiddleware((to, from) => {
  console.log("to", to.matched.length, to);
  if (to.fullPath !== "/" && to.matched.length === 0) {
    navigateTo("/");
  }
});
