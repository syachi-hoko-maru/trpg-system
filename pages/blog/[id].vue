<template>
  <card class="pt-5">
    ブログでは僕が考えたことを、基本的に考えた順に書いています。<br />
    他のページよりも気軽に書かせてもらってます。<br />
    ご了承の上、お読みいただければ幸いです。
  </card>
  <card-array-by-andml
    :andml="aboutswnews"
    v-if="pagetitle.indexOf('ソドワニュース！') === 0"
  />
  <card-array-by-andml :andml="mainandml" />
  <card-array-by-andml :andml="other" />
  <card class="pt-5">
    最後までお読みいただきありがとうございました。<br />
    よければ他のブログやページもご覧ください。
    <template v-if="blog?.tags.find((tag) => tag.indexOf('sw25') >= 0)">
      <br />
      <br />
      それでは、良きソード・ワールド2.5ライフを！<br />
      そどわわわ！（挨拶）
    </template>
    <item-button url="/blog" normal-button>ブログトップへ</item-button>
  </card>
</template>

<script setup lang="ts">
import blogs from "@/assets/blog.json";
import { isHidden } from "~/src/pages/getPageSetting";
import { pageTagSettings } from "~/src/pages/pageTags";
import { getDateCount, isPast, sortByDate } from "~/src/util/date";
import { setBlogExplain } from "~~/src/pages/blogExplain";

const { $templateText, $pageSettingList } = useNuxtApp();
const { params } = useRoute();

const pagetitle = ref("");
const date = ref("");
const mainandml = ref("");
const id: string = Array.isArray(params.id) ? params.id[0] : params.id;

const blog: Blog | undefined = (blogs as Blog[]).find((blo) => blo.id === id);

if (
  !(
    blog &&
    blog.title &&
    typeof blog.title === "string" &&
    blog.date &&
    typeof blog.date === "string" &&
    blog.andml &&
    typeof blog.andml === "string"
  )
) {
  showError("");
} else {
  pagetitle.value = blog.title;
  date.value = blog.date;
  mainandml.value = blog.andml;

  const title = `${blog.title} - ブログ@${$templateText.title}`;
  const description = setBlogExplain(blog, 140);
  const meta = [
    {
      hid: "og:url",
      name: "og:url",
      content: `${$templateText.baseUrl}/blog/${id}`,
    },
    {
      hid: "og:title",
      name: "og:title",
      content: title,
    },
    {
      hid: "description",
      name: "description",
      content: description,
    },
    {
      hid: "og:description",
      name: "og:description",
      content: description,
    },
    {
      hid: "og:image",
      name: "og:image",
      content: `${$templateText.baseUrl}/image/blog-image/${id}.png`,
    },
  ];
  useHead({
    title,
    meta,
  });
}

const aboutswnews = `
&1 「ソドワニュース！」とは？
「ソドワニュース！」は &em_ソード・ワールド2.5（SW2.5/ソドワ）の最新情報 をお届けする不定期更新のブログシリーズです。
ソード・ワールド2.5の &em_ビッグニュース が入ってきた際に随時執筆・公開します。
&br
「ソドワの最新情報が知りたい！」って方、ぜひ読んでください！
&br
なお、 &em_ソード・ワールド2.5の新刊情報 は以下のページにまとめていますので併せてご覧ください。
&button_/sw25/feature/new
`;

const blogList = $pageSettingList
  .filter(
    (pageSetting) =>
      pageSetting.to.indexOf("/blog/") >= 0 && !isHidden(pageSetting)
  )
  .sort((a, b) =>
    sortByDate(true)(
      a.created ? a.created : a.lastmod,
      b.created ? b.created : b.lastmod
    )
  );
const index: number = blogList.findIndex((b) => b.title === blog?.title);

type YearObj = { year: number; list: [string, number][] };
const yearBlog: YearObj[] | undefined = blog
  ? blogList
      .reduce((pre, b) => {
        /** 何日前か */
        const dateStr: string = b.created ? b.created : b.lastmod;
        const dateCount = getDateCount(blog.date, dateStr);
        for (let y = 1; y <= getDateCount(blog.date, "2023-03-01") / 365; y++) {
          /** この年分のObj */
          const yearObj: YearObj | undefined = pre.find((pp) => pp.year === y);
          // 判定
          if (
            // 355〜375日前→問答無用で入れる
            (dateCount > y * 365 - 10 && dateCount < y * 365 + 10) ||
            // 350〜390日前→3個以下なら入れる
            (dateCount > y * 365 - 15 &&
              dateCount < y * 365 + 30 &&
              (!yearObj || yearObj.list.length < 3))
          ) {
            if (yearObj)
              yearObj.list.push([b.to, Math.abs(y * 365 - dateCount)]);
            else
              pre.push({
                year: y,
                list: [[b.to, Math.abs(y * 365 - dateCount)]],
              });
          }
        }
        return pre;
      }, [] as YearObj[])
      .map((obj) => {
        obj.list = obj.list.sort((a, b) => a[1] - b[1]).slice(0, 3);
        return obj;
      })
  : undefined;

const other = `
&1 他のブログ記事もぜひ！！
${index >= 1 ? `&3 次の記事 \n&button_${blogList[index - 1].to}` : ""}
${
  index < blogList.length - 1 && index !== -1
    ? `&3 前の記事 \n&button_${blogList[index + 1].to}`
    : ""
}

${blog?.tags
  .reduce((pre, t) => {
    pre.push({
      tag: t,
      list: blogList
        .filter((b) => b.tags.join().indexOf(t) >= 0 && b.to.indexOf(id) === -1)
        .map((b) => b.to)
        .slice(0, 3),
    });
    return pre;
  }, [] as { tag: PageTag; list: string[] }[])
  .filter((obj) => obj.list.length > 0)
  .map((obj) => [
    `&3 タグ「${pageTagSettings[obj.tag].label}」の最新記事`,
    ...obj.list.map((s) => `&button_${s}`),
  ])
  .flat()
  .join("\n")}

${
  yearBlog && yearBlog.length
    ? yearBlog
        .map((obj) => [
          `&3 ${obj.year}年前の記事`,
          ...obj.list.map((b) => `&button_${b[0]}`),
        ])
        .flat()
        .join("\n")
    : ""
}
`;
</script>
