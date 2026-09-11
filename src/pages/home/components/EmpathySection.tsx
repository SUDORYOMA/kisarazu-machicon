const worries = [
  {
    icon: "ri-user-unfollow-line",
    title: "出会いがない",
    desc: "職場と家の往復で、新しい人と出会う機会がない",
    color: "text-rose-400",
    bg: "bg-rose-50",
  },
  {
    icon: "ri-smartphone-line",
    title: "アプリが続かない",
    desc: "マッチングアプリに疲れた。メッセージのやり取りが苦手",
    color: "text-amber-400",
    bg: "bg-amber-50",
  },
  {
    icon: "ri-heart-2-line",
    title: "自然な出会いがしたい",
    desc: "顔を見て、話して、自然に仲良くなりたい",
    color: "text-pink-400",
    bg: "bg-pink-50",
  },
  {
    icon: "ri-emotion-unhappy-line",
    title: "1人参加が不安",
    desc: "友達と来る人ばかりで、1人だと浮いてしまいそう",
    color: "text-purple-400",
    bg: "bg-purple-50",
  },
];

export default function EmpathySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-rose-500 font-semibold text-sm mb-2 tracking-widest uppercase">Empathy</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            こんな悩みありませんか？
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {worries.map((w, i) => (
            <div
              key={i}
              className={`${w.bg} rounded-2xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className={`w-14 h-14 flex items-center justify-center rounded-full bg-white mb-4`}>
                <i className={`${w.icon} ${w.color} text-2xl`} />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">{w.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4">
            <div className="w-16 h-px bg-rose-300" />
            <p className="text-xl font-black text-gray-900" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              そんな方に<span className="text-rose-500">選ばれています</span>
            </p>
            <div className="w-16 h-px bg-rose-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
