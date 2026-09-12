# 木更津街コン LP を Claude Design のアートボード（Main.dc.html）として生成する。
# 値は src/pages/home/components/*.tsx の Tailwind クラスから写している（Tailwind v3 の既定値）。
# 変更したら:  python3 design/build_main.py  で Main.dc.html を再生成する。
import io

# ---- Tailwind palette ----
C = {
    "gray50": "#f9fafb", "gray100": "#f3f4f6", "gray200": "#e5e7eb", "gray300": "#d1d5db",
    "gray400": "#9ca3af", "gray500": "#6b7280", "gray600": "#4b5563", "gray700": "#374151",
    "gray800": "#1f2937", "gray900": "#111827",
    "rose50": "#fff1f2", "rose100": "#ffe4e6", "rose200": "#fecdd3", "rose300": "#fda4af",
    "rose400": "#fb7185", "rose500": "#f43f5e", "rose600": "#e11d48", "rose950": "#4c0519",
    "amber50": "#fffbeb", "amber400": "#fbbf24", "amber500": "#f59e0b",
    "pink50": "#fdf2f8", "pink400": "#f472b6",
    "purple50": "#faf5ff", "purple400": "#c084fc", "purple600": "#9333ea",
    "emerald50": "#ecfdf5", "emerald500": "#10b981",
    "sky50": "#f0f9ff", "sky500": "#0ea5e9",
    "yellow400": "#facc15",
    "line": "#06C755",
}
SANS = "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif"
SERIF = "'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif"

# ---- Icons (Remix Icon の代替。24px グリッドの stroke SVG) ----
ICON_PATHS = {
    "heart-fill": '<path d="M12 21s-7.5-4.6-9.5-9.2C1 8 3.4 4.5 7 4.5c2 0 3.6 1.1 5 2.7 1.4-1.6 3-2.7 5-2.7 3.6 0 6 3.5 4.5 7.3C19.5 16.4 12 21 12 21z" fill="currentColor" stroke="none"/>',
    "heart": '<path d="M12 21s-7.5-4.6-9.5-9.2C1 8 3.4 4.5 7 4.5c2 0 3.6 1.1 5 2.7 1.4-1.6 3-2.7 5-2.7 3.6 0 6 3.5 4.5 7.3C19.5 16.4 12 21 12 21z"/>',
    "check-circle-fill": '<circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff"/>',
    "calendar": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    "calendar-check": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4"/>',
    "chat-smile": '<path d="M12 3C7 3 3 6.6 3 11c0 2.2 1 4.2 2.7 5.6L5 21l4.3-1.6c.9.2 1.8.4 2.7.4 5 0 9-3.6 9-8s-4-8-9-8z"/><path d="M9 12.5c.8 1 1.8 1.5 3 1.5s2.2-.5 3-1.5"/>',
    "chat-3": '<path d="M12 3C7 3 3 6.6 3 11c0 2.2 1 4.2 2.7 5.6L5 21l4.3-1.6c.9.2 1.8.4 2.7.4 5 0 9-3.6 9-8s-4-8-9-8z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/>',
    "arrow-down": '<path d="M12 4v16M5 13l7 7 7-7"/>',
    "arrow-right": '<path d="M4 12h16M13 5l7 7-7 7"/>',
    "alarm": '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M5 4L2 7M19 4l3 3"/>',
    "alarm-fill": '<circle cx="12" cy="13" r="8" fill="currentColor" stroke="none"/><path d="M12 9v4l2.5 2" stroke="#fff"/><path d="M5 4L2 7M19 4l3 3"/>',
    "map-pin": '<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    "map-2": '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z"/><path d="M9 4v14M15 6v14"/>',
    "user": '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
    "user-heart": '<circle cx="10" cy="8" r="4"/><path d="M3 21c0-4 3.1-7 7-7 1 0 2 .2 2.8.5"/><path d="M18.5 21s-3.5-2.2-3.5-4.7c0-1.3 1-2.3 2.1-2.3.6 0 1.1.3 1.4.8.3-.5.8-.8 1.4-.8 1.2 0 2.1 1 2.1 2.3 0 2.5-3.5 4.7-3.5 4.7z"/>',
    "user-unfollow": '<circle cx="10" cy="8" r="4"/><path d="M3 21c0-4 3.1-7 7-7 1.2 0 2.3.3 3.3.7M16 16l5 5M21 16l-5 5"/>',
    "group": '<circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M16 14.5c3 0 6 2 6 5.5"/>',
    "team": '<circle cx="12" cy="7" r="3.5"/><circle cx="5" cy="10" r="2.5"/><circle cx="19" cy="10" r="2.5"/><path d="M6 21c0-3.5 2.7-6 6-6s6 2.5 6 6M1 19c0-2.5 1.8-4 4-4M23 19c0-2.5-1.8-4-4-4"/>',
    "shield-check": '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-4.5"/>',
    "lock": '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    "smartphone": '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    "heart-2": '<path d="M12 21s-7.5-4.6-9.5-9.2C1 8 3.4 4.5 7 4.5c2 0 3.6 1.1 5 2.7 1.4-1.6 3-2.7 5-2.7 3.6 0 6 3.5 4.5 7.3C19.5 16.4 12 21 12 21z"/><path d="M8 10.5c0-1.5 1-2.5 2.5-2.5"/>',
    "emotion-unhappy": '<circle cx="12" cy="12" r="9"/><path d="M8.5 9.5h.01M15.5 9.5h.01M8.5 16c1-1.3 2.2-2 3.5-2s2.5.7 3.5 2"/>',
    "refresh": '<path d="M4 12a8 8 0 0 1 14-5.3L20 8M20 4v4h-4M20 12a8 8 0 0 1-14 5.3L4 16M4 20v-4h4"/>',
    "restaurant": '<path d="M7 3v18M4 3v6a3 3 0 0 0 6 0V3M17 3c-2 0-3 3-3 6s1 4 3 4v8"/>',
    "mic": '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
    "door-open": '<path d="M13 4l-8 2v12l8 2V4zM13 5h6v14h-6M10 12h.01"/>',
    "gamepad": '<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 11v4M5 13h4M15 12h.01M18 14h.01"/>',
    "time": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "coin": '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5h5M9.5 12h5M12 7v10"/>',
    "quote": '<path d="M9 7c-3 0-5 2-5 5v5h5v-5H6.5c0-1.5 1-2.5 2.5-2.5V7zM19 7c-3 0-5 2-5 5v5h5v-5h-2.5c0-1.5 1-2.5 2.5-2.5V7z" fill="currentColor" stroke="none"/>',
    "instagram": '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    "mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    "menu": '<path d="M4 7h16M4 12h16M4 17h16"/>',
}

