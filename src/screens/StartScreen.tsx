type Props = {
  onStart: () => void;
};

export function StartScreen({ onStart }: Props) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-4xl font-bold text-center">The Floor Trener</h1>
      <p className="text-gray-500 text-center">Wybierz tryb</p>
      <button
        type="button"
        onClick={onStart}
        className="h-20 px-8 text-2xl rounded-2xl bg-blue-600 text-white font-semibold active:bg-blue-700"
      >
        Trening kategorii
      </button>
    </div>
  );
}
