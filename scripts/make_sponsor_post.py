# 協賛企業様を1社ずつ紹介する Instagram カルーセル（1080x1350・4:5）を作る。
#
#   python3 scripts/make_sponsor_post.py            # 全社ぶん
#   python3 scripts/make_sponsor_post.py umibouzu   # 1社だけ
#
# 1社あたり4枚：01 表紙 / 02・03 紹介 / 04 店舗情報
# 出力先: design/sns/posts/<slug>/01.jpg 〜 04.jpg
#
# 写真は design/sns/posts/<slug>/src/ に置く（各社の公式サイト・公式掲載から取得したもの）。
# 写真が無い協賛企業様は、同じ配色・書体のまま文字だけのカードになる。
import glob, os, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO = os.path.join(ROOT, "src", "assets", "logo.png")
FONTS = "C:/Windows/Fonts"
SERIF = os.path.join(FONTS, "NotoSerifJP-VF.ttf")
SANS = os.path.join(FONTS, "NotoSansJP-VF.ttf")

W, H = 1080, 1350
PAD = 72
EVENT = "10月18日（日）木更津40人街コン"

# サイトと同じ配色
BG = (253, 246, 243)
GRAY900 = (17, 24, 39)
GRAY600 = (75, 85, 99)
ROSE500 = (244, 63, 94)
ROSE100 = (255, 228, 230)
AMBER100 = (254, 243, 199)
WHITE = (255, 255, 255)
CREAM = (255, 241, 242)

