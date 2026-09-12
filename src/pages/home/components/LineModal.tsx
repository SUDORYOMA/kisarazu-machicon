import { useState } from "react";
import { submitToFormspree } from "@/lib/formspree";

interface LineModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LineModal({ open, onClose }: LineModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const ok = await submitToFormspree("line", e.currentTarget, "【木更津街コン】LINE空席確認・お問い合わせ");
      if (ok) {
        setSubmitted(true);
      } else {
        setError("送信に失敗しました。もう一度お試しください。");
      }
    } catch {
      setError("送信に失敗しました。もう一度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#06C755] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full">
              <i className="ri-chat-smile-2-line text-white text-xl" />
            </div>
            <div>
              <h2 className="text-white font-black text-lg">LINEで相談・空席確認</h2>
              <p className="text-white/80 text-xs">お気軽にご連絡ください</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer">
            <i className="ri-close-line text-white" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-4">
                <i className="ri-check-line text-emerald-500 text-2xl" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">送信完了！</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                ご連絡ありがとうございます。<br />
                LINEの友だち追加もお忘れなく！
              </p>
              <a
                href="https://lin.ee/9pu5Slg"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="whitespace-nowrap inline-flex items-center gap-2 bg-[#06C755] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#05b34c] transition-colors cursor-pointer"
              >
                <i className="ri-chat-smile-2-line" />
                LINEで友だち追加
              </a>
            </div>
          ) : (
            <>
              {/* LINE direct link */}
              <a
                href="https://lin.ee/9pu5Slg"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="whitespace-nowrap w-full flex items-center justify-center gap-2 bg-[#06C755] text-white font-bold py-4 rounded-xl hover:bg-[#05b34c] transition-colors cursor-pointer mb-4"
              >
                <i className="ri-chat-smile-2-line text-lg" />
                LINEで友だち追加する
              </a>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">またはフォームで送信</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    お名前 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="例：たろう"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#06C755]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    メールアドレス <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="例：example@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#06C755]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    ご相談内容 <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    maxLength={500}
                    placeholder="空席確認、参加方法など、お気軽にどうぞ"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#06C755] resize-none"
                  />
                </div>

                {error && <p className="text-rose-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="whitespace-nowrap w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-60"
                >
                  {submitting ? "送信中..." : "送信する"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
