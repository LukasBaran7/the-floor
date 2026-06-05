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
    <div className="h-dvh flex flex-col p-6 gap-6">
      <button
        type="button"
        onClick={onBack}
        className="self-start text-blue-600 text-lg active:opacity-60"
      >
        ← Wróć
      </button>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-gray-500">Ile pytań w sesji?</p>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onStart(n)}
            className="h-16 px-6 text-xl rounded-2xl bg-blue-600 text-white font-semibold active:bg-blue-700"
          >
            {n} pytań
          </button>
        ))}
        <button
          type="button"
          onClick={() => onStart(total)}
          className="h-16 px-6 text-xl rounded-2xl bg-blue-600 text-white font-semibold active:bg-blue-700"
        >
          Wszystkie ({total})
        </button>
      </div>
    </div>
  );
}
