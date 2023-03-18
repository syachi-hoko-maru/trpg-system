import { getCmsData } from "./cms";
import { geneImage } from "./geneImage";
import { setBlogTxt } from "./setBlogTxt";

export const setBlogData = async () => {
  return getCmsData().then(setBlogTxt).then(geneImage);
};