def icon(name, size=16, color="currentColor", extra=""):
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" '
            f'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" '
            f'style="flex-shrink: 0; display: block;{extra}">{ICON_PATHS[name]}</svg>')

def flex(children, extra="", direction="row", gap=0, align="", justify="", tag="div"):
    s = f"display: flex; flex-direction: {direction}; gap: {gap}px;"
    if align: s += f" align-items: {align};"
    if justify: s += f" justify-content: {justify};"
    return f'<{tag} style="{s} {extra}">{children}</{tag}>'

def label(text, color=C["rose500"]):
    # text-rose-500 font-semibold text-sm mb-2 tracking-widest uppercase
    return (f'<p style="margin: 0 0 8px 0; color: {color}; font-weight: 600; font-size: 14px; '
            f'line-height: 20px; letter-spacing: 0.1em; text-transform: uppercase;">{text}</p>')

def h2(text, extra="margin: 0;", color=C["gray900"]):
    # text-4xl font-black, Noto Serif JP
    return (f'<h2 style="{extra} font-family: {SERIF}; font-size: 36px; line-height: 40px; '
            f'font-weight: 900; color: {color};">{text}</h2>')

def btn(text, bg, fg, icon_name=None, px=24, py=14, radius=9999, size=14, extra=""):
    ic = icon(icon_name, 16) if icon_name else ""
    return (f'<a href="#" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; '
            f'background: {bg}; color: {fg}; font-weight: 700; font-size: {size}px; line-height: 20px; '
            f'padding: {py}px {px}px; border-radius: {radius}px; text-decoration: none; white-space: nowrap; {extra}">'
            f'{ic}<span>{text}</span></a>')

def container(children, extra=""):
    # max-w-7xl mx-auto px-12
    return f'<div style="max-width: 1280px; margin: 0 auto; padding: 0 48px; {extra}">{children}</div>'

# ================= Sections =================

def navbar():
    items = ["イベント一覧", "イベントの雰囲気", "実績", "安心ポイント", "魅力"]
    nav = "".join(
        f'<a href="#" style="color: rgba(255,255,255,0.9); font-size: 14px; line-height: 20px; font-weight: 500; text-decoration: none; white-space: nowrap;">{t}</a>'
        for t in items)
    return f'''
<header style="position: absolute; top: 0; left: 0; right: 0; z-index: 40;">
  <div style="max-width: 1280px; margin: 0 auto; padding: 0 48px; height: 64px; display: flex; align-items: center; justify-content: space-between;">
    <a href="#" style="display: flex; align-items: center; gap: 8px;"><img src="logo.png" alt="木更津街コン" style="height: 36px; width: auto; object-fit: contain; display: block;"></a>
    <nav style="display: flex; align-items: center; gap: 24px;">{nav}</nav>
    <div style="display: flex; align-items: center; gap: 12px;">{btn("公式LINEから申し込む", C["rose500"], "#fff", px=20, py=8)}</div>
  </div>
</header>'''

