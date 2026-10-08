// 緊急のお知らせ（障害・中止など）。
// ここを書き換えるだけで、トップのバナー（AlertBanner）と LINE モーダル内の注意書きの両方が変わる。
// 不要になったら ALERT を null にして `npm run deploy`。
export const ALERT: {
  title: string;
  body: string;
  /** 補足（※で始まる注記）。無ければ省略 */
  note?: string;
} | null = null;

export const INSTAGRAM_URL = "https://www.instagram.com/kazusacon?igsh=MTNwZ3NqeXQ2bjVm&utm_source=qr";
export const EMAIL = "info@kazusacon.com";

/**
 * 公式LINEが使えない期間は true。
 * サイト内の「公式LINEから申し込む」等の導線が、Instagram DM・メールでの問い合わせに切り替わる。
 * 復旧したら false にして（ALERT も null にして）`npm run deploy`。
 */
export const LINE_DOWN = true;

/** 主要CTAのラベル（申し込み・問い合わせ） */
export const CTA_APPLY = LINE_DOWN ? "お問合せ" : "公式LINEから申し込む";
/** 相談・空席確認のラベル */
export const CTA_CONSULT = LINE_DOWN ? "空席確認・ご相談" : "LINEで空席確認";
/** 狭い場所で使う短いラベル */
export const CTA_SHORT = LINE_DOWN ? "お問合せ" : "LINE確認";
/** CTAのアイコン（Remix Icon） */
export const CTA_ICON = LINE_DOWN ? "ri-instagram-line" : "ri-chat-smile-2-line";
/** 緑（LINE色）のCTAに当てる背景クラス。障害中は黒にする */
export const CTA_BG = LINE_DOWN
  ? "bg-gray-900 hover:bg-gray-700"
  : "bg-[#06C755] hover:bg-[#05b34c]";
