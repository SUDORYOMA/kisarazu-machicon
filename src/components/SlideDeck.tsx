import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export interface SlideItem {
  key: string;
  node: React.ReactNode;
}

const GAP = 12;
/** 真ん中のカードの幅（左右に隣のカードを少しのぞかせる） */
const CENTER_RATIO = 0.86;
/** 横に滑る時間。滑ったことが目で分かる速さにする */
const SLIDE_MS = 320;

/**
 * カードを1枚ずつ見せて、横にスライドして次へ進む。
 * 真ん中に今のカード、左右に隣のカードを少し暗くしてのぞかせる。左右の矢印・スワイプ・キーボード（← →）で動かす。
 * （くるまっぷの SlideDeck と同じ動き・速度）
 */
export function SlideDeck({
  items,
  initialIndex = 0,
  label,
  dark = false,
  onIndexChange,
}: {
  items: SlideItem[];
  initialIndex?: number;
  /** 読み上げ用の名前 */
  label?: string;
  /** 暗い背景の上（ライトボックスの中）に置くとき。矢印と件数の色を白にする */
  dark?: boolean;
  onIndexChange?: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(Math.min(Math.max(initialIndex, 0), Math.max(items.length - 1, 0)));
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ x: number; y: number; horizontal: boolean | null } | null>(null);

  const count = items.length;
  const current = Math.min(index, Math.max(count - 1, 0));

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 0), count - 1);
      setIndex(clamped);
      setDragX(0);
      onIndexChange?.(clamped);
    },
    [count, onIndexChange],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(current - 1);
      if (e.key === "ArrowRight") go(current + 1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [current, go]);

  if (count === 0) return null;
  if (count === 1) return <div>{items[0]!.node}</div>;

  const slideW = width > 0 ? Math.round(width * CENTER_RATIO) : 0;
  const offset = width > 0 ? (width - slideW) / 2 - current * (slideW + GAP) + dragX : 0;
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const arrow = `absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-2xl leading-none shadow-md transition-opacity disabled:pointer-events-none disabled:opacity-0 cursor-pointer ${
    dark ? "bg-white/90 text-gray-800" : "border border-gray-200 bg-white/95 text-gray-700"
  }`;

  return (
    <div className="space-y-2" role="region" aria-roledescription="カルーセル" aria-label={label}>
      <div
        ref={containerRef}
        tabIndex={0}
        className="relative touch-pan-y overflow-hidden overscroll-x-contain rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
        onTouchStart={(e) => {
          const t = e.touches[0];
          if (t) start.current = { x: t.clientX, y: t.clientY, horizontal: null };
        }}
        onTouchMove={(e) => {
          const s = start.current;
          const t = e.touches[0];
          if (!s || !t) return;
          const dx = t.clientX - s.x;
          const dy = t.clientY - s.y;
          // 縦のスクロールのじゃまをしない：最初に横へ動いたときだけスライドとして扱う
          if (s.horizontal == null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) s.horizontal = Math.abs(dx) > Math.abs(dy);
          if (!s.horizontal) return;
          setDragging(true);
          // 端ではゴムのように少しだけ動く
          const atEdge = (current === 0 && dx > 0) || (current === count - 1 && dx < 0);
          setDragX(atEdge ? dx / 3 : dx);
        }}
        onTouchEnd={() => {
          const s = start.current;
          start.current = null;
          setDragging(false);
          if (!s?.horizontal) return setDragX(0);
          if (dragX < -50) go(current + 1);
          else if (dragX > 50) go(current - 1);
          else setDragX(0);
        }}
      >
        <div
          className="flex items-stretch"
          style={{
            gap: GAP,
            transform: `translateX(${offset}px)`,
            transition: dragging || reduce ? "none" : `transform ${SLIDE_MS}ms cubic-bezier(.22,.8,.3,1)`,
            visibility: width > 0 ? "visible" : "hidden",
          }}
        >
          {items.map((it, i) => {
            const isCurrent = i === current;
            return (
              <div
                key={it.key}
                aria-hidden={!isCurrent}
                // 隣のカードは押すとそちらへ移る（中のボタンは押せないようにする）
                onClickCapture={(e) => {
                  if (isCurrent) return;
                  e.preventDefault();
                  e.stopPropagation();
                  go(i);
                }}
                className="shrink-0"
                style={{
                  width: slideW || "86%",
                  opacity: isCurrent ? 1 : 0.45,
                  transform: isCurrent ? "none" : "scale(0.94)",
                  transition: dragging || reduce ? "none" : `opacity ${SLIDE_MS}ms ease, transform ${SLIDE_MS}ms ease`,
                  cursor: isCurrent ? undefined : "pointer",
                }}
              >
                <div className={`h-full ${isCurrent ? "" : "pointer-events-none"}`}>{it.node}</div>
              </div>
            );
          })}
        </div>
        <button type="button" onClick={() => go(current - 1)} disabled={current === 0} aria-label="前へ" className={`${arrow} left-1`}>
          ‹
        </button>
        <button type="button" onClick={() => go(current + 1)} disabled={current === count - 1} aria-label="次へ" className={`${arrow} right-1`}>
          ›
        </button>
      </div>
      {/* 何枚目か（点で。多いときは数字で） */}
      <div className={`flex items-center justify-center gap-1.5 text-sm tabular-nums ${dark ? "text-white/80" : "text-gray-500"}`} aria-live="polite">
        {count <= 8 ? (
          items.map((it, i) => (
            <button
              key={it.key}
              type="button"
              onClick={() => go(i)}
              aria-label={`${i + 1}件目`}
              aria-current={i === current}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === current ? `w-5 ${dark ? "bg-white" : "bg-rose-600"}` : `w-1.5 ${dark ? "bg-white/40" : "bg-gray-300"}`
              }`}
            />
          ))
        ) : (
          <span>
            {current + 1} / {count}
          </span>
        )}
      </div>
    </div>
  );
}