def hero():
    checks = "".join(
        f'<li style="display: flex; align-items: flex-start; gap: 8px; color: #fff; font-size: 14px; line-height: 20px;">'
        f'{icon("check-circle-fill", 14, C["rose400"], " margin-top: 3px;")}<span>{t}</span></li>'
        for t in ["「職場と家の往復で、出会いがない」", "「マッチングアプリに疲れた」", "「地元で自然な出会いがしたい」"])
    return f'''
<section style="position: relative; min-height: 900px; display: flex; align-items: center; overflow: hidden; background: #111;">
  <div style="position: absolute; inset: 0;">
    <img src="hero.jpg" alt="木更津街コン" style="width: 100%; height: 100%; object-fit: cover; object-position: top; display: block;">
    <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.2));"></div>
  </div>
  <div style="position: relative; z-index: 10; width: 100%; max-width: 1280px; margin: 0 auto; padding: 96px 48px;">
    <div style="max-width: 576px;">
      <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(244,63,94,0.9); color: #fff; font-size: 14px; line-height: 20px; font-weight: 500; padding: 6px 16px; border-radius: 9999px; margin-bottom: 24px;">{icon("heart-fill", 12)}<span>累計カップル14組誕生</span></div>
      <h1 style="margin: 0 0 16px 0; font-family: {SERIF}; font-size: 60px; line-height: 1.25; font-weight: 900; color: #fff;">ここにしかない<br>出会い。</h1>
      <p style="margin: 0 0 24px 0; font-size: 20px; line-height: 28px; color: rgba(255,255,255,0.9); font-weight: 500;">木更津で、自然に恋が始まる街コン</p>
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.2); border-radius: 16px; padding: 20px; margin-bottom: 32px;">
        <p style="margin: 0 0 12px 0; color: rgba(255,255,255,0.8); font-size: 14px; line-height: 20px; font-weight: 500;">こんな気持ち、ありませんか？</p>
        <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px;">{checks}</ul>
        <p style="margin: 12px 0 0 0; color: #fff; font-weight: 600; font-size: 14px; line-height: 20px;">そんな方のための街コンです。</p>
      </div>
      <div style="display: flex; flex-direction: row; gap: 12px;">
        {btn("募集中イベントを見る", "#fff", C["gray900"], "calendar")}
        {btn("公式LINEから申し込む", C["line"], "#fff", "chat-smile")}
        {btn("LINEで空席確認", C["line"], "#fff", "chat-smile")}
      </div>
    </div>
  </div>
  <div style="position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 4px; color: rgba(255,255,255,0.6);">
    <span style="font-size: 12px; line-height: 16px;">スクロール</span>{icon("arrow-down", 16)}
  </div>
</section>'''

EVENTS = [
    dict(date="10月18日", dow="日", time="13:00〜16:00", title="木更津40人街コン", venue="Y's Table",
         address="木更津市富士見1丁目12-32", age="20〜49歳", male="12,000円", female="2,000円", ms=0, ms_status="抽選", fs=5, tag="受付中"),
    dict(date="1月某日", dow="日", time="13:00〜16:00", title="木更津40人街コン", venue="Y's Table",
         address="木更津市富士見1丁目12-32", age="20〜49歳", male="12,000円", female="2,000円", ms=20, fs=20, tag="受付中"),
]
PAST = [
    ("2025年10月1日", "木更津街コン vol.1", "Y's Table", 38, 5, "初開催にもかかわらず好評！参加者からは「自然に話せた」との声多数。"),
    ("2026年1月18日", "木更津街コン vol.2", "Y's Table", 40, 2, "女性枠は開催2週間前に満席。リピーター参加者も増え、賑やかな雰囲気に。"),
    ("2026年3月29日", "木更津街コン vol.3", "Y's Table", 39, 3, "春開催で雰囲気も抜群。「また参加したい」リピーター続出。"),
    ("2026年5月31日", "木更津街コン vol.4", "Y's Table", 37, 4, "GW明けの開催で盛り上がり最高。4組のカップルが誕生しました！"),
    ("2026年8月2日", "木更津街コン vol.5", "Y's Table", 37, 4, "夏祭り前で夏祭りのお約束をするカップルも！それ以外にもアフターパーティーでも更に追加カップリングも！"),
]

def seat(label_, n, status=None):
    head = f'<div style="text-align: center;"><p style="margin: 0 0 4px 0; font-size: 12px; line-height: 16px; color: {C["gray500"]};">{label_}</p>'
    if status:  # 抽選など、残席数の代わりの文言
        return (head + f'<p style="margin: 0; font-size: 24px; line-height: 32px; font-weight: 900; color: {C["amber500"]};">{status}</p>'
                f'<p style="margin: 2px 0 0 0; font-size: 12px; line-height: 16px; color: {C["gray500"]};">※応募可能</p></div>')
    color = C["rose500"] if n <= 5 else C["emerald500"]
    return head + f'<p style="margin: 0; font-size: 24px; line-height: 32px; font-weight: 900; color: {color};">残り{n}名</p></div>'

