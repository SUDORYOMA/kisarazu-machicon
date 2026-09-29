// ご来場時の本人確認のお知らせ。参加条件なので、募集中イベントのすぐ下に大きく出す
const ID_EXAMPLES = ["運転免許証", "マイナンバーカード", "パスポート"];

export default function IdCheckNotice() {
  return (
    <div className="mt-8 rounded-2xl bg-gray-900 overflow-hidden">
      {/* 見出し帯 */}
      <div className="bg-rose-500 px-5 py-2.5 flex items-center gap-2">
        <i className="ri-shield-user-line text-white text-lg" />
        <span className="text-white font-black text-sm tracking-wider">安心・安全のためのお願い</span>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
        {/* アイコン */}
        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 mx-auto md:mx-0 flex items-center justify-center rounded-2xl bg-white/10">
          <i className="ri-id-card-line text-white text-4xl md:text-5xl" />
        </div>

        <div className="text-center md:text-left">
          <p
            className="text-white font-black text-xl md:text-3xl leading-snug mb-3"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            ご来場の際、
            <span className="text-rose-400">公的身分証明書</span>
            を<br className="hidden md:block" />
            確認させていただきます
          </p>

          {/* 証明書の例 */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
            {ID_EXAMPLES.map((name) => (
              <span
                key={name}
                className="bg-white/10 text-white text-sm font-bold px-3.5 py-1.5 rounded-full border border-white/20"
              >
                {name}
              </span>
            ))}
            <span className="text-white/60 text-sm font-medium px-1 py-1.5">など</span>
          </div>

          <p className="text-white/80 text-sm leading-relaxed">
            年齢・独身であることの確認のため、参加者全員にお願いしております。
            <br />
            お手数ですが、当日は必ずお持ちください。
            <strong className="text-rose-400 font-bold">ご提示いただけない場合はご参加いただけません。</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
