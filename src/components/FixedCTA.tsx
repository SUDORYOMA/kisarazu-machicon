import { CTA_APPLY, CTA_ICON, CTA_BG } from "@/lib/alert";

interface FixedCTAProps {
  onLine: () => void;
}

export default function FixedCTA({ onLine }: FixedCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3">
      <div className="max-w-lg mx-auto flex gap-3">
        <button
          onClick={onLine}
          className={`whitespace-nowrap flex-1 flex items-center justify-center gap-2 ${CTA_BG} text-white font-bold py-3.5 rounded-full transition-colors cursor-pointer text-sm`}
        >
          <i className={CTA_ICON} />
          {CTA_APPLY}
        </button>
      </div>
    </div>
  );
}