# 当日の会場スクリーン用スライド（1920x1080・16:9）と、流すためのHTMLを作る。
#
#   python3 scripts/make_sponsor_screen.py
#
# 出力先: design/sns/screen/
#   00-title.jpg … 表紙
#   01〜        … 協賛企業様（1社1枚。開くたびに順番はHTML側で入れ替わる）
#   99-thanks.jpg … 締め
#   index.html  … ダブルクリックで開き、F11（全画面）で流す
#
# 社名・紹介文・写真は make_sponsor_post.py の POSTS をそのまま使う（二重管理にしない）。
import os
import sys
from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_sponsor_post import (  # noqa: E402
    POSTS, EVENT, ROOT, LOGO, SERIF, SANS,
    BG, GRAY900, GRAY600, ROSE500, ROSE100, AMBER100, WHITE,
    font, fit, fill_crop,
)

W, H = 1920, 1080
OUT = os.path.join(ROOT, "design", "sns", "screen")


def center(d, text, f, y, fill, x0=0, x1=W):
    d.text((x0 + (x1 - x0 - d.textlength(text, font=f)) / 2, y), text, font=f, fill=fill)


def decor(d):
    d.ellipse((W - 560, -420, W + 300, 440), fill=ROSE100 + (150,))
    d.ellipse((-420, H - 520, 400, H + 300), fill=AMBER100 + (130,))


