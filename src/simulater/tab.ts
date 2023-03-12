const tabs: Readonly<Tab[]> = [
  "hantei",
  "nodo",
  "zyudo",
  "damage",
  "damageWithTeiko",
  "hidamage",
] as const;

const isTab = (tab: string): tab is Tab => {
  return tabs.some((ta) => ta === tab);
};

export default {
  tabs,
  isTab,
};
