import { sponsorsByEventId, domainOf, handleOf, type Sponsor } from "@/mocks/sponsors";

interface SponsorsSectionProps {
  /** 対象イベントのID（src/mocks/events.ts） */
  eventId: number;
  /** 見出しに出す開催日（例：10月18日） */
  eventDate: string;
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center hover:border-rose-200 transition-colors">
      {/* ロゴ（無い場合は社名を明朝で） */}
      <div className="h-16 flex items-center justify-center mb-3">
        {sponsor.logo ? (
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            loading="lazy"
            className="max-h-16 max-w-full object-contain"
          />
        ) : (
          <p
            className="text-gray-900 font-black text-lg leading-snug"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {sponsor.name}
          </p>
        )}
      </div>

      {/* ロゴがある場合は社名を下に添える */}
      {sponsor.logo && <p className="text-sm font-bold text-gray-900 mb-1">{sponsor.name}</p>}

      {sponsor.description && (
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{sponsor.description}</p>
      )}

      {/* リンク */}
      {sponsor.links.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-auto pt-1">
          {sponsor.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-rose-50 text-gray-600 hover:text-rose-500 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 transition-colors cursor-pointer max-w-full"
            >
              <i className={link.type === "instagram" ? "ri-instagram-line" : "ri-global-line"} />
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
  );
}

export default function SponsorsSection({ eventId, eventDate }: SponsorsSectionProps) {
  const sponsors = sponsorsByEventId[eventId];
  if (!sponsors || sponsors.length === 0) return null;

  return (
    <section id="sponsors" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-rose-500 font-semibold text-sm mb-2 tracking-widest uppercase">Sponsors</p>
          <h2
            className="text-3xl md:text-4xl font-black text-gray-900 mb-3"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {eventDate}開催 協賛企業様
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            木更津街コンは、地域の皆様のご協賛によって開催しています。
            <br className="hidden md:block" />
            あたたかいご支援をいただき、誠にありがとうございます。
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">（順不同・敬称略）</p>
      </div>
    </section>
  );
}
