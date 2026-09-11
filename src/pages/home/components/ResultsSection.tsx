interface ResultsSectionProps {
  onLine: () => void;
}

export default function ResultsSection({ onLine }: ResultsSectionProps) {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Stats */}
        <div className="text-center mb-16">
          <p className="text-rose-400 font-semibold text-sm mb-2 tracking-widest uppercase">Results</p>
          <h2 className="text-3xl md:text-4xl font-black mb-10" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            実際に出会いは生まれています
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-white/60 text-sm mb-1">開催回数</p>
              <p className="text-8xl md:text-9xl font-black text-white leading-none">5</p>
              <p className="text-rose-400 text-2xl font-black mt-1">回開催</p>
            </div>
            <div className="w-px h-24 bg-white/20 hidden md:block" />
            <div className="text-center">
              <p className="text-white/60 text-sm mb-1">累計参加者</p>
              <p className="text-8xl md:text-9xl font-black text-white leading-none">191</p>
              <p className="text-rose-400 text-2xl font-black mt-1">名参加</p>
            </div>
            <div className="w-px h-24 bg-white/20 hidden md:block" />
            <div className="text-center">
              <p className="text-white/60 text-sm mb-1">累計カップル</p>
              <p className="text-8xl md:text-9xl font-black text-white leading-none">18</p>
              <p className="text-rose-400 text-2xl font-black mt-1">組誕生</p>
            </div>
            <div className="w-px h-24 bg-white/20 hidden md:block" />
            <div className="text-center">
              <p className="text-white/60 text-sm mb-1">1人参加率</p>
              <p className="text-8xl md:text-9xl font-black text-white leading-none">70</p>
              <p className="text-rose-400 text-2xl font-black mt-1">%以上</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onLine}
            className="whitespace-nowrap inline-flex items-center gap-2 bg-[#06C755] text-white font-bold px-10 py-4 rounded-full hover:bg-[#05b34c] transition-colors cursor-pointer text-lg"
          >
            <i className="ri-chat-smile-2-line" />
            公式LINEから申し込む
          </button>
        </div>
      </div>
    </section>
  );
}
