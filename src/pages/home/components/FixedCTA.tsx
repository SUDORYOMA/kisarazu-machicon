interface FixedCTAProps {
  onLine: () => void;
}

export default function FixedCTA({ onLine }: FixedCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3">
      <div className="max-w-lg mx-auto flex gap-3">
        <button
          onClick={onLine}
          className="whitespace-nowrap flex-1 flex items-center justify-center gap-2 bg-[#06C755] text-white font-bold py-3.5 rounded-full hover:bg-[#05b34c] transition-colors cursor-pointer text-sm"
        >
          <i className="ri-chat-smile-2-line" />
          公式LINEから申し込む
        </button>
      </div>
    </div>
  );
}