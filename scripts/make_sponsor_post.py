# 協賛企業様を1社ずつ紹介する Instagram カルーセル（1080x1350・4:5）を作る。
#
#   python3 scripts/make_sponsor_post.py umibouzu
#
# 出力先: design/sns/posts/<slug>/01.jpg, 02.jpg, ...
# 写真は design/sns/posts/<slug>/src/ に置いておく（店舗の公式掲載から取得したもの）。
#
# 下の POSTS に1社ぶんの設定を足せば、同じ体裁で他の協賛企業様も作れる。
import os, sys
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO = os.path.join(ROOT, "src", "assets", "logo.png")
FONTS = "C:/Windows/Fonts"
SERIF = os.path.join(FONTS, "NotoSerifJP-VF.ttf")
SANS = os.path.join(FONTS, "NotoSansJP-VF.ttf")

W, H = 1080, 1350
PAD = 72

# サイトと同じ配色
BG = (253, 246, 243)
GRAY900 = (17, 24, 39)
GRAY600 = (75, 85, 99)
GRAY500 = (107, 114, 128)
ROSE500 = (244, 63, 94)
ROSE100 = (255, 228, 230)
AMBER100 = (254, 243, 199)
WHITE = (255, 255, 255)

POSTS = {
    "umibouzu": {
        "name": "海坊主",
        "name_prefix": "【木更津】",
        "handle": "@umibouzu.kisarazu",
        "lead": "おでんと、地魚の刺身と、日本酒と。",
        # (写真ファイル, 見出し, 本文)
        "slides": [
            ("0n6o.jpg", "おでん", "出汁の染みた大根に、牛すじ、たまご。\n一皿目から、もう木更津の夜です。"),
            ("0n80.jpg", "地魚の刺身", "市場直送の鮮魚を、その日のいちばんで。\n熟成させた一切れは、とろけます。"),
            ("0n6x.jpg", "貝・牡蠣", "殻付きのまま、豪快に。\n海のものが、とにかく強い店です。"),
            ("0n7f.jpg", "厳選の日本酒", "全国から選び抜いた一本と、\n店名を冠したオリジナルの「海坊主」も。"),
            ("0n7j.jpg", "木更津駅から歩いて3分", "気取らない、居心地のいい店内。\n一人でも、大人数でも。"),
        ],
        "cover": {"file": "0n5e.jpg", "crop": (0.5, 0.0, 1.0, 0.5)},  # 4分割の右上（外観）
        "info": [
            ("住所", "千葉県木更津市東中央1-4-6"),
            ("最寄り", "JR木更津駅 東口から徒歩3分"),
            ("営業時間", "18:00〜23:00（L.O. 22:30）"),
            ("定休日", "水曜日 他"),
            ("ご予約", "070-5510-0078"),
            ("Instagram", "@umibouzu.kisarazu"),
        ],
    },
}

EVENT = "10月18日（土）木更津40人街コン"


def font(path, size, weight):
    f = ImageFont.truetype(path, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


from PIL import ImageFont  # noqa: E402  （font() の後で読んでも動くが、分かりやすさのためここに置く）


def center(d, text, f, y, fill, width=W):
    d.text(((width - d.textlength(text, font=f)) / 2, y), text, font=f, fill=fill)


def fill_crop(im, w, h, box=None):
    """box=(l,t,r,b)（0〜1）で切り出してから、w x h に外側合わせで埋める"""
    if box:
        l, t, r, b = box
        im = im.crop((int(im.width * l), int(im.height * t), int(im.width * r), int(im.height * b)))
    scale = max(w / im.width, h / im.height)
    im = im.resize((max(w, round(im.width * scale)), max(h, round(im.height * scale))), Image.LANCZOS)
    x = (im.width - w) // 2
    y = (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


def paste_logo(img, d, y, dark=False):
    """ロゴ＋「木更津街コン」を中央に置いて、下端のyを返す"""
    logo = Image.open(LOGO).convert("RGBA")
    lh = 74
    logo = logo.resize((round(logo.width * lh / logo.height), lh), Image.LANCZOS)
    f = font(SANS, 30, 700)
    brand = "木更津街コン"
    block = logo.width + 14 + d.textlength(brand, font=f)
    x = int((W - block) // 2)
    img.paste(logo, (x, y), logo)
    d.text((x + logo.width + 14, y + (lh - 38) // 2), brand, font=f, fill=WHITE if dark else GRAY900)
    return y + lh


def decor(d):
    d.ellipse((W - 420, -300, W + 220, 340), fill=ROSE100 + (150,))
    d.ellipse((-320, H - 420, 300, H + 200), fill=AMBER100 + (130,))


def cover(cfg, src_dir, out):
    photo = Image.open(os.path.join(src_dir, cfg["cover"]["file"])).convert("RGB")
    img = fill_crop(photo, W, H, cfg["cover"].get("crop"))
    # 文字を読ませるため、上下を暗くする
    veil = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vd = ImageDraw.Draw(veil)
    # 境目が線に見えないよう、上と下へなめらかに濃くする
    for i in range(H):
        top = max(0.0, 1 - i / 560) ** 1.4
        bottom = max(0.0, (i - (H - 540)) / 540) ** 1.4
        a = 118 + int(100 * top + 105 * bottom)
        vd.line((0, i, W, i), fill=(10, 8, 12, min(a, 235)))
    img = Image.alpha_composite(img.convert("RGBA"), veil).convert("RGB")
    d = ImageDraw.Draw(img, "RGBA")

    y = paste_logo(img, d, 64, dark=True) + 44
    f = font(SANS, 27, 900)
    label = "協 賛 企 業 様 の ご 紹 介"
    bw = d.textlength(label, font=f) + 64
    d.rounded_rectangle((int((W - bw) // 2), y, int((W + bw) // 2), y + 62), radius=31, fill=ROSE500)
    center(d, label, f, y + 15, WHITE)

    fn = font(SERIF, 48, 700)
    center(d, cfg["name_prefix"], fn, H // 2 - 150, (255, 228, 230))
    fb = font(SERIF, 136, 900)
    name = cfg["name"]
    fh = font(SANS, 54, 700)
    block = d.textlength(name, font=fb) + 26 + d.textlength("様", font=fh)
    x = (W - block) / 2
    d.text((x, H // 2 - 80), name, font=fb, fill=WHITE)
    d.text((x + d.textlength(name, font=fb) + 26, H // 2 + 10), "様", font=fh, fill=(255, 228, 230))

    fl = font(SANS, 36, 500)
    center(d, cfg["lead"], fl, H // 2 + 120, (250, 240, 240))

    fe = font(SANS, 30, 700)
    center(d, EVENT, fe, H - 218, (255, 228, 230))
    fe2 = font(SANS, 27, 500)
    center(d, "ご協賛、誠にありがとうございます。", fe2, H - 168, (235, 225, 228))
    center(d, "スワイプでお店をご紹介 →", font(SANS, 26, 700), H - 110, WHITE)
    img.save(out, "JPEG", quality=92, optimize=True, progressive=True)


def photo_slide(cfg, src_dir, i, out):
    file, title, body = cfg["slides"][i]
    photo = Image.open(os.path.join(src_dir, file)).convert("RGB")
    img = fill_crop(photo, W, H)
    d = ImageDraw.Draw(img, "RGBA")

    # 下に白いカードを置いて、その中に文字を入れる
    card_h = 300
    top = H - card_h - 56
    d.rounded_rectangle((56, top, W - 56, H - 56), radius=36, fill=WHITE + (242,))
    d.rounded_rectangle((56, top, W - 56, top + 12), radius=6, fill=ROSE500)
    d.rectangle((56, top + 6, W - 56, top + 12), fill=ROSE500)

    # 連番
    num = f"{i + 2:02d}"
    fnum = font(SANS, 26, 900)
    d.ellipse((96, top + 44, 96 + 56, top + 100), fill=ROSE500)
    d.text((96 + (56 - d.textlength(num, font=fnum)) / 2, top + 60), num, font=fnum, fill=WHITE)

    ft = font(SERIF, 56, 900)
    d.text((176, top + 46), title, font=ft, fill=GRAY900)
    fb = font(SANS, 29, 500)
    ty = top + 140
    for line in body.split("\n"):
        d.text((176, ty), line, font=fb, fill=GRAY600)
        ty += 46
    img.save(out, "JPEG", quality=92, optimize=True, progressive=True)


def info(cfg, out):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")
    decor(d)

    y = paste_logo(img, d, 72) + 56
    ft = font(SERIF, 62, 900)
    center(d, cfg["name_prefix"] + cfg["name"], ft, y, GRAY900)
    y += 92
    center(d, "様", font(SANS, 34, 700), y, GRAY600)
    y += 72
    d.line((W / 2 - 120, y, W / 2 - 40, y), fill=(253, 164, 175), width=3)
    d.line((W / 2 + 40, y, W / 2 + 120, y), fill=(253, 164, 175), width=3)
    d.ellipse((W / 2 - 10, y - 10, W / 2 + 10, y + 10), fill=ROSE500)
    y += 56

    rows = cfg["info"]
    card_top = y
    card_h = len(rows) * 86 + 56
    d.rounded_rectangle((PAD, card_top, W - PAD, card_top + card_h), radius=32, fill=WHITE)
    fk = font(SANS, 25, 700)
    fv = font(SANS, 31, 500)
    ry = card_top + 36
    for k, v in rows:
        d.text((PAD + 44, ry + 6), k, font=fk, fill=ROSE500)
        d.text((PAD + 230, ry), v, font=fv, fill=GRAY900)
        ry += 86

    y = card_top + card_h + 64
    fe = font(SANS, 31, 700)
    center(d, EVENT, fe, y, GRAY900)
    center(d, "にご協賛いただきました。", font(SANS, 27, 500), y + 52, GRAY600)
    center(d, "誠にありがとうございます。", font(SANS, 27, 500), y + 98, GRAY600)

    fs = font(SANS, 30, 700)
    center(d, "kazusacon.com", fs, H - PAD - fs.size, GRAY900)
    img.save(out, "JPEG", quality=92, optimize=True, progressive=True)


def main():
    slug = sys.argv[1] if len(sys.argv) > 1 else "umibouzu"
    cfg = POSTS[slug]
    base = os.path.join(ROOT, "design", "sns", "posts", slug)
    src_dir = os.path.join(base, "src")
    os.makedirs(base, exist_ok=True)

    cover(cfg, src_dir, os.path.join(base, "01.jpg"))
    for i in range(len(cfg["slides"])):
        photo_slide(cfg, src_dir, i, os.path.join(base, f"{i + 2:02d}.jpg"))
    info(cfg, os.path.join(base, f"{len(cfg['slides']) + 2:02d}.jpg"))
    print("generated", len(cfg["slides"]) + 2, "images ->", os.path.relpath(base, ROOT))


if __name__ == "__main__":
    main()
