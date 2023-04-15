const menuList: (MenuCategory | MenuPage)[] = [
  {
    icon: "mdi-home",
    title: "トップページ",
    to: "/",
  },
  {
    icon: "mdi-star",
    title: "TRPGとは？",
    to: "/trpg",
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
        icon: "mdi-account-box",
        title: "自己紹介シート作成",
        to: "/sw25/tool/intro",
      },
      {
        icon: "mdi-function-variant",
        title: "判定シミュレータ",
        to: "/sw25/tool/simulate",
      },
      {
        icon: "mdi-image-multiple",
        title: "卓募集画像作成",
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
        title: "SW2.5 初心者向け情報",
        to: "/sw25/forbeginner",
      },

      {
        icon: "mdi-star",
        title: "おすすめサプリメント",
        to: "/sw25/forbeginner/suppliment/1",
      },
      {
        icon: "mdi-star",
        title: "シナリオの探し方",
        to: "/sw25/forbeginner/scenario",
        // disabled: true,
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
    ],
  },
  {
    categoryName: "ブログ＆管理人",
    pageList: [
      {
        icon: "mdi-message-text",
        title: "ブログ",
        to: "/blog",
      },
      {
        icon: "mdi-account",
        title: "管理人プロフィール",
        to: "/me",
      },
    ],
  },
  // {
  //   categoryName: "管理人",
  //   pageList: [
  //     // {
  //     //   icon: "mdi-book",
  //     //   title: "所持ルールブック一覧",
  //     //   to: "/me/rulebook",
  //     // },
  //     {
  //       icon: "mdi-alert-circle",
  //       title: "ハウスルール",
  //       to: "/me/houserule",
  //     },
  //   ],
  // },
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
