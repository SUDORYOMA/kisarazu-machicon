import { useState } from "react";
import { events, pastEvents } from "@/mocks/events";

interface EventsSectionProps {
  onLine: () => void;
}

export default function EventsSection({ onLine }: EventsSectionProps) {
  const [openMapId, setOpenMapId] = useState<number | null>(null);

  return (
    <>
      {/* ===== 募集中イベント ===== */}
      <section id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-rose-500 font-semibold text-sm mb-2 tracking-widest uppercase">Events</p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                募集中のイベント
              </h2>
            </div>
            <div className="flex items-center gap-2 text-rose-500 bg-rose-50 px-4 py-2 rounded-full">
              <i className="ri-alarm-warning-line" />
              <span className="text-sm font-medium">人気日程はすぐ埋まります</span>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-2xl overflow-hidden hover:border-rose-200 transition-all duration-300"
              >
                {/* Date bar */}
                <div className="bg-gray-900 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-white font-black text-xl leading-none">{event.date}</p>
                      <p className="text-white/60 text-xs mt-0.5">({event.dayOfWeek})</p>
                    </div>
                    <div className="w-px h-8 bg-white/20" />
                    <p className="text-white/80 text-sm">{event.time}</p>
                  </div>
                  <span className={`${event.tagColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                    {event.tag}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-lg font-black text-gray-900 mb-1">{event.title}</h3>

                  {/* Venue + map toggle */}
                  <div className="mb-4">
                    <div className="flex items-start gap-1.5 text-gray-500 text-sm mb-1">
                      <i className="ri-map-pin-line text-rose-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-700">{event.venue}</span>
                        <span className="ml-2 text-gray-400">{event.address}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpenMapId(openMapId === event.id ? null : event.id)}
                      className="whitespace-nowrap flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium cursor-pointer ml-5 mt-1"
                    >
                      <i className="ri-map-2-line" />
                      {openMapId === event.id ? "マップを閉じる" : "Googleマップで見る"}
                    </button>
                  </div>

                  {/* Google Map embed */}
                  {openMapId === event.id && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-gray-100" style={{ height: "220px" }}>
                      <iframe
                        title={`map-${event.id}`}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3244.8!2d139.9226!3d35.3748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6022a3b0b0b0b0b1%3A0x0!2sY%27s+Table%2C+%E6%9C%A8%E6%9B%B4%E6%B4%A5%E5%B8%82%E5%AF%8C%E5%A3%AB%E8%A6%8B1%E4%B8%81%E7%9B%AE12-32!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp"
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}

                  {/* Info row */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <i className="ri-user-line text-gray-400" />
                      {event.ageRange}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <i className="ri-coin-line text-gray-400" />
                      男{event.maleFee} / 女{event.femaleFee}
                    </div>
                  </div>

                  {/* Seats */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-5">
                    <p className="text-xs text-gray-500 mb-3 font-medium">開催状況</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">男性</p>
                        {event.maleStatus ? (
                          <div>
                            <p className="text-2xl font-black text-amber-500">{event.maleStatus}</p>
                            <p className="text-xs text-gray-500 mt-0.5">※応募可能</p>
                          </div>
                        ) : event.maleSeats > 0 ? (
                          <p className={`text-2xl font-black ${event.maleSeats <= 5 ? "text-rose-500" : "text-emerald-500"}`}>
                            残り{event.maleSeats}名
                          </p>
                        ) : (
                          <span className="inline-block bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                            満席
                          </span>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">女性</p>
                        {event.femaleStatus ? (
                          <div>
                            <p className="text-2xl font-black text-amber-500">{event.femaleStatus}</p>
                            <p className="text-xs text-gray-500 mt-0.5">※応募可能</p>
                          </div>
                        ) : event.femaleSeats > 0 ? (
                          <p className={`text-2xl font-black ${event.femaleSeats <= 5 ? "text-rose-500" : "text-emerald-500"}`}>
                            残り{event.femaleSeats}名
                          </p>
                        ) : (
                          <span className="inline-block bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            満席
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2">
                    <button
                      onClick={onLine}
                      className="whitespace-nowrap flex-1 bg-gray-900 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      公式LINEから申し込む
                    </button>
                    <button
                      onClick={onLine}
                      className="whitespace-nowrap flex items-center justify-center gap-1 bg-[#06C755] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#05b34c] transition-colors cursor-pointer"
                    >
                      <i className="ri-chat-smile-2-line" />
                      LINE確認
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Urgency note */}
          <div className="mt-10 bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-rose-100 rounded-full flex-shrink-0">
              <i className="ri-alarm-warning-fill text-rose-500 text-xl" />
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-1">人気日程はすぐ埋まります</p>
              <p className="text-gray-600 text-sm">
                特に<strong className="text-rose-500">女性枠は早く満席</strong>になる傾向があります。
                参加をご検討の方はお早めにお申し込みください。
              </p>
            </div>
            <button
              onClick={onLine}
              className="whitespace-nowrap flex-shrink-0 bg-rose-500 text-white font-bold px-6 py-3 rounded-full hover:bg-rose-600 transition-colors cursor-pointer text-sm"
            >
              公式LINEから申し込む
            </button>
          </div>
        </div>
      </section>

      {/* ===== 過去開催実績 ===== */}
      <section id="past-events" className="py-20" style={{ backgroundColor: "#fafaf9" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-10">
            <p className="text-rose-500 font-semibold text-sm mb-2 tracking-widest uppercase">Track Record</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              過去の開催実績
            </h2>
            <p className="text-gray-500 mt-3 text-sm">これまでに開催したイベントの記録です。</p>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-2xl p-5 text-center border border-gray-100">
              <p className="text-4xl font-black text-rose-500 mb-1">5</p>
              <p className="text-xs text-gray-500 font-medium">開催回数</p>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center border border-gray-100">
              <p className="text-4xl font-black text-rose-500 mb-1">191</p>
              <p className="text-xs text-gray-500 font-medium">累計参加者数</p>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center border border-gray-100">
              <p className="text-4xl font-black text-rose-500 mb-1">18</p>
              <p className="text-xs text-gray-500 font-medium">累計カップル誕生</p>
            </div>
          </div>

          {/* Past event list */}
          <div className="space-y-4">
            {pastEvents.map((past) => (
              <div key={past.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col md:flex-row md:items-center gap-4">
                {/* Date + title */}
                <div className="flex-shrink-0 md:w-48">
                  <p className="text-xs text-gray-400 mb-0.5">{past.date}</p>
                  <p className="font-bold text-gray-900 text-sm">{past.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{past.venue}</p>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-12 bg-gray-100 flex-shrink-0" />

                {/* Stats */}
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-2xl font-black text-gray-800">{past.participants}<span className="text-sm font-normal text-gray-400 ml-0.5">名</span></p>
                    <p className="text-xs text-gray-400">参加者</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-rose-500">{past.couples}<span className="text-sm font-normal text-rose-300 ml-0.5">組</span></p>
                    <p className="text-xs text-gray-400">カップル誕生</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-12 bg-gray-100 flex-shrink-0" />

                {/* Comment */}
                <p className="text-sm text-gray-600 flex-1 leading-relaxed">
                  <i className="ri-double-quotes-l text-rose-200 mr-1" />
                  {past.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}