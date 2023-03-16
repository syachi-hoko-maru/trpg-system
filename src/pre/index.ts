import { getCmsData } from "../bloggene/cms";
import { setBlogData } from "../bloggene/setBlogData";
import { setwebps } from "./setwebps";

getCmsData().then(setBlogData).then(setwebps);
