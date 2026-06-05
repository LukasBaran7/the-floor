import type { Category } from '../types';

const LENGTH_OPTIONS = [10, 20, 50];

type Props = {
  category: Category;
  onStart: (length: number) => void;
  onBack: () => void;
};

export function SessionSetupScreen({ category, onStart, onBack }: Props) {
  const total = category.items.length;
  const options = LENGTH_OPTIONS.filter((n) => n < total);

  return (
    <div className="h-dvh flex flex-col p-6 gap-6 bg-floor-bg">
      <button
        type="button"
        onClick={onBack}
        className="self-start text-floor-blue text-lg uppercase tracking-wider active:opacity-60"
      >
        ← Wróć
      </button>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold uppercase tracking-wide">{category.name}</h1>
        <p className="text-white/60 uppercase text-sm tracking-wider">
          Ile pytań w sesji?
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {options.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onStart(n)}
            className="h-16 px-6 text-xl bg-floor-tile border-2 border-white text-white font-bold uppercase tracking-wider active:bg-floor-tile-light"
          >
            {n} pytań
          </button>
        ))}
        <button
          type="button"
          onClick={() => onStart(total)}
          className="h-16 px-6 text-xl bg-floor-tile border-2 border-white text-white font-bold uppercase tracking-wider active:bg-floor-tile-light"
        >
          Wszystkie ({total})
        </button>
      </div>
    </div>
  );
}
