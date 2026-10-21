import { useEffect, useRef } from "react";
import { SlideDeck, type SlideItem } from "@/components/SlideDeck";

/** 開いている間は後ろのページを動かさない */
function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/**
 * ページを暗くして、カードを1枚ずつ大きく見せる（横にスライドして次へ）。
 * open が true の間だけ開く。× か暗い所を押すと onClose。
 * （くるまっぷの DeckLightbox と同じ動き）
 */
export function DeckLightbox({
  open,
  onClose,
  title,
  items,
  initialIndex = 0,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  items: SlideItem[];
  initialIndex?: number;
  /** カードの下に出すもの */
  footer?: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useBodyScrollLock(open);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onCloseEvent = () => onClose();
    d.addEventListener("close", onCloseEvent);
    return () => d.removeEventListener("close", onCloseEvent);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-0 h-full max-h-none w-full max-w-none overflow-hidden overscroll-contain bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-[2px] open:flex open:items-center open:justify-center"
    >
      {open && (
        <div
          className="relative w-full max-w-lg px-3 pb-4 pt-12"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <p className="absolute left-4 top-3 max-w-[75%] truncate text-base font-bold text-white">{title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="absolute right-3 top-1 flex h-10 w-10 items-center justify-center rounded-full text-3xl leading-none text-white hover:bg-white/10 cursor-pointer"
          >
            ×
          </button>
          <SlideDeck
            items={items}
            initialIndex={initialIndex}
            label={typeof title === "string" ? title : undefined}
            dark
          />
          {footer && <div className="mt-3">{footer}</div>}
        </div>
      )}
    </dialog>
  );
}
