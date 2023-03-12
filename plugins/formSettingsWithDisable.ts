const hasValue = (formSetting: FormSetting) => {
  // if (formSetting.type === "date") return false;
  if (formSetting.value && formSetting.value !== "0") return true;
  return false;
};

const setDisable = (formSettings: FormSetting[]) => {
  const results: FormSettingsWithDisable[] = formSettings.map((formSetting) => {
    const result: FormSettingsWithDisable = formSetting;
    result.disabled = false;
    return result;
  });
  for (let formSetting of results) {
    for (let fo of results) {
      if (
        formSetting.conflict?.length &&
        formSetting.conflict.indexOf(fo.name) >= 0
        // (fo.conflict?.length && fo.conflict.indexOf(formSetting.name) >= 0)
      ) {
        if (hasValue(fo)) {
          formSetting.disabled = true;
        } else if (hasValue(formSetting)) {
          fo.disabled = true;
        }
      }
    }
  }
  return results;
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      setDisable,
    },
  };
});
