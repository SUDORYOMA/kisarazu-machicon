export interface SponsorLink {
  /** instagram: @ハンドルを表示 / web: ドメインを表示 */
  type: "instagram" | "web";
  url: string;
  /** 1社で複数アカウントがある場合の補足（例：建築／エクステリア） */
  label?: string;
}

export interface Sponsor {
  name: string;
  /** 一言紹介（任意） */
  description?: string;
  /** ロゴ画像のパス（任意。public/images/sponsors/ に置く） */
  logo?: string;
  links: SponsorLink[];
}

// イベントIDごとの協賛企業（src/mocks/events.ts の id と対応）
export const sponsorsByEventId: Record<number, Sponsor[]> = {
  // 10月18日 木更津40人街コン
  2: [
    {
      name: "麻龍湯",
      links: [{ type: "instagram", url: "https://www.instagram.com/malontangkisarazu" }],
    },
    {
      name: "アクティフス在宅ケア",
      links: [{ type: "web", url: "https://actifs.jp" }],
    },
    {
      name: "婚活サポート",
      links: [{ type: "instagram", url: "https://www.instagram.com/lesanges_kisarazu" }],
    },
    {
      name: "占い",
      links: [{ type: "instagram", url: "https://www.instagram.com/enjoymind24581" }],
    },
    {
      name: "ブーティーサロン",
      links: [
        { type: "instagram", url: "https://www.instagram.com/bodymakesalonbooty", label: "サロン" },
        { type: "instagram", url: "https://www.instagram.com/bootygym_3f", label: "ジム" },
      ],
    },
    {
      name: "sarisa",
      links: [{ type: "web", url: "https://sarisa.jp" }],
    },
    {
      name: "TOUSEN",
      links: [{ type: "web", url: "https://tousen-05.com" }],
    },
    {
      name: "森俊博 様",
      description: "昭和企画、FORESTゴルフをはじめ、様々な事業を手掛けていらっしゃいます。",
      links: [
        { type: "instagram", url: "https://www.instagram.com/shouwa_kikaku", label: "昭和企画" },
        { type: "instagram", url: "https://www.instagram.com/forestlg0417", label: "FOREST" },
      ],
    },
    {
      name: "ワイクレスト",
      links: [
        { type: "instagram", url: "https://www.instagram.com/ycrest_architects", label: "建築" },
        { type: "instagram", url: "https://www.instagram.com/ycrest_exterior", label: "エクステリア" },
      ],
    },
    {
      name: "YKマネジメント",
      links: [{ type: "instagram", url: "https://www.instagram.com/yk_management_" }],
    },
    {
      name: "海坊主",
      links: [{ type: "instagram", url: "https://www.instagram.com/umibouzu.kisarazu" }],
    },
    {
      name: "ペゴパ",
      links: [{ type: "instagram", url: "https://www.instagram.com/pegopa.ichihara" }],
    },
    {
      name: "山中拓也 様",
      description: "地元の漁師さん。最近はホームページ制作なども手掛けていらっしゃいます。",
      links: [],
    },
  ],
};

/** https://example.com/path → example.com */
export function domainOf(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
}

/** https://www.instagram.com/handle → @handle */
export function handleOf(url: string): string {
  const m = url.match(/instagram\.com\/([^/?#]+)/);
  return m ? `@${m[1]}` : url;
}
