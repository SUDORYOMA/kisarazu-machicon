import { marked } from "marked";

// ブログ記事は src/content/blog/*.md に置く。ファイル名（拡張子なし）が URL の slug になる。
//
// 先頭に frontmatter を書く:
// ---
// title: 記事タイトル
// date: 2026-08-05
// category: 開催レポート
// excerpt: 一覧に出す1〜2文の要約
// thumbnail: /images/blog/xxx.jpg   （任意。public/images/blog/ に置く）
// ---
// 本文（Markdown）

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: string;
  excerpt: string;
  thumbnail?: string;
  body: string; // Markdown
}

const files = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }
  return { meta, body: m[2] };
}

const allPosts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? "",
      category: meta.category ?? "お知らせ",
      excerpt: meta.excerpt ?? "",
      thumbnail: meta.thumbnail || undefined,
      body,
    };
  })
  // 新しい順
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getPosts(limit?: number): BlogPost[] {
  return limit ? allPosts.slice(0, limit) : allPosts;
}

export function getPost(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false, gfm: true, breaks: true }) as string;
}

/** 2026-08-05 → 2026.08.05 */
export function formatDate(date: string): string {
  return date.replace(/-/g, ".");
}
