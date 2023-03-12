const getSetting = <T extends string = string>(
  str: T,
  formSettings: FormSetting[]
): FormSetting => {
  const name = (str as string).replace(/\?$/, "");
  const setting = formSettings.find((v) => v.name === name);
  if (!setting) {
    throw `[Bug] ${str} is not exists in ${JSON.stringify(formSettings)}`;
  }
  return setting;
};

export const getBoolean = <T extends string = string>(
  str: T,
  formSettings: FormSetting[]
): boolean => {
  const { value } = getSetting<T>(str, formSettings);
  if (typeof value === "boolean") return value;
  throw `${str}の入力が不正です。`;
};

export const toNumber = (a: string | number) => {
  const number = Number(a);
  if (!Number.isNaN(number)) return number;
  throw `[Bug] ${a} is not number`;
};

export const getNumber = <T extends string = string>(
  str: T,
  formSettings: FormSetting[]
): number => {
  const { value } = getSetting<T>(str, formSettings);
  if (typeof value === "number") return value;
  else if (typeof value === "string") {
    const number = Number(value);
    if (!Number.isNaN(number)) return number;
  }
  throw `${str}の入力は半角数字である必要があります。`;
};

export const getSelect = <T extends string = string>(
  str: T,
  formSettings: FormSetting[]
): string => {
  const setting = getSetting<T>(str, formSettings);
  if (
    setting.type === "select" &&
    setting.selects.indexOf(setting.value) >= 0
  ) {
    return setting.value;
  }
  throw `${str}の入力が不正です。`;
};
