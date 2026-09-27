import { useState, type ReactNode } from "react";
import { ALERT, INSTAGRAM_URL, EMAIL } from "@/lib/alert";

export const LINE_URL = "https://lin.ee/9pu5Slg";

interface LineLinkProps {
  className?: string;
  children: ReactNode;
}

/**
 * LINE 友だち追加へのリンク。
 * 障害中（src/lib/alert.ts の ALERT が null でない）は LINE へ飛ばさず、
 * 代わりに問い合わせ先を案内する小窓を出す。
 */
export default function LineLink({ className, children }: LineLinkProps) {
  const [noticeOpen, setNoticeOpen] = useState(false);

  if (!ALERT) {
    return (
      <a href={LINE_URL} target="_blank" rel="nofollow noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setNoticeOpen(true)} className={className}>
        {children}
      </button>

      {noticeOpen && (
        // LINEモーダルの上に重ねるため z-index を高くする
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setNoticeOpen(false)} />
          <div role="alertdialog" className="relative bg-white rounded-3xl w-full max-w-sm overflow-hidden border-2 border-red-500">
            {/* Header */}
            <div className="bg-red-600 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                </span>
                <span className="text-white font-black text-sm tracking-wider">緊急のお知らせ</span>
              </div>
              <button
                onClick={() => setNoticeOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-white" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-red-600 font-black text-base leading-snug mb-2">{ALERT.title}</p>
              <p className="text-gray-700 text-sm leading-relaxed mb-5">
                ただ今、公式LINEへのご案内を停止しております。
                <br />
                お手数ですが、下記までご連絡ください。
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="whitespace-nowrap flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer text-sm"
                >
                  <i className="ri-instagram-line text-lg" />
                  公式Instagramで問い合わせる
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="whitespace-nowrap flex items-center justify-center gap-2 bg-white border-2 border-red-500 text-red-600 font-bold py-3.5 rounded-xl hover:bg-red-50 transition-colors cursor-pointer text-sm"
                >
                  <i className="ri-mail-line text-lg" />
                  {EMAIL}
                </a>
                <button
                  onClick={() => setNoticeOpen(false)}
                  className="whitespace-nowrap w-full text-gray-500 font-bold py-3 text-sm cursor-pointer hover:text-gray-700 transition-colors"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
