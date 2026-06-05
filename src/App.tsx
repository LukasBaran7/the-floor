import { useState } from 'react';
import type { Flag, Screen } from './types';
import { flagi } from './data/flagi';
import { StartScreen } from './screens/StartScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultScreen } from './screens/ResultScreen';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [shuffled, setShuffled] = useState<Flag[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setShuffled(shuffle(flagi));
    setCurrentIndex(0);
    setScore(0);
    setScreen('game');
  };

  const handleAnswer = (knew: boolean) => {
    const nextScore = knew ? score + 1 : score;
    if (knew) setScore(nextScore);

    if (currentIndex + 1 >= shuffled.length) {
      setScreen('result');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (screen === 'start') return <StartScreen onStart={startGame} />;
  if (screen === 'game')
    return (
      <GameScreen
        flag={shuffled[currentIndex]}
        index={currentIndex}
        total={shuffled.length}
        score={score}
        onAnswer={handleAnswer}
      />
    );
  return <ResultScreen score={score} total={shuffled.length} onReplay={startGame} />;
}

export default App;
