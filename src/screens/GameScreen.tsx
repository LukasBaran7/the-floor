import { useState } from 'react';
import type { Flag } from '../types';

const correctSound = new Audio('/sounds/correct.m4a');
const incorrectSound = new Audio('/sounds/incorrect.m4a');

const REVEAL_MS = 1500;

type Props = {
  flag: Flag;
  index: number;
  total: number;
  score: number;
  onAnswer: (knew: boolean) => void;
  onExit: () => void;
};

export function GameScreen({ flag, index, total, score, onAnswer, onExit }: Props) {
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
    <div className="h-dvh flex flex-col">
      <div className="flex items-center justify-between p-4 text-lg font-medium">
        <button
          type="button"
          onClick={tryExit}
          className="text-blue-600 active:opacity-60"
          aria-label="Wyjdź"
        >
          ← Wyjdź
        </button>
        <span>
          {index + 1}/{total}
        </span>
        <span>✓ {score}</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 min-h-0">
        <img
          src={flag.img}
          alt="flaga"
          className="object-contain max-h-full w-full"
        />
      </div>

      <div className="p-2">
        {isRevealed ? (
          <div
            className={`h-24 flex items-center justify-center rounded-2xl text-white text-3xl font-bold ${
              lastKnew ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {flag.answer}
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => answer(false)}
              className="flex-1 h-24 bg-red-500 text-white text-2xl font-bold rounded-2xl active:bg-red-600"
            >
              ❌
            </button>
            <button
              type="button"
              onClick={() => answer(true)}
              className="flex-1 h-24 bg-green-500 text-white text-2xl font-bold rounded-2xl active:bg-green-600"
            >
              ✅
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
