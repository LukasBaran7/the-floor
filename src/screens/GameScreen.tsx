type Props = {
  onNext: () => void;
};

export function GameScreen({ onNext }: Props) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Gra</h1>
      <p className="text-gray-600">[placeholder — tu będzie flaga + przyciski ✅/❌]</p>
      <button
        type="button"
        onClick={onNext}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Zakończ
      </button>
    </div>
  );
}
