import { useState, useRef } from "react";
import { events } from "@/mocks/events";
import { submitToFormspree } from "@/lib/formspree";

interface ApplyModalProps {
  open: boolean;
  defaultEventId?: number;
  onClose: () => void;
}

export default function ApplyModal({ open, defaultEventId, onClose }: ApplyModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const ok = await submitToFormspree("apply", e.currentTarget, "【木更津街コン】イベント申し込み");
      if (ok) {
        setSubmitted(true);
        // LINE登録ページへ遷移
        window.open("https://lin.ee/9pu5Slg", "_blank", "noopener,noreferrer");
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
      <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-gray-900">イベント申し込み</h2>
            <p className="text-gray-500 text-sm mt-0.5">必要事項をご入力ください</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
            <i className="ri-close-line text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 flex items-center justify-center bg-rose-100 rounded-full mx-auto mb-4">
                <i className="ri-check-line text-rose-500 text-3xl" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">申し込みありがとうございます！</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                当日の詳細はLINEでお送りします。<br />
                LINEの友だち追加が完了していない場合は下記よりお願いします。
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
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Event select */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  参加イベント <span className="text-rose-500">*</span>
                </label>
                <select
                  name="event"
                  required
                  defaultValue={defaultEventId?.toString() ?? ""}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 bg-white cursor-pointer"
                >
                  <option value="">選択してください</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id.toString()}>
                      {ev.date}({ev.dayOfWeek}) {ev.title}
                      {ev.maleSeats === 0 && ev.femaleSeats === 0 ? " ※満席" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  お名前（ニックネーム可） <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="例：たろう"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  性別 <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-3">
                  {["男性", "女性"].map((g) => (
                    <label key={g} className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 cursor-pointer hover:border-rose-400 transition-colors has-[:checked]:border-rose-500 has-[:checked]:bg-rose-50">
                      <input type="radio" name="gender" value={g} required className="accent-rose-500" />
                      <span className="text-sm font-medium">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  メールアドレス <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="例：example@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  電話番号 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="例：090-1234-5678"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  居住地（市） <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="例：木更津市"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  年齢 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  min={18}
                  max={60}
                  placeholder="例：28"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  ご職業（任意）
                </label>
                <input
                  type="text"
                  name="occupation"
                  placeholder="例：会社員、看護師、自営業 など"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  コメント（任意）
                </label>
                <textarea
                  name="comment"
                  rows={3}
                  maxLength={500}
                  placeholder="何かご不明な点やご要望があればお気軽にどうぞ"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 resize-none"
                />
              </div>

              {error && (
                <p className="text-rose-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="whitespace-nowrap w-full bg-rose-500 text-white font-bold py-4 rounded-xl hover:bg-rose-600 transition-colors cursor-pointer disabled:opacity-60"
              >
                {submitting ? "送信中..." : "申し込む"}
              </button>

              <p className="text-center text-xs text-gray-400">
                申し込み後、LINEの友だち追加画面に移動します
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
