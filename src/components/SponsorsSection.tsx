import { useMemo } from "react";
import { sponsorsByEventId, domainOf, handleOf, type Sponsor } from "@/mocks/sponsors";

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

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* 上部のアクセント */}
      <div className="h-1.5 bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400" />

      <div className="p-6 flex flex-col items-center text-center flex-1">
        {/* ロゴ（無い場合は社名を明朝で） */}
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
          <p
            className="text-gray-900 font-black text-xl md:text-2xl leading-snug mb-3"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {sponsor.name}
            <Honorific />
          </p>
        )}

        {sponsor.description && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{sponsor.description}</p>
        )}

        {/* リンク */}
        {sponsor.links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-auto">
            {sponsor.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors cursor-pointer max-w-full"
              >
                <i className={link.type === "instagram" ? "ri-instagram-line text-sm" : "ri-global-line text-sm"} />
                <span className="truncate">
                  {link.label
                    ? link.label
                    : link.type === "instagram"
                      ? handleOf(link.url)
                      : domainOf(link.url)}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SponsorsSection({ eventId, eventDate }: SponsorsSectionProps) {
  const sponsors = sponsorsByEventId[eventId];
  // ページを開く（再読み込みする）たびに1回だけ並べ替える
  const shuffled = useMemo(() => shuffle(sponsors ?? []), [sponsors]);
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
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            木更津街コンは、地域の皆様のご協賛によって開催しています。
            <br />
            あたたかいご支援をいただき、誠にありがとうございます。
          </p>
        </div>

        {/* Cards：スマホは1列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {shuffled.map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-10 leading-relaxed">
          <i className="ri-shuffle-line mr-1" />
          掲載順は、ページを開くたびにランダムで入れ替わります（敬称略）
        </p>
      </div>
    </section>
  );
}
