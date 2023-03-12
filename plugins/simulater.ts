import dice from "~/src/simulater/dice";
import damage from "~~/src/simulater/damage";
import { fukugo } from "~~/src/simulater/fukugo";
import hantei from "~~/src/simulater/hantei";
import mode from "~~/src/simulater/mode";
import { simulate } from "~~/src/simulater/simulate";
import tab from "~~/src/simulater/tab";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dice,
      hantei,
      simulate,
      damage,
      fukugo,
      mode,
      tab,
    },
  };
});
