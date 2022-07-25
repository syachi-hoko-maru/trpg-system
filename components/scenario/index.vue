<template lang="pug">
div
  //- p {{ scenarioContentArray }}
  Chapter(
    v-for="chapter in scenarioContentArray",
    :chapter="chapter",
    :key="chapter.chapterName"
  )
</template>

<script lang="ts">
import Vue from "vue";
import Chapter from "@/components/scenario/Chapter.vue";

type BoxType = {
  lines?: string[];
  type?: string;
};
type ItemType = {
  itemName?: string;
  itemContent: Array<BoxType>;
};

type SectionType = {
  sectionName?: string;
  sectionContent: Array<BoxType | ItemType>;
};

type ContentsArrayType = Array<BoxType | SectionType | ItemType>;

type ScenarioContentType = {
  chapterName: string; // Section → item
  chapterContent: ContentsArrayType;
};

const typeText = ["GMInfo", "SceneExplain", "Normal"];

export default Vue.extend({
  name: "ScenarioComponent",
  components: {
    Chapter,
  },
  data: () => ({
    scenarioContentArray: [] as Array<ScenarioContentType>,
  }),
  props: {
    scenarioId: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    const rowMd = (await this.$axios
      .get(`${process.env.url}/scenarioMemo/${this.scenarioId}/scenario.md`)
      .then((res) => res.data)
      .catch((err) => `${err}`)) as string;
    let currentContent: ContentsArrayType = [];
    let currentChapterContent: ContentsArrayType = [];
    let currentSectionContent: ContentsArrayType = [];
    let currentBox: BoxType = {};
    let currentType: string = "";
    rowMd.split("\n").forEach((line) => {
      if (line.match(/^# /)) {
        const count = this.scenarioContentArray.push({
          chapterName: line.replace(/^# /, ""),
          chapterContent: [],
        });
        currentContent =
          currentChapterContent =
          currentSectionContent =
            this.scenarioContentArray[count - 1].chapterContent;
      } else if (line.match(/^## /)) {
        const count = currentChapterContent.push({
          sectionName: line.replace(/^## /, ""),
          sectionContent: [],
        });
        currentContent = currentSectionContent = (
          currentChapterContent[count - 1] as SectionType
        ).sectionContent;
      } else if (line.match(/^### /)) {
        const count = currentSectionContent.push({
          itemName: line.replace(/^### /, ""),
          itemContent: [],
        });
        currentContent = (currentSectionContent[count - 1] as ItemType)
          .itemContent;
      } else if (typeText.indexOf(line) >= 0) {
        currentType = line;
      } else if (
        line.match(/^\/.+/) &&
        line.replace(/^\//, "") === currentType
      ) {
        currentType = "";
      } else {
        if (
          currentContent.length &&
          currentBox?.type === currentType &&
          currentBox.lines?.length &&
          !(currentType === "" && line.match(/^\s*$/))
        ) {
          currentBox.lines.push(line);
        } else {
          // currentContentがない→新しいブロック
          const count = currentContent.push({
            lines: [line],
            type: currentType,
          });
          currentBox = currentContent[count - 1] as BoxType;
        }
      }
    });
    console.log();
  },
});
</script>