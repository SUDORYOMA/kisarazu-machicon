# Instagram 用の「協賛企業一覧」画像を作る。
#
#   python3 scripts/make_sponsor_images.py
#
# 出力先: design/sns/
#   sponsors-story.jpg  1080x1920（ストーリー）
#   sponsors-post.jpg   1080x1350（投稿・縦長）
#   sponsors-square.jpg 1080x1080（投稿・正方形）
#
# 社名は src/mocks/sponsors.ts から読む（サイトと二重管理にしない）。
import io, os, re, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPONSORS_TS = os.path.join(ROOT, "src", "mocks", "sponsors.ts")
LOGO = os.path.join(ROOT, "src", "assets", "logo.png")
OUT_DIR = os.path.join(ROOT, "design", "sns")
FONTS = "C:/Windows/Fonts"
SERIF = os.path.join(FONTS, "NotoSerifJP-VF.ttf")
SANS = os.path.join(FONTS, "NotoSansJP-VF.ttf")

EVENT_DATE = "10月18日"
SITE = "kazusacon.com"

# サイトと同じ配色
BG = (253, 246, 243)
GRAY900 = (17, 24, 39)
GRAY600 = (75, 85, 99)
GRAY400 = (156, 163, 175)
ROSE500 = (244, 63, 94)
ROSE100 = (255, 228, 230)
AMBER100 = (254, 243, 199)
WHITE = (255, 255, 255)


