type DialogoType = "info" | "error";
type Dialogo = {
  andml: string;
  type: DialogoType;
};

export const useDialogo = () => {
  const dialogoArray = useState("dialogo", () => [] as Dialogo[]);
  const fixed = useState("fixed", () => false);

  const openDialogo = (andml: string, type?: DialogoType) => {
    dialogoArray.value.push({ andml, type: type ? type : "info" });
    fixed.value = true;
  };
  const closeDialogo = () => {
    dialogoArray.value.shift();
    fixed.value = false;
  };
  return {
    dialogoArray,
    openDialogo,
    closeDialogo,
    fixed,
  };
};
