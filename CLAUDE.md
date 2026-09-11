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
- `src/mocks/events.ts` — 開催予定・過去イベントのデータ（現状はハードコード）
- `src/mocks/instagram.ts` — Instagram 投稿の埋め込み URL
- `public/images/` — ロゴ・OGP・ヒーロー画像など（Readdy から退避済み）

## 残っている Readdy 依存（要対応）

- **フォーム送信先**：`ApplyModal.tsx` / `LineModal.tsx` の `*_FORM_ENDPOINT` が
  `https://readdy.ai/api/form/...` を向いている。Readdy 解約後は申し込みが届かなくなるので、
  自前 API・Google Forms・Formspree 等へ差し替える
- i18n（`src/i18n/`）は Readdy テンプレの名残で翻訳ファイルが無く、実質未使用
