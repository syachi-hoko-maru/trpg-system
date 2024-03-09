type YesnoDefine = Readonly<YesnoDefineFree>;
type YesnoDefineFree = {
  [key in string]: {
    question: string;
    parent?: readonly T[];
    kaburi?: readonly T[];
    reverse?: boolean;
  };
};

type YesNoDict<K extends string, T extends YesnoDefine> = {
  [key in K]: (keyof T)[];
};
type YesNoScore<K extends string> = { [key in K]?: number };
type YesNoTagHistory<T extends YesnoDefine> = {
  [key in keyof Tag]?: 1 | -1 | 0;
};
type YesNoResult<K extends string> = { foryou: Key; other: Key[] };
