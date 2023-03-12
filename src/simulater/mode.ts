const modes: Readonly<Mode[]> = [
  "hantei",
  "kurabeai",
  "damage",
  "hanteiDamage",
] as const;

const isMode = (mode: string): mode is Mode => {
  return modes.some((mo) => mo === mode);
};

export default {
  modes,
  isMode,
};
