import { useMemo, useState } from "react";
import { sponsorsByEventId, domainOf, handleOf, type Sponsor } from "@/mocks/sponsors";
import { DeckLightbox } from "@/components/DeckLightbox";

/** 協賛企業の間で表示順の有利・不利が出ないよう、開くたびに並びを入れ替える */
function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 社名の後ろに少し間を空けて「様」を添える */
function Honorific() {
  return <span className="ml-2 font-bold">様</span>;
}

interface SponsorsSectionProps {
  /** 対象イベントのID（src/mocks/events.ts） */
  eventId: number;
  /** 見出しに出す開催日（例：10月18日） */
  eventDate: string;
}

function SponsorLinks({ sponsor, large = false }: { sponsor: Sponsor; large?: boolean }) {
  if (sponsor.links.length === 0) return null;
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${large ? "" : "mt-auto"}`}>
      {sponsor.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="nofollow noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-1.5 bg-gray-900 hover:bg-rose-500 text-white font-bold rounded-full transition-colors cursor-pointer max-w-full ${
            large ? "text-sm px-5 py-3" : "text-xs px-4 py-2.5"
          }`}
        >
          <i className={link.type === "instagram" ? "ri-instagram-line text-sm" : "ri-global-line text-sm"} />
          <span className="truncate">
            {link.label ? link.label : link.type === "instagram" ? handleOf(link.url) : domainOf(link.url)}
          </span>
        </a>
      ))}
    </div>
  );
}

function SponsorName({ sponsor, large = false }: { sponsor: Sponsor; large?: boolean }) {
  return (
    <p
      className={`text-gray-900 font-black leading-snug ${large ? "text-2xl md:text-3xl mb-4" : "text-xl md:text-2xl mb-3"}`}
      style={{ fontFamily: "'Noto Serif JP', serif" }}
    >
      {sponsor.name}
      <Honorific />
    </p>
  );
}

function SponsorCard({ sponsor, onOpen }: { sponsor: Sponsor; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${sponsor.name} 様の詳細を開く`}
      className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col text-left cursor-pointer w-full"
    >
      {/* 上部のアクセント */}
      <div className="h-1.5 w-full bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400" />

      <div className="p-6 flex flex-col items-center text-center flex-1 w-full">
        {sponsor.logo ? (
          <>
            <div className="h-20 flex items-center justify-center mb-4">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                loading="lazy"
                className="max-h-20 max-w-full object-contain"
              />
            </div>
            <p className="text-base font-bold text-gray-900 mb-2">
              {sponsor.name}
              <Honorific />
            </p>
          </>
        ) : (
          <SponsorName sponsor={sponsor} />
        )}

        {sponsor.description && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{sponsor.description}</p>
        )}

        <SponsorLinks sponsor={sponsor} />
      </div>
    </button>
  );
}

/** ライトボックスの中で大きく見せるカード */
function SponsorSlide({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="h-2 w-full bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400" />
      <div className="p-8 flex flex-col items-center text-center">
        {sponsor.logo && (
          <div className="h-28 flex items-center justify-center mb-5">
            <img src={sponsor.logo} alt={sponsor.name} className="max-h-28 max-w-full object-contain" />
          </div>
        )}
        <SponsorName sponsor={sponsor} large />
        {sponsor.description && (
          <p className="text-base text-gray-600 leading-relaxed mb-6">{sponsor.description}</p>
        )}
        <SponsorLinks sponsor={sponsor} large />
      </div>
    </div>
  );
}

export default function SponsorsSection({ eventId, eventDate }: SponsorsSectionProps) {
  const sponsors = sponsorsByEventId[eventId];
  // ページを開く（再読み込みする）たびに1回だけ並べ替える
  const shuffled = useMemo(() => shuffle(sponsors ?? []), [sponsors]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!sponsors || sponsors.length === 0) return null;

  return (
    <section id="sponsors" className="relative py-20 md:py-24 overflow-hidden" style={{ backgroundColor: "#fdf6f3" }}>
      {/* 装飾 */}
      <div className="pointer-events-none absolute -top-32 -right-24 w-96 h-96 rounded-full bg-rose-100/50" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-amber-100/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white font-black text-xs tracking-[0.2em] px-5 py-2 rounded-full mb-5">
            <i className="ri-award-line text-base" />
            SPONSORS
          </div>
          <h2
            className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-snug"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {eventDate}開催
            <br className="md:hidden" />
            <span className="md:ml-3 text-rose-500">協賛企業様</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 md:w-16 h-px bg-rose-300" />
            <i className="ri-heart-fill text-rose-400 text-sm" />
            <div className="w-10 md:w-16 h-px bg-rose-300" />
          </div>
          {/* 文の途中で改行されないよう、意味のまとまりごとに inline-block で包む */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            <span className="inline-block">木更津街コンは、</span>
            <span className="inline-block">地域の皆様のご協賛によって開催しています。</span>
            <br />
            <span className="inline-block">あたたかいご支援をいただき、</span>
            <span className="inline-block">誠にありがとうございます。</span>
          </p>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed mt-3">
            <i className="ri-shuffle-line mr-1" />
            <span className="inline-block">掲載順は、ページを開くたびに</span>
            <span className="inline-block">ランダムで入れ替わります（敬称略）</span>
          </p>
        </div>

        {/* Cards：スマホは1列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {shuffled.map((sponsor, i) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>
      </div>

      {/* クリックで大きく表示（横にスライドして次の協賛企業へ） */}
      <DeckLightbox
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        title={`${eventDate}開催 協賛企業様`}
        initialIndex={openIndex ?? 0}
        items={shuffled.map((sponsor) => ({
          key: sponsor.name,
          node: <SponsorSlide sponsor={sponsor} />,
        }))}
      />
    </section>
  );
}
