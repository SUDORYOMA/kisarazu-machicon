# 当日のスクリーン用スライドを、そのまま流せる動画（MP4）にする。
#
#   python3 scripts/make_sponsor_movie.py          # 1周ぶん（約2分30秒）
#   python3 scripts/make_sponsor_movie.py --loops 25   # 25周ぶん（約1時間）
#
# 出力先: design/sns/screen/sponsors.mp4
#   1920x1080 / H.264 / 音なし。USBメモリに入れてテレビで再生できる。
#
# 画像は make_sponsor_screen.py が作った design/sns/screen/*.jpg をそのまま使う。
# 表紙→協賛企業様→締め の順で、1枚ずつふわっと切り替わる。
import argparse
import glob
import os
import subprocess
import sys

import imageio_ffmpeg

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCREEN = os.path.join(ROOT, "design", "sns", "screen")
OUT = os.path.join(SCREEN, "sponsors.mp4")

HOLD = 8.0   # 1枚を見せている時間（秒）
FADE = 0.8   # 切り替わりにかける時間（秒）


def slides():
    files = sorted(f for f in glob.glob(os.path.join(SCREEN, "*.jpg"))
                   if not os.path.basename(f).startswith("_"))
    if not files:
        sys.exit("スライドが見つかりません。先に make_sponsor_screen.py を実行してください。")
    return files


def build(files, loops):
    """ふわっと切り替えながら順につなぐ。loops 回くり返す。"""
    seq = files * loops
    step = HOLD - FADE
    args = []
    for f in seq:
        args += ["-loop", "1", "-t", str(HOLD), "-i", f]

    chain = []
    last = "0:v"
    for i in range(1, len(seq)):
        out = f"v{i}"
        chain.append(
            f"[{last}][{i}:v]xfade=transition=fade:duration={FADE}:offset={step * i:.2f}[{out}]"
        )
        last = out
    # 最後にフォーマットを揃える（テレビやプロジェクターで確実に再生できるように）
    chain.append(f"[{last}]format=yuv420p,fps=30[out]")
    return args, ";".join(chain)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--loops", type=int, default=1, help="くり返す回数（既定: 1）")
    ap.add_argument("--hours", type=float, default=0,
                    help="この時間ぶん繰り返した長い動画も作る（例: --hours 2）")
    ap.add_argument("--out", default=OUT)
    a = ap.parse_args()

    files = slides()
    args, chain = build(files, a.loops)
    exe = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [exe, "-y", *args, "-filter_complex", chain, "-map", "[out]",
           "-c:v", "libx264", "-preset", "medium", "-crf", "20",
           "-pix_fmt", "yuv420p", "-movflags", "+faststart", a.out]

    total = len(files) * a.loops * (HOLD - FADE) + FADE
    print(f"{len(files)}枚 × {a.loops}周 = 約{total / 60:.1f}分")
    r = subprocess.run(cmd, capture_output=True, text=True,
                       encoding="utf-8", errors="replace")
    if r.returncode != 0:
        print(r.stderr[-3000:])
        sys.exit("ffmpeg が失敗しました")
    mb = os.path.getsize(a.out) / 1024 / 1024
    print(f"generated {os.path.relpath(a.out, ROOT)}  {mb:.1f}MB")

    if a.hours:
        # 作った動画をそのままつなげて長くする（画質はそのまま・すぐ終わる）
        n = max(1, round(a.hours * 3600 / total))
        long_path = os.path.join(os.path.dirname(a.out), f"sponsors-loop-{a.hours:g}h.mp4")
        r = subprocess.run(
            [exe, "-y", "-stream_loop", str(n - 1), "-i", a.out,
             "-c", "copy", "-movflags", "+faststart", long_path],
            capture_output=True, text=True, encoding="utf-8", errors="replace")
        if r.returncode != 0:
            print(r.stderr[-2000:])
            sys.exit("つなぎ合わせに失敗しました")
        mb = os.path.getsize(long_path) / 1024 / 1024
        print(f"generated {os.path.relpath(long_path, ROOT)}  "
              f"{n}周 / 約{n * total / 3600:.1f}時間 / {mb:.0f}MB")


if __name__ == "__main__":
    main()
