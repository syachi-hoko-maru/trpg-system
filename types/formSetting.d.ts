type FormSettingCore<N = string> = {
  readonly name: N;
  readonly label: string;
  readonly conflict?: string[];
};
declare type FormSettingNumber<N = string> = FormSettingCore<N> & {
  readonly type: "number";
  value: number | string;
  readonly hint?: string;
};
declare type FormSettingString<N = string> = FormSettingCore<N> & {
  readonly type: "string";
  value: string;
  readonly hint?: string;
};

declare type FormSettingBoolean<N = string> = FormSettingCore<N> & {
  readonly type: "boolean";
  value: boolean;
};
declare type FormSettingSelect<N = string, S = string> = FormSettingCore<N> & {
  readonly type: "select";
  value: S;
  selects: S[];
  readonly hint?: string;
};
declare type FormSettingCheck<N = string, S = string> = FormSettingCore<N> & {
  readonly type: "check";
  value: S[];
  selects: S[];
};
declare type FormSettingCombo<N = string, S = string> = FormSettingCore<N> & {
  readonly type: "combo";
  value: S;
  readonly selects: S[];
  readonly hint?: string;
  readonly multiple?: boolean;
};
declare type FormSettingSlider<
  N = string,
  S = string | number
> = FormSettingCore<N> & {
  readonly type: "slider";
  value: number | [number, number];
  readonly selects: S[];
  tickCount?: number;
};
declare type FormSettingTextarea<N = string> = FormSettingCore<N> & {
  readonly type: "textarea";
  value: string;
  readonly hint?: string;
  rows?: number;
};
declare type FormSettingDate<N = string> = FormSettingCore<N> & {
  readonly type: "date";
  value: string;
};

declare type FormSettingParent<N = string, S = string> = FormSettingCore<N> & {
  readonly type: "parent";
  value: null;
  childs: FormSetting<N, S>[];
};
declare type FormSetting<N = string, S = string> =
  | FormSettingNumber<N>
  | FormSettingString<N>
  | FormSettingBoolean<N>
  | FormSettingTextarea<N>
  | FormSettingSelect<N, S>
  | FormSettingCheck<N, S>
  | FormSettingCombo<N, S>
  | FormSettingSlider<N, S>
  | FormSettingDate<N>
  | FormSettingParent<N, S>;
declare type FormSettingsWithDisable<> = FormSetting & {
  disabled?: boolean;
};

declare type HanteiCoreSettingName = "kizyun" | "kotei" | "kake2";
declare type HanteiSettingName = "mokuhyo";
declare type kurabeaiSettingName = "koteichi";
declare type DamageSettingName =
  | "iryoku"
  | "tsuika"
  | "critical"
  | "plus"
  | "cplus"
  | "kotei"
  | "ckotei"
  | "kake2"
  | "ckake2";
declare type TeikoSettingName = "teiko";
declare type HiDamageSettingName = "bogo";

declare type HanteiSetting = FormSetting<
  HanteiCoreSettingName | HanteiSettingName
>;
declare type KurabeaiSetting = FormSetting<
  HanteiCoreSettingName | kurabeaiSettingName
>;
declare type DamageSetting = FormSetting<DamageSettingName>;
declare type TeikoSetting<S = string> = FormSetting<TeikoSettingName, S>;
declare type DamageWithTeikoSetting = FormSetting<
  DamageSettingName | TeikoSettingName
>;
declare type HiDamageSetting = FormSetting<HiDamageSettingName>;

declare type BosyuSetting = {
  name: "base" | "date" | "bosyu" | "regyu" | "others";
  label: string;
  items: FormSetting[];
}[];
