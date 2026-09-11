const charms = [
  {
    icon: "ri-refresh-line",
    title: "席替えあり",
    desc: "時間ごとに席を移動するので、多くの方と自然に話せます。気になる人と話す機会が必ず生まれます。",
    accent: "bg-rose-500",
    lightBg: "bg-rose-50",
    textColor: "text-rose-500",
  },
  {
    icon: "ri-team-line",
    title: "少人数で話せる",
    desc: "大人数の合コンと違い、少人数グループで会話。じっくり相手のことを知れます。",
    accent: "bg-amber-500",
    lightBg: "bg-amber-50",
    textColor: "text-amber-500",
  },
  {
    icon: "ri-restaurant-line",
    title: "飲食あり",
    desc: "美味しい食事とドリンクで場の雰囲気が自然と和みます。食事を通じて会話が弾みます。",
    accent: "bg-emerald-500",
    lightBg: "bg-emerald-50",
    textColor: "text-emerald-500",
  },
  {
    icon: "ri-mic-line",
    title: "進行あり",
    desc: "スタッフが会話のきっかけを作るゲームや進行を担当。「何を話せばいいか分からない」を解消します。",
    accent: "bg-sky-500",
    lightBg: "bg-sky-50",
    textColor: "text-sky-500",
  },
];

export default function CharmSection() {
  return (
    <section className="py-20 bg-amber-50/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-rose-500 font-semibold text-sm mb-2 tracking-widest uppercase">Features</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            自然に会話が生まれる仕組み
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            「何を話せばいいか分からない」「緊張してしまう」そんな方でも大丈夫。
            自然に会話が生まれる工夫が随所に詰まっています。
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {charms.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300"
            >
              <div className={`${c.accent} h-1.5 w-full`} />
              <div className="p-6">
                <div className={`w-14 h-14 flex items-center justify-center ${c.lightBg} rounded-2xl mb-4`}>
                  <i className={`${c.icon} ${c.textColor} text-2xl`} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Flow */}
        <div className="mt-16">
          <h3 className="text-center text-xl font-black text-gray-900 mb-8" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            当日の流れ
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {[
              { step: "01", label: "受付・着席", icon: "ri-door-open-line" },
              { step: "02", label: "フリートーク", icon: "ri-chat-3-line" },
              { step: "03", label: "ゲーム実施", icon: "ri-gamepad-line" },
              { step: "04", label: "席替え×4回", icon: "ri-refresh-line" },
              { step: "05", label: "フリータイム", icon: "ri-time-line" },
              { step: "06", label: "お開き", icon: "ri-heart-line" },
            ].map((s, i, arr) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center text-center w-24">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-900 rounded-full mb-2">
                    <i className={`${s.icon} text-white`} />
                  </div>
                  <p className="text-xs text-rose-500 font-bold mb-0.5">{s.step}</p>
                  <p className="text-xs font-bold text-gray-700">{s.label}</p>
                </div>
                {i < arr.length - 1 && (
                  <i className="ri-arrow-right-line text-gray-300 text-xl mx-1 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
