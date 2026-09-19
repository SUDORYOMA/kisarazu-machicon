// ビルド後処理：ブログの各 URL に対応する HTML を out/ に生成する。
//
// GitHub Pages は存在しないパスを 404.html（ステータス 404）で返すため、SPA のままだと
// /blog/xxx が検索エンジンに「404 ページ」として扱われる。記事ごとに index.html を置き、
// title / description / canonical / OGP をその記事の値に差し替えておくことで 200 で返し、
// シェア時のプレビューも記事のものになる。React は同じバンドルをそのまま読み込んで動く。
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const SITE_URL = "https://kazusacon.com";
const OUT = "out";
const CONTENT = "src/content/blog";

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const meta = {};
  if (!m) return meta;
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return meta;
}

const posts = readdirSync(CONTENT)
  .filter((f) => f.endsWith(".md"))
  .map((f) => ({ slug: f.replace(/\.md$/, ""), ...parseFrontmatter(readFileSync(join(CONTENT, f), "utf8")) }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const template = readFileSync(join(OUT, "index.html"), "utf8");

function pageHtml({ title, description, path }) {
  const url = `${SITE_URL}${path}`;
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`);
}

function write(path, html) {
  const dir = join(OUT, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

// /blog
write("blog", pageHtml({
  title: "ブログ・お知らせ｜木更津街コン",
  description: "木更津街コンの開催レポート、次回イベントのご案内、初めて参加する方向けの情報をお届けします。",
  path: "/blog",
}));

// /blog/<slug>
for (const p of posts) {
  write(`blog/${p.slug}`, pageHtml({
    title: `${p.title}｜木更津街コン`,
    description: p.excerpt ?? "",
    path: `/blog/${p.slug}`,
  }));
}

// sitemap.xml（トップ＋ブログ一覧＋各記事）
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE_URL}/`, lastmod: today, changefreq: "weekly", priority: "1.0" },
  { loc: `${SITE_URL}/blog`, lastmod: posts[0]?.date ?? today, changefreq: "weekly", priority: "0.7" },
  ...posts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.date, changefreq: "monthly", priority: "0.6" })),
];
writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n") +
    `\n</urlset>\n`,
);

console.log(`prerender: /blog + ${posts.length} posts, sitemap.xml (${urls.length} urls)`);
