import { getCmsData } from "./cms";
import { setBlogData } from "./setBlogData";

getCmsData().then(() => {
  setBlogData();
});
