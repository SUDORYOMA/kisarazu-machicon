import { useState, type ReactNode } from "react";
import { LINE_DOWN, INSTAGRAM_URL, EMAIL } from "@/lib/alert";

export const LINE_URL = "https://lin.ee/9pu5Slg";

interface LineLinkProps {
  className?: string;
  children: ReactNode;
}

/**
 * LINE 友だち追加へのリンク。
 * 障害中（src/lib/alert.ts の LINE_DOWN が true）は LINE へ飛ばさず、
 * 代わりに問い合わせ先を案内する小窓を出す。
 */
export default function LineLink({ className, children }: LineLinkProps) {
  const [noticeOpen, setNoticeOpen] = useState(false);

  if (!LINE_DOWN) {
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
          <div role="dialog" className="relative bg-white rounded-3xl w-full max-w-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gray-900 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="ri-instagram-line text-white" />
                <span className="text-white font-black text-sm tracking-wider">お問合せについて</span>
              </div>
              <button
                onClick={() => setNoticeOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-white" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-700 text-sm leading-relaxed mb-5">
                お問合せは、公式InstagramのDMまたはメールにて承っております。
                <br />
                下記よりご連絡ください。
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
                  className="whitespace-nowrap flex items-center justify-center gap-2 bg-white border-2 border-gray-900 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-sm"
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
