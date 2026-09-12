import heroImg from "@/assets/hero.jpg";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  onLine: () => void;
  onScrollToEvents: () => void;
}

export default function HeroSection({ onLine, onScrollToEvents }: HeroSectionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="木更津街コン"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div
          className={`max-w-xl transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-rose-500/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <i className="ri-heart-fill text-xs" />
            累計カップル14組誕生
          </div>

          {/* Main copy */}
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            ここにしかない<br />出会い。
          </h1>

          {/* Sub copy */}
          <p className="text-xl text-white/90 mb-6 font-medium">
            木更津で、自然に恋が始まる街コン
          </p>

          {/* Empathy box */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 mb-8">
            <p className="text-white/80 text-sm mb-3 font-medium">こんな気持ち、ありませんか？</p>
            <ul className="space-y-2">
              {[
                "「職場と家の往復で、出会いがない」",
                "「マッチングアプリに疲れた」",
                "「地元で自然な出会いがしたい」",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-white text-sm">
                  <i className="ri-checkbox-circle-fill text-rose-400 mt-0.5 flex-shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
            <p className="text-white font-semibold mt-3 text-sm">そんな方のための街コンです。</p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onScrollToEvents}
              className="whitespace-nowrap flex items-center justify-center gap-2 bg-white text-gray-900 font-bold px-6 py-3.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-sm"
            >
              <i className="ri-calendar-event-line" />
              募集中イベントを見る
            </button>
            <button
              onClick={onLine}
              className="whitespace-nowrap flex items-center justify-center gap-2 bg-[#06C755] text-white font-bold px-6 py-3.5 rounded-full hover:bg-[#05b34c] transition-colors cursor-pointer text-sm"
            >
              <i className="ri-chat-smile-2-line" />
              公式LINEから申し込む
            </button>
            <button
              onClick={onLine}
              className="whitespace-nowrap flex items-center justify-center gap-2 bg-[#06C755] text-white font-bold px-6 py-3.5 rounded-full hover:bg-[#05b34c] transition-colors cursor-pointer text-sm"
            >
              <i className="ri-chat-smile-2-line" />
              LINEで空席確認
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 animate-bounce">
        <span className="text-xs">スクロール</span>
        <i className="ri-arrow-down-line" />
      </div>
    </section>
  );
}
