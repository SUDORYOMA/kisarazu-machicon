// 緊急のお知らせ（障害・中止など）。
// ここを書き換えるだけで、トップのバナー（AlertBanner）と LINE モーダル内の注意書きの両方が変わる。
// 不要になったら ALERT を null にして `npm run deploy`。
export const ALERT: {
  title: string;
  body: string;
  /** 補足（※で始まる注記）。無ければ省略 */
  note?: string;
} | null = {
  title: "9/25 18時頃〜10/4終日 - 公式LINEが一時的に利用できない状況でございます",
  body: "お問合せは公式Instagram又はメールアドレスまでお願い致します。また、InstagramのDM・メール・お電話にて参加者の確認を取らせて頂きます。",
  note: "※抽選結果のご連絡も上記方法になる可能性があり、ご不便をおかけいたしますが、ご対応お願い致します。",
};

export const INSTAGRAM_URL = "https://www.instagram.com/kazusacon?igsh=MTNwZ3NqeXQ2bjVm&utm_source=qr";
export const EMAIL = "info@kazusacon.com";
