import { getCmsData } from "./cms";
import { geneImage } from "./geneImage";
import { setBlogTxt, setScenarioTxt } from "./setBlogTxt";

export const setBlogData = async () => {
  if (process.argv[2] === "onlyblog") {
    // console.log(777);
    return setBlogTxt().then(setScenarioTxt);
  } else {
    return getCmsData().then(setBlogTxt).then(setScenarioTxt).then(geneImage);
  }
};