def event_card(e):
    return f'''
<div style="border: 1px solid {C["gray200"]}; border-radius: 16px; overflow: hidden; background: #fff;">
  <div style="background: {C["gray900"]}; padding: 12px 20px; display: flex; align-items: center; justify-content: space-between;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="text-align: center;"><p style="margin: 0; color: #fff; font-weight: 900; font-size: 20px; line-height: 1;">{e["date"]}</p><p style="margin: 2px 0 0 0; color: rgba(255,255,255,0.6); font-size: 12px; line-height: 16px;">({e["dow"]})</p></div>
      <div style="width: 1px; height: 32px; background: rgba(255,255,255,0.2);"></div>
      <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 14px; line-height: 20px;">{e["time"]}</p>
    </div>
    <span style="background: {C["rose500"]}; color: #fff; font-size: 12px; line-height: 16px; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">{e["tag"]}</span>
  </div>
  <div style="padding: 20px;">
    <h3 style="margin: 0 0 4px 0; font-size: 18px; line-height: 28px; font-weight: 900; color: {C["gray900"]};">{e["title"]}</h3>
    <div style="margin-bottom: 16px;">
      <div style="display: flex; align-items: flex-start; gap: 6px; color: {C["gray500"]}; font-size: 14px; line-height: 20px; margin-bottom: 4px;">
        {icon("map-pin", 14, C["rose400"], " margin-top: 3px;")}
        <div><span style="font-weight: 500; color: {C["gray700"]};">{e["venue"]}</span><span style="margin-left: 8px; color: {C["gray400"]};">{e["address"]}</span></div>
      </div>
      <a href="#" style="display: inline-flex; align-items: center; gap: 4px; font-size: 12px; line-height: 16px; color: {C["rose500"]}; font-weight: 500; margin: 4px 0 0 20px; text-decoration: none;">{icon("map-2", 12)}<span>Googleマップで見る</span></a>
    </div>
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-bottom: 16px; font-size: 14px; line-height: 20px; color: {C["gray600"]};">
      <div style="display: flex; align-items: center; gap: 6px;">{icon("user", 14, C["gray400"])}<span>{e["age"]}</span></div>
      <div style="display: flex; align-items: center; gap: 6px;">{icon("coin", 14, C["gray400"])}<span>男{e["male"]} / 女{e["female"]}</span></div>
    </div>
    <div style="background: {C["gray50"]}; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
      <p style="margin: 0 0 12px 0; font-size: 12px; line-height: 16px; color: {C["gray500"]}; font-weight: 500;">開催状況</p>
      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px;">{seat("男性", e["ms"], e.get("ms_status"))}{seat("女性", e["fs"], e.get("fs_status"))}</div>
    </div>
    <div style="display: flex; gap: 8px;">
      {btn("公式LINEから申し込む", C["gray900"], "#fff", py=10, radius=12, extra="flex: 1;")}
      {btn("LINE確認", C["line"], "#fff", "chat-smile", px=16, py=10, radius=12)}
    </div>
  </div>
</div>'''

def events():
    cards = "".join(event_card(e) for e in EVENTS)
    return f'''
<section style="padding: 80px 0; background: #fff;">
  {container(f"""
    <div style="display: flex; flex-direction: row; align-items: flex-end; justify-content: space-between; margin-bottom: 40px; gap: 16px;">
      <div>{label("Events")}{h2("募集中のイベント")}</div>
      <div style="display: flex; align-items: center; gap: 8px; color: {C["rose500"]}; background: {C["rose50"]}; padding: 8px 16px; border-radius: 9999px;">{icon("alarm", 16)}<span style="font-size: 14px; line-height: 20px; font-weight: 500;">人気日程はすぐ埋まります</span></div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px;">{cards}</div>
    <div style="margin-top: 40px; background: {C["rose50"]}; border: 1px solid {C["rose100"]}; border-radius: 16px; padding: 24px; display: flex; flex-direction: row; align-items: center; gap: 16px;">
      <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: {C["rose100"]}; border-radius: 9999px; flex-shrink: 0;">{icon("alarm-fill", 20, C["rose500"])}</div>
      <div style="flex: 1;">
        <p style="margin: 0 0 4px 0; font-weight: 700; color: {C["gray900"]}; font-size: 16px; line-height: 24px;">人気日程はすぐ埋まります</p>
        <p style="margin: 0; color: {C["gray600"]}; font-size: 14px; line-height: 20px;">特に<strong style="color: {C["rose500"]};">女性枠は早く満席</strong>になる傾向があります。参加をご検討の方はお早めにお申し込みください。</p>
      </div>
      {btn("公式LINEから申し込む", C["rose500"], "#fff", py=12, extra="flex-shrink: 0;")}
    </div>
  """)}
</section>'''

def stat_box(n, t):
    return (f'<div style="background: #fff; border-radius: 16px; padding: 20px; text-align: center; border: 1px solid {C["gray100"]};">'
            f'<p style="margin: 0 0 4px 0; font-size: 36px; line-height: 40px; font-weight: 900; color: {C["rose500"]};">{n}</p>'
            f'<p style="margin: 0; font-size: 12px; line-height: 16px; color: {C["gray500"]}; font-weight: 500;">{t}</p></div>')

