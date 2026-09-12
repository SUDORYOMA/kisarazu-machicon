// Formspree（https://formspree.io）へのフォーム送信
//
// フォームIDは Formspree の管理画面で作成したフォームの "f/xxxxxxxx" の部分。
// 現在は1つのフォームで兼用（受信メールの件名 _subject で用途を区別）。分けたくなったら別IDにする。
export const FORMSPREE_FORMS = {
  apply: "mbgjerjy", // イベント申し込み
  line: "mbgjerjy", // LINE 空席確認・お問い合わせ
} as const;

type FormKey = keyof typeof FORMSPREE_FORMS;

/**
 * <form> の内容を Formspree へ送る。成功なら true。
 * `subject` は受信メールの件名（Formspree の予約フィールド `_subject`）。
 */
export async function submitToFormspree(
  formKey: FormKey,
  form: HTMLFormElement,
  subject: string,
): Promise<boolean> {
  const payload: Record<string, string> = { _subject: subject };
  new FormData(form).forEach((value, key) => {
    payload[key] = value.toString();
  });

  const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORMS[formKey]}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // JSON で応答させる（これが無いと Formspree のサンクスページへリダイレクトされる）
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.ok;
}