# name       … 社名（「様」は自動で付く）
# prefix     … 社名の上に小さく出す文字（任意）
# lead       … 表紙に出す一言
# cover      … 表紙の写真（src/ 内のファイル名）。None なら文字だけの表紙
# slides     … (写真 or None, 見出し, 本文) を2つ
# info       … 最後のカードに並べる項目
POSTS = {
    "umibouzu": {
        "name": "海坊主",
        "prefix": "【木更津】",
        "lead": "おでんと、地魚の刺身と、日本酒と。",
        "cover": ("0n5e.jpg", (0.5, 0.0, 1.0, 0.5)),
        "slides": [
            ("0n6o.jpg", "おでん", "出汁の染みた大根に、牛すじ、たまご。\n一皿目から、もう木更津の夜です。"),
            ("0n80.jpg", "地魚の刺身", "市場直送の鮮魚を、その日のいちばんで。\n熟成させた一切れは、とろけます。"),
        ],
        "info": [
            ("住所", "千葉県木更津市東中央1-4-6"),
            ("最寄り", "JR木更津駅 東口から徒歩3分"),
            ("営業時間", "18:00〜23:00（L.O. 22:30）"),
            ("定休日", "水曜日 他"),
            ("ご予約", "070-5510-0078"),
            ("Instagram", "@umibouzu.kisarazu"),
        ],
    },
    "malontang": {
        "name": "麻龍湯",
        "prefix": "【木更津】",
        "lead": "木更津駅から3分、本格マーラータン。",
        "cover": ("cover.jpg", None),
        "slides": [
            ("a.jpg", "選べる具材", "ずらりと並んだ具材から、好きなものを\n好きなだけ。自分だけの一杯ができます。"),
            ("b.jpg", "スープは2種類", "痺れる薬膳麻辣湯か、まろやかな白湯か。\n辛さは5段階、苦手な方でも大丈夫。"),
        ],
        "info": [
            ("住所", "千葉県木更津市大和2-1-16"),
            ("最寄り", "JR木更津駅から徒歩3分"),
            ("営業時間", "11:00〜21:00"),
            ("オープン", "10/19 プレ ／ 10/24 グランド"),
            ("ご予約", "0438-97-7337"),
            ("Instagram", "@malontangkisarazu"),
        ],
    },
    "actifs": {
        "name": "アクティフス在宅ケア株式会社",
        "lead": "掲げるのは、「断らない介護」。",
        "cover": ("cover.jpg", None),
        "slides": [
            ("a.jpg", "断らない介護", "身寄りのない方も、生活保護の方も。\n誰ひとり、取り残しません。"),
            ("b.jpg", "暮らしをまるごと", "住宅型有料老人ホームと訪問介護で、\n木更津・市原の毎日を支えています。"),
        ],
        "info": [
            ("エリア", "千葉県木更津市・市原市 ほか"),
            ("事業内容", "訪問介護／住宅型有料老人ホーム"),
            ("受付時間", "9:00〜18:00"),
            ("お問合せ", "0436-63-5111"),
            ("Webサイト", "actifs.jp"),
        ],
    },
    "lesanges": {
        "name": "LesAnges Kisarazu",
        "lead": "木更津の婚活を、知り尽くしたサポーター。",
        "cover": None,
        "slides": [
            (None, "とことん寄り添う", "一人ひとりに伴走する力が圧巻。\n「結婚したい」の本気に、本気で応えます。"),
            (None, "地元を知るからこそ", "木更津・君津・富津・市原を中心に、\n大人の婚活をサポートしています。"),
        ],
        "info": [
            ("エリア", "木更津・君津・富津・市原"),
            ("事業内容", "結婚相談所"),
            ("Webサイト", "les-anges.net"),
            ("Instagram", "@lesanges_kisarazu"),
        ],
    },
    "nfarm": {
        "name": "Nfarm工房 Nao なお",
        "lead": "当日、会場で占っていただけます。",
        "cover": None,
        "slides": [
            (None, "驚くほど言い当てる", "そう評判の鑑定を、この機会にぜひ。\n迷っていることを、ひとつ持って行ってください。"),
            (None, "背中を押してほしい日に", "10月18日、会場でお待ちしています。\n街コンのもうひとつのお楽しみです。"),
        ],
        "info": [
            ("ご出展", "10月18日（日）木更津40人街コン"),
            ("内容", "会場での占い鑑定"),
            ("Instagram", "@enjoymind24581"),
        ],
    },
    "booty": {
        "name": "BODY MAKE SALON BOOTY",
        "lead": "エステ×ジムのWアプローチで、続けられる“美習慣”を。",
        "cover": ("cover.jpg", None),
        "slides": [],
        "info": [
            ("住所", "千葉県木更津市富士見1-12-35"),
            ("事業内容", "ボディメイクサロン／パーソナルジム"),
            ("Webサイト", "bootysalon0401.com"),
            ("Instagram", "@bodymakesalonbooty（サロン）"),
            ("Instagram", "@bootygym_3f（ジム）"),
        ],
    },
    "sarisa": {
        "name": "株式会社サリサ",
        "lead": "千葉の不動産を、知り尽くしたプロ。",
        "cover": ("cover.jpg", None),
        "slides": [
            ("a.jpg", "買取・仲介・賃貸", "どの入口から相談しても、ちゃんと最後まで。\n「相談してよかった」が止まりません。"),
            (None, "ハウスクリーニングも", "「ピカピカ 木更津店」として、\nエアコンや水まわりの清掃まで承ります。"),
        ],
        "info": [
            ("住所", "千葉県木更津市富士見1-12-32"),
            ("事業内容", "不動産売買・仲介・賃貸／清掃"),
            ("お問合せ", "0438-97-6619"),
            ("Webサイト", "sarisa.jp"),
        ],
    },
    "tousen": {
        "name": "株式会社TOUSEN",
        "lead": "京葉工業地帯のプラントを支える技術力。",
        "cover": None,
        "slides": [
            (None, "配管・機械設置・足場", "プラント工事まで一貫して。\n難しい現場ほど、真価を発揮します。"),
            (None, "若い職人たちの熱量", "スピード感は県内屈指。\n安全第一を基盤に、信頼と品質を追求します。"),
        ],
        "info": [
            ("住所", "千葉県君津市人見4-8-34-201"),
            ("事業内容", "配管工事／機械設置／足場仮設／プラント"),
            ("営業時間", "9:00〜18:00"),
            ("Webサイト", "tousen-05.com"),
        ],
    },
    "forest": {
        "name": "LOUNGE GOLF FOREST",
        "lead": "ゴルフを、大人の遊び場に。",
        "cover": ("cover.jpg", None),
        "slides": [
            ("a.jpg", "シミュレーションゴルフ", "打って、語らって、また打つ。\nスコアを競うだけじゃない時間です。"),
            ("b.jpg", "ラウンジで一杯", "ゴルフ好きが自然と集まる、\n金田に生まれた新しい場所。"),
        ],
        "info": [
            ("住所", "千葉県木更津市金田東1-9-10"),
            ("事業内容", "シミュレーションゴルフバー"),
            ("Webサイト", "forest-lg.com"),
            ("Instagram", "@forestlg0417"),
        ],
    },
    "ycrest": {
        "name": "ワイクレスト株式会社",
        "lead": "Instagram フォロワー3万人超の設計力。",
        "cover": ("cover.jpg", None),
        "slides": [
            ("a.jpg", "デザイン住宅", "住宅メーカー兼設計事務所として、\n全国に家を建てています。"),
            ("b.jpg", "外構までまるごと", "設計から庭先まで、ひと続きでデザイン。\n「家を建てるならここ」と言わせる力。"),
        ],
        "info": [
            ("住所", "千葉県木更津市請西1-12-3"),
            ("事業内容", "住宅メーカー／設計事務所／外構"),
            ("お問合せ", "0438-97-6322"),
            ("Webサイト", "y-crest.jp"),
            ("Instagram", "@ycrest_architects"),
        ],
    },
    "yk": {
        "name": "YKマネジメント株式会社",
        "lead": "木更津の物件探しなら、この道のプロ集団。",
        "cover": ("cover.jpg", None),
        "slides": [
            ("a.jpg", "マンション・アパートの賃貸管理", "木更津周辺を中心に、オーナーと入居者の\n両方を支えています。"),
            ("b.jpg", "木更津物件ナビ", "ルームツアーを見れば、\n理想の部屋が必ず見つかります。"),
        ],
        "info": [
            ("エリア", "千葉県木更津市 周辺"),
            ("事業内容", "マンション・アパートの賃貸管理"),
            ("営業時間", "9:00〜18:00"),
            ("お問合せ", "0438-38-3295"),
            ("Webサイト", "yk-management.jp"),
            ("Instagram", "@yk_management_"),
        ],
    },
    "pegopa": {
        "name": "韓国料理ペゴパ",
        "lead": "市原で1番の、韓国料理屋さん。",
        "cover": ("cover.jpg", None),
        "slides": [
            ("a.jpg", "本場の方々が作っています", "ひと口で「あ、これ現地の味だ」と\n分かるはずです。"),
            ("b.jpg", "韓国の味が恋しくなったら", "絶対ここ。市原で、本場に出会えます。"),
        ],
        "info": [
            ("住所", "千葉県市原市君塚5-5-26"),
            ("事業内容", "韓国家庭料理"),
            ("ご予約", "0436-26-4288"),
            ("Webサイト", "pegopa-ichihara.com"),
            ("Instagram", "@pegopa.ichihara"),
        ],
    },
    "daiei": {
        "name": "株式会社大栄",
        "lead": "木更津の街を支える、看板・足場・鍛冶。",
        "cover": None,
        "slides": [
            (None, "看板施工", "店舗・商業施設・大型サインまで。\n見上げたあの看板も、この街のどこかに。"),
            (None, "足場工事・鍛冶工事", "ビル・マンション・プラントまで、\n安全第一の足場を迅速に構築します。"),
        ],
        "info": [
            ("エリア", "千葉県木更津市"),
            ("事業内容", "看板施工／足場工事／鍛冶工事"),
            ("営業時間", "8:00〜17:00"),
            ("お問合せ", "090-9977-5855"),
            ("Webサイト", "daiei-kisarazu.com"),
        ],
    },
    "yamanaka": {
        "name": "山中拓也",
        "lead": "海では漁師、陸ではホームページ制作。",
        "cover": None,
        "slides": [
            (None, "腕利きの漁師", "海に出れば、その日いちばんの魚を。\n木更津の海を知り尽くしています。"),
            (None, "ホームページ制作まで", "マルチな才能で地域を支える、\n頼れる存在です。"),
        ],
        "info": [
            ("ご協賛", "10月18日（日）木更津40人街コン"),
            ("ひとこと", "いつもありがとうございます"),
        ],
    },
    "marujin": {
        "name": "潮そばまる仁",
        "lead": "塩味ひとすじの、焼きそば専門店。",
        "cover": ("cover.jpg", None),
        "slides": [
            (None, "潮彩焼きそば", "地元・金田の海苔をまとった、\nご当地の塩焼きそばです。"),
            ("b.jpg", "夜は居酒屋", "塩ベースのあさりラーメンも。\n木更津の海の味が、ここにあります。"),
        ],
        "info": [
            ("住所", "千葉県木更津市金田東1-40-5"),
            ("事業内容", "塩味専門の焼きそば店／夜は居酒屋"),
            ("定休日", "月曜日・火曜日"),
            ("Instagram", "@siosoba_marujin"),
        ],
    },
    "tonic": {
        "name": "Tonic Diner",
        "lead": "ビリヤードもダーツも、唯一無二のBar。",
        "cover": ("cover.jpg", None),
        "slides": [],
        "info": [
            ("エリア", "千葉県袖ケ浦市今井"),
            ("事業内容", "レストランバー（ビリヤード・ダーツ）"),
            ("Instagram", "@tonic_diner"),
        ],
    },
}


