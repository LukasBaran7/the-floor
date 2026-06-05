import { useState } from 'react';
import type { Item } from '../types';

const correctSound = new Audio('/sounds/correct.m4a');
const incorrectSound = new Audio('/sounds/incorrect.m4a');

const REVEAL_MS = 1500;

type Props = {
  item: Item;
  index: number;
  total: number;
  score: number;
  onAnswer: (knew: boolean) => void;
  onExit: () => void;
};

export function GameScreen({ item, index, total, score, onAnswer, onExit }: Props) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [lastKnew, setLastKnew] = useState<boolean | null>(null);

  const answer = (knew: boolean) => {
    if (isRevealed) return;
    const sound = knew ? correctSound : incorrectSound;
    sound.currentTime = 0;
    sound.play().catch(() => {});
    setLastKnew(knew);
    setIsRevealed(true);
    setTimeout(() => {
      setIsRevealed(false);
      setLastKnew(null);
      onAnswer(knew);
    }, REVEAL_MS);
  };

  const tryExit = () => {
    if (isRevealed) return;
    if (confirm('Przerwać sesję? Wynik nie zostanie zapisany.')) {
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
        <span className="text-floor-orange">✓ {score}</span>
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

      <div className="p-2">
        {isRevealed ? (
          <div
            className={`h-24 flex items-center justify-center border-2 border-white text-white text-3xl font-bold uppercase tracking-wider ${
              lastKnew ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {item.answer}
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => answer(false)}
              className="flex-1 h-24 bg-red-600 border-2 border-white text-white text-3xl font-bold active:bg-red-700"
            >
              ❌
            </button>
            <button
              type="button"
              onClick={() => answer(true)}
              className="flex-1 h-24 bg-green-600 border-2 border-white text-white text-3xl font-bold active:bg-green-700"
            >
              ✅
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
