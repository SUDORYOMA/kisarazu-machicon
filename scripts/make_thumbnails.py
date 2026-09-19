# ブログ記事のサムネイル（16:9・1200x675）を生成する。
#
#   python3 scripts/make_thumbnails.py          # thumbnail 未設定の記事だけ生成して frontmatter に書き込む
#   python3 scripts/make_thumbnails.py --force  # 全記事を作り直す（既存の thumbnail 指定は上書きしない）
#
# 出力先: public/images/blog/<slug>.jpg  →  記事ページ・一覧・トップのカードと OGP に使われる。
# 写真を使いたい記事は frontmatter の thumbnail を手で差し替えればよい（このスクリプトは触らない）。
import io, os, re, sys, glob, math
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "src", "content", "blog")
OUT_DIR = os.path.join(ROOT, "public", "images", "blog")
LOGO = os.path.join(ROOT, "src", "assets", "logo.png")
FONTS = "C:/Windows/Fonts"
SERIF = os.path.join(FONTS, "NotoSerifJP-VF.ttf")
SANS = os.path.join(FONTS, "NotoSansJP-VF.ttf")

W, H = 1200, 675
FORCE = "--force" in sys.argv

# サイトの Tailwind 配色（BlogCard.tsx の CATEGORY_TONE と対応）
GRAY900 = (17, 24, 39)
GRAY500 = (107, 114, 128)
ROSE500 = (244, 63, 94)
TONES = {
    "開催レポート": ((255, 228, 230), (255, 251, 235)),   # rose-100 → amber-50
    "イベント情報": ((254, 243, 199), (255, 241, 242)),   # amber-100 → rose-50
    "初めての方へ": ((224, 242, 254), (255, 241, 242)),   # sky-100 → rose-50
    "コラム":       ((243, 232, 255), (255, 241, 242)),   # purple-100 → rose-50
}
DEFAULT_TONE = ((243, 244, 246), (255, 241, 242))


def font(path, size, weight):
    f = ImageFont.truetype(path, size)
    try:
        f.set_variation_by_axes([weight])  # 可変フォントのウェイト
    except Exception:
        pass
    return f


def parse(md):
    m = re.match(r"^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$", md)
    meta = {}
    for line in m.group(1).split("\n"):
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip().strip("\"'")
    return meta, m.group(1), m.group(2)


def gradient(c1, c2):
    # 左上→右下のグラデーション
    base = Image.new("RGB", (W, H), c1)
    px = base.load()
    for y in range(H):
        for x in range(W):
            t = (x / W + y / H) / 2
            px[x, y] = tuple(round(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))
    return base


def wrap(draw, text, f, max_w):
    # 「｜」は改行に置き換え、「？」「！」の直後で優先的に改行。収まらない部分は文字単位で折り返す
    segs, cur = [], ""
    for ch in text:
        if ch == "｜":  # 区切りの縦棒は改行に置き換えて描かない
            segs.append(cur); cur = ""
            continue
        cur += ch
        if ch in "？！":
            segs.append(cur); cur = ""
    if cur:
        segs.append(cur)
    lines = []
    for seg in segs:
        buf = ""
        for ch in seg:
            if draw.textlength(buf + ch, font=f) > max_w and buf:
                lines.append(buf); buf = ch
            else:
                buf += ch
        if buf:
            lines.append(buf)
    return lines


def fit_title(draw, title, max_w):
    # 3行以内・最終行が3文字以下にならないサイズを選ぶ
    for size in (64, 60, 56, 52, 48, 44, 40):
        ft = font(SERIF, size, 900)
        lines = wrap(draw, title, ft, max_w)
        if len(lines) <= 3 and len(lines[-1].strip("？！")) > 3:
            return ft, lines, size
    return ft, lines, size


def render(meta, out_path):
    c1, c2 = TONES.get(meta.get("category", ""), DEFAULT_TONE)
    img = gradient(c1, c2)
    d = ImageDraw.Draw(img, "RGBA")

    # 装飾の円（ResultsSection の bg-white/5 と同じ発想で、白の薄い円）
    d.ellipse((W - 420, -260, W + 160, 320), fill=(255, 255, 255, 110))
    d.ellipse((-200, H - 300, 260, H + 160), fill=(255, 255, 255, 90))

    PAD = 80
    # カテゴリチップ（rose-50 地に rose-500 文字）→ 画像上では白地にする
    fs = font(SANS, 24, 700)
    cat = meta.get("category", "お知らせ")
    tw = d.textlength(cat, font=fs)
    d.rounded_rectangle((PAD, PAD, PAD + tw + 40, PAD + 48), radius=24, fill=(255, 255, 255, 235))
    d.text((PAD + 20, PAD + 10), cat, font=fs, fill=ROSE500)
    # 日付
    fd = font(SANS, 24, 500)
    d.text((PAD + tw + 60, PAD + 10), meta.get("date", "").replace("-", "."), font=fd, fill=GRAY500)

    # タイトル（明朝・極太）。3行に収まるサイズまで落とす
    title = meta["title"]
    max_w = W - PAD * 2
    ft, lines, size = fit_title(d, title, max_w)
    lh = int(size * 1.45)
    block_h = lh * len(lines)
    y = (H - block_h) // 2 + 20
    for ln in lines:
        d.text((PAD, y), ln, font=ft, fill=GRAY900)
        y += lh

    # 下部：ロゴ＋サイト名／URL
    logo = Image.open(LOGO).convert("RGBA")
    lh_px = 56
    logo = logo.resize((round(logo.width * lh_px / logo.height), lh_px), Image.LANCZOS)
    img.paste(logo, (PAD, H - PAD - lh_px), logo)
    fb = font(SANS, 26, 700)
    d.text((PAD + logo.width + 18, H - PAD - lh_px + 8), "木更津街コン", font=fb, fill=GRAY900)
    fu = font(SANS, 20, 500)
    d.text((PAD + logo.width + 18, H - PAD - lh_px + 8 + 30), "kazusacon.com", font=fu, fill=GRAY500)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, "JPEG", quality=85, optimize=True, progressive=True)
    # カード表示用の軽量版（幅 640px）。OGP には上の 1200px 版を使う
    small = img.resize((640, 360), Image.LANCZOS)
    small.save(out_path.replace(".jpg", ".card.jpg"), "JPEG", quality=80, optimize=True, progressive=True)


def main():
    made = 0
    for path in sorted(glob.glob(os.path.join(CONTENT, "*.md"))):
        slug = os.path.splitext(os.path.basename(path))[0]
        md = io.open(path, encoding="utf-8").read()
        meta, fm, body = parse(md)
        generated_path = f"/images/blog/{slug}.jpg"
        thumb = meta.get("thumbnail", "")
        if thumb and thumb != generated_path:
            continue  # 手で指定した画像は尊重する
        if thumb == generated_path and not FORCE and os.path.exists(os.path.join(ROOT, "public", thumb.lstrip("/"))):
            continue
        render(meta, os.path.join(OUT_DIR, f"{slug}.jpg"))
        if not thumb:
            new_fm = fm.rstrip("\n") + f"\nthumbnail: {generated_path}"
            io.open(path, "w", encoding="utf-8", newline="\n").write(f"---\n{new_fm}\n---\n{body}")
        made += 1
        print("generated", generated_path)
    print(f"done: {made} image(s)")


if __name__ == "__main__":
    main()
