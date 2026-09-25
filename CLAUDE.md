# 木更津街コン LP（kazusacon.com）

Readdy（readdy.ai）で作成したランディングページをエクスポートし、ローカル開発に移行したもの。
1ページ構成（`src/pages/home/page.tsx`）＋ 404。

## 技術スタック

- Vite 8 + React 19 + TypeScript
- react-router-dom 7（`src/router/config.tsx` にルート定義）
- Tailwind CSS 3
- `unplugin-auto-import`：React hooks / react-router / react-i18next は import 不要（`auto-imports.d.ts` は生成物）
- アイコン：Remix Icon / Font Awesome（`index.html` で CDN 読み込み）

## コマンド

- `npm run dev` — 開発サーバー（http://localhost:3000）
- `npm run build` — 本番ビルド（出力先は `out/`）
- `npm run lint` / `npm run type-check`

## 構成

- `src/pages/home/page.tsx` — トップページ。セクションは `components/` に分割。JSON-LD もここで注入
- `src/pages/blog/page.tsx`（一覧 `/blog`）／`src/pages/blog/post.tsx`（記事 `/blog/:slug`）
- `src/components/` — ナビ・フッター・モーダル・ブログカードなど全ページ共通の部品。下層ページは `SubPageLayout` で包む
- `src/lib/blog.ts` — ブログ記事の読み込み（frontmatter 解析・Markdown 変換）。`src/lib/seo.ts` — 下層ページの title/OGP 差し替え
- `src/mocks/events.ts` — 開催予定・過去イベントのデータ（現状はハードコード）
- `src/mocks/instagram.ts` — Instagram 投稿の埋め込み URL
- `public/images/` — ロゴ・OGP・ヒーロー画像など（Readdy から退避済み）

## ブログ記事の追加

`src/content/blog/YYYY-MM-DD-slug.md` を作るだけ（ファイル名が URL になる）。先頭の frontmatter に
`title` / `date` / `category` / `excerpt` / `thumbnail`（任意、`public/images/blog/` に置く）を書き、本文は Markdown。
日付の新しい順に、トップ（最新3件）・一覧・記事ページへ自動で反映される。
サムネイルが無い記事は `python3 scripts/make_thumbnails.py` で生成する（カテゴリ色＋明朝タイトルの 1200x675 画像を
`public/images/blog/` に出力し、frontmatter に `thumbnail` を書き込む。写真を使う記事は `thumbnail` を手で指定すれば触らない）。
追加後は `npm run deploy`。
`scripts/prerender.mjs` がデプロイ時に `/blog` と各記事の `index.html`（title/OGP 差し替え済み）と `sitemap.xml` を生成する
（GitHub Pages で深いリンクが 404 ステータスにならないようにするため。`public/sitemap.xml` は置かない）。

## 緊急のお知らせバナー

`src/components/AlertBanner.tsx` の `ALERT` に文言を入れると、トップのヒーロー直下（募集中イベントの上）に
赤枠＋点滅ランプのバナーが出る。不要になったら `ALERT` を `null` にして `npm run deploy`。

## フォーム送信（Formspree）

- 申し込み（`ApplyModal.tsx`）と LINE 空席確認（`LineModal.tsx`）は `src/lib/formspree.ts` 経由で
  Formspree（https://formspree.io）へ送る。フォーム ID は `FORMSPREE_FORMS` に持つ
- 送信先メールアドレスや通知設定は Formspree の管理画面側で行う（コードには持たない）
- 無料プランは月50件まで。超えるようなら有料化かフォーム集約を検討
- i18n（`src/i18n/`）は Readdy テンプレの名残で翻訳ファイルが無く、実質未使用

## デプロイ（GitHub Pages）

- `npm run deploy` でビルド → 成果物を `gh-pages` ブランチへ push → GitHub Pages が配信する
  （`scripts/deploy.mjs`。GitHub Actions は使わない。ソースの `master` push だけでは公開されない）
- デプロイ時の成果物は OneDrive の外（OS の一時フォルダ `kisarazu-machicon-out`）に出す。
  プロジェクトが OneDrive 配下にあり、`out/` へ書いている最中に同期がファイルを掴んで失敗することがあったため。
  `npm run build` 単体は従来どおり `out/` に出る（ローカル確認用）
- 公開 URL：https://kazusacon.com/（`public/CNAME`。DNS はムームードメインで GitHub Pages の A レコード4本＋www CNAME）
- 画像は `src/assets/` から import する（base が変わっても壊れないように）

## デザインキャンバス（Claude Design）

- `design/build_main.py` が `design/Main.dc.html`（PC 幅 1440 のアートボード）を生成する。
  文言や値を変えたら `python3 design/build_main.py` で再生成。Tailwind の値はコンポーネントから写している
- `design/hero.jpg` `safety.jpg` `logo.png` はキャンバス用に軽量化した画像（本番は `src/assets/`）
- Instagram 埋め込みと Google マップは外部読み込みのため、キャンバス上ではプレースホルダー
