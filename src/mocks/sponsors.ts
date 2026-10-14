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
      description: "木更津駅から徒歩3分、ついに現れた本格マーラータン。自分好みに選べる具材と、クセになる痺れと旨み。10/19プレオープン、10/24グランドオープン——木更津の新定番になること間違いなし！",
      links: [{ type: "instagram", url: "https://www.instagram.com/malontangkisarazu" }],
    },
    {
      name: "アクティフス在宅ケア株式会社",
      description: "掲げるのは「断らない介護」。身寄りのない方も、生活保護の方も、誰ひとり取り残さない。木更津・市原で、これ以上ないほど懐の深い介護を届け続けています。",
      links: [{ type: "web", url: "https://actifs.jp" }],
    },
    {
      name: "LesAnges Kisarazu",
      description: "木更津の婚活を知り尽くしたサポーター。一人ひとりに寄り添う伴走力は圧巻。「結婚したい」の本気に、とことん付き合ってくれます。",
      links: [{ type: "instagram", url: "https://www.instagram.com/lesanges_kisarazu" }],
    },
    {
      name: "Nfarm工房 Nao なお",
      description: "当日、会場で占っていただけます。驚くほど言い当てられると評判の鑑定を、この機会にぜひ。背中を押してほしい日に。",
      links: [{ type: "instagram", url: "https://www.instagram.com/enjoymind24581" }],
    },
    {
      name: "BODY MAKE SALON BOOTY",
      description: "「変わりたい」なら迷わずここへ。結果の出るボディメイクサロンと、24時間通えるパーソナルジムの二刀流。理想の体への最短ルートがあります。",
      links: [
        { type: "instagram", url: "https://www.instagram.com/bodymakesalonbooty", label: "サロン" },
        { type: "instagram", url: "https://www.instagram.com/bootygym_3f", label: "ジム" },
      ],
    },
    {
      name: "株式会社サリサ",
      description: "千葉の不動産を知り尽くしたプロ。買取・仲介・賃貸まで任せられる安心感は別格。「相談してよかった」が止まりません。",
      links: [{ type: "web", url: "https://sarisa.jp" }],
    },
    {
      name: "株式会社TOUSEN",
      description: "京葉工業地帯のプラントを支える確かな技術力。若き職人たちの熱量とスピード感は、県内屈指。難しい現場ほど真価を発揮します。",
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
      description: "Instagram フォロワー3万人超。住宅メーカー兼設計事務所として、デザイン住宅から外構まで全国対応。「家を建てるならここ」と言わせる設計力です。",
      links: [
        { type: "instagram", url: "https://www.instagram.com/ycrest_architects", label: "設計・住宅" },
        { type: "instagram", url: "https://www.instagram.com/ycrest_exterior", label: "外構" },
      ],
    },
    {
      name: "YKマネジメント株式会社",
      description: "木更津の物件探しならこの道のプロ集団。「木更津物件ナビ」のルームツアーを見れば、理想の部屋が必ず見つかります。",
      links: [{ type: "instagram", url: "https://www.instagram.com/yk_management_" }],
    },
    {
      name: "海坊主",
      description: "木更津が誇る、おでんと地魚の名店。出汁の染みた一皿と、その日に揚がった地魚。木更津の夜は、ここから始まります。",
      links: [{ type: "instagram", url: "https://www.instagram.com/umibouzu.kisarazu" }],
    },
    {
      name: "韓国料理ペゴパ",
      description: "市原で1番の韓国料理屋さん。ひと口で「あ、これ現地の味だ」と分かるはず。作っているのは本場の方々です。韓国の味が恋しくなったら絶対ここ！",
      links: [{ type: "instagram", url: "https://www.instagram.com/pegopa.ichihara" }],
    },
    {
      name: "株式会社大栄",
      description: "木更津の街を支える看板・足場・鍛冶のプロ集団。見上げた看板も、建物を包む足場も、この街のどこかに手仕事が残っています。",
      links: [{ type: "web", url: "https://daiei-kisarazu.com/" }],
    },
    {
      name: "山中拓也",
      description: "海に出れば腕利きの漁師、陸に上がればホームページ制作まで。マルチな才能で地域を支える頼れる存在です。",
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
