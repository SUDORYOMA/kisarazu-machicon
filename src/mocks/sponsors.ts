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
      description: "木更津駅から徒歩3分。10月19日プレオープン、10月24日グランドオープン。",
      links: [{ type: "instagram", url: "https://www.instagram.com/malontangkisarazu" }],
    },
    {
      name: "アクティフス在宅ケア株式会社",
      description: "木更津・市原を中心とした介護サービス業。訪問介護と住宅型有料老人ホームを運営されています。",
      links: [{ type: "web", url: "https://actifs.jp" }],
    },
    {
      name: "LesAnges Kisarazu",
      description: "木更津の婚活サポート。",
      links: [{ type: "instagram", url: "https://www.instagram.com/lesanges_kisarazu" }],
    },
    {
      name: "Nfarm工房 Nao なお",
      description: "占い。",
      links: [{ type: "instagram", url: "https://www.instagram.com/enjoymind24581" }],
    },
    {
      name: "BODY MAKE SALON BOOTY",
      description: "ボディメイクサロンと、24時間フィットネス＆パーソナルジム「BOOTY GYM」。",
      links: [
        { type: "instagram", url: "https://www.instagram.com/bodymakesalonbooty", label: "サロン" },
        { type: "instagram", url: "https://www.instagram.com/bootygym_3f", label: "ジム" },
      ],
    },
    {
      name: "株式会社サリサ",
      description: "千葉の不動産買取・仲介・賃貸。",
      links: [{ type: "web", url: "https://sarisa.jp" }],
    },
    {
      name: "株式会社TOUSEN",
      description: "千葉県君津市。京葉工業地帯のプラントを中心に、配管工事・鍛冶溶接・機械設置・足場仮設工事を手掛けていらっしゃいます。",
      links: [{ type: "web", url: "https://tousen-05.com" }],
    },
    {
      name: "森俊博",
      description: "株式会社昭和企画、LOUNGE GOLF FOREST をはじめ、様々な事業を手掛けていらっしゃいます。",
      links: [
        { type: "instagram", url: "https://www.instagram.com/shouwa_kikaku", label: "昭和企画" },
        { type: "instagram", url: "https://www.instagram.com/forestlg0417", label: "FOREST" },
      ],
    },
    {
      name: "ワイクレスト",
      description: "設計事務所。デザイン住宅と外構デザインを全国対応で手掛けていらっしゃいます。",
      links: [
        { type: "instagram", url: "https://www.instagram.com/ycrest_architects", label: "設計・住宅" },
        { type: "instagram", url: "https://www.instagram.com/ycrest_exterior", label: "外構" },
      ],
    },
    {
      name: "YKマネジメント",
      description: "木更津の物件探しをサポート。「木更津物件ナビ」でルームツアーも発信されています。",
      links: [{ type: "instagram", url: "https://www.instagram.com/yk_management_" }],
    },
    {
      name: "海坊主",
      description: "木更津のお店。",
      links: [{ type: "instagram", url: "https://www.instagram.com/umibouzu.kisarazu" }],
    },
    {
      name: "韓国料理ペゴパ",
      description: "市原の韓国料理店。",
      links: [{ type: "instagram", url: "https://www.instagram.com/pegopa.ichihara" }],
    },
    {
      name: "山中拓也",
      description: "地元の漁師さん。最近はホームページ制作なども手掛けていらっしゃいます。",
      links: [],
    },
  ]
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
