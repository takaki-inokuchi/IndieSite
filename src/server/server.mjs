import fs from "fs";
import axios from "axios";
import { load } from "cheerio";

const BASE_URL =
  "https://store.steampowered.com/search/?supportedlang=japanese&os=win&tags=492&page=";

function saveJSON(data, path) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// 検索結果ページから AppID を取得
async function fetchIndiePageAppIDs(page = 1) {
  try {
    const res = await axios.get(BASE_URL + page, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const $ = load(res.data);
    const appIDs = [];
    $(".search_result_row").each((i, el) => {
      const href = $(el).attr("href");
      if (!href) return;
      const match = href.match(/\/app\/(\d+)\//);
      if (match) appIDs.push(parseInt(match[1]));
    });
    return appIDs;
  } catch (err) {
    console.error(`ページ ${page} AppID 取得エラー:`, err.message);
    return [];
  }
}

// AppID から詳細情報を取得
async function fetchGameDetails(appid) {
  try {
    const res = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&l=japanese`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    const data = res.data[appid].data;
    if (!data) return null;

    return {
      appid,
      name: data.name,
      developers: data.developers || [],
      release_date: data.release_date?.date || "",
      header_image: data.header_image || "",
      screenshots: data.screenshots
        ? data.screenshots.map((s) => s.path_full)
        : [],
      short_description: data.short_description || "",
    };
  } catch (err) {
    console.error(`AppID ${appid} 取得エラー:`, err.message);
    return null;
  }
}

// 100件まで取得
async function fetchTop100Indie() {
  const allGames = [];
  let page = 1;
  while (allGames.length < 100) {
    console.log(`検索ページ ${page} 取得中...`);
    const appIDs = await fetchIndiePageAppIDs(page);
    if (!appIDs || appIDs.length === 0) break;

    for (const appid of appIDs) {
      if (allGames.length >= 100) break;
      const details = await fetchGameDetails(appid);
      if (details) allGames.push(details);
      await new Promise((r) => setTimeout(r, 200)); // 過負荷防止
    }

    page++;
  }

  return allGames.slice(0, 100);
}

// ソート関数
function rankGames(games, sortBy = "new") {
  const sorted = [...games];
  if (sortBy === "new") {
    sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  } else if (sortBy === "popular") {
    sorted.sort(
      (a, b) => (b.screenshots.length || 0) - (a.screenshots.length || 0)
    ); // 仮に人気判定
  }
  return sorted;
}

// メイン
async function main() {
  console.log("Steamトップセラー（Indieタグ）取得中...");
  const indieGames = await fetchTop100Indie();
  console.log(`取得件数: ${indieGames.length}`);

  // 新作順
  const rankedNew = rankGames(indieGames, "new");
  saveJSON(rankedNew, "./public/indieRanking_new.json");

  // 人気順
  const rankedPopular = rankGames(indieGames, "popular");
  saveJSON(rankedPopular, "./public/indieRanking_popular.json");

  console.log(
    "保存完了: ./public/indieRanking_new.json, ./public/indieRanking_popular.json"
  );
}

main();
