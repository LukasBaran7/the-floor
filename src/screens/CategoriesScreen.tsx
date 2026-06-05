import type { Category } from '../types';
import { categories } from '../data/categories';

type Props = {
  onSelect: (category: Category) => void;
};

export function CategoriesScreen({ onSelect }: Props) {
  return (
    <div className="h-dvh flex flex-col p-6 gap-6">
      <h1 className="text-3xl font-bold">Wybierz kategorię</h1>
      <div className="flex flex-col gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat)}
            className="h-20 px-6 text-xl rounded-2xl bg-blue-600 text-white font-semibold text-left active:bg-blue-700 flex items-center justify-between"
          >
            <span>{cat.name}</span>
            <span className="text-sm font-normal opacity-80">{cat.items.length}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
