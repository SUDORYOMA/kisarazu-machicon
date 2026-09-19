import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SubPageLayout from "@/components/SubPageLayout";
import BlogCard from "@/components/BlogCard";
import NotFound from "@/pages/NotFound";
import { formatDate, getPost, getPosts, renderMarkdown } from "@/lib/blog";
import { setPageMeta } from "@/lib/seo";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getPost(slug);
  const html = useMemo(() => (post ? renderMarkdown(post.body) : ""), [post]);
  const others = getPosts().filter((p) => p.slug !== slug).slice(0, 3);

  useEffect(() => {
    if (!post) return;
    return setPageMeta({
      title: `${post.title}｜木更津街コン`,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
    });
  }, [post]);

  if (!post) return <NotFound />;

  return (
    <SubPageLayout>
      <article>
        {/* Header */}
        <header className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
            <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-rose-500 transition-colors">ホーム</Link>
              <i className="ri-arrow-right-s-line" />
              <Link to="/blog" className="hover:text-rose-500 transition-colors">ブログ</Link>
              <i className="ri-arrow-right-s-line" />
              <span className="text-gray-600 truncate max-w-[16rem]">{post.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-rose-50 text-rose-500 text-xs font-bold px-2.5 py-1 rounded-full">{post.category}</span>
              <time dateTime={post.date} className="text-xs text-gray-400">{formatDate(post.date)}</time>
            </div>
            <h1
              className="text-2xl md:text-4xl font-black text-gray-900 leading-tight"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              {post.title}
            </h1>
          </div>
        </header>

        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="max-w-3xl mx-auto px-6 -mt-8 md:-mt-10">
            <img src={post.thumbnail} alt={post.title} width={1200} height={675} className="w-full rounded-2xl object-cover aspect-[16/9]" />
          </div>
        )}

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <div className="prose-blog" dangerouslySetInnerHTML={{ __html: html }} />

          {/* CTA */}
          <div className="mt-14 bg-rose-50 border border-rose-100 rounded-2xl p-6 md:p-8 text-center">
            <p className="font-black text-gray-900 text-lg mb-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              参加のご相談・空席確認は公式LINEで
            </p>
            <p className="text-gray-600 text-sm mb-5">1人参加の方も多数。初めての方もお気軽にどうぞ。</p>
            <a
              href="https://lin.ee/9pu5Slg"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="whitespace-nowrap inline-flex items-center gap-2 bg-[#06C755] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#05b34c] transition-colors cursor-pointer text-sm"
            >
              <i className="ri-chat-smile-2-line" />
              公式LINEを友だち追加
            </a>
          </div>

          <div className="mt-10 text-center">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-rose-500 transition-colors">
              <i className="ri-arrow-left-line" />
              ブログ一覧へ戻る
            </Link>
          </div>
        </div>
      </article>

      {/* Other posts */}
      {others.length > 0 && (
        <section className="py-14 md:py-20 border-t border-gray-100" style={{ backgroundColor: "#fafaf9" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="text-rose-500 font-semibold text-sm mb-2 tracking-widest uppercase">More</p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              ほかの記事
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </SubPageLayout>
  );
}
