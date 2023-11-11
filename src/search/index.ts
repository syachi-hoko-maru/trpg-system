import { word4search } from "../util/word4search";
import { wordList } from "../dict";
import { isHidden } from "../pages/getPageSetting";
import { pageSettingList } from "../pages/pageSettingList";
import { isPageTag, pageTagSettings } from "../pages/pageTags";

const defaultAllPageName = "ページ一覧";
const defaultSearchPageName = "検索結果";

export const search = (
  params: string | string[],
  searchJSON: SearchJSON
): {
  title: string;
  explain: string;
  results: SearchResult[];
  allFlag: boolean;
  description: string;
  tags: PageTag[];
  words: string[];
} => {
  let title: string = defaultAllPageName;
  let allFlag: boolean = true;
  const explains = [] as [string, string][];

  // 検索クエリを作成する
  const querys: string[] = [];
  const arr: string[] = Array.isArray(params) ? params : [params];
  arr.forEach((str) => {
    if (!str) return;
    querys.push(decodeURIComponent(str));
  });

  // 検索クエリがあるならタイトルはallFlagがfalseになり、titleが「検索結果」になる
  if (querys.length) {
    allFlag = false;
    title = defaultSearchPageName;
  }

  /**
   * タグの配列
   */
  const tagsForSearch: PageTag[] = [];
  /**
   * フリーワード検索の単語集
   */
  const wordsForSearch: string[] = [];
  const wordsForTitle: string[] = [];

  // クエリをタグとフリーワードに分けていく
  querys.forEach((query) => {
    if (isPageTag(query)) {
      // クエリがタグの場合→タグの配列に追加する
      tagsForSearch.push(query);
    } else {
      // クエリがタグではない場合→フリーワードとして処理する
      // タイトル用に検索文字列を追加
      wordsForTitle.push(query.replace(/and/g, " "));
      // 文字を整形して単語集に追加する
      wordsForSearch.push(...word4search(query));
    }
  });

  /**
   * 検索用のフィルター関数の配列
   */
  const searchFilters: ((ps: PageSetting) => number)[] = [];

  // タグを処理していく
  tagsForSearch.forEach((tag) => {
    // 検索フィルターを追加
    searchFilters.push((pageSetting) => {
      if (pageSetting.tags.findIndex((t) => t.indexOf(tag) >= 0) >= 0) {
        // タグがないならフリーワードがどんなに揃っていても劣後なので、フリーワードの最大点数（7点）のフリーワード数分だけ足す
        return (wordsForSearch.length + 1) * 17;
      } else {
        return 0;
      }
    });
    // 説明を追加
    explains.unshift([
      pageTagSettings[tag].label,
      pageTagSettings[tag].explanation,
    ]);
  });

  const wordDict = wordList();
  // 単語集を処理していく
  wordsForSearch.forEach((searchWord) => {
    // 検索フィルターを追加
    searchFilters.push((pageSetting) => {
      // ページのタイトルと含まれる文字を取得する
      const { title, explain, json } = getPageWords(pageSetting, searchJSON);
      let point = 0;
      // タイトルについてチェックする
      if (title.join("").indexOf(searchWord) >= 0) {
        // タイトルに一致するものがある→5〜8点を追加
        point += 8;
      } else {
        for (let t of title) {
          if (searchWord.indexOf(t)) {
            point += 5;
            break;
          }
        }
      }
      if (explain.join("").indexOf(searchWord) >= 0) {
        // 説明（pageのdescriptionとタグの説明）に一致するものがある→3~4点を追加
        point +=
          3 +
          Math.min(
            ((explain.join("").match(new RegExp(searchWord, "g")) || [])
              .length *
              0.25) /
              5,
            1
          );
      } else {
        for (let t of explain) {
          if (searchWord.indexOf(t)) {
            point += 3;
            break;
          }
        }
      }
      if (
        json
          .map((s) => s[0])
          .join("")
          .indexOf(searchWord) >= 0
      ) {
        // 内容に一致するものがある→1〜2点を追加
        // 「マッチ度」（=出現数/10）を入れる（9/12ページの長さに由来しないように修正した）
        point +=
          1 +
          Math.min(
            (
              json
                .map((s) => s[0])
                .join("")
                .match(new RegExp(searchWord, "g")) || []
            ).length / 20,
            1
          );
      } else {
        for (let t of json.map((s) => s[0])) {
          if (searchWord.indexOf(t)) {
            point += 1;
            break;
          }
        }
      }
      if (point > 0) {
        // ポイントが少しでも入っている
        point += 3;
      }
      return point;
    });
    // 説明を追加
    const explain: string | undefined = wordDict[searchWord];
    if (explain) {
      explains.push([searchWord, explain]);
    }
  });

  /**
   * 合格ラインの点数
   * 関連度合いの算出で使用する
   */
  const lineScore =
    // 各タグの合格ライン = 17 * (wordsForSearch.length + 1)
    tagsForSearch.length * 17 * (wordsForSearch.length + 1) +
    // 各フリーワードの合格ライン = 3
    wordsForSearch.length * 4;

  // 検索を行い、結果を取得する
  const results: SearchResult[] = pageSettingList
    .filter((page) => {
      // 隠しページは表示しない
      if (isHidden(page)) return false;
      // 検索・一覧ページやエラーページは表示しない
      if (page.to === "/search") return false;
      if (page.to === "error") return false;
      return true;
    })
    .map((pageSetting) => {
      // 関連度合いを計算していく
      let kanren = 0;
      for (let searchFilter of searchFilters) {
        kanren += searchFilter(pageSetting) / lineScore;
      }
      if (pageSetting.osusume) {
        // おすすめページは関連度合いを高めにする
        kanren *= 1.1;
      }
      return { pageSetting, kanren };
    })
    .filter(({ kanren }) => {
      if (!searchFilters.length) {
        // 検索クエリがない場合→全て表示
        return true;
      } else {
        // 検索クエリがある場合→スコアが0以上のものを表示
        return kanren > 0;
      }
    })
    .sort((a, b) => b.kanren - a.kanren);

  // タイトルを変更する
  if (tagsForSearch.length > 0 || wordsForSearch.length > 0) {
    title =
      (tagsForSearch.length
        ? `タグ${tagsForSearch
            .map((tag) => `「${pageTagSettings[tag].label}」`)
            .join("")}がついた`
        : "") +
      (wordsForTitle.length ? `「${wordsForTitle.join(" ")}」に関連する` : "") +
      `ページ`;
  }

  const description =
    title === defaultAllPageName
      ? `当ウェブサイトのページ一覧の確認や、サイト内検索ができるページです。サイト内検索ではタグとフリーワードを組み合わせて検索することができます。`
      : title === defaultSearchPageName
      ? `サイト内検索結果です。${explains
          .map(([_, e]) => e)
          .join("")}\n主な検索結果${results
          .slice(0, 3)
          .map(({ pageSetting }) => `「${pageSetting.title}」`)
          .join(
            ", "
          )}サイト内検索ではタグとフリーワードを組み合わせて検索することができます。`
      : `${title}です。${explains
          .map(([_, e]) => e)
          .join("")}\n主な検索結果${results
          .slice(0, 5)
          .map(({ pageSetting }) => `「${pageSetting.title}」`)
          .join(",")}`;

  const explain =
    "<dl>" +
    explains.map(([w, e]) => `<dt>${w}:</dt><dd>${e}</dd>`).join("") +
    "<dl>";

  return {
    title,
    explain,
    results,
    allFlag,
    description,
    tags: tagsForSearch,
    words: wordsForTitle,
  };
};

/**
 * ページに含まれる文字を検索用に設定する
 * @param pageSetting
 * @param searchJSON
 * @returns
 */
const getPageWords = (
  pageSetting: PageSetting,
  searchJSON: SearchJSON
): { title: string[]; explain: string[]; json: [string, number][] } => {
  // タイトルは特別扱いで、別で追加しておく
  const title = word4search(pageSetting.title);

  // 次にページ設定から内容を追加していく
  let explain: string[] = [
    ...word4search(
      pageSetting.to.indexOf("/blog/") === 0
        ? Array.isArray(pageSetting.explain)
          ? pageSetting.explain.join()
          : pageSetting.explain
          ? pageSetting.explain
          : ""
        : ""
    ),
    ...pageSetting.tags
      .map(
        (tag) => pageTagSettings[tag].label + pageTagSettings[tag].explanation
      )
      .map(word4search)
      .flat(),
  ];

  let json: [string, number][] = [];
  // 検索結果からの追加を行う
  try {
    json.push(...searchJSON[pageSetting.to]);
  } catch {}
  return { title, explain, json };
};
