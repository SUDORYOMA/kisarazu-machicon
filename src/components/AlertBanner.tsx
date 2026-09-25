// 緊急のお知らせ（障害・中止など）。不要になったら ALERT を null にする
const ALERT: {
  title: string;
  body: string;
} | null = {
  title: "9/25 18時現在 - 公式LINEが一時的に利用できない状況でございます",
  body: "お問合せは公式Instagram又はメールアドレスまでお願い致します。",
};

const INSTAGRAM_URL = "https://www.instagram.com/kazusacon?igsh=MTNwZ3NqeXQ2bjVm&utm_source=qr";
const EMAIL = "info@kazusacon.com";

export default function AlertBanner() {
  if (!ALERT) return null;

  return (
    <section className="bg-white pt-8 md:pt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          role="alert"
          className="relative overflow-hidden rounded-2xl border-2 border-red-500 bg-red-50"
        >
          {/* 上部の赤帯＋点滅ランプ */}
          <div className="flex items-center gap-2 bg-red-600 px-4 py-2">
            <span className="relative flex h-3 w-3 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
            </span>
            <span className="text-white font-black text-sm tracking-wider">緊急のお知らせ</span>
          </div>

          <div className="p-5 md:p-6">
            <p className="text-red-600 font-black text-lg md:text-2xl leading-snug mb-3">
              {ALERT.title}
            </p>
            <p className="text-red-600 font-bold text-base md:text-lg leading-relaxed mb-5">
              {ALERT.body}
            </p>

            {/* 連絡先 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="whitespace-nowrap flex items-center justify-center gap-2 bg-gray-900 text-white font-bold px-6 py-3.5 rounded-full hover:bg-gray-700 transition-colors cursor-pointer text-sm"
              >
                <i className="ri-instagram-line text-lg" />
                公式Instagramで問い合わせる
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="whitespace-nowrap flex items-center justify-center gap-2 bg-white border-2 border-red-500 text-red-600 font-bold px-6 py-3.5 rounded-full hover:bg-red-50 transition-colors cursor-pointer text-sm"
              >
                <i className="ri-mail-line text-lg" />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
