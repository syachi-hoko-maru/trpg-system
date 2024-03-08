<template>
  <card :loading="loading">
    <template #pbefore>
      <v-card-actions class="pt-4">
        <v-form>
          <v-radio-group label="モード選択" v-model="mode" density="compact">
            <v-radio
              v-for="mo in modes"
              :label="modeSetting[mo].label"
              :value="mo"
              :key="mo"
            />
          </v-radio-group>
        </v-form>
      </v-card-actions>
      <card class="mt-0" :loading="!showSetting">
        <template #before v-if="showSetting">
          <v-tabs v-model="tab" bg-color="primary">
            <v-tab v-for="t of modeSetting[mode].tabs" :value="t" :key="t">
              {{ tabSetting[t].tabName }}
            </v-tab>
          </v-tabs>
        </template>
        <template v-if="showSetting">
          <p v-show="modeSetting[mode].tabs.indexOf(tab) < 0">
            タブを選択してください
          </p>
          <v-window v-model="tab">
            <v-window-item
              v-for="t of modeSetting[mode].tabs"
              :value="t"
              :key="t"
            >
              <item-forms :form-settings="tabSetting[t].formSettings.value" />
            </v-window-item>
          </v-window>
        </template>
      </card>
    </template>
    <item-form :formSetting="simulateCountFormSetting" />
    <item-button @click.stop="clickAction" prepend-icon="mdi-function-variant">
      シミュレート
    </item-button>
  </card>
  <pages-simulate-results :results="results" />
</template>

<script setup lang="ts">
import type { Ref } from "vue";
const { $simulate, $mode, $tab } = useNuxtApp();
const { modeSetting, tabSetting } = useSimulater();
const { openDialogo } = useDialogo();

const router = useRouter();
const { getNowPath, getQuerys, getQueryValue } = usePages();

const modes = $mode.modes;
const mode = ref("hantei" as Mode);
const tab = ref("nodo" as Tab);

const showSetting = ref(false);

const simulateCountFormSetting: Ref<FormSettingNumber> = ref({
  name: "simulateCount",
  label: "シミュレート回数",
  type: "number" as const,
  value: 5000,
  hint: "シミュレート回数を増やすと実行時間が増えます。最初は5000回程度がオススメです。",
});

const results = ref([] as simulateResult[]);
const loading = ref(false);

const simulateErrorMessage = (error: any) => `
&1 エラー
シミュレート中にエラーが発生しました。
入力を見直してください。
もしバグの場合、 &itwitter まで連絡いただければ幸いです。
${error ? "&br" : ""}
&&noandml
${error}
&&&
`;

const getResult = () => {
  return $simulate(
    simulateCountFormSetting.value.value,
    mode.value,
    modeSetting[mode.value],
    modeSetting[mode.value].tabs.map((ta) => tabSetting[ta].formSettings.value)
  )
    .then((result) => {
      loading.value = false;
      results.value.unshift(result);
    })
    .catch((err) => {
      loading.value = false;
      openDialogo(simulateErrorMessage(err), "error");
      console.error(err);
    });
};

const clickAction = () => {
  loading.value = true;
  setTimeout(getResult, 10);
};

onMounted(() => {
  setTimeout(() => {
    getQuerys()?.forEach((d) =>
      Object.entries(d).forEach(([key, value]) => {
        if (key === "mode") {
          if (
            typeof value === "string" &&
            value !== mode.value &&
            $mode.isMode(value)
          ) {
            mode.value = value;
          }
        }
        if (typeof value !== "string") return;
        const match = key.match(/^([a-zA-Z]+)_([a-zA-Z0-9]+)$/);
        if (!match || !$tab.isTab(match[1])) return;
        const tabName = match[1];
        const setting = tabSetting[tabName].formSettings.value.find(
          (f) => f.name === match[2]
        );
        if (!setting) return;
        if (setting.type === "number") {
          const matchV = value.match(/^[0-9]+$/);
          if (!matchV) return;
          setting.value = Number(matchV);
        } else if (setting.type === "boolean") {
          if (value === "true") setting.value = true;
        } else if (setting.type === "select") {
          setting.value = value;
        }
      })
    );
    showSetting.value = true;
  }, 0.1 * 1000);
});
watch(mode, (value) => {
  if (getQueryValue("mode") !== mode.value) {
    if (getQuerys().length === 1) {
      router.replace(`${getNowPath()}?mode=${value}`);
    } else {
      router.push(`${getNowPath()}?mode=${value}`);
    }
    if (modeSetting[value].tabs.indexOf(tab.value) < 0)
      tab.value = modeSetting[value].tabs[0];
  }
});
</script>
