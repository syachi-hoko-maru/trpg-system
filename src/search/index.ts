import { word4search } from "../after/word4search";
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
      setWordForSearch(query).forEach((word) => wordsForSearch.push(word));
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
        return (wordsForSearch.length + 1) * 7;
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
      if (title.indexOf(searchWord) >= 0) {
        // タイトルに一致するものがある→2.5点を追加
        point += 2.5;
      }
      if (explain.indexOf(searchWord) >= 0) {
        // 説明（pageのdescriptionとタグの説明）に一致するものがある→1〜1.25点を追加
        point +=
          1 +
          Math.min(
            ((explain.match(new RegExp(searchWord, "g")) || []).length * 0.25) /
              5,
            0.25
          );
      }
      if (json.indexOf(searchWord) >= 0) {
        // 内容に一致するものがある→0.05〜0.25点を追加
        // 「マッチ度」（=出現数/10）を入れる（9/12ページの長さに由来しないように修正した）
        point += Math.min(
          (json.match(new RegExp(searchWord, "g")) || []).length / 20,
          0.25
        );
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
    // 各タグの合格ライン = 7 * (wordsForSearch.length + 1)
    tagsForSearch.length * 7 * (wordsForSearch.length + 1) +
    // 各フリーワードの合格ライン = 3
    wordsForSearch.length * 3;

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
 * フリーワード検索の入力を単語に分解する関数
 * @param word
 * @returns
 */
const setWordForSearch = (word: string): string[] =>
  // 検索用にワードを設定する
  // カタカナを分離する
  word
    .replace(/([\u30A1-\u30FAー]+)/g, " $1 ")
    // 英語を分離する
    .replace(/([a-zA-Z]+)/g, " $1 ")
    // 数字を分離する
    .replace(/([0-9]+)/g, " $1 ")
    .split(" ")
    .map(word4search)
    .filter((w) => w.length);

/**
 * ページに含まれる文字を検索用に設定する
 * @param pageSetting
 * @param searchJSON
 * @returns
 */
const getPageWords = (
  pageSetting: PageSetting,
  searchJSON: SearchJSON
): { title: string; explain: string; json: string } => {
  // タイトルは特別扱いで、別で追加しておく
  const title = word4search(pageSetting.title);

  // 次にページ設定から内容を追加していく
  let explain = "";
  // ブログの場合以外はページの説明を追加する
  explain +=
    pageSetting.to.indexOf("/blog/") === 0
      ? Array.isArray(pageSetting.explain)
        ? pageSetting.explain.join()
        : pageSetting.explain
      : "";
  // ページのタグの表示名と説明を追加する
  explain += pageSetting.tags
    .map((tag) => pageTagSettings[tag].label + pageTagSettings[tag].explanation)
    .join();
  // ページ設定を整形する
  explain = word4search(explain);

  let json = "";
  // 検索結果からの追加を行う
  try {
    json += searchJSON[pageSetting.to];
  } catch {}
  return { title, explain, json };
};
