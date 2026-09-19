import { Link } from "react-router-dom";
import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/blog";

export default function BlogSection() {
  const posts = getPosts(3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-20" style={{ backgroundColor: "#fafaf9" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-rose-500 font-semibold text-sm mb-2 tracking-widest uppercase">Blog</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              お知らせ・ブログ
            </h2>
            <p className="text-gray-500 mt-3 text-sm">開催レポートや次回のご案内、初めての方向けの情報をお届けします。</p>
          </div>
          <Link
            to="/blog"
            className="whitespace-nowrap hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-rose-500 transition-colors"
          >
            ブログ一覧を見る
            <i className="ri-arrow-right-line" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Mobile link */}
        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="whitespace-nowrap inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-3.5 rounded-full hover:bg-gray-700 transition-colors cursor-pointer text-sm"
          >
            <i className="ri-article-line" />
            ブログ一覧を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
