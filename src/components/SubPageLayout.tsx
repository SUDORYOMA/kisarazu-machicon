import { useState, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import LineModal from "@/components/LineModal";

// トップ以外のページ（ブログ等）の共通枠：白背景ナビ＋フッター＋LINEモーダル
export default function SubPageLayout({ children }: { children: ReactNode }) {
  const [lineOpen, setLineOpen] = useState(false);
  const openLine = () => setLineOpen(true);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      <Navbar solid onApply={openLine} onLine={openLine} onScrollToEvents={() => {}} />
      {/* ナビ（64px）の分だけ下げる。下部固定CTAの分の余白も確保 */}
      <main className="pt-16 pb-24">{children}</main>
      <Footer onApply={openLine} onLine={openLine} />
      <FixedCTA onLine={openLine} />
      <LineModal open={lineOpen} onClose={() => setLineOpen(false)} />
    </div>
  );
}
