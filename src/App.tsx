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
    const syncActive = () => {
      const stored = getStoredActiveQuestions();
      if (stored && stored.length > 0) {
        setActiveQuestions(stored);
      }
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'civilisation_active_questions') {
        syncActive();
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', syncActive);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', syncActive);
    };
  }, []);

  const handleStartGame = async () => {
    const stored = getStoredActiveQuestions();
    if (game.gameCode.trim().length >= 4) {
      setCodeLoading(true);
      const customSet = await loadQuestionSet(game.gameCode);
      setCodeLoading(false);
      if (customSet) {
        const idMap = new Map<string, Question>();
        [...customSet.teamAQuestions, ...customSet.teamBQuestions].forEach((q) => {
          idMap.set(q.id, q);
        });
        const combined = Array.from(idMap.values());
        setActiveQuestions(combined);
        setStoredActiveQuestions(combined);
        game.startGame(combined);
        return;
      }
    }
    const currentPool = stored && stored.length > 0 ? stored : activeQuestions;
    game.startGame(currentPool);
  };

  const isCustomActive = Boolean(getStoredActiveQuestions());

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
            activeQuestionsCount={isCustomActive ? activeQuestions.length : undefined}
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
            onPlayAgain={() => {
              const fresh = getStoredActiveQuestions() || activeQuestions;
              game.startGame(fresh);
            }}
            onSummary={() => game.setScreen('summary')}
            onHome={() => game.setScreen('start')}
          />
        );

      case 'summary':
        return (
          <SummaryScreen
            onPlayAgain={() => {
              const fresh = getStoredActiveQuestions() || activeQuestions;
              game.startGame(fresh);
            }}
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
