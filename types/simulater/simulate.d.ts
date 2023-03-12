declare type SimpleHanteiResult = {
  readonly value: number;
} & Partial<{
  readonly dice: number[];
  readonly autoSuccess: boolean;
  readonly autoFailure: boolean;
}>;
declare type DamageResult = {
  readonly damage: number;
  readonly criticalCount: number;
  readonly values: number[];
  readonly dices: number[][];
};
declare type simulateFuncResult = {
  readonly result: number;
} & Partial<{
  readonly mokuhyo: number;
  readonly hantei: SimpleHanteiResult;
  readonly nodo: SimpleHanteiResult;
  readonly zyudo: SimpleHanteiResult;
  readonly damageResult: DamageResult;
}>;
// type FormSettings = [HanteiSetting[]] | KurabeaiSetting[][];
declare type simulateFunc = (
  ...FormSettings: readonly FormSetting[][]
) => simulateFuncResult;

declare type ArgSetting = { [tab in Tab]?: readonly FormSetting[] };
declare type simulateResult = {
  readonly mode: Mode;
  readonly label: string;
  readonly value: number;
  readonly argSetting: ArgSetting;
  readonly date: Date;
};
