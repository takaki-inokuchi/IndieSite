const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
//requireは他のファイルやライブラリを読み込む関数

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- 設定: まずは少数の"有名インディー"の appid を入れて始めるのがおすすめ ---
// appid は Steam ストアのURLにある数字（例: https://store.steampowered.com/app/504230/Celeste -> 504230）
const APP_IDS = [
  504230, // Celeste
  367520, // Hollow Knight
  413150, // Stardew Valley
  582010, // Hades
  582660, // Slay the Spire
  105600, // Life Is Strange (例)
  552520, // Another example
];

// キャッシュファイルと投票ファイル
const CACHE_FILE = path.join(__dirname, "cache.json");
const VOTES_FILE = path.join(__dirname, "votes.json");

// in-memory
let cache = { lastUpdated: 0, apps: {} };
let votes = {};

// load persisted files if exist
if (fs.existsSync(CACHE_FILE)) {
  try { cache = JSON.parse(fs.readFileSync(CACHE_FILE)); } catch(e){}
}
if (fs.existsSync(VOTES_FILE)) {
  try { votes = JSON.parse(fs.readFileSync(VOTES_FILE)); } catch(e){}
}

// helper: sleep
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchAppDetails(appid) {
  try {
    const url = `https://store.steampowered.com/api/appdetails?appids=${appid}&l=english`;
    const res = await axios.get(url, { timeout: 10000 });
    const data = res.data && res.data[String(appid)];
    if (data && data.success && data.data) return data.data;
    return null;
  } catch (err) {
    console.warn("fetch error", appid, err.message);
    return null;
  }
}

// 全部を順番に取得してキャッシュする（同時に大量に叩かない）
async function refreshAll() {
  console.log("refreshing app details...", new Date().toISOString());
  const results = {};
  for (const id of APP_IDS) {
    const d = await fetchAppDetails(id);
    if (d) results[id] = d;
    // リクエスト間隔（ms）: 300〜1000の間で調整。安全にするなら 500~1000。
    await sleep(500);
  }
  cache = { lastUpdated: Date.now(), apps: results };
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  console.log("refresh done. apps:", Object.keys(results).length);
}

// 最初の1回は取得（バックグラウンドで）
refreshAll().catch(console.error);
// 定期更新（例：5分ごと -> 実運用ならもっと長くてもOK）
setInterval(() => refreshAll().catch(console.error), 5 * 60 * 1000);

// --- API: インディータグのものだけ返す ---
app.get("/api/indie", (req, res) => {
  const apps = Object.values(cache.apps || {});
  // genre/genres または categories に "Indie" を含むか確認
  const indieApps = apps.filter(g => {
    if (!g) return false;
    const genres = g.genres || [];
    const categories = g.categories || [];
    const hasGenre = genres.some(x => (x.description || "").toLowerCase() === "indie");
    const hasCat = categories.some(x => (x.description || "").toLowerCase() === "indie");
    return hasGenre || hasCat;
  });

  // ランキング基準：レビュー数(recommendations.total) + 外部voteを合算する例
  const items = indieApps.map(g => {
    const appid = g.steam_appid || g.appid || g.appid;
    const recs = (g.recommendations && g.recommendations.total) || 0;
    const voteCount = votes[appid] || 0;
    return { appid, name: g.name, short_description: g.short_description, header_image: g.header_image, recs, voteCount, raw: g };
  });

  // ソート: (recs * 1) + (voteCount * 100) など、voteの重みはここで調整
  items.sort((a, b) => (b.recs + b.voteCount * 100) - (a.recs + a.voteCount * 100));

  res.json({ lastUpdated: cache.lastUpdated, items });
});

// --- 投票エンドポイント（簡易） ---
app.post("/api/vote", (req, res) => {
  const { appid } = req.body || {};
  if (!appid) return res.status(400).json({ error: "appid required" });
  votes[appid] = (votes[appid] || 0) + 1;
  fs.writeFileSync(VOTES_FILE, JSON.stringify(votes, null, 2));
  res.json({ ok: true, votes: votes[appid] });
});

// 投票数取得
app.get("/api/votes", (req, res) => {
  res.json(votes);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});