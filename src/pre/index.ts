import { setBlogData } from "./gene/setBlogData";
import { setSecret } from "./setSecret";
import { setwebps } from "./setwebps";

setBlogData().then(setwebps).then(setSecret);
