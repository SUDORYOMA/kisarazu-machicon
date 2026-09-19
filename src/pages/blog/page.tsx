import { useEffect } from "react";
import { Link } from "react-router-dom";
import SubPageLayout from "@/components/SubPageLayout";
import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/blog";
import { setPageMeta } from "@/lib/seo";

export default function BlogIndex() {
  const posts = getPosts();

  useEffect(() => {
    return setPageMeta({
      title: "ブログ・お知らせ｜木更津街コン",
      description: "木更津街コンの開催レポート、次回イベントのご案内、初めて参加する方向けの情報をお届けします。",
      path: "/blog",
    });
  }, []);

  return (
    <SubPageLayout>
      {/* Page header */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
          <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-rose-500 transition-colors">ホーム</Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-gray-600">ブログ</span>
          </nav>
          <p className="text-rose-500 font-semibold text-sm mb-2 tracking-widest uppercase">Blog</p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            お知らせ・ブログ
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
            開催レポートや次回イベントのご案内、初めて参加する方に向けた情報を発信しています。
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {posts.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-20">記事はまだありません。</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SubPageLayout>
  );
}
