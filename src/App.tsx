import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import { StartScreen } from './components/screens/StartScreen';
import { TeamSelectScreen } from './components/screens/TeamSelectScreen';
import { InstructionsScreen } from './components/screens/InstructionsScreen';
import { GameScreen } from './components/screens/GameScreen';
import { VictoryScreen } from './components/screens/VictoryScreen';
import { SummaryScreen } from './components/screens/SummaryScreen';
import { TeacherPanel } from './components/teacher/TeacherPanel';
import { loadQuestionSet } from './utils/questionStorage';
import { FullScreenButton } from './components/ui/FullScreenButton';

import { QUESTIONS_BANK } from './data/questions';
import { Question } from './types/game';

export const App: React.FC = () => {
  const game = useGame();
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(QUESTIONS_BANK);

  const handleStartGame = async () => {
    if (game.gameCode.trim().length >= 4) {
      setCodeLoading(true);
      const customSet = await loadQuestionSet(game.gameCode);
      setCodeLoading(false);
      if (customSet) {
        const combined = [...customSet.teamAQuestions, ...customSet.teamBQuestions];
        setActiveQuestions(combined);
        game.startGame(combined);
        return;
      }
    }
    game.startGame(activeQuestions);
  };

  const renderContent = () => {
    if (isTeacherMode) {
      return (
        <TeacherPanel
          initialQuestions={activeQuestions}
          onUpdateQuestions={(updated) => setActiveQuestions(updated)}
          onLaunchGame={(updated) => {
            setActiveQuestions(updated);
            setIsTeacherMode(false);
            game.startGame(updated);
          }}
          onBack={() => setIsTeacherMode(false)}
        />
      );
    }

    switch (game.screen) {
      case 'start':
        return (
          <StartScreen
            onStart={() => game.setScreen('teamSelect')}
            onInstructions={() => game.setScreen('instructions')}
            onTeacherDashboard={() => setIsTeacherMode(true)}
            gameCode={game.gameCode}
            setGameCode={game.setGameCode}
          />
        );

      case 'teamSelect':
        return (
          <TeamSelectScreen
            onConfirm={handleStartGame}
            onBack={() => game.setScreen('start')}
          />
        );

      case 'instructions':
        return (
          <InstructionsScreen
            onStart={handleStartGame}
            onBack={() => game.setScreen('start')}
          />
        );

      case 'game':
        return <GameScreen {...game} />;

      case 'victory':
        return (
          <VictoryScreen
            winner={game.winner}
            stats={game.stats}
            onPlayAgain={() => game.startGame()}
            onSummary={() => game.setScreen('summary')}
            onHome={() => game.setScreen('start')}
          />
        );

      case 'summary':
        return (
          <SummaryScreen
            onPlayAgain={() => game.startGame()}
            onHome={() => game.setScreen('start')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {(!isTeacherMode && game.screen !== 'game') && (
        <div className="fixed top-3.5 right-4 z-50">
          <FullScreenButton />
        </div>
      )}
      {renderContent()}
    </>
  );
};

export default App;
