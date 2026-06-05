import { useState } from 'react';
import type { Item } from '../types';

type Props = {
  item: Item;
  index: number;
  total: number;
  onNext: () => void;
  onExit: () => void;
};

export function GameScreen({ item, index, total, onNext, onExit }: Props) {
  const [isRevealed, setIsRevealed] = useState(false);

  const reveal = () => setIsRevealed(true);

  const goNext = () => {
    setIsRevealed(false);
    onNext();
  };

  const tryExit = () => {
    if (confirm('Przerwać sesję?')) {
      onExit();
    }
  };

  return (
    <div className="h-dvh flex flex-col bg-floor-bg">
      <div className="flex items-center justify-between p-4 text-lg font-bold uppercase tracking-wider">
        <button
          type="button"
          onClick={tryExit}
          className="text-floor-blue active:opacity-60"
          aria-label="Wyjdź"
        >
          ← Wyjdź
        </button>
        <span className="text-white/80">
          {index + 1}/{total}
        </span>
        <span className="w-12" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 min-h-0">
        {item.img ? (
          <div className="bg-white p-3 border-2 border-white max-h-full">
            <img
              src={item.img}
              alt=""
              className="object-contain max-h-[55vh] w-full"
            />
          </div>
        ) : (
          <div className="bg-floor-tile border-2 border-white px-8 py-12 max-w-full">
            <p className="text-white text-4xl font-bold uppercase tracking-wide text-center break-words">
              {item.answer}
            </p>
          </div>
        )}
      </div>

      <div className="p-2 flex flex-col gap-2">
        {isRevealed && (
          <div className="h-24 flex items-center justify-center bg-floor-tile border-2 border-white text-white text-3xl font-bold uppercase tracking-wider px-4 text-center">
            {item.answer}
          </div>
        )}
        <button
          type="button"
          onClick={isRevealed ? goNext : reveal}
          className="h-24 bg-floor-blue border-2 border-white text-white text-2xl font-bold uppercase tracking-wider active:opacity-80"
        >
          {isRevealed ? 'Dalej →' : 'Pokaż odpowiedź'}
        </button>
      </div>
    </div>
  );
}
