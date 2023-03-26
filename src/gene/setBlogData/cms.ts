import axios from "axios";
import { writeFileSync } from "fs";
import { blogTextDir } from "../index";

export const getCmsData = async () => {
  const data = (
    await axios.get(
      "https://script.googleusercontent.com/macros/echo?user_content_key=hHiF2dG8NAXWy50xMTmQAewtpO9H36PJNnn-oaTQczA8QUe27Zs5IVRbsj0i5rUcolOG1G4h-kf28JJN6FILHL_IvVUVezzBm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnN_QV3DEyrgkQ-AfOU2C0x9t5GoLDuqO3wdnRTX4QRBasnrioFWZnkGFe8a_2iO5y_g80m9Jf0kc5ikwVsIAbAoitqJ_28Cxuw&lib=McmnOCEslCnBuDjO1eYZTjYp_ku7yiUEV"
    )
  ).data as unknown;
  if (
    Array.isArray(data) &&
    Array.isArray(data[0]) &&
    typeof data[0][0] === "string"
  ) {
    (data as string[][]).forEach((line) => {
      if (!line[1] || !line.slice(2).join("\n")) return;
      console.log(`save ${line[1]}.txt`);
      writeFileSync(
        `${blogTextDir}/cms/${line[1]}.txt`,
        line.slice(2).join("\n")
      );
    });
  } else {
    if (Array.isArray(data) && data.length === 0) return;
    throw "cms text error!!";
  }
};
