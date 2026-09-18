import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useGame } from './hooks/useGame';
import { StartScreen } from './components/screens/StartScreen';
import { TeamSelectScreen } from './components/screens/TeamSelectScreen';
import { InstructionsScreen } from './components/screens/InstructionsScreen';
import { GameScreen } from './components/screens/GameScreen';
import { VictoryScreen } from './components/screens/VictoryScreen';
import { SummaryScreen } from './components/screens/SummaryScreen';
import { TeacherPanel } from './components/teacher/TeacherPanel';
import {
  loadQuestionSet,
  getStoredActiveQuestions,
  setStoredActiveQuestions,
} from './utils/questionStorage';
import { FullScreenButton } from './components/ui/FullScreenButton';
import { QUESTIONS_BANK } from './data/questions';
import { Question } from './types/game';

const MainGamePage: React.FC = () => {
  const game = useGame();
  const [codeLoading, setCodeLoading] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(
    () => getStoredActiveQuestions() || QUESTIONS_BANK
  );

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'civilisation_active_questions') {
        const stored = getStoredActiveQuestions();
        if (stored) setActiveQuestions(stored);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleStartGame = async () => {
    if (game.gameCode.trim().length >= 4) {
      setCodeLoading(true);
      const customSet = await loadQuestionSet(game.gameCode);
      setCodeLoading(false);
      if (customSet) {
        const combined = [...customSet.teamAQuestions, ...customSet.teamBQuestions];
        setActiveQuestions(combined);
        setStoredActiveQuestions(combined);
        game.startGame(combined);
        return;
      }
    }
    game.startGame(activeQuestions);
  };

  const renderScreen = () => {
    switch (game.screen) {
      case 'start':
        return (
          <StartScreen
            onStart={() => game.setScreen('teamSelect')}
            onInstructions={() => game.setScreen('instructions')}
            onTeacherDashboard={() => window.open('/teacher', '_blank')}
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
            onPlayAgain={() => game.startGame(activeQuestions)}
            onSummary={() => game.setScreen('summary')}
            onHome={() => game.setScreen('start')}
          />
        );

      case 'summary':
        return (
          <SummaryScreen
            onPlayAgain={() => game.startGame(activeQuestions)}
            onHome={() => game.setScreen('start')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {game.screen !== 'game' && (
        <div className="fixed top-3.5 right-4 z-50">
          <FullScreenButton />
        </div>
      )}
      {renderScreen()}
    </>
  );
};

const TeacherPage: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>(
    () => getStoredActiveQuestions() || QUESTIONS_BANK
  );

  return (
    <>
      <div className="fixed top-3.5 right-4 z-50">
        <FullScreenButton />
      </div>
      <TeacherPanel
        initialQuestions={questions}
        onUpdateQuestions={(updated) => {
          setQuestions(updated);
          setStoredActiveQuestions(updated);
        }}
        onLaunchGame={(updated) => {
          setStoredActiveQuestions(updated);
          navigate('/');
        }}
        onBack={() => navigate('/')}
      />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainGamePage />} />
        <Route path="/teacher" element={<TeacherPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
