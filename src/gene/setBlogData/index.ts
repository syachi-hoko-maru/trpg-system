import { getCmsData } from "./cms";
import { geneImage } from "./geneImage";
import { setBlogTxt, setScenarioTxt } from "./setBlogTxt";

export const setBlogData = async () => {
  return getCmsData().then(setBlogTxt).then(setScenarioTxt).then(geneImage);
};
