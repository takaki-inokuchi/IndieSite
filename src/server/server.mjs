import fs from "fs";
import axios from "axios";
import { load } from "cheerio";

const POPULAR_URL =
  "https://store.steampowered.com/search/?supportedlang=japanese&os=win&tags=492&page=";
const NEW_URL =
  "https://store.steampowered.com/search/?sort_by=Released_DESC&supportedlang=japanese&tags=492&os=win&page=";

// --- JSON保存 ---
function saveJSON(data, path) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log(`✅ 保存完了: ${path}`);
}

// --- 検索結果ページから AppID と URL を取得 ---
async function fetchPageAppIDs(baseUrl, page = 1) {
  try {
    const res = await axios.get(baseUrl + page, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Accept-Language": "ja,en;q=0.9",
      },
    });
    const $ = load(res.data);
    const appInfos = [];

    $(".search_result_row").each((i, el) => {
      const href = $(el).attr("href");
      if (!href) return;

      // /app/xxxxx/ または /app/xxxxx_name/ の形式
      const match = href.match(/\/app\/(\d+)/);
      if (match) {
        appInfos.push({
          appid: parseInt(match[1]),
          url: href.split("?")[0], // URLをそのまま保持（?パラメータ除去）
        });
      }
    });

    return appInfos;
  } catch (err) {
    console.error(`❌ ページ ${page} AppID 取得エラー:`, err.message);
    return [];
  }
}

// --- AppID から詳細情報を取得 ---
async function fetchGameDetails(appInfo) {
  const { appid, url } = appInfo;
  try {
    const res = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&l=japanese`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );

    const data = res.data[appid]?.data;
    if (!data) return null;

    return {
      appid,
      url,
      name: data.name || "",
      developers: data.developers || [],
      publishers: data.publishers || [],
      release_date: data.release_date?.date || "",
      header_image: data.header_image || "",
      short_description: data.short_description || "",
      genres: data.genres ? data.genres.map((g) => g.description) : [],
      screenshots: data.screenshots
        ? data.screenshots.map((s) => s.path_full)
        : [],
    };
  } catch (err) {
    console.error(`❌ AppID ${appid} 詳細取得エラー:`, err.message);
    return null;
  }
}

// --- 最大100件まで取得 ---
async function fetchTop100(baseUrl, label) {
  const allGames = [];
  let page = 1;

  while (allGames.length < 100) {
    console.log(`📄 ${label} ページ ${page} 取得中...`);
    const appInfos = await fetchPageAppIDs(baseUrl, page);
    if (!appInfos.length) break;

    for (const appInfo of appInfos) {
      if (allGames.length >= 100) break;
      const details = await fetchGameDetails(appInfo);
      if (details) allGames.push(details);
      await new Promise((r) => setTimeout(r, 200)); // 負荷軽減
    }

    page++;
  }

  return allGames.slice(0, 100);
}

// --- メイン処理 ---
async function main() {
  console.log("🚀 Steam インディーゲーム データ取得開始...");

  // 人気順
  const popularGames = await fetchTop100(POPULAR_URL, "人気順");
  saveJSON(popularGames, "./public/indieRanking_popular.json");

  // 新着順
  const newGames = await fetchTop100(NEW_URL, "新着順");
  saveJSON(newGames, "./public/indieRanking_new.json");

  console.log("🎉 全データ取得完了！");
}

main();
