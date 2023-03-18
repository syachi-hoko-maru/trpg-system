import { setBlogData } from "../gene/setBlogData";
import { setwebps } from "./setwebps";

setBlogData().then(setwebps);
