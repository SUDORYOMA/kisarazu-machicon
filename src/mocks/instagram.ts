export interface InstagramPost {
  id: number;
  shortcode: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
}

export const instagramPosts: InstagramPost[] = [
  {
    id: 1,
    shortcode: "DZFVAoZEsga",
    caption: "木更津街コン（@kazusacon）の投稿を見る",
    likes: 87,
    comments: 12,
    date: "2026.05.31",
  },
  {
    id: 2,
    shortcode: "DbYTnhxEpPK",
    caption: "木更津街コン（@kazusacon）の投稿を見る",
    likes: 64,
    comments: 8,
    date: "2026.03.29",
  },
  {
    id: 3,
    shortcode: "Dbxpi9SEl58",
    caption: "木更津街コン（@kazusacon）の投稿を見る",
    likes: 103,
    comments: 15,
    date: "2026.01.18",
  },
];