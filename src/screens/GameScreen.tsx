import { useState } from 'react';
import type { Flag } from '../types';

const correctSound = new Audio('/sounds/correct.m4a');
const incorrectSound = new Audio('/sounds/incorrect.m4a');

const REVEAL_MS = 1500;

type Props = {
  flag: Flag;
  index: number;
  total: number;
  onAnswer: (knew: boolean) => void;
};

export function GameScreen({ flag, index, total, onAnswer }: Props) {
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

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="text-lg">
        {index + 1}/{total}
      </div>

      <img src={flag.img} alt="flaga" className="w-full max-h-[50vh] object-contain" />

      {isRevealed ? (
        <div
          className={`text-3xl font-bold text-center p-4 rounded text-white ${
            lastKnew ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {flag.answer}
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => answer(false)}
            className="flex-1 py-4 bg-red-500 text-white text-xl rounded"
          >
            ❌
          </button>
          <button
            type="button"
            onClick={() => answer(true)}
            className="flex-1 py-4 bg-green-500 text-white text-xl rounded"
          >
            ✅
          </button>
        </div>
      )}
    </div>
  );
}