def past_row(date, title, venue, n, c, comment):
    return f'''
<div style="background: #fff; border-radius: 16px; border: 1px solid {C["gray100"]}; padding: 20px; display: flex; flex-direction: row; align-items: center; gap: 16px;">
  <div style="flex-shrink: 0; width: 192px;">
    <p style="margin: 0 0 2px 0; font-size: 12px; line-height: 16px; color: {C["gray400"]};">{date}</p>
    <p style="margin: 0; font-weight: 700; color: {C["gray900"]}; font-size: 14px; line-height: 20px;">{title}</p>
    <p style="margin: 2px 0 0 0; font-size: 12px; line-height: 16px; color: {C["gray500"]};">{venue}</p>
  </div>
  <div style="width: 1px; height: 48px; background: {C["gray100"]}; flex-shrink: 0;"></div>
  <div style="display: flex; align-items: center; gap: 24px; flex-shrink: 0;">
    <div style="text-align: center;"><p style="margin: 0; font-size: 24px; line-height: 32px; font-weight: 900; color: {C["gray800"]};">{n}<span style="font-size: 14px; font-weight: 400; color: {C["gray400"]}; margin-left: 2px;">名</span></p><p style="margin: 0; font-size: 12px; line-height: 16px; color: {C["gray400"]};">参加者</p></div>
    <div style="text-align: center;"><p style="margin: 0; font-size: 24px; line-height: 32px; font-weight: 900; color: {C["rose500"]};">{c}<span style="font-size: 14px; font-weight: 400; color: {C["rose300"]}; margin-left: 2px;">組</span></p><p style="margin: 0; font-size: 12px; line-height: 16px; color: {C["gray400"]};">カップル誕生</p></div>
  </div>
  <div style="width: 1px; height: 48px; background: {C["gray100"]}; flex-shrink: 0;"></div>
  <p style="margin: 0; font-size: 14px; line-height: 1.625; color: {C["gray600"]}; flex: 1; display: flex; align-items: flex-start; gap: 4px;">{icon("quote", 14, C["rose200"], " margin-top: 4px;")}<span>{comment}</span></p>
</div>'''

def past_events():
    rows = "".join(past_row(*p) for p in PAST)
    return f'''
<section style="padding: 80px 0; background: #fafaf9;">
  {container(f"""
    <div style="margin-bottom: 40px;">{label("Track Record")}{h2("過去の開催実績")}<p style="margin: 12px 0 0 0; color: {C["gray500"]}; font-size: 14px; line-height: 20px;">これまでに開催したイベントの記録です。</p></div>
    <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 40px;">{stat_box("5", "開催回数")}{stat_box("191", "累計参加者数")}{stat_box("18", "累計カップル誕生")}</div>
    <div style="display: flex; flex-direction: column; gap: 16px;">{rows}</div>
  """)}
</section>'''

IG_POSTS = [
    ("木更津街コンvol.4の様子。みんな楽しそうに過ごしてくれて嬉しい！", "2026.05.31"),
    ("今回のイベント料理も最高でした。お腹いっぱい、笑顔いっぱい。", "2026.03.29"),
    ("街コン後の二次会も盛り上がりました。友達も恋人も見つかる場所。", "2026.01.18"),
]

def ig_card(caption, date):
    # 本番は Instagram の埋め込み（外部読み込み）。キャンバス上では写真枠のプレースホルダーにしている
    return f'''
<div style="border: 1px solid {C["gray200"]}; border-radius: 12px; overflow: hidden; background: #fff;">
  <div style="display: flex; align-items: center; gap: 10px; padding: 12px 14px;">
    <div style="width: 32px; height: 32px; border-radius: 9999px; background: linear-gradient(to top right, {C["yellow400"]}, {C["rose500"]}, {C["purple600"]});"></div>
    <div><p style="margin: 0; font-size: 13px; line-height: 16px; font-weight: 700; color: {C["gray900"]};">kazusacon</p><p style="margin: 0; font-size: 11px; line-height: 14px; color: {C["gray500"]};">{date}</p></div>
  </div>
  <div style="aspect-ratio: 1 / 1; background: {C["gray100"]}; display: flex; align-items: center; justify-content: center; color: {C["gray400"]}; font-size: 12px; line-height: 16px;">[Instagram の投稿写真がここに入ります]</div>
  <div style="padding: 12px 14px;">
    <p style="margin: 0; font-size: 13px; line-height: 1.6; color: {C["gray700"]};">{caption}</p>
    <a href="#" style="display: inline-block; margin-top: 8px; font-size: 12px; line-height: 16px; color: {C["gray500"]}; text-decoration: none;">Instagramでこの投稿を見る</a>
  </div>
</div>'''

