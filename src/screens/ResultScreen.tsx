type Props = {
  score: number;
  total: number;
  onReplay: () => void;
  onBackToCategories: () => void;
};

export function ResultScreen({ score, total, onReplay, onBackToCategories }: Props) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-6 p-6">
      <p className="text-xl text-gray-500">Wiedziałeś</p>
      <p className="text-6xl font-bold">
        {score}/{total}
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          type="button"
          onClick={onReplay}
          className="h-16 px-8 text-xl rounded-2xl bg-blue-600 text-white font-semibold active:bg-blue-700"
        >
          Zagraj jeszcze raz
        </button>
        <button
          type="button"
          onClick={onBackToCategories}
          className="h-16 px-8 text-xl rounded-2xl bg-gray-200 text-gray-800 font-semibold active:bg-gray-300"
        >
          Inne kategorie
        </button>
      </div>
    </div>
  );
}
