import { useState } from 'react';
import type { Category, Flag, Screen } from './types';
import { StartScreen } from './screens/StartScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultScreen } from './screens/ResultScreen';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [category, setCategory] = useState<Category | null>(null);
  const [shuffled, setShuffled] = useState<Flag[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startGame = (cat: Category) => {
    setCategory(cat);
    setShuffled(shuffle(cat.items));
    setCurrentIndex(0);
    setScore(0);
    setScreen('game');
  };

  const handleAnswer = (knew: boolean) => {
    if (knew) setScore(score + 1);

    if (currentIndex + 1 >= shuffled.length) {
      setScreen('result');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (screen === 'start') return <StartScreen onStart={() => setScreen('categories')} />;
  if (screen === 'categories') return <CategoriesScreen onSelect={startGame} />;
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
  return (
    <ResultScreen
      score={score}
      total={shuffled.length}
      onReplay={() => category && startGame(category)}
      onBackToCategories={() => setScreen('categories')}
    />
  );
}

export default App;
