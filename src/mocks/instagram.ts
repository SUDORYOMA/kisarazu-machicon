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
    shortcode: "DExample01",
    caption: "木更津街コンvol.4の様子。みんな楽しそうに過ごしてくれて嬉しい！",
    likes: 87,
    comments: 12,
    date: "2026.05.31",
  },
  {
    id: 2,
    shortcode: "DExample02",
    caption: "今回のイベント料理も最高でした。お腹いっぱい、笑顔いっぱい。",
    likes: 64,
    comments: 8,
    date: "2026.03.29",
  },
  {
    id: 3,
    shortcode: "DExample03",
    caption: "街コン後の二次会も盛り上がりました。友達も恋人も見つかる場所。",
    likes: 103,
    comments: 15,
    date: "2026.01.18",
  },
];