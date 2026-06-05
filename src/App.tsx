import { useState } from 'react';
import type { Screen } from './types';
import { StartScreen } from './screens/StartScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultScreen } from './screens/ResultScreen';

function App() {
  const [screen, setScreen] = useState<Screen>('start');

  if (screen === 'start') return <StartScreen onNext={() => setScreen('game')} />;
  if (screen === 'game') return <GameScreen onNext={() => setScreen('result')} />;
  return <ResultScreen onNext={() => setScreen('start')} />;
}

export default App;
