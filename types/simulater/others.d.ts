declare type NdResult = {
  readonly ndiceArray: number[];
  readonly sum: number;
  readonly check?: boolean;
};

type Mode = "hantei" | "kurabeai" | "damage" | "hanteiDamage";
declare type Tab =
  | "hantei"
  | "nodo"
  | "zyudo"
  | "damage"
  | "damageWithTeiko"
  | "hidamage";

declare type ModeSetting = {
  readonly label: string;
  readonly tabs: Tab[];
  readonly func: simulateFunc;
};
