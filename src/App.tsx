import { useState } from 'react';
import type { Category, Item, Screen } from './types';
import { StartScreen } from './screens/StartScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { SessionSetupScreen } from './screens/SessionSetupScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultScreen } from './screens/ResultScreen';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [category, setCategory] = useState<Category | null>(null);
  const [shuffled, setShuffled] = useState<Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const pickCategory = (cat: Category) => {
    setCategory(cat);
    setScreen('session-setup');
  };

  const startSession = (length: number) => {
    if (!category) return;
    setShuffled(shuffle(category.items).slice(0, length));
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
  if (screen === 'categories') return <CategoriesScreen onSelect={pickCategory} />;
  if (screen === 'session-setup' && category)
    return (
      <SessionSetupScreen
        category={category}
        onStart={startSession}
        onBack={() => setScreen('categories')}
      />
    );
  if (screen === 'game')
    return (
      <GameScreen
        item={shuffled[currentIndex]}
        index={currentIndex}
        total={shuffled.length}
        score={score}
        onAnswer={handleAnswer}
        onExit={() => setScreen('categories')}
      />
    );
  return (
    <ResultScreen
      score={score}
      total={shuffled.length}
      onReplay={() => category && setScreen('session-setup')}
      onBackToCategories={() => setScreen('categories')}
    />
  );
}

export default App;
