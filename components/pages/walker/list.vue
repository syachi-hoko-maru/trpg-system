<template>
  <Card>
    <template #title> 一覧 </template>
    <Andml :andmls="andml" />
    <AtomLink
      v-for="page of walkerPages"
      :to="page.to"
      title="ライのハーヴェスWALKERのリンク"
    >
      <Card>
        <template #tbefore>
          <ItemImg
            :src="`/other/walker/${page.to.replace(
              '/sw25/data/walker/',
              ''
            )}.webp`"
            :alt="page.title"
          />
        </template>
        <h4 class="head3 mt-4 mb-0">
          {{ page.title.replace("@ライのハーヴェスWALKER", "") }}
        </h4>
      </Card>
    </AtomLink>
  </Card>
</template>

<script setup lang="ts">
import { isHidden } from "~/src/pages/getPageSetting";
import { pageSettingList } from "~/src/pages/pageSettingList";

const walkerPages = pageSettingList.filter(
  (page) =>
    page.to.startsWith("/sw25/data/walker/") &&
    !isHidden(page) &&
    !page.noSearch
);

const andml = `
このシリーズは不定期更新です。
&br
`;
</script>
