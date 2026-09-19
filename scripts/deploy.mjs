// GitHub Pages へのデプロイ：ビルドして成果物を gh-pages ブランチへ push する
//
// 成果物は OneDrive の外（OS の一時フォルダ）に出す。プロジェクトが OneDrive 配下にあるため、
// out/ に書いている最中に同期クライアントがファイルを掴んでビルドが失敗することがあった。
import { execSync } from "node:child_process";
import { copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const REPO_NAME = "kisarazu-machicon";
// 独自ドメイン kazusacon.com（public/CNAME）で配信するためルート。github.io のサブパスに戻す場合は `/${REPO_NAME}/`
const BASE_PATH = process.env.BASE_PATH ?? "/";
const OUT_DIR = process.env.OUT_DIR ?? join(tmpdir(), `${REPO_NAME}-out`);

const run = (cmd, env = {}) =>
  execSync(cmd, { stdio: "inherit", env: { ...process.env, ...env } });

run(`npx vite build --outDir "${OUT_DIR}" --emptyOutDir`, { BASE_PATH });
// ブログ各 URL の HTML と sitemap.xml を生成（GitHub Pages で 200 を返すため）
run("node scripts/prerender.mjs", { OUT_DIR });
// SPA（react-router）のため、直リンク・リロード時も index.html を返す
copyFileSync(join(OUT_DIR, "index.html"), join(OUT_DIR, "404.html"));
// -t: .nojekyll などドットファイルも含める
run(`npx gh-pages -d "${OUT_DIR}" -t`);
console.log(`deployed from ${OUT_DIR}`);
