import { useState, useEffect } from "react";

interface NavbarProps {
  onApply: () => void;
  onLine: () => void;
  onScrollToEvents: () => void;
}

export default function Navbar({ onApply, onLine, onScrollToEvents }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 cursor-pointer">
          <img
            src="/images/logo.png"
            alt="木更津街コン"
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: "イベント一覧", id: "events" },
            { label: "イベントの雰囲気", id: "instagram" },
            { label: "実績", id: "results" },
            { label: "安心ポイント", id: "safety" },
            { label: "魅力", id: "charm" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`whitespace-nowrap text-sm font-medium transition-colors cursor-pointer ${
                scrolled ? "text-gray-700 hover:text-rose-500" : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onLine}
            className="whitespace-nowrap bg-rose-500 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-rose-600 transition-colors cursor-pointer"
          >
            公式LINEから申し込む
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm cursor-pointer"
        >
          <i className={`${menuOpen ? "ri-close-line" : "ri-menu-line"} ${scrolled ? "text-gray-700" : "text-white"} text-xl`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {[
            { label: "イベント一覧", id: "events" },
            { label: "イベントの雰囲気", id: "instagram" },
            { label: "実績", id: "results" },
            { label: "安心ポイント", id: "safety" },
            { label: "魅力", id: "charm" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="whitespace-nowrap w-full text-left text-sm font-medium text-gray-700 py-2 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => { onLine(); setMenuOpen(false); }}
              className="whitespace-nowrap flex-1 flex items-center justify-center gap-1.5 bg-[#06C755] text-white text-sm font-bold py-3 rounded-xl cursor-pointer"
            >
              <i className="ri-chat-smile-2-line" />
              LINE相談
            </button>
            <button
              onClick={() => { onLine(); setMenuOpen(false); }}
              className="whitespace-nowrap flex-1 bg-rose-500 text-white text-sm font-bold py-3 rounded-xl cursor-pointer"
            >
              公式LINEから申し込む
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