def font(path, size, weight):
    f = ImageFont.truetype(path, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def load_names():
    """sponsors.ts の 10/18（イベントID 2）の社名を順番どおりに取り出す"""
    src = io.open(SPONSORS_TS, encoding="utf-8").read()
    block = src[src.index("  2: ["):src.index("\n};")]
    return re.findall(r'name:\s*"([^"]+)"', block)


def fit_font(draw, text, path, weight, max_w, start, min_size):
    """max_w に収まるまで文字サイズを落とす"""
    size = start
    while size > min_size:
        f = font(path, size, weight)
        if draw.textlength(text, font=f) <= max_w:
            return f
        size -= 2
    return font(path, min_size, weight)


def rounded_card(img, box, radius, fill):
    ImageDraw.Draw(img, "RGBA").rounded_rectangle(box, radius=radius, fill=fill)


def render(width, height, out_path, cols, title_size, card_h, name_size, gap):
    img = Image.new("RGB", (width, height), BG)
    d = ImageDraw.Draw(img, "RGBA")

    # 装飾の円
    d.ellipse((width - 420, -300, width + 220, 340), fill=ROSE100 + (150,))
    d.ellipse((-320, height - 420, 300, height + 200), fill=AMBER100 + (130,))

    PAD = 72
    y = PAD

    # ロゴ＋サイト名
    logo = Image.open(LOGO).convert("RGBA")
    lh = 86
    logo = logo.resize((round(logo.width * lh / logo.height), lh), Image.LANCZOS)
    fb = font(SANS, 34, 700)
    brand = "木更津街コン"
    block_w = logo.width + 16 + d.textlength(brand, font=fb)
    lx = int((width - block_w) // 2)
    img.paste(logo, (lx, y), logo)
    d.text((lx + logo.width + 16, y + (lh - 44) // 2), brand, font=fb, fill=GRAY900)
    y += lh + 40

    # SPONSORS バッジ
    fbadge = font(SANS, 28, 900)
    label = "S P O N S O R S"
    bw = d.textlength(label, font=fbadge) + 72
    d.rounded_rectangle((int((width - bw) // 2), y, int((width + bw) // 2), y + 64), radius=32, fill=GRAY900)
    d.text(((width - d.textlength(label, font=fbadge)) // 2, y + 16), label, font=fbadge, fill=WHITE)
    y += 64 + 36

    # 見出し
    ft = font(SERIF, title_size, 900)
    line1 = f"{EVENT_DATE}開催"
    d.text(((width - d.textlength(line1, font=ft)) // 2, y), line1, font=ft, fill=GRAY900)
    y += int(title_size * 1.25)
    line2 = "協賛企業様"
    d.text(((width - d.textlength(line2, font=ft)) // 2, y), line2, font=ft, fill=ROSE500)
    y += int(title_size * 1.55)

    # 区切り線＋ハート
    cy = y + 10
    d.line((width // 2 - 130, cy, width // 2 - 40, cy), fill=(253, 164, 175), width=3)
    d.line((width // 2 + 40, cy, width // 2 + 130, cy), fill=(253, 164, 175), width=3)
    d.ellipse((width // 2 - 11, cy - 11, width // 2 + 11, cy + 11), fill=ROSE500)
    y = cy + 56

    # 社名カード（フッターに重ならないよう、残りの高さに合わせて詰める）
    names = load_names()
    inner = width - PAD * 2
    card_w = (inner - gap * (cols - 1)) // cols
    rows = (len(names) + cols - 1) // cols
    footer_top = height - PAD - 30 - 24 - 20 - 24  # サイト名・注記ぶん
    avail = footer_top - y - 24
    card_h = min(card_h, max(70, (avail - gap * (rows - 1)) // rows))
    for i, name in enumerate(names):
        col, row = i % cols, i // cols
        x = PAD + col * (card_w + gap)
        cy0 = y + row * (card_h + gap)
        rounded_card(img, (x, cy0, x + card_w, cy0 + card_h), 24, WHITE)
        # 上部のアクセント帯
        d.rounded_rectangle((x, cy0, x + card_w, cy0 + 10), radius=5, fill=ROSE500)
        d.rectangle((x, cy0 + 5, x + card_w, cy0 + 10), fill=ROSE500)

        # 社名＋「様」を1行で中央に置く（「様」は少し小さく、少し離す）
        gap_x = max(10, int(name_size * 0.3))
        fn = font(SERIF, name_size, 900)
        fh = font(SANS, max(20, int(name_size * 0.62)), 700)
        avail = card_w - 40
        size = name_size
        while size > 20:
            fn = font(SERIF, size, 900)
            fh = font(SANS, max(18, int(size * 0.62)), 700)
            if d.textlength(name, font=fn) + gap_x + d.textlength("様", font=fh) <= avail:
                break
            size -= 2
        nw = d.textlength(name, font=fn)
        hw = d.textlength("様", font=fh)
        nx = x + (card_w - (nw + gap_x + hw)) / 2
        ty = cy0 + (card_h - size) // 2 + 2
        d.text((nx, ty), name, font=fn, fill=GRAY900)
        d.text((nx + nw + gap_x, ty + (size - fh.size) * 0.55), "様", font=fh, fill=GRAY600)

    # フッター（下端から積む）
    fsite = font(SANS, 30, 700)
    site_y = height - PAD - fsite.size
    d.text(((width - d.textlength(SITE, font=fsite)) / 2, site_y), SITE, font=fsite, fill=GRAY900)
    ffoot = font(SANS, 24, 500)
    note = "順不同・敬称略"
    d.text(((width - d.textlength(note, font=ffoot)) / 2, site_y - ffoot.size - 20), note, font=ffoot, fill=GRAY400)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, "JPEG", quality=92, optimize=True, progressive=True)
    print("generated", os.path.relpath(out_path, ROOT), f"{width}x{height}")


def main():
    # ストーリー：縦に長いので2列・カード大きめ
    render(1080, 1920, os.path.join(OUT_DIR, "sponsors-story.jpg"),
           cols=2, title_size=92, card_h=150, name_size=44, gap=24)
    # 投稿（縦長 4:5）
    render(1080, 1350, os.path.join(OUT_DIR, "sponsors-post.jpg"),
           cols=2, title_size=76, card_h=112, name_size=38, gap=20)
    # 投稿（正方形）：3列にして縦を詰める
    render(1080, 1080, os.path.join(OUT_DIR, "sponsors-square.jpg"),
           cols=3, title_size=62, card_h=96, name_size=30, gap=16)


if __name__ == "__main__":
    main()
