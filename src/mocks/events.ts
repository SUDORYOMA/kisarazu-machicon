export interface EventItem {
  id: number;
  date: string;
  dayOfWeek: string;
  time: string;
  title: string;
  venue: string;
  address: string;
  ageRange: string;
  maleFee: string;
  femaleFee: string;
  maleSeats: number;
  femaleSeats: number;
  /** 残席数の代わりに表示する文言（例：抽選）。設定すると maleSeats の数値は表示しない */
  maleStatus?: string;
  femaleStatus?: string;
  /** その回だけの企画・特典（占い、アフターパーティーなど）。無ければ省略 */
  highlights?: { icon: string; text: string; note?: string }[];
  totalSeats: number;
  tag: string;
  tagColor: string;
  mapEmbedUrl: string;
}

export interface PastEventItem {
  id: number;
  date: string;
  title: string;
  venue: string;
  participants: number;
  couples: number;
  comment: string;
}

export const events: EventItem[] = [
  {
    id: 2,
    date: "10月18日",
    dayOfWeek: "日",
    time: "13:00〜16:00",
    title: "木更津40人街コン",
    venue: "Y's Table",
    address: "木更津市富士見1丁目12-32",
    ageRange: "20〜49歳",
    maleFee: "12,000円",
    femaleFee: "2,000円",
    maleSeats: 0,
    maleStatus: "抽選",
    femaleSeats: 5,
    totalSeats: 5,
    tag: "受付中",
    highlights: [
      { icon: "ri-sparkling-2-line", text: "会場内で占い師による占いを実施！" },
      { icon: "ri-goblet-line", text: "同会場でアフターパーティー開催！16:00〜18:00", note: "※街コン参加者のみ" },
    ],
    tagColor: "bg-rose-500",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3244.0!2d139.9226!3d35.3748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6022a3b0b0b0b0b1%3A0x0!2sY's+Table!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp",
  },
  {
    id: 3,
    date: "1月某日",
    dayOfWeek: "日",
    time: "13:00〜16:00",
    title: "木更津40人街コン",
    venue: "Y's Table",
    address: "木更津市富士見1丁目12-32",
    ageRange: "20〜49歳",
    maleFee: "12,000円",
    femaleFee: "2,000円",
    maleSeats: 20,
    femaleSeats: 20,
    totalSeats: 40,
    tag: "受付中",
    tagColor: "bg-rose-500",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3244.0!2d139.9226!3d35.3748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6022a3b0b0b0b0b1%3A0x0!2sY's+Table!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp",
  },
];

export const pastEvents: PastEventItem[] = [
  {
    id: 1,
    date: "2025年10月1日",
    title: "木更津街コン vol.1",
    venue: "Y's Table",
    participants: 38,
    couples: 5,
    comment: "初開催にもかかわらず好評！参加者からは「自然に話せた」との声多数。",
  },
  {
    id: 2,
    date: "2026年1月18日",
    title: "木更津街コン vol.2",
    venue: "Y's Table",
    participants: 40,
    couples: 2,
    comment: "女性枠は開催2週間前に満席。リピーター参加者も増え、賑やかな雰囲気に。",
  },
  {
    id: 3,
    date: "2026年3月29日",
    title: "木更津街コン vol.3",
    venue: "Y's Table",
    participants: 39,
    couples: 3,
    comment: "春開催で雰囲気も抜群。「また参加したい」リピーター続出。",
  },
  {
    id: 4,
    date: "2026年5月31日",
    title: "木更津街コン vol.4",
    venue: "Y's Table",
    participants: 37,
    couples: 4,
    comment: "GW明けの開催で盛り上がり最高。4組のカップルが誕生しました！",
  },
  {
    id: 5,
    date: "2026年8月2日",
    title: "木更津街コン vol.5",
    venue: "Y's Table",
    participants: 37,
    couples: 4,
    comment: "夏祭り前で夏祭りのお約束をするカップルも！それ以外にもアフターパーティーでも更に追加カップリングも！",
  },
];
