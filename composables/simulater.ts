import { Ref } from "vue";

export const useSimulater = () => {
  const { $hantei, $damage, $fukugo } = useNuxtApp();

  const modeSetting: {
    [mode in Mode]: ModeSetting;
  } = {
    hantei: { label: "判定", tabs: ["hantei"], func: $hantei.hantei },
    kurabeai: {
      label: "達成値の比べ合い",
      tabs: ["nodo", "zyudo"],
      func: $hantei.kurabeai,
    },
    damage: {
      label: "ダメージ",
      tabs: ["damage", "hidamage"],
      func: $damage.damage,
    },
    hanteiDamage: {
      label: "達成値の比べ合い+ダメージ",
      tabs: ["nodo", "zyudo", "damageWithTeiko", "hidamage"],
      func: $fukugo,
    },
  };

  const hanteiSetting = useState("hanteiSetting", () =>
    $hantei.getHanteiSettings()
  );
  const nodoSetting = useState("nodoSetting", () =>
    $hantei.getKurabeaiSettings()
  );
  const zyudoSetting = useState("zyudoSetting", () =>
    $hantei.getKurabeaiSettings()
  );
  const damageSetting = useState("damageSetting", () =>
    $damage.getDamageSetting()
  );
  const damageWithTeikoSetting = useState("damageWithTeikoSetting", () =>
    $damage.getDamageWithTeikoSetting()
  );
  const hiDamageSetting = useState("hiDamageSetting", () =>
    $damage.getHiDamageSetting()
  );

  const tabSetting: {
    [tab in Tab]: {
      readonly tabName: string;
      formSettings: Ref<FormSetting[]>;
    };
  } = {
    hantei: {
      tabName: "判定",
      formSettings: hanteiSetting,
    },
    nodo: {
      tabName: "能動",
      formSettings: nodoSetting,
    },
    zyudo: {
      tabName: "受動",
      formSettings: zyudoSetting,
    },
    damage: {
      tabName: "ダメージ",
      formSettings: damageSetting,
    },
    damageWithTeiko: {
      tabName: "ダメージ",
      formSettings: damageWithTeikoSetting,
    },
    hidamage: {
      tabName: "被ダメージ",
      formSettings: hiDamageSetting,
    },
  };

  return { tabSetting, modeSetting };
};
