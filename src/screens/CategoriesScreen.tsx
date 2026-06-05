import type { Category } from '../types';
import { categories } from '../data/categories';

type Props = {
  onSelect: (category: Category) => void;
};

export function CategoriesScreen({ onSelect }: Props) {
  return (
    <div className="h-dvh flex flex-col bg-floor-bg">
      <h1 className="text-2xl font-bold uppercase tracking-wider text-floor-blue p-6 pb-2">
        Wybierz kategorię
      </h1>
      <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat)}
            className="h-24 px-6 bg-floor-tile border-2 border-white text-white text-left active:bg-floor-tile-light flex items-center justify-between"
          >
            <span className="text-xl font-bold uppercase tracking-wide">{cat.name}</span>
            <span className="text-floor-orange text-sm font-semibold">
              {cat.items.length}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
