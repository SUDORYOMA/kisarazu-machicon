import logo from "@/assets/logo.png";
interface FooterProps {
  onApply: () => void;
  onLine: () => void;
}

export default function Footer({ onApply, onLine }: FooterProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-rose-950 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src={logo}
              alt="木更津街コン"
              className="h-10 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              木更津で、自然に恋が始まる街コン。<br />
              安心して参加できる出会いの場を提供しています。
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/90">メニュー</h4>
            <ul className="space-y-2.5">
              {[
                { label: "イベント一覧", id: "events" },
                { label: "初めての方へ", id: "safety" },
                { label: "魅力・特徴", id: "charm" },
                { label: "実績・口コミ", id: "results" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="whitespace-nowrap text-white/60 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SNS / Contact */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/90">お問い合わせ</h4>
            <div className="space-y-3">
              <a
                href="mailto:info@kazusacon.com"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">
                  <i className="ri-mail-line" />
                </div>
                <span className="text-sm whitespace-nowrap">info@kazusacon.com</span>
              </a>
              <a
                href="https://www.instagram.com/kazusacon?igsh=MTNwZ3NqeXQ2bjVm&utm_source=qr"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">
                  <i className="ri-instagram-line" />
                </div>
                <span className="text-sm">Instagram</span>
              </a>
              <a
                href="https://lin.ee/9pu5Slg"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">
                  <i className="ri-chat-smile-2-line" />
                </div>
                <span className="text-sm">LINE公式</span>
              </a>
            </div>
          </div>

          {/* LINE CTA */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/90">最新情報をLINEで</h4>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              空席情報やお得なキャンペーン情報をいち早くお届けします。
            </p>
            <button
              onClick={onLine}
              className="whitespace-nowrap w-full flex items-center justify-center gap-2 bg-[#06C755] text-white font-bold py-3 rounded-full hover:bg-[#05b34c] transition-colors cursor-pointer text-sm"
            >
              <i className="ri-chat-smile-2-line" />
              LINE登録する
            </button>
            <button
              onClick={onLine}
              className="whitespace-nowrap w-full flex items-center justify-center gap-2 bg-white/10 text-white font-bold py-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer text-sm mt-2"
            >
              <i className="ri-chat-smile-2-line" />
              公式LINEから申し込む
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} 木更津街コン All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
