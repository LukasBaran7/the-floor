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
};

export function GameScreen({ flag, index, total, score, onAnswer }: Props) {
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

  if (isRevealed) {
    return (
      <div
        className={`h-dvh flex items-center justify-center p-6 ${
          lastKnew ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        <div className="text-5xl font-bold text-white text-center">{flag.answer}</div>
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col">
      <div className="flex justify-between p-4 text-lg font-medium">
        <span>
          {index + 1}/{total}
        </span>
        <span>✓ {score}</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 min-h-0">
        <img
          src={flag.img}
          alt="flaga"
          className="object-contain max-h-[50vh] w-full"
        />
      </div>

      <div className="flex gap-2 p-2">
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
    </div>
  );
}
