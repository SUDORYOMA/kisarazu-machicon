// 緊急のお知らせ（障害・中止など）。
// ここを書き換えるだけで、トップのバナー（AlertBanner）と LINE モーダル内の注意書きの両方が変わる。
// 不要になったら ALERT を null にして `npm run deploy`。
export const ALERT: {
  title: string;
  body: string;
} | null = {
  title: "9/25 18時頃〜9/28 9時現在 - 公式LINEが一時的に利用できない状況でございます",
  body: "お問合せは公式Instagram又はメールアドレスまでお願い致します。",
};

export const INSTAGRAM_URL = "https://www.instagram.com/kazusacon?igsh=MTNwZ3NqeXQ2bjVm&utm_source=qr";
export const EMAIL = "info@kazusacon.com";
