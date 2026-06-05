type Props = {
  total: number;
  onReplay: () => void;
  onBackToCategories: () => void;
};

export function ResultScreen({ total, onReplay, onBackToCategories }: Props) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-8 p-6 bg-floor-bg">
      <p className="text-floor-blue text-sm uppercase tracking-widest">Sesja zakończona</p>
      <p className="metallic-gold text-6xl text-center leading-none">
        {total}<br />
        <span className="text-3xl">pytań</span>
      </p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          type="button"
          onClick={onReplay}
          className="h-16 px-8 text-lg bg-floor-tile border-2 border-white text-white font-bold uppercase tracking-wider active:bg-floor-tile-light"
        >
          Jeszcze raz
        </button>
        <button
          type="button"
          onClick={onBackToCategories}
          className="h-16 px-8 text-lg bg-transparent border-2 border-white/40 text-white/80 font-bold uppercase tracking-wider active:bg-white/10"
        >
          Inne kategorie
        </button>
      </div>
    </div>
  );
}
