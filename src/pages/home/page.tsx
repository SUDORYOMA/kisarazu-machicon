import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "./components/HeroSection";
import EventsSection from "./components/EventsSection";
import InstagramSection from "./components/InstagramSection";
import BlogSection from "./components/BlogSection";
import EmpathySection from "./components/EmpathySection";
import SafetySection from "./components/SafetySection";
import CharmSection from "./components/CharmSection";
import ResultsSection from "./components/ResultsSection";
import ApplyModal from "@/components/ApplyModal";
import LineModal from "@/components/LineModal";
import FixedCTA from "@/components/FixedCTA";
import Footer from "@/components/Footer";
import AlertBanner from "@/components/AlertBanner";

// 本番サイトのURL（canonical / JSON-LD / OGP画像の解決に使う）
const SITE_URL = "https://kazusacon.com";

export default function Home() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [lineOpen, setLineOpen] = useState(false);
  const [defaultEventId, setDefaultEventId] = useState<number | undefined>(undefined);
  const eventsRef = useRef<HTMLDivElement>(null);

  const openApply = (eventId?: number) => {
    setDefaultEventId(eventId);
    setApplyOpen(true);
  };

  const scrollToEvents = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const siteUrl = SITE_URL;
    const pageUrl = `${siteUrl}/`;

    const ldJson = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": "木更津街コン｜木更津で自然な出会い・恋活イベント定期開催",
          "description": "木更津で定期開催の街コン。累計カップル10組誕生。1人参加多数・スタッフサポートで初めての方も安心。マッチングアプリに疲れた方、地元で自然な出会いを求める社会人に選ばれています。",
          "url": pageUrl,
          "inLanguage": "ja",
          "isPartOf": {
            "@type": "WebSite",
            "name": "木更津街コン",
            "url": pageUrl
          }
        },
        {
          "@type": "LocalBusiness",
          "name": "木更津街コン",
          "description": "木更津で定期開催の恋活・婚活イベント。1人参加多数・スタッフサポートで安心して参加できる街コンイベント。",
          "url": pageUrl,
          "image": `${siteUrl}/images/ogp.jpeg`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "木更津市",
            "addressRegion": "千葉県",
            "addressCountry": "JP"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.38,
            "longitude": 139.92
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Sunday"],
            "opens": "13:00",
            "closes": "16:00",
            "description": "イベント開催日"
          }
        },
        {
          "@type": "Event",
          "name": "木更津40人街コン（8月2日）",
          "startDate": "2026-08-02T13:00:00+09:00",
          "endDate": "2026-08-02T16:00:00+09:00",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "eventStatus": "https://schema.org/EventScheduled",
          "location": {
            "@type": "Place",
            "name": "Y's Table",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "富士見1丁目12-32",
              "addressLocality": "木更津市",
              "addressRegion": "千葉県",
              "addressCountry": "JP"
            }
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "男性参加費",
              "price": 12000,
              "priceCurrency": "JPY",
              "url": pageUrl
            },
            {
              "@type": "Offer",
              "name": "女性参加費",
              "price": 2000,
              "priceCurrency": "JPY",
              "url": pageUrl
            }
          ],
          "organizer": {
            "@type": "Organization",
            "name": "木更津街コン",
            "url": pageUrl
          },
          "description": "20〜49歳対象の街コンイベント。Y's Tableにて開催。男性残り10名・女性残り12名。"
        },
        {
          "@type": "Event",
          "name": "木更津40人街コン（10月某日）",
          "startDate": "2026-10-18T13:00:00+09:00",
          "endDate": "2026-10-18T16:00:00+09:00",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "eventStatus": "https://schema.org/EventScheduled",
          "location": {
            "@type": "Place",
            "name": "Y's Table",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "富士見1丁目12-32",
              "addressLocality": "木更津市",
              "addressRegion": "千葉県",
              "addressCountry": "JP"
            }
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "男性参加費",
              "price": 12000,
              "priceCurrency": "JPY",
              "url": pageUrl
            },
            {
              "@type": "Offer",
              "name": "女性参加費",
              "price": 2000,
              "priceCurrency": "JPY",
              "url": pageUrl
            }
          ],
          "organizer": {
            "@type": "Organization",
            "name": "木更津街コン",
            "url": pageUrl
          },
          "description": "20〜49歳対象の街コンイベント。Y's Tableにて開催。男女各20名ずつ募集中。"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "1人での参加でも大丈夫ですか？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "はい、参加者の約7割が1人参加です。初めての方でも安心してご参加いただけます。スタッフが当日全力でサポートしますので、お気軽にお越しください。"
              }
            },
            {
              "@type": "Question",
              "name": "年齢制限はありますか？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "各イベントに年齢制限を設けています。通常20〜49歳を対象としており、同世代の方と自然に出会えるよう配慮しています。"
              }
            },
            {
              "@type": "Question",
              "name": "参加費はいくらですか？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "男性12,000円、女性2,000円です。飲食費込みの料金となっており、美味しい食事とドリンクをお楽しみいただけます。"
              }
            },
            {
              "@type": "Question",
              "name": "連絡先交換は強制ですか？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "いいえ、連絡先の交換は強制ではありません。気が合った方とだけ、自然に交換できます。無理な連絡先交換は一切ありませんのでご安心ください。"
              }
            },
            {
              "@type": "Question",
              "name": "どんな流れでイベントが進行しますか？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "受付・着席後、フリートーク、ゲーム実施、席替えを4回行い、最後にフリータイムを設けています。時間ごとに席を移動するので、多くの方と自然に話すことができます。"
              }
            }
          ]
        }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(ldJson);
    script.id = "schema-org-jsonld";
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("schema-org-jsonld");
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      <Navbar
        onApply={() => openApply()}
        onLine={() => setLineOpen(true)}
        onScrollToEvents={scrollToEvents}
      />

      {/* ① ファーストビュー */}
      <HeroSection
        onLine={() => setLineOpen(true)}
        onScrollToEvents={scrollToEvents}
      />

      {/* 緊急のお知らせ（不要になったら AlertBanner の ALERT を null に） */}
      <AlertBanner />

      {/* ② イベント一覧 */}
      <div ref={eventsRef}>
        <EventsSection
          onLine={() => setLineOpen(true)}
        />
      </div>

      {/* ③ Instagram */}
      <InstagramSection />

      {/* ③' ブログ最新3件 */}
      <BlogSection />

      {/* ④ 実績 */}
      <div id="results">
        <ResultsSection onLine={() => setLineOpen(true)} />
      </div>

      {/* ⑤ 共感 */}
      <EmpathySection />

      {/* ⑥ 安心 */}
      <div id="safety">
        <SafetySection onLine={() => setLineOpen(true)} />
      </div>

      {/* ⑦ 魅力 */}
      <div id="charm">
        <CharmSection />
      </div>

      <Footer
        onApply={() => openApply()}
        onLine={() => setLineOpen(true)}
      />

      {/* Fixed CTA */}
      <FixedCTA
        onLine={() => setLineOpen(true)}
      />

      {/* Modals */}
      <ApplyModal
        open={applyOpen}
        defaultEventId={defaultEventId}
        onClose={() => setApplyOpen(false)}
      />
      <LineModal
        open={lineOpen}
        onClose={() => setLineOpen(false)}
      />
    </div>
  );
}