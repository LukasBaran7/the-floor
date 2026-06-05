type Props = {
  onNext: () => void;
};

export function ResultScreen({ onNext }: Props) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Wynik</h1>
      <button
        type="button"
        onClick={onNext}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Restart
      </button>
    </div>
  );
}
