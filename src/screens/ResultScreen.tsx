type Props = {
  score: number;
  total: number;
  onReplay: () => void;
};

export function ResultScreen({ score, total, onReplay }: Props) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-8 p-6">
      <p className="text-xl text-gray-500">Wiedziałeś</p>
      <p className="text-6xl font-bold">
        {score}/{total}
      </p>
      <button
        type="button"
        onClick={onReplay}
        className="h-16 px-8 text-2xl rounded-2xl bg-blue-600 text-white font-semibold active:bg-blue-700"
      >
        Zagraj jeszcze raz
      </button>
    </div>
  );
}
