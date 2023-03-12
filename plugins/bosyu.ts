import { bosyuSettings } from "~~/src/bosyu/setting";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      bosyuSettings,
    },
  };
});
