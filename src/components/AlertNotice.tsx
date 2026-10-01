import { ALERT } from "@/lib/alert";

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
      <p className="text-red-600 font-bold text-xs leading-relaxed">{ALERT.body}</p>
      {ALERT.note && (
        <p className="text-red-600/90 font-medium text-xs leading-relaxed mt-1.5">{ALERT.note}</p>
      )}
    </div>
  );
}
