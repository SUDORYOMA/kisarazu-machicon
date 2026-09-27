import { ALERT, INSTAGRAM_URL, EMAIL } from "@/lib/alert";

// モーダル内など、狭い場所に出す緊急のお知らせ（トップの大きいバナーは AlertBanner）
export default function AlertNotice() {
  if (!ALERT) return null;

  return (
    <div role="alert" className="mb-4 rounded-xl border-2 border-red-500 bg-red-50 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
        </span>
        <span className="text-red-600 font-black text-xs tracking-wider">緊急のお知らせ</span>
      </div>
      <p className="text-red-600 font-black text-sm leading-snug mb-1.5">{ALERT.title}</p>
      <p className="text-red-600 font-bold text-xs leading-relaxed mb-3">{ALERT.body}</p>
      <div className="flex flex-col gap-2">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="whitespace-nowrap flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer text-sm"
        >
          <i className="ri-instagram-line" />
          公式Instagramで問い合わせる
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="whitespace-nowrap flex items-center justify-center gap-2 bg-white border-2 border-red-500 text-red-600 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors cursor-pointer text-sm"
        >
          <i className="ri-mail-line" />
          {EMAIL}
        </a>
      </div>
    </div>
  );
}
