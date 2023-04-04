export const useLoad = () => {
  const load = useState("load", () => [] as boolean[]);
  const ok = ref(false);
  const setLoad = () => {
    const i = load.value.push(false) - 1;
    // console.log("set load", i);
    return () => {
      if (load.value[i]) return;
      // console.log("finish load", i);
      load.value[i] = true;
    };
  };

  const route = useRoute();
  watch(route, () => {
    load.value = [];
  });
  watch(load.value, () => {
    if (load.value.filter((l) => !l).length === 0) {
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
