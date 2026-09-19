export const SITE_URL = "https://kazusacon.com";

const DEFAULT_TITLE = "木更津街コン｜木更津で自然な出会い・恋活イベント定期開催";
const DEFAULT_DESCRIPTION =
  "木更津で定期開催の街コン。累計カップル10組誕生。1人参加多数・スタッフサポートで初めての方も安心。マッチングアプリに疲れた方、地元で自然な出会いを求める社会人に選ばれています。";

interface PageMeta {
  title: string;
  description: string;
  path: string; // "/blog/xxx"
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * 下層ページ用に title / description / canonical / OGP を差し替える。
 * 返り値の関数を呼ぶとトップページの既定値に戻す（useEffect の cleanup に渡す）。
 */
export function setPageMeta({ title, description, path }: PageMeta): () => void {
  const url = `${SITE_URL}${path}`;
  document.title = title;
  setMeta('meta[name="description"]', "content", description);
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);
  document.head.querySelector('link[rel="canonical"]')?.setAttribute("href", url);

  return () => {
    document.title = DEFAULT_TITLE;
    setMeta('meta[name="description"]', "content", DEFAULT_DESCRIPTION);
    setMeta('meta[property="og:title"]', "content", DEFAULT_TITLE);
    setMeta('meta[property="og:description"]', "content", DEFAULT_DESCRIPTION);
    setMeta('meta[property="og:url"]', "content", `${SITE_URL}/`);
    setMeta('meta[name="twitter:title"]', "content", DEFAULT_TITLE);
    setMeta('meta[name="twitter:description"]', "content", DEFAULT_DESCRIPTION);
    document.head.querySelector('link[rel="canonical"]')?.setAttribute("href", `${SITE_URL}/`);
  };
}
