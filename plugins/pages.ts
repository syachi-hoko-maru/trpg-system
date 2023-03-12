import { pageSettingList } from "~~/src/pages/pageSettingList";
import { isPageTag, pageTags, pageTagSettings } from "~~/src/pages/pageTags";
import { redirectList } from "~~/src/pages/redirect";
import { scenarioData } from "~~/src/pages/scenario";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      pageSettingList,
      pageTagSettings,
      isPageTag,
      scenarioData,
      pageTags,
      redirectList,
    },
  };
});
