import axios from "axios";
import { writeFileSync } from "fs";
import { blogTextDir } from ".";

export const getCmsData = async () => {
  const data = (
    await axios.get(
      "https://script.googleusercontent.com/macros/echo?user_content_key=97jUSA_OQ9a0vR268RqGroT0vXcBpFBlqWFm91-fvi83jH0GvmSisuMr-s0G-VI6-8IyUxvACiEiyvrJXaj3snkmv6qb9FF8m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnN_QV3DEyrgkQ-AfOU2C0x9t5GoLDuqO3wdnRTX4QRBasnrioFWZnkGFe8a_2iO5y_g80m9Jf0kc5ikwVsIAbAoitqJ_28Cxuw&lib=McmnOCEslCnBuDjO1eYZTjYp_ku7yiUEV"
    )
  ).data as unknown;
  if (
    Array.isArray(data) &&
    Array.isArray(data[1]) &&
    typeof data[1][0] === "string"
  ) {
    (data as string[][]).forEach((line, i) => {
      if (i === 0 || !line[1] || !line.slice(2).join("\n")) return;
      console.log(`save ${line[1]}.txt`);
      writeFileSync(
        `${blogTextDir}/cms/${line[1]}.txt`,
        line.slice(2).join("\n")
      );
    });
  } else {
    throw "cms text error!!";
  }
};
