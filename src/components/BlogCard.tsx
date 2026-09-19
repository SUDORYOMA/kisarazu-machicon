import { Link } from "react-router-dom";
import { formatDate, type BlogPost } from "@/lib/blog";

// サムネイル画像が無い記事用。カテゴリごとに色を変える
const CATEGORY_TONE: Record<string, string> = {
  開催レポート: "from-rose-100 via-rose-50 to-amber-50",
  イベント情報: "from-amber-100 via-amber-50 to-rose-50",
  初めての方へ: "from-sky-100 via-sky-50 to-rose-50",
  コラム: "from-purple-100 via-purple-50 to-rose-50",
};

// 生成サムネイル（/images/blog/*.jpg）にはカード用の軽量版 *.card.jpg がある。手で置いた写真はそのまま
function cardImage(src: string): string {
  return /^\/images\/blog\/[^/]+\.jpg$/.test(src) ? src.replace(/\.jpg$/, ".card.jpg") : src;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const tone = CATEGORY_TONE[post.category] ?? "from-gray-100 via-gray-50 to-rose-50";

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-rose-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/9] overflow-hidden">
        {post.thumbnail ? (
          <img
            src={cardImage(post.thumbnail)}
            alt={post.title}
            loading="lazy"
            decoding="async"
            width={640}
            height={360}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${tone} flex items-center justify-center p-6`}>
            <p
              className="text-gray-900 font-black text-lg leading-snug text-center line-clamp-3"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              {post.title}
            </p>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-rose-50 text-rose-500 text-xs font-bold px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
        </div>
        <h3 className="text-base font-black text-gray-900 leading-snug mb-2 group-hover:text-rose-500 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
        <div className="mt-4 inline-flex items-center gap-1 text-rose-500 text-xs font-bold">
          続きを読む
          <i className="ri-arrow-right-line" />
        </div>
      </div>
    </Link>
  );
}
