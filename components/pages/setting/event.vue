<template>
  <template
    v-if="
      ev.month.indexOf(nowDate().getMonth() + 1) >= 0 ||
      ev.pages.indexOf(pageSetting.to) >= 0
    "
  >
    <item-button @click="toggleTheme" v-if="!icon" :prepend-icon="ev.icon">
      {{ ev.name }}に切り替える
    </item-button>
    <v-icon
      v-else
      @click="toggleTheme"
      :icon="ev.icon"
      class="px-5 text-textbp"
    />
    <!-- <v-theme-provider theme="myCustomLightTheme">
      <card-array-by-andml :andml="colorSampleAndml" nobefore />
    </v-theme-provider> -->
  </template>
  <template else>
    <!-- ハロウィンボタン（10月のみ出現） -->
  </template>
</template>

<script setup lang="ts">
import { getPageSetting } from "~/src/pages/getPageSetting";
import { nowDate } from "~/src/util/date";
type Events = "halloween" | "sakura";
interface Props {
  icon?: boolean;
  props: Events;
}
const Props = defineProps<Props>();

const { setSnack } = useSnack();
const { setTheme } = useDesign();
const route = useRoute();
const pageSetting = ref(getPageSetting(route.fullPath));
watch(
  () => route.fullPath,
  () => {
    pageSetting.value = getPageSetting(route.fullPath);
  }
);

const eventDict: {
  [e in Events]: {
    month: number[];
    pages: string[];
    icon: string;
    name: string;
  };
} = {
  halloween: {
    month: [9, 10],
    pages: ["/blog/halloween"],
    icon: "mdi-ghost",
    name: "ハロウィンデザイン",
  },
  sakura: {
    month: [3, 4],
    pages: [],
    icon: "mdi-flower",
    name: "桜デザイン",
  },
};

const ev = computed(() => eventDict[Props.props]);

const toggleTheme = () => {
  setTheme(Props.props);
  try {
    localStorage.setItem("theme", Props.props);
    setSnack("設定を保存しました");
  } catch {
    setSnack("設定の保存に失敗しました");
  }
};

const colorSampleAndml = `
&1 カラーサンプル
このようなデザインになります。`;
</script>