def instagram():
    cards = "".join(ig_card(*p) for p in IG_POSTS)
    return f'''
<section style="padding: 80px 0; background: #fff;">
  {container(f"""
    <div style="text-align: center; margin-bottom: 40px;">
      <div style="display: inline-flex; align-items: center; gap: 8px; color: {C["rose500"]}; font-weight: 600; font-size: 14px; line-height: 20px; margin-bottom: 8px; letter-spacing: 0.1em; text-transform: uppercase;">{icon("instagram", 18)}<span>Instagram</span></div>
      {h2("イベントの雰囲気", "margin: 0 0 12px 0;")}
      <p style="margin: 0; color: {C["gray500"]}; font-size: 14px; line-height: 20px;">過去の開催の様子をお届けします。</p>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 32px;">
      <div style="width: 48px; height: 48px; border-radius: 9999px; background: linear-gradient(to top right, {C["yellow400"]}, {C["rose500"]}, {C["purple600"]}); padding: 2px;"><div style="width: 100%; height: 100%; border-radius: 9999px; background: #fff; display: flex; align-items: center; justify-content: center;">{icon("instagram", 20, C["gray900"])}</div></div>
      <div style="text-align: left;"><p style="margin: 0; font-weight: 700; color: {C["gray900"]}; font-size: 14px; line-height: 20px;">@kazusacon</p><p style="margin: 0; font-size: 12px; line-height: 16px; color: {C["gray500"]};">木更津街コン 公式</p></div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px;">{cards}</div>
    <div style="text-align: center; margin-top: 40px;">{btn("Instagramでフォローする", C["gray900"], "#fff", "instagram", px=32)}</div>
  """)}
</section>'''

def result_stat(t, n, u):
    return (f'<div style="text-align: center;"><p style="margin: 0 0 4px 0; color: rgba(255,255,255,0.6); font-size: 14px; line-height: 20px;">{t}</p>'
            f'<p style="margin: 0; font-size: 128px; line-height: 1; font-weight: 900; color: #fff;">{n}</p>'
            f'<p style="margin: 4px 0 0 0; color: {C["rose400"]}; font-size: 24px; line-height: 32px; font-weight: 900;">{u}</p></div>')

def results():
    div = '<div style="width: 1px; height: 96px; background: rgba(255,255,255,0.2);"></div>'
    stats = div.join([result_stat("開催回数", "5", "回開催"), result_stat("累計参加者", "191", "名参加"),
                      result_stat("累計カップル", "18", "組誕生"), result_stat("1人参加率", "70", "%以上")])
    return f'''
<section style="padding: 80px 0; background: {C["gray900"]}; color: #fff; position: relative; overflow: hidden;">
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 600px; border-radius: 9999px; background: rgba(255,255,255,0.05); pointer-events: none;"></div>
  <div style="position: relative; z-index: 10; max-width: 1280px; margin: 0 auto; padding: 0 48px;">
    <div style="text-align: center; margin-bottom: 64px;">
      {label("Results", C["rose400"])}
      {h2("実際に出会いは生まれています", "margin: 0 0 40px 0;", "#fff")}
      <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 64px;">{stats}</div>
    </div>
    <div style="text-align: center;">{btn("公式LINEから申し込む", C["line"], "#fff", "chat-smile", px=40, py=16, size=18)}</div>
  </div>
</section>'''

WORRIES = [
    ("user-unfollow", "出会いがない", "職場と家の往復で、新しい人と出会う機会がない", C["rose400"], C["rose50"]),
    ("smartphone", "アプリが続かない", "マッチングアプリに疲れた。メッセージのやり取りが苦手", C["amber400"], C["amber50"]),
    ("heart-2", "自然な出会いがしたい", "顔を見て、話して、自然に仲良くなりたい", C["pink400"], C["pink50"]),
    ("emotion-unhappy", "1人参加が不安", "友達と来る人ばかりで、1人だと浮いてしまいそう", C["purple400"], C["purple50"]),
]

def empathy():
    cards = "".join(
        f'<div style="background: {bg}; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; align-items: center; text-align: center;">'
        f'<div style="width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 9999px; background: #fff; margin-bottom: 16px;">{icon(ic, 24, col)}</div>'
        f'<h3 style="margin: 0 0 8px 0; font-size: 18px; line-height: 28px; font-weight: 900; color: {C["gray900"]};">{t}</h3>'
        f'<p style="margin: 0; color: {C["gray600"]}; font-size: 14px; line-height: 1.625;">{d}</p></div>'
        for ic, t, d, col, bg in WORRIES)
    return f'''
<section style="padding: 80px 0; background: {C["gray50"]};">
  {container(f"""
    <div style="text-align: center; margin-bottom: 56px;">{label("Empathy")}{h2("こんな悩みありませんか？")}</div>
    <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; margin-bottom: 48px;">{cards}</div>
    <div style="text-align: center;"><div style="display: inline-flex; align-items: center; gap: 16px;">
      <div style="width: 64px; height: 1px; background: {C["rose300"]};"></div>
      <p style="margin: 0; font-family: {SERIF}; font-size: 20px; line-height: 28px; font-weight: 900; color: {C["gray900"]};">そんな方に<span style="color: {C["rose500"]};">選ばれています</span></p>
      <div style="width: 64px; height: 1px; background: {C["rose300"]};"></div>
    </div></div>
  """)}
</section>'''

