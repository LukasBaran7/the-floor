type Props = {
  score: number;
  total: number;
  onReplay: () => void;
};

export function ResultScreen({ score, total, onReplay }: Props) {
  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Wynik</h1>
      <p className="text-3xl">
        Wiedziałeś {score}/{total}
      </p>
      <button
        type="button"
        onClick={onReplay}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Zagraj jeszcze raz
      </button>
    </div>
  );
}
