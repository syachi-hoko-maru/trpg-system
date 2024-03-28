<template>
  <CardArrayByAndml :andml="andml1" />
  <slot />
  <CardArrayByAndml :andml="andml2" />
</template>

<script setup lang="ts">
import { crawleyAndml } from "~/src/shinano/pages/crawley";
import { guardinerAndml } from "~/src/shinano/pages/guardiner";
import { mainAndml } from "~/src/shinano/pages/main";

const andml1 = `
&1 このページについて
このページはオリジナルサプリメント『シナノシマ¥s妖との戦い』の要素を紹介するページです。
詳しくはこちらもご覧ください。
&button_/sw25/data/shinano
`;

const pages = [
  { title: "メインページ", andml: mainAndml, page: "/sw25/data/shinano" },
  {
    title: "種族クローリー",
    andml: crawleyAndml,
    page: "/sw25/data/shinano/crawley",
  },
  {
    title: "ガーディナー技能と陰陽術",
    andml: guardinerAndml,
    page: "/sw25/data/shinano/guardiner",
  },
];
const format = (andml: string, page: string) =>
  andml
    .split("\n")
    .reduce((pre, s) => {
      if (s.startsWith("&1 ")) {
        const title = s.replace("&1 ", "").replace(/\s/, "¥s");
        pre.push(s.replace(/&1 .*$/, `- &link_${page}#${title},${title}`));
      }
      if (s.startsWith("&2 ")) {
        pre.push(s.replace("&2 ", "-"));
      }
      if (s.startsWith("&3 ")) {
        pre.push(s.replace("&3 ", "--"));
      }
      if (s.startsWith("&4 ")) {
        pre.push(s.replace("&4 ", "---"));
      }
      return pre;
    }, [] as string[])
    .join("\n");

const andml2 = `
&1 『シナノシマ 妖との戦い』目次
${pages
  .map((p) => [`&3 ${p.title}`, format(p.andml, p.page), `&button_${p.page}`])
  .flat()
  .join("\n")}
`;
</script>