def logo_block(img, d, x, y, h=74, dark=False, brand=True):
    logo = Image.open(LOGO).convert("RGBA")
    logo = logo.resize((round(logo.width * h / logo.height), h), Image.LANCZOS)
    img.paste(logo, (x, y), logo)
    if not brand:
        return x + logo.width
    f = font(SANS, int(h * 0.42), 700)
    d.text((x + logo.width + 16, y + (h - int(h * 0.52)) // 2), "木更津街コン", font=f,
           fill=WHITE if dark else GRAY900)
    return x + logo.width + 16 + int(d.textlength("木更津街コン", font=f))


def title_slide(path):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")
    decor(d)

    logo = Image.open(LOGO).convert("RGBA")
    lh = 150
    logo = logo.resize((round(logo.width * lh / logo.height), lh), Image.LANCZOS)
    img.paste(logo, ((W - logo.width) // 2, 150), logo)

    f = font(SANS, 34, 900)
    label = "S P O N S O R S"
    bw = d.textlength(label, font=f) + 90
    d.rounded_rectangle((int((W - bw) // 2), 340, int((W + bw) // 2), 418), radius=39, fill=GRAY900)
    center(d, label, f, 358, WHITE)

    ft = font(SERIF, 104, 900)
    center(d, EVENT, ft, 480, GRAY900)
    center(d, "協賛企業様", font(SERIF, 112, 900), 610, ROSE500)

    y = 790
    d.line((W / 2 - 160, y, W / 2 - 50, y), fill=(253, 164, 175), width=4)
    d.line((W / 2 + 50, y, W / 2 + 160, y), fill=(253, 164, 175), width=4)
    d.ellipse((W / 2 - 13, y - 13, W / 2 + 13, y + 13), fill=ROSE500)

    center(d, "本日はあたたかいご支援をいただき、誠にありがとうございます。",
           font(SANS, 36, 500), 850, GRAY600)
    center(d, "kazusacon.com", font(SANS, 34, 700), 950, GRAY900)
    img.save(path, "JPEG", quality=92, optimize=True, progressive=True)


def thanks_slide(path):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")
    decor(d)
    center(d, "ご協賛、誠にありがとうございます。", font(SERIF, 86, 900), 360, GRAY900)
    center(d, "木更津街コンは、地域の皆様のご支援によって開催しています。",
           font(SANS, 38, 500), 520, GRAY600)
    y = 640
    d.line((W / 2 - 160, y, W / 2 - 50, y), fill=(253, 164, 175), width=4)
    d.line((W / 2 + 50, y, W / 2 + 160, y), fill=(253, 164, 175), width=4)
    d.ellipse((W / 2 - 13, y - 13, W / 2 + 13, y + 13), fill=ROSE500)
    logo = Image.open(LOGO).convert("RGBA")
    lh = 120
    logo = logo.resize((round(logo.width * lh / logo.height), lh), Image.LANCZOS)
    img.paste(logo, ((W - logo.width) // 2, 720), logo)
    center(d, "kazusacon.com", font(SANS, 36, 700), 890, GRAY900)
    img.save(path, "JPEG", quality=92, optimize=True, progressive=True)


def sponsor_slide(slug, cfg, path):
    """写真があれば右に大きく、左に社名と情報。無ければ中央にまとめる。"""
    src_dir = os.path.join(ROOT, "design", "sns", "posts", slug, "src")
    photo = cfg.get("cover")
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")

    panel_w = 820
    decor(d)  # 飾りは写真の下に敷く
    logo_file = cfg.get("logo")
    if logo_file and not photo:
        # ロゴを右半分に白いカードで置く
        card = (panel_w + 80, 180, W - 120, H - 180)
        d.rounded_rectangle(card, radius=48, fill=WHITE)
        im = Image.open(os.path.join(src_dir, logo_file)).convert("RGBA")
        bw, bh = card[2] - card[0] - 160, card[3] - card[1] - 160
        s = min(bw / im.width, bh / im.height)
        im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
        img.paste(im, (card[0] + (card[2] - card[0] - im.width) // 2,
                       card[1] + (card[3] - card[1] - im.height) // 2), im)
        d = ImageDraw.Draw(img, "RGBA")
    if photo:
        im = Image.open(os.path.join(src_dir, photo[0])).convert("RGB")
        im = fill_crop(im, W - panel_w, H, photo[1])
        img.paste(im, (panel_w, 0))
        # 写真の左端を背景になじませる
        veil = Image.new("RGBA", (260, H), (0, 0, 0, 0))
        vd = ImageDraw.Draw(veil)
        for i in range(260):
            vd.line((i, 0, i, H), fill=BG + (int(255 * (1 - i / 260) ** 1.2),))
        img.paste(veil, (panel_w, 0), veil)
        d = ImageDraw.Draw(img, "RGBA")

    if photo or logo_file:
        x0, inner = 96, panel_w - 96 - 60
    else:
        inner = 1200
        x0 = (W - inner) // 2
    logo_block(img, d, x0, 86)

    y = 212
    f = font(SANS, 26, 900)
    label = "協 賛 企 業 様"
    bw = d.textlength(label, font=f) + 64
    d.rounded_rectangle((x0, y, x0 + bw, y + 62), radius=31, fill=ROSE500)
    d.text((x0 + 32, y + 15), label, font=f, fill=WHITE)
    y += 110

    if cfg.get("prefix"):
        d.text((x0, y), cfg["prefix"], font=font(SERIF, 40, 700), fill=ROSE500)
        y += 60
    fn = fit(d, cfg["name"], SERIF, 900, inner - 70, 86, 34)
    d.text((x0, y), cfg["name"], font=fn, fill=GRAY900)
    d.text((x0 + d.textlength(cfg["name"], font=fn) + 20, y + fn.size * 0.52), "様",
           font=font(SANS, max(26, int(fn.size * 0.42)), 700), fill=GRAY600)
    y += fn.size + 46

    fl = fit(d, cfg["lead"], SANS, 500, inner, 32, 20)
    d.text((x0, y), cfg["lead"], font=fl, fill=GRAY600)
    y += 72

    d.line((x0, y, x0 + 90, y), fill=(253, 164, 175), width=4)
    y += 44

    # 下の「ご協賛〜」に重ならないよう、残りの高さで行間を決める
    rows = cfg["info"]
    row_h = max(44, min(62, (H - 210 - y) // max(len(rows), 1)))
    fk = font(SANS, 22, 700)
    for k, v in rows:
        d.text((x0, y + 5), k, font=fk, fill=ROSE500)
        fv = fit(d, v, SANS, 500, inner - 200, min(28, row_h - 10), 18)
        d.text((x0 + 180, y), v, font=fv, fill=GRAY900)
        y += row_h

    d.text((x0, H - 150), EVENT, font=font(SANS, 26, 700), fill=GRAY900)
    d.text((x0, H - 108), "ご協賛、誠にありがとうございます。", font=font(SANS, 24, 500), fill=GRAY600)
    img.save(path, "JPEG", quality=92, optimize=True, progressive=True)


HTML = """<!doctype html>
<meta charset="utf-8">
<title>協賛企業様スライド｜木更津街コン</title>
<style>
  html,body{margin:0;height:100%;background:#000;overflow:hidden}
  img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;
      opacity:0;transition:opacity .9s ease}
  img.on{opacity:1}
  #hint{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);
        color:#fff9;font:14px/1.6 system-ui,sans-serif;background:#0006;
        padding:8px 16px;border-radius:999px;transition:opacity .4s}
  #hint.hide{opacity:0}
</style>
<div id="hint">F11で全画面 ／ スペースで一時停止 ／ ← → で送る</div>
<script>
const FILES = __FILES__;
const SECONDS = 8;
// 表紙と締めは固定、協賛企業様の順番は開くたびに入れ替える
const title = FILES.filter(f => f.startsWith('00'));
const thanks = FILES.filter(f => f.startsWith('99'));
const mid = FILES.filter(f => !f.startsWith('00') && !f.startsWith('99'));
for (let i = mid.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [mid[i], mid[j]] = [mid[j], mid[i]];
}
const list = [...title, ...mid, ...thanks];
const imgs = list.map(f => { const el = new Image(); el.src = f; document.body.append(el); return el; });
let i = 0, paused = false, timer;
function show(n) {
  imgs[i].classList.remove('on');
  i = (n + imgs.length) % imgs.length;
  imgs[i].classList.add('on');
}
function tick() { if (!paused) show(i + 1); timer = setTimeout(tick, SECONDS * 1000); }
imgs[0].classList.add('on');
timer = setTimeout(tick, SECONDS * 1000);
addEventListener('keydown', e => {
  if (e.key === ' ') { paused = !paused; e.preventDefault(); }
  if (e.key === 'ArrowRight') { clearTimeout(timer); show(i + 1); timer = setTimeout(tick, SECONDS * 1000); }
  if (e.key === 'ArrowLeft') { clearTimeout(timer); show(i - 1); timer = setTimeout(tick, SECONDS * 1000); }
});
setTimeout(() => document.getElementById('hint').classList.add('hide'), 6000);
</script>
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    for f in os.listdir(OUT):
        if f.endswith(".jpg"):
            os.remove(os.path.join(OUT, f))

    title_slide(os.path.join(OUT, "00-title.jpg"))
    files = ["00-title.jpg"]
    for n, (slug, cfg) in enumerate(POSTS.items(), 1):
        name = f"{n:02d}-{slug}.jpg"
        sponsor_slide(slug, cfg, os.path.join(OUT, name))
        files.append(name)
    thanks_slide(os.path.join(OUT, "99-thanks.jpg"))
    files.append("99-thanks.jpg")

    html = HTML.replace("__FILES__", repr(files).replace("'", '"'))
    with open(os.path.join(OUT, "index.html"), "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print("generated", len(files), "slides ->", os.path.relpath(OUT, ROOT))


if __name__ == "__main__":
    main()
