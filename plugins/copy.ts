export default defineNuxtPlugin(() => {
  const { setSnack } = useSnack();
  return {
    provide: {
      copy(text: string) {
        const type = "text/plain";
        const blob = new Blob([text], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        return navigator.clipboard.write(data).then((result) => {
          setSnack("クリップボードにコピーしました");
          return result;
        });
      },
    },
  };
});