def font(path, size, weight):
    f = ImageFont.truetype(path, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def center(d, text, f, y, fill):
    d.text(((W - d.textlength(text, font=f)) / 2, y), text, font=f, fill=fill)


def fit(d, text, path, weight, max_w, start, floor=22):
    """max_w に収まるまで小さくする"""
    size = start
    while size > floor:
        f = font(path, size, weight)
        if d.textlength(text, font=f) <= max_w:
            return f
        size -= 2
    return font(path, floor, weight)


def fill_crop(im, w, h, box=None):
    if box:
        l, t, r, b = box
        im = im.crop((int(im.width * l), int(im.height * t), int(im.width * r), int(im.height * b)))
    scale = max(w / im.width, h / im.height)
    im = im.resize((max(w, round(im.width * scale)), max(h, round(im.height * scale))), Image.LANCZOS)
    x, y = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


def paste_logo(img, d, y, dark=False):
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


def badge(d, y, dark=False):
    f = font(SANS, 27, 900)
    label = "協 賛 企 業 様 の ご 紹 介"
    bw = d.textlength(label, font=f) + 64
    d.rounded_rectangle((int((W - bw) // 2), y, int((W + bw) // 2), y + 62), radius=31, fill=ROSE500)
    center(d, label, f, y + 15, WHITE)
    return y + 62


def heart_rule(d, y, dark=False):
    """区切りの線とハート（サイトの見出しと同じ飾り）"""
    line = (255, 228, 230) if dark else (253, 164, 175)
    d.line((W / 2 - 120, y, W / 2 - 40, y), fill=line, width=3)
    d.line((W / 2 + 40, y, W / 2 + 120, y), fill=line, width=3)
    d.ellipse((W / 2 - 10, y - 10, W / 2 + 10, y + 10), fill=ROSE500)


def draw_name(d, cfg, cy, dark):
    """社名＋様を中央に。戻り値は本文を置くy"""
    if cfg.get("prefix"):
        center(d, cfg["prefix"], font(SERIF, 48, 700), cy - 70, ROSE100 if dark else ROSE500)
    name = cfg["name"]
    fb = fit(d, name, SERIF, 900, W - 300, 136, 44)
    fh = font(SANS, max(28, int(fb.size * 0.4)), 700)
    block = d.textlength(name, font=fb) + 26 + d.textlength("様", font=fh)
    x = (W - block) / 2
    d.text((x, cy), name, font=fb, fill=WHITE if dark else GRAY900)
    d.text((x + d.textlength(name, font=fb) + 26, cy + fb.size * 0.62), "様", font=fh,
           fill=ROSE100 if dark else GRAY600)
    return cy + fb.size + 46


def cover(cfg, src_dir, out):
    photo = cfg.get("cover")
    if photo:
        im = Image.open(os.path.join(src_dir, photo[0])).convert("RGB")
        img = fill_crop(im, W, H, photo[1])
        veil = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        vd = ImageDraw.Draw(veil)
        for i in range(H):
            top = max(0.0, 1 - i / 560) ** 1.4
            bottom = max(0.0, (i - (H - 540)) / 540) ** 1.4
            vd.line((0, i, W, i), fill=(10, 8, 12, min(118 + int(100 * top + 105 * bottom), 235)))
        img = Image.alpha_composite(img.convert("RGBA"), veil).convert("RGB")
        dark = True
    else:
        img = Image.new("RGB", (W, H), BG)
        dark = False
    d = ImageDraw.Draw(img, "RGBA")
    if not dark:
        decor(d)

    y = paste_logo(img, d, 64, dark) + 44
    y = badge(d, y, dark)
    if not photo:
        # 写真が無いぶん、飾りで間を持たせる
        heart_rule(d, y + 110)

    ty = draw_name(d, cfg, H // 2 - 80, dark)
    fl = fit(d, cfg["lead"], SANS, 500, W - 150, 36, 26)
    center(d, cfg["lead"], fl, ty, (250, 240, 240) if dark else GRAY600)
    if not photo:
        heart_rule(d, ty + 120)

    center(d, EVENT, font(SANS, 30, 700), H - 218, ROSE100 if dark else ROSE500)
    center(d, "ご協賛、誠にありがとうございます。", font(SANS, 27, 500),
           H - 168, (235, 225, 228) if dark else GRAY600)
    center(d, "スワイプでご紹介 →", font(SANS, 26, 700), H - 110, WHITE if dark else GRAY900)
    img.save(out, "JPEG", quality=92, optimize=True, progressive=True)


def slide(cfg, src_dir, i, out):
    file, title, body = cfg["slides"][i]
    num = f"{i + 2:02d}"
    if file:
        img = fill_crop(Image.open(os.path.join(src_dir, file)).convert("RGB"), W, H)
        d = ImageDraw.Draw(img, "RGBA")
        card_fill = WHITE + (242,)
    else:
        img = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(img, "RGBA")
        decor(d)
        # 写真が無いぶん、連番を大きく薄く置いて、下に飾りを入れる
        center(d, num, font(SERIF, 300, 900), 240, ROSE100)
        heart_rule(d, 700)
        card_fill = WHITE

    card_h = 300
    top = H - card_h - 56
    d.rounded_rectangle((56, top, W - 56, H - 56), radius=36, fill=card_fill)
    d.rounded_rectangle((56, top, W - 56, top + 12), radius=6, fill=ROSE500)
    d.rectangle((56, top + 6, W - 56, top + 12), fill=ROSE500)

    fnum = font(SANS, 26, 900)
    d.ellipse((96, top + 44, 152, top + 100), fill=ROSE500)
    d.text((96 + (56 - d.textlength(num, font=fnum)) / 2, top + 60), num, font=fnum, fill=WHITE)

    ft = fit(d, title, SERIF, 900, W - 290, 56, 34)
    d.text((176, top + 46 + (56 - ft.size) * 0.6), title, font=ft, fill=GRAY900)
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

    y = paste_logo(img, d, 72) + 52
    title = (cfg.get("prefix") or "") + cfg["name"]
    ft = fit(d, title, SERIF, 900, W - 150, 62, 34)
    center(d, title, ft, y, GRAY900)
    y += ft.size + 26
    center(d, "様", font(SANS, 32, 700), y, GRAY600)
    y += 66
    d.line((W / 2 - 120, y, W / 2 - 40, y), fill=(253, 164, 175), width=3)
    d.line((W / 2 + 40, y, W / 2 + 120, y), fill=(253, 164, 175), width=3)
    d.ellipse((W / 2 - 10, y - 10, W / 2 + 10, y + 10), fill=ROSE500)
    y += 52

    rows = cfg["info"]
    row_h = 84 if len(rows) > 4 else 92
    card_h = len(rows) * row_h + 52
    d.rounded_rectangle((PAD, y, W - PAD, y + card_h), radius=32, fill=WHITE)
    fk = font(SANS, 24, 700)
    ry = y + 34
    for k, v in rows:
        d.text((PAD + 40, ry + 6), k, font=fk, fill=ROSE500)
        fv = fit(d, v, SANS, 500, W - PAD * 2 - 270, 31, 20)
        d.text((PAD + 228, ry), v, font=fv, fill=GRAY900)
        ry += row_h
    y += card_h + 56

    center(d, EVENT, font(SANS, 31, 700), y, GRAY900)
    center(d, "にご協賛いただきました。", font(SANS, 27, 500), y + 50, GRAY600)
    center(d, "誠にありがとうございます。", font(SANS, 27, 500), y + 94, GRAY600)

    fs = font(SANS, 30, 700)
    center(d, "kazusacon.com", fs, H - PAD - fs.size, GRAY900)
    img.save(out, "JPEG", quality=92, optimize=True, progressive=True)


def build(slug):
    cfg = POSTS[slug]
    base = os.path.join(ROOT, "design", "sns", "posts", slug)
    src_dir = os.path.join(base, "src")
    os.makedirs(base, exist_ok=True)
    # 古い書き出しが残らないよう、先に消す
    for old in glob.glob(os.path.join(base, "0*.jpg")):
        os.remove(old)
    cover(cfg, src_dir, os.path.join(base, "01.jpg"))
    n = len(cfg["slides"])
    for i in range(n):
        slide(cfg, src_dir, i, os.path.join(base, f"{i + 2:02d}.jpg"))
    info(cfg, os.path.join(base, f"{n + 2:02d}.jpg"))
    print("generated", slug, f"({n + 2} images) -> design/sns/posts/" + slug)


def main():
    targets = sys.argv[1:] or list(POSTS)
    for slug in targets:
        build(slug)


if __name__ == "__main__":
    main()
