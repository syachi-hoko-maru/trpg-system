import { defineNuxtPlugin } from "#app";
import VueGtag from "vue-gtag";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  nuxtApp.vueApp.use(
    VueGtag,
    {
      appName: "TRPGギルド支部〈しゃちほこの尾びれ亭〉",
      pageTrackerScreenviewEnabled: true,
      config: { id: `G-51VH52J9RT` },
    },
    router
  );
});
