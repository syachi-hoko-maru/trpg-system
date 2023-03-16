const menuList: (MenuCategory | MenuPage)[] = [
  {
    icon: "mdi-home",
    title: "トップページ",
    to: "/",
  },
  {
    categoryName: "SW2.5 ツール",
    pageList: [
      {
        icon: "mdi-apps",
        title: "SW2.5 ツール一覧",
        to: "/sw25/tool",
      },
      {
        icon: "mdi-function-variant",
        title: "判定シミュレータ",
        to: "/sw25/tool/simulate",
      },
      {
        icon: "mdi-image-multiple",
        title: "募集画像作成",
        to: "/sw25/tool/bosyu",
      },
    ],
  },
  {
    categoryName: "SW2.5 初心者向け",
    // hidden: true,
    pageList: [
      {
        icon: "mdi-star",
        title: "おすすめサプリメント",
        to: "/sw25/forbeginner/suppliment/1",
      },
    ],
  },
  {
    categoryName: "シナリオ",
    pageList: [
      {
        icon: "mdi-book-open-page-variant",
        title: "公開シナリオ一覧",
        to: "/scenario",
      },
      {
        icon: "mdi-star",
        title: "おすすめシナリオ",
        to: "/scenario/osusume",
        disabled: true,
      },
    ],
  },
  {
    categoryName: "ブログ",
    pageList: [
      {
        icon: "mdi-message-text",
        title: "ブログ",
        to: "/blog",
      },
    ],
  },
  {
    categoryName: "管理人",
    pageList: [
      {
        icon: "mdi-account",
        title: "管理人プロフィール",
        to: "/me",
      },
      // {
      //   icon: "mdi-book",
      //   title: "所持ルールブック一覧",
      //   to: "/me/rulebook",
      // },
      {
        icon: "mdi-alert-circle",
        title: "ハウスルール",
        to: "/me/houserule",
      },
    ],
  },
];

export default defineNuxtPlugin(() => {
  return {
    provide: {
      menu() {
        return menuList;
      },
    },
  };
});
