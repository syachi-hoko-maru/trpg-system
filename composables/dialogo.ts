type DialogoType = "info" | "error";
type Dialogo = {
  andml: string;
  type: DialogoType;
};

export const useDialogo = () => {
  const dialogoArray = useState("dialogo", () => [] as Dialogo[]);
  const openDialogo = (andml: string, type?: DialogoType) => {
    dialogoArray.value.push({ andml, type: type ? type : "info" });
  };
  const closeDialogo = () => {
    dialogoArray.value.shift();
  };
  return {
    dialogoArray,
    openDialogo,
    closeDialogo,
  };
};
