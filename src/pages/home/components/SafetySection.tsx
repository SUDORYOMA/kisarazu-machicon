interface SafetySectionProps {
  onLine: () => void;
}

const points = [
  {
    icon: "ri-user-heart-line",
    title: "1人参加多数",
    desc: "参加者の約7割が1人参加。初めての方でも安心してご参加いただけます。",
  },
  {
    icon: "ri-shield-check-line",
    title: "スタッフサポート",
    desc: "経験豊富なスタッフが当日全力でサポート。困ったことがあればすぐに相談できます。",
  },
  {
    icon: "ri-group-line",
    title: "男女比調整",
    desc: "男女比が偏らないよう事前に調整。当日は均等な比率でご参加いただけます。",
  },
  {
    icon: "ri-calendar-check-line",
    title: "年齢制限あり",
    desc: "各イベントに年齢制限を設けています。同世代の方と自然に出会えます。",
  },
  {
    icon: "ri-lock-line",
    title: "無理な連絡先交換なし",
    desc: "連絡先の交換は強制ではありません。気が合った方とだけ、自然に交換できます。",
  },
];

export default function SafetySection({ onLine }: SafetySectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left */}
          <div className="lg:w-2/5">
            <p className="text-rose-500 font-semibold text-sm mb-2 tracking-widest uppercase">Safety</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              初めてでも<br />安心して<br />参加できます
            </h2>
            <p className="text-gray-500 text-base mb-8 leading-relaxed">
              「街コンって怪しくない？」そんな不安を持つ方も多いと思います。
              私たちは安心・安全な出会いの場を提供するために、様々な取り組みをしています。
            </p>
            <button
              onClick={onLine}
              className="whitespace-nowrap inline-flex items-center gap-2 bg-[#06C755] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#05b34c] transition-colors cursor-pointer"
            >
              <i className="ri-chat-smile-2-line" />
              LINEで相談する
            </button>

            {/* Image */}
            <div className="mt-8 rounded-2xl overflow-hidden">
              <img
                src="/images/safety.jpg"
                alt="スタッフサポート"
                className="w-full h-48 object-cover object-top"
              />
            </div>
          </div>

          {/* Right */}
          <div className="lg:w-3/5 grid grid-cols-1 gap-4">
            {points.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-rose-50/60 rounded-2xl p-5 hover:bg-rose-50 transition-colors"
              >
                <div className="w-11 h-11 flex items-center justify-center bg-rose-500 rounded-xl flex-shrink-0">
                  <i className={`${p.icon} text-white text-lg`} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-1">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