POINTS = [
    ("user-heart", "1人参加多数", "参加者の約7割が1人参加。初めての方でも安心してご参加いただけます。"),
    ("shield-check", "スタッフサポート", "経験豊富なスタッフが当日全力でサポート。困ったことがあればすぐに相談できます。"),
    ("group", "男女比調整", "男女比が偏らないよう事前に調整。当日は均等な比率でご参加いただけます。"),
    ("calendar-check", "年齢制限あり", "各イベントに年齢制限を設けています。同世代の方と自然に出会えます。"),
    ("lock", "無理な連絡先交換なし", "連絡先の交換は強制ではありません。気が合った方とだけ、自然に交換できます。"),
]

def safety():
    pts = "".join(
        f'<div style="display: flex; align-items: flex-start; gap: 16px; background: rgba(255,241,242,0.6); border-radius: 16px; padding: 20px;">'
        f'<div style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: {C["rose500"]}; border-radius: 12px; flex-shrink: 0;">{icon(ic, 18, "#fff")}</div>'
        f'<div><h3 style="margin: 0 0 4px 0; font-weight: 900; color: {C["gray900"]}; font-size: 16px; line-height: 24px;">{t}</h3>'
        f'<p style="margin: 0; color: {C["gray600"]}; font-size: 14px; line-height: 1.625;">{d}</p></div></div>'
        for ic, t, d in POINTS)
    return f'''
<section style="padding: 80px 0; background: #fff;">
  {container(f"""
    <div style="display: flex; flex-direction: row; gap: 48px; align-items: center;">
      <div style="width: 40%; flex-shrink: 0;">
        {label("Safety")}
        {h2("初めてでも<br>安心して<br>参加できます", "margin: 0 0 16px 0; line-height: 1.25;")}
        <p style="margin: 0 0 32px 0; color: {C["gray500"]}; font-size: 16px; line-height: 1.625;">「街コンって怪しくない？」そんな不安を持つ方も多いと思います。私たちは安心・安全な出会いの場を提供するために、様々な取り組みをしています。</p>
        {btn("LINEで相談する", C["line"], "#fff", "chat-smile", px=28, size=16)}
        <div style="margin-top: 32px; border-radius: 16px; overflow: hidden;"><img src="safety.jpg" alt="スタッフサポート" style="width: 100%; height: 192px; object-fit: cover; object-position: top; display: block;"></div>
      </div>
      <div style="width: 60%; display: flex; flex-direction: column; gap: 16px;">{pts}</div>
    </div>
  """)}
</section>'''

CHARMS = [
    ("refresh", "席替えあり", "時間ごとに席を移動するので、多くの方と自然に話せます。気になる人と話す機会が必ず生まれます。", C["rose500"], C["rose50"]),
    ("team", "少人数で話せる", "大人数の合コンと違い、少人数グループで会話。じっくり相手のことを知れます。", C["amber500"], C["amber50"]),
    ("restaurant", "飲食あり", "美味しい食事とドリンクで場の雰囲気が自然と和みます。食事を通じて会話が弾みます。", C["emerald500"], C["emerald50"]),
    ("mic", "進行あり", "スタッフが会話のきっかけを作るゲームや進行を担当。「何を話せばいいか分からない」を解消します。", C["sky500"], C["sky50"]),
]
FLOW = [("01", "受付・着席", "door-open"), ("02", "フリートーク", "chat-3"), ("03", "ゲーム実施", "gamepad"),
        ("04", "席替え×4回", "refresh"), ("05", "フリータイム", "time"), ("06", "お開き", "heart")]

def charm():
    cards = "".join(
        f'<div style="background: #fff; border-radius: 16px; overflow: hidden;"><div style="background: {acc}; height: 6px; width: 100%;"></div>'
        f'<div style="padding: 24px;"><div style="width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: {lb}; border-radius: 16px; margin-bottom: 16px;">{icon(ic, 24, acc)}</div>'
        f'<h3 style="margin: 0 0 8px 0; font-size: 18px; line-height: 28px; font-weight: 900; color: {C["gray900"]};">{t}</h3>'
        f'<p style="margin: 0; color: {C["gray500"]}; font-size: 14px; line-height: 1.625;">{d}</p></div></div>'
        for ic, t, d, acc, lb in CHARMS)
    steps = []
    for i, (n, l, ic) in enumerate(FLOW):
        steps.append(f'<div style="display: flex; flex-direction: column; align-items: center; text-align: center; width: 96px;">'
                     f'<div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: {C["gray900"]}; border-radius: 9999px; margin-bottom: 8px;">{icon(ic, 16, "#fff")}</div>'
                     f'<p style="margin: 0 0 2px 0; font-size: 12px; line-height: 16px; color: {C["rose500"]}; font-weight: 700;">{n}</p>'
                     f'<p style="margin: 0; font-size: 12px; line-height: 16px; font-weight: 700; color: {C["gray700"]};">{l}</p></div>')
        if i < len(FLOW) - 1:
            steps.append(icon("arrow-right", 20, C["gray300"], " margin: 0 4px;"))
    return f'''
<section style="padding: 80px 0; background: rgba(255,251,235,0.4);">
  {container(f"""
    <div style="text-align: center; margin-bottom: 56px;">
      {label("Features")}
      {h2("自然に会話が生まれる仕組み", "margin: 0 0 16px 0;")}
      <p style="margin: 0 auto; max-width: 576px; color: {C["gray500"]}; font-size: 14px; line-height: 1.625;">「何を話せばいいか分からない」「緊張してしまう」そんな方でも大丈夫。自然に会話が生まれる工夫が随所に詰まっています。</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px;">{cards}</div>
    <div style="margin-top: 64px;">
      <h3 style="margin: 0 0 32px 0; text-align: center; font-family: {SERIF}; font-size: 20px; line-height: 28px; font-weight: 900; color: {C["gray900"]};">当日の流れ</h3>
      <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 0;">{"".join(steps)}</div>
    </div>
  """)}
</section>'''

