// GitHub Pages へのデプロイ：サブパス用にビルドして out/ を gh-pages ブランチへ push する
import { execSync } from "node:child_process";
import { copyFileSync } from "node:fs";

const REPO_NAME = "kisarazu-machicon";
// 独自ドメイン（public/CNAME）に切り替えたら "/" にする
const BASE_PATH = process.env.BASE_PATH ?? `/${REPO_NAME}/`;

const run = (cmd, env = {}) =>
  execSync(cmd, { stdio: "inherit", env: { ...process.env, ...env } });

run("npm run build", { BASE_PATH });
// SPA（react-router）のため、直リンク・リロード時も index.html を返す
copyFileSync("out/index.html", "out/404.html");
// -t: .nojekyll などドットファイルも含める
run("npx gh-pages -d out -t");
