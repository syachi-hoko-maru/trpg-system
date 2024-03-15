type DialogoType = "info" | "error";

type Dialogo =
  | {
      andml: string;
      type: DialogoType;
      is: "normal";
    }
  | {
      type: YesNoType;
      is: "yesno";
    };

export const useDialogo = () => {
  const dialogoArray = useState("dialogo", () => [] as Dialogo[]);
  const fixed = useState("fixed", () => false);

  const openDialogo = (andml: string, type?: DialogoType) => {
    dialogoArray.value.push({
      andml,
      type: type ? type : "info",
      is: "normal",
    });
    fixed.value = true;
  };
  const openDialogoYesNo = (type: YesNoType) => {
    dialogoArray.value.push({ type, is: "yesno" });
    fixed.value = true;
  };
  const closeDialogo = () => {
    dialogoArray.value.shift();
    fixed.value = false;
  };
  return {
    dialogoArray,
    openDialogo,
    openDialogoYesNo,
    closeDialogo,
    fixed,
  };
};
