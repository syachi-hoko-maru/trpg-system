import { setBlogData } from "../bloggene/setBlogData";
import { setwebps } from "./setwebps";

setBlogData().then(setwebps);
