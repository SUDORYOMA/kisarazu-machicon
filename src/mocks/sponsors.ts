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
      description: "木更津駅から徒歩3分、本格マーラータンのお店。本場仕込みの痺れと旨み！10/19プレオープン、10/24グランドオープン——痺れたい日は絶対ここ！",
      links: [{ type: "instagram", url: "https://www.instagram.com/malontangkisarazu" }],
    },
    {
      name: "アクティフス在宅ケア株式会社",
      description: "木更津・市原で1番頼れる在宅介護。掲げるのは「断らない介護」！身寄りがなくても生活保護でも相談できる。困ったら絶対ここ！",
      links: [{ type: "web", url: "https://actifs.jp" }],
    },
    {
      name: "LesAnges Kisarazu",
      description: "木更津で1番親身な婚活サポート。一人ひとりに本気で伴走してくれます！本気で結婚したいなら絶対ここ！",
      links: [{ type: "instagram", url: "https://www.instagram.com/lesanges_kisarazu" }],
    },
    {
      name: "Nfarm工房 Nao なお",
      description: "当日、会場で占っていただけます。よく当たると評判の鑑定！背中を押してほしいなら絶対ここ！",
      links: [{ type: "instagram", url: "https://www.instagram.com/enjoymind24581" }],
    },
    {
      name: "BODY MAKE SALON BOOTY",
      description: "木更津で1番結果が出るボディメイク。サロンと24時間ジムの二刀流！本気で変わりたいなら絶対ここ！",
      links: [
        { type: "instagram", url: "https://www.instagram.com/bodymakesalonbooty", label: "サロン" },
        { type: "instagram", url: "https://www.instagram.com/bootygym_3f", label: "ジム" },
      ],
    },
    {
      name: "株式会社サリサ",
      description: "千葉で1番相談しやすい不動産会社。買取も仲介も賃貸もおまかせ！不動産のことなら絶対ここ！",
      links: [{ type: "web", url: "https://sarisa.jp" }],
    },
    {
      name: "株式会社TOUSEN",
      description: "君津で1番勢いのあるプラント工事会社。若き職人の技術力とスピード感！難しい現場こそ絶対ここ！",
      links: [{ type: "web", url: "https://tousen-05.com" }],
    },
    {
      name: "LOUNGE GOLF FOREST",
      description: "打って、語らって、また打つ。ゴルフを“大人の遊び場”に変えたラウンジ。スコアを競うだけじゃない、ゴルフ好きが自然と集まる場所です。",
      links: [
        { type: "instagram", url: "https://www.instagram.com/shouwa_kikaku", label: "昭和企画" },
        { type: "instagram", url: "https://www.instagram.com/forestlg0417", label: "FOREST" },
      ],
    },
    {
      name: "ワイクレスト株式会社",
      description: "Instagramフォロワー3万人超の設計力。デザイン住宅から外構まで全国対応！家を建てるなら絶対ここ！",
      links: [
        { type: "instagram", url: "https://www.instagram.com/ycrest_architects", label: "設計・住宅" },
        { type: "instagram", url: "https://www.instagram.com/ycrest_exterior", label: "外構" },
      ],
    },
    {
      name: "YKマネジメント株式会社",
      description: "木更津で1番の物件探しのプロ集団。ルームツアーで中まで丸わかり！部屋探しなら絶対ここ！",
      links: [{ type: "instagram", url: "https://www.instagram.com/yk_management_" }],
    },
    {
      name: "海坊主",
      description: "木更津で1番の、おでんと地魚の居酒屋。出汁の染みた一皿と、その日に揚がった地魚！木更津の夜なら絶対ここ！",
      links: [{ type: "instagram", url: "https://www.instagram.com/umibouzu.kisarazu" }],
    },
    {
      name: "韓国料理ペゴパ",
      description: "市原で1番の韓国料理屋さん。ひと口で「あ、これ現地の味だ」と分かるはず。作っているのは本場の方々です。韓国の味が恋しくなったら絶対ここ！",
      links: [{ type: "instagram", url: "https://www.instagram.com/pegopa.ichihara" }],
    },
    {
      name: "山中拓也",
      description: "海では腕利きの漁師、陸ではホームページ制作まで。地元を知り尽くしたマルチプレイヤー！相談するなら絶対ここ！",
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
