export const useBosyu = () => {
  const { $bosyuSettings } = useNuxtApp();

  const bosyuSettings = $bosyuSettings.map((bosyuSetting, i) =>
    useState(`bosyuSetting${i}`, () => bosyuSetting)
  );

  return { bosyuSettings };
};
