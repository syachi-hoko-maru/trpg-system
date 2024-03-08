import type { Ref } from "vue";

export const useSnack = () => {
  const snack = useState("snack", () => "");
  let timeoutID: Ref<null | NodeJS.Timeout> = useState(
    "snackTimeoutID",
    () => null
  );
  const timeoutClear = () => {
    if (timeoutID.value) clearTimeout(timeoutID.value);
  };
  const setNewSnack = (text: string) => {
    snack.value = text;
    timeoutClear();
    timeoutID.value = setTimeout(() => {
      closeSnack();
    }, 2 * 1000);
  };
  const setSnack = (text: string) => {
    if (!snack.value) setNewSnack(text);
    else {
      closeSnack();
      setTimeout(() => {
        setNewSnack(text);
      }, 0.1 * 1000);
    }
  };
  const closeSnack = () => {
    snack.value = "";
    timeoutClear();
  };
  return {
    snack,
    setSnack,
    closeSnack,
  };
};
