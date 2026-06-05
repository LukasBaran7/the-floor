type Props = {
  onStart: () => void;
};

export function StartScreen({ onStart }: Props) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-10 p-6 bg-floor-bg">
      <div className="flex flex-col items-center gap-3">
        <h1 className="metallic-gold text-5xl text-center">THE FLOOR</h1>
        <p className="text-floor-blue text-xl tracking-widest font-semibold">
          TRENER
        </p>
      </div>
      <p className="text-white/60 text-center text-sm tracking-wider uppercase">
        Wybierz tryb
      </p>
      <button
        type="button"
        onClick={onStart}
        className="h-20 px-10 text-2xl bg-floor-tile border-2 border-white text-white font-bold uppercase tracking-wider active:bg-floor-tile-light"
      >
        Trening kategorii
      </button>
    </div>
  );
}
