type Props = {
  onStart: () => void;
};

export function StartScreen({ onStart }: Props) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">The Floor Trener</h1>
      <button
        type="button"
        onClick={onStart}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Start
      </button>
    </div>
  );
}
