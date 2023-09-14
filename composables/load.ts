export const useLoad = () => {
  // load中のものの配列（load中ならfalse）
  const load = useState("load", () => [] as boolean[]);
  // 全てのloadが終わっているかどうかの値
  const ok = useState("ok", () => false);

  // loadとして設定する
  const setLoad = (): (() => void) => {
    // falseとして設定する
    const i = load.value.push(false) - 1;
    // 返り値として、load終了したらtrueにするための関数
    return () => {
      // すでにtrueなら終了
      if (load.value[i]) return;
      // trueでないならtrueにする
      load.value[i] = true;
    };
  };

  const route = useRoute();
  // ページが変わるたびに行う処理
  watch(route, () => {
    // load中の配列を空にする
    load.value = [];
    // 全てのloadが終わっているかどうかをfalseにする
    ok.value = false;
  });

  // loadが進むたびに行う処理
  watch(load.value, () => {
    // 全部がtrueなら（falseのものがないなら）
    if (load.value.filter((l) => !l).length === 0) {
      // okの値を変える
      ok.value = true;
    } else {
      ok.value = false;
    }
  });

  return {
    ok,
    setLoad,
  };
};