def footer():
    def link(t):
        return f'<li><a href="#" style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 20px; text-decoration: none; white-space: nowrap;">{t}</a></li>'
    def contact(ic, t, href):
        return (f'<a href="{href}" style="display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.6); text-decoration: none;">'
                f'<div style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border-radius: 9999px;">{icon(ic, 16)}</div>'
                f'<span style="font-size: 14px; line-height: 20px; white-space: nowrap;">{t}</span></a>')
    return f'''
<footer style="background: {C["rose950"]}; color: #fff;">
  <div style="max-width: 1280px; margin: 0 auto; padding: 56px 48px;">
    <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 40px; margin-bottom: 40px;">
      <div>
        <img src="logo.png" alt="木更津街コン" style="height: 40px; width: auto; object-fit: contain; margin-bottom: 16px; filter: brightness(0) invert(1); display: block;">
        <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.625;">木更津で、自然に恋が始まる街コン。<br>安心して参加できる出会いの場を提供しています。</p>
      </div>
      <div>
        <h4 style="margin: 0 0 16px 0; font-weight: 700; font-size: 14px; line-height: 20px; color: rgba(255,255,255,0.9);">メニュー</h4>
        <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px;">{link("イベント一覧")}{link("初めての方へ")}{link("魅力・特徴")}{link("実績・口コミ")}</ul>
      </div>
      <div>
        <h4 style="margin: 0 0 16px 0; font-weight: 700; font-size: 14px; line-height: 20px; color: rgba(255,255,255,0.9);">お問い合わせ</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">{contact("mail", "info@kazusacon.com", "mailto:info@kazusacon.com")}{contact("instagram", "Instagram", "https://www.instagram.com/kazusacon")}{contact("chat-smile", "LINE公式", "https://lin.ee/9pu5Slg")}</div>
      </div>
      <div>
        <h4 style="margin: 0 0 16px 0; font-weight: 700; font-size: 14px; line-height: 20px; color: rgba(255,255,255,0.9);">最新情報をLINEで</h4>
        <p style="margin: 0 0 16px 0; color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.625;">空席情報やお得なキャンペーン情報をいち早くお届けします。</p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          {btn("LINE登録する", C["line"], "#fff", "chat-smile", py=12, extra="width: 100%; box-sizing: border-box;")}
          {btn("公式LINEから申し込む", "rgba(255,255,255,0.1)", "#fff", "chat-smile", py=12, extra="width: 100%; box-sizing: border-box;")}
        </div>
      </div>
    </div>
    <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; text-align: center;"><p style="margin: 0; color: rgba(255,255,255,0.4); font-size: 12px; line-height: 16px;">© 2026 木更津街コン All Rights Reserved.</p></div>
  </div>
</footer>'''

def fixed_cta():
    return f'''
<div style="position: absolute; bottom: 0; left: 0; right: 0; z-index: 40; background: rgba(255,255,255,0.95); backdrop-filter: blur(4px); border-top: 1px solid {C["gray100"]}; padding: 12px 16px;">
  <div style="max-width: 512px; margin: 0 auto; display: flex; gap: 12px;">{btn("公式LINEから申し込む", C["line"], "#fff", "chat-smile", extra="flex: 1;")}</div>
</div>'''

PAGE = f'''<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;900&family=Noto+Serif+JP:wght@700;900&display=swap">
  <style>
    body {{ margin: 0; background: #fff; }}
    a {{ color: {C["rose500"]}; }} a:hover {{ color: {C["rose600"]}; }}
    * {{ box-sizing: border-box; }}
  </style>
</helmet>
<div style="position: relative; width: 1440px; min-height: 100%; background: #fff; font-family: {SANS}; color: {C["gray900"]}; -webkit-font-smoothing: antialiased;">
{navbar()}
{hero()}
{events()}
{past_events()}
{instagram()}
{results()}
{empathy()}
{safety()}
{charm()}
{footer()}
{fixed_cta()}
</div>
</x-dc>
</body>
</html>
'''

import os
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Main.dc.html")
io.open(out, "w", encoding="utf-8", newline="\n").write(PAGE)
print("wrote", out, len(PAGE.encode("utf-8")) // 1024, "KB")
