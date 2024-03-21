import { getValues } from "~/src/util";
import { bookTypes, type BookSmallType } from "./bookType";
import type { Gino } from "../ginou";
import type { Syuzoku } from "../syuzoku";

export const getSupplimentLink = (
  suppliment: SupplimentData<string, Gino, Syuzoku, string, BookSmallType>
) =>
  `/sw25/forbeginner/suppliment/${
    getValues(bookTypes).findIndex(
      (bookType) => bookType.findIndex((bt) => bt === suppliment.bookType) >= 0
    ) + 2
  }#${suppliment.name.replace(/\s/g, "")}`;
