import { useEffect } from "react";
import { Link } from "react-router-dom";
import SubPageLayout from "@/components/SubPageLayout";
import { setPageMeta } from "@/lib/seo";
import { EMAIL, INSTAGRAM_URL } from "@/lib/alert";

// 事業者情報
const COMPANY = {
  name: "株式会社SIXMATE",
  representative: "代表取締役社長　須藤龍馬",
  site: "https://kazusacon.com",
  // TODO: 所在地が決まったら記載する（個人情報保護法の公表事項）
  address: "【所在地】",
};

const LAST_UPDATED = "2026年10月8日";

export default function Privacy() {
  useEffect(() => {
    return setPageMeta({
      title: "プライバシーポリシー｜木更津街コン",
      description:
        "木更津街コン（株式会社SIXMATE）における個人情報の取り扱いについて。取得する情報、利用目的、第三者提供、お問い合わせ窓口を記載しています。",
      path: "/privacy",
    });
  }, []);

  return (
    <SubPageLayout>
      {/* Page header */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
          <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-rose-500 transition-colors">ホーム</Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-gray-600">プライバシーポリシー</span>
          </nav>
          <p className="text-rose-500 font-semibold text-sm mb-2 tracking-widest uppercase">Privacy Policy</p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            プライバシーポリシー
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            {COMPANY.name}（以下「当社」といいます）は、木更津街コン（{COMPANY.site}。以下「本サイト」といいます）
            における個人情報の取り扱いについて、以下のとおり定めます。
          </p>
        </div>
      </section>

      {/* 本文 */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 prose-blog">
          <h2>1. 取得する情報</h2>
          <p>当社は、本サイトのご利用にあたり、次の情報を取得する場合があります。</p>
          <ul>
            <li>お問い合わせ・参加申し込みの際にご入力いただく、お名前、メールアドレス、電話番号、年齢、お住まいの市町村、ご職業、お問い合わせ内容</li>
            <li>InstagramのDM、メール、お電話によりご連絡いただいた際の内容および連絡先</li>
            <li>イベント当日の受付における、公的身分証明書の記載内容の目視確認（原則として記録・複写は行いません）</li>
            <li>本サイトの閲覧に関する情報（アクセス日時、閲覧ページ、ブラウザの種類など）</li>
          </ul>

          <h2>2. 利用目的</h2>
          <p>取得した情報は、次の目的で利用します。</p>
          <ul>
            <li>イベントへのお申し込みの受付、抽選、当選・落選およびキャンセル待ちのご連絡</li>
            <li>イベント当日のご案内、参加者の本人確認および年齢・独身であることの確認</li>
            <li>お問い合わせへの回答およびご連絡</li>
            <li>今後のイベントに関するご案内（ご希望の方のみ）</li>
            <li>本サイトおよびイベント運営の改善</li>
          </ul>

          <h2>3. 第三者への提供</h2>
          <p>
            当社は、次の場合を除き、ご本人の同意なく個人情報を第三者に提供しません。
          </p>
          <ul>
            <li>法令に基づく場合</li>
            <li>人の生命、身体または財産の保護のために必要があり、ご本人の同意を得ることが困難な場合</li>
            <li>イベント運営に必要な範囲で、会場（飲食店等）へ参加人数等をお伝えする場合（お名前等の個人を特定する情報は含みません）</li>
          </ul>
          <p>
            参加者同士の連絡先交換は、ご本人の意思によるものです。当社が参加者の連絡先を他の参加者へお伝えすることはありません。
          </p>

          <h2>4. 業務委託・外部サービスの利用</h2>
          <p>本サイトでは、次の外部サービスを利用しています。各サービスにおける情報の取り扱いは、各社の定めによります。</p>
          <ul>
            <li>お問い合わせフォームの送信・受信（Formspree）</li>
            <li>本サイトの公開（GitHub Pages）</li>
            <li>Instagramの投稿の埋め込み表示（Meta Platforms, Inc.）</li>
            <li>地図の表示およびWebフォントの配信（Google LLC）</li>
          </ul>
          <p>
            これらのサービスの利用にあたり、お客様のアクセス情報（IPアドレス、ブラウザの情報等）が各社へ送信される場合があります。
          </p>

          <h2>5. Cookie（クッキー）について</h2>
          <p>
            本サイトは、独自のCookieによる個人の識別や広告配信を行っていません。
            ただし、前項の外部サービスがCookie等を利用する場合があります。Cookieの利用はブラウザの設定により無効にできますが、
            一部の表示が正しく行われない場合があります。
          </p>

          <h2>6. 保有期間</h2>
          <p>
            取得した個人情報は、利用目的の達成に必要な期間（イベント終了後の問い合わせ対応等を含みます）保有し、
            不要となった後は速やかに削除します。
          </p>

          <h2>7. 安全管理</h2>
          <p>
            当社は、個人情報の漏えい、滅失またはき損の防止その他の安全管理のために必要かつ適切な措置を講じます。
            取り扱う担当者を限定し、取得した情報へのアクセスを管理します。
          </p>

          <h2>8. 開示・訂正・削除のご請求</h2>
          <p>
            ご本人から、個人情報の開示、訂正、追加、削除、利用停止のお申し出があった場合は、
            ご本人であることを確認のうえ、法令に従い速やかに対応します。下記の窓口までご連絡ください。
          </p>

          <h2>9. 本ポリシーの変更</h2>
          <p>
            法令の改正や運営内容の変更に応じて、本ポリシーを変更することがあります。
            変更後の内容は、本ページに掲載した時点から適用されます。
          </p>

          <h2>10. 事業者情報・お問い合わせ窓口</h2>
          <table>
            <tbody>
              <tr>
                <th>事業者名</th>
                <td>{COMPANY.name}</td>
              </tr>
              <tr>
                <th>代表者</th>
                <td>{COMPANY.representative}</td>
              </tr>
              <tr>
                <th>所在地</th>
                <td>{COMPANY.address}</td>
              </tr>
              <tr>
                <th>サイト</th>
                <td>
                  <a href={COMPANY.site}>{COMPANY.site}</a>
                </td>
              </tr>
              <tr>
                <th>お問い合わせ</th>
                <td>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  <br />
                  <a href={INSTAGRAM_URL} target="_blank" rel="nofollow noopener noreferrer">
                    公式Instagram（@kazusacon）
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
          <p className="text-sm text-gray-500">制定日：{LAST_UPDATED}</p>
        </div>
      </section>
    </SubPageLayout>
  );
}
