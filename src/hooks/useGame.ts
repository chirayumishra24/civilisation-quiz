import { useState, useCallback, useEffect, useRef } from 'react';
import {
  ScreenState,
  TeamId,
  TeamState,
  initialTeamState,
  Question,
  TOTAL_ROUNDS,
  STREAK_THRESHOLD,
  MAX_CITY_STAGES,
  WinnerType,
  RoundEvaluation,
  GameStats,
  FeedbackState,
  CITY_STAGES,
} from '../types/game';
import { QUESTIONS_BANK } from '../data/questions';
import { QuestionManager, splitQuestionsForTeams } from '../utils/questionManager';
import { getStoredActiveQuestions } from '../utils/questionStorage';
import { soundManager } from '../utils/soundManager';
import { triggerConstructionBurst, triggerStreakBurst, triggerVictoryConfetti } from '../utils/confetti';
import { useTimer } from './useTimer';

export function useGame() {
  const [screen, setScreen] = useState<ScreenState>('start');
  const [round, setRound] = useState<number>(1);
  const [gameCode, setGameCode] = useState<string>('');

  const [mohenjoState, setMohenjoState] = useState<TeamState>({ ...initialTeamState });
  const [dholaviraState, setDholaviraState] = useState<TeamState>({ ...initialTeamState });

  const [mohenjoQuestion, setMohenjoQuestion] = useState<Question | null>(null);
  const [dholaviraQuestion, setDholaviraQuestion] = useState<Question | null>(null);

  const [mohenjoSelected, setMohenjoSelected] = useState<number | null>(null);
  const [dholaviraSelected, setDholaviraSelected] = useState<number | null>(null);

  const [mohenjoSubmitted, setMohenjoSubmitted] = useState<boolean>(false);
  const [dholaviraSubmitted, setDholaviraSubmitted] = useState<boolean>(false);

  const [mohenjoEliminated, setMohenjoEliminated] = useState<number[]>([]);
  const [dholaviraEliminated, setDholaviraEliminated] = useState<number[]>([]);

  const [mohenjoHint, setMohenjoHint] = useState<string | null>(null);
  const [dholaviraHint, setDholaviraHint] = useState<string | null>(null);

  const [evaluation, setEvaluation] = useState<RoundEvaluation | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [winner, setWinner] = useState<WinnerType>(null);
  const [isStreakBanner, setIsStreakBanner] = useState<boolean>(false);
  const [streakTeam, setStreakTeam] = useState<TeamId | null>(null);

  const qManagerA = useRef<QuestionManager | null>(null);
  const qManagerB = useRef<QuestionManager | null>(null);

  const timer = useTimer({
    onTimeUp: () => {
      handleTimeUp();
    },
    onRushStart: () => {
      soundManager.playRushSound();
    },
  });

  const initQuestions = useCallback((customPool?: Question[]) => {
    const stored = getStoredActiveQuestions();
    const pool =
      customPool && customPool.length > 0
        ? customPool
        : stored && stored.length > 0
        ? stored
        : QUESTIONS_BANK;
    const { teamA, teamB } = splitQuestionsForTeams(pool);
    qManagerA.current = new QuestionManager(teamA);
    qManagerB.current = new QuestionManager(teamB);
  }, []);

  const loadNextQuestions = useCallback(() => {
    if (!qManagerA.current || !qManagerB.current) {
      initQuestions();
    }
    const qA = qManagerA.current?.getNextQuestion() || null;
    const qB = qManagerB.current?.getNextQuestion() || null;

    setMohenjoQuestion(qA);
    setDholaviraQuestion(qB);
    setMohenjoSelected(null);
    setDholaviraSelected(null);
    setMohenjoSubmitted(false);
    setDholaviraSubmitted(false);
    setMohenjoEliminated([]);
    setDholaviraEliminated([]);
    setMohenjoHint(null);
    setDholaviraHint(null);
    setEvaluation(null);
    setFeedback(null);
  }, [initQuestions]);

  const startGame = useCallback((customPool?: Question[]) => {
    initQuestions(customPool);
    setMohenjoState({ ...initialTeamState });
    setDholaviraState({ ...initialTeamState });
    setRound(1);
    setWinner(null);
    loadNextQuestions();
    timer.reset();
    timer.start();
    soundManager.playStartSound();
    setScreen('game');
  }, [initQuestions, loadNextQuestions, timer]);

  const selectOption = useCallback((team: TeamId, optionIndex: number) => {
    soundManager.playClickSound();
    if (team === 'mohenjo') {
      if (!mohenjoSubmitted) setMohenjoSelected(optionIndex);
    } else {
      if (!dholaviraSubmitted) setDholaviraSelected(optionIndex);
    }
  }, [mohenjoSubmitted, dholaviraSubmitted]);

  const useArchaeologistLens = useCallback((team: TeamId) => {
    if (team === 'mohenjo') {
      if (mohenjoState.lensUses <= 0 || !mohenjoQuestion) return;
      setMohenjoState((prev) => ({ ...prev, lensUses: prev.lensUses - 1 }));
      setMohenjoHint(mohenjoQuestion.explanation.slice(0, 100) + '...');
      soundManager.playClickSound();
    } else {
      if (dholaviraState.lensUses <= 0 || !dholaviraQuestion) return;
      setDholaviraState((prev) => ({ ...prev, lensUses: prev.lensUses - 1 }));
      setDholaviraHint(dholaviraQuestion.explanation.slice(0, 100) + '...');
      soundManager.playClickSound();
    }
  }, [mohenjoState.lensUses, dholaviraState.lensUses, mohenjoQuestion, dholaviraQuestion]);

  const useFiftyFifty = useCallback((team: TeamId) => {
    if (team === 'mohenjo') {
      if (mohenjoState.fiftyFiftyUses <= 0 || !mohenjoQuestion) return;
      setMohenjoState((prev) => ({ ...prev, fiftyFiftyUses: prev.fiftyFiftyUses - 1 }));
      const wrongIndices = mohenjoQuestion.options
        .map((_, i) => i)
        .filter((i) => i !== mohenjoQuestion.correctAnswer);
      const toEliminate = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
      setMohenjoEliminated(toEliminate);
      soundManager.playClickSound();
    } else {
      if (dholaviraState.fiftyFiftyUses <= 0 || !dholaviraQuestion) return;
      setDholaviraState((prev) => ({ ...prev, fiftyFiftyUses: prev.fiftyFiftyUses - 1 }));
      const wrongIndices = dholaviraQuestion.options
        .map((_, i) => i)
        .filter((i) => i !== dholaviraQuestion.correctAnswer);
      const toEliminate = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
      setDholaviraEliminated(toEliminate);
      soundManager.playClickSound();
    }
  }, [mohenjoState.fiftyFiftyUses, dholaviraState.fiftyFiftyUses, mohenjoQuestion, dholaviraQuestion]);

  const finishGame = useCallback((finalWinner: WinnerType) => {
    timer.pause();
    setWinner(finalWinner);
    soundManager.playVictorySound();
    triggerVictoryConfetti();
    setScreen('victory');
  }, [timer]);

  const evaluateRound = useCallback(() => {
    const isMCorrect = mohenjoQuestion !== null && mohenjoSelected === mohenjoQuestion.correctAnswer;
    const isDCorrect = dholaviraQuestion !== null && dholaviraSelected === dholaviraQuestion.correctAnswer;

    const rushMultiplier = timer.isRush ? 2 : 1;

    let mStreakBonus = false;
    let dStreakBonus = false;

    let mStages = 0;
    let dStages = 0;

    let nextMStreak = mohenjoState.streak;
    let nextDStreak = dholaviraState.streak;

    if (isMCorrect) {
      nextMStreak++;
      mStages = 1 * rushMultiplier;
      if (nextMStreak >= STREAK_THRESHOLD) {
        mStreakBonus = true;
        mStages += 1;
      }
    } else {
      nextMStreak = 0;
    }

    if (isDCorrect) {
      nextDStreak++;
      dStages = 1 * rushMultiplier;
      if (nextDStreak >= STREAK_THRESHOLD) {
        dStreakBonus = true;
        dStages += 1;
      }
    } else {
      nextDStreak = 0;
    }

    const nextMStage = Math.min(MAX_CITY_STAGES, mohenjoState.cityStage + mStages);
    const nextDStage = Math.min(MAX_CITY_STAGES, dholaviraState.cityStage + dStages);

    setMohenjoState((prev) => ({
      ...prev,
      score: prev.score + (isMCorrect ? 100 * (timer.isRush ? 2 : 1) : 0),
      correctAnswers: prev.correctAnswers + (isMCorrect ? 1 : 0),
      totalAnswered: prev.totalAnswered + 1,
      streak: nextMStreak,
      maxStreak: Math.max(prev.maxStreak, nextMStreak),
      cityStage: nextMStage,
    }));

    setDholaviraState((prev) => ({
      ...prev,
      score: prev.score + (isDCorrect ? 100 * (timer.isRush ? 2 : 1) : 0),
      correctAnswers: prev.correctAnswers + (isDCorrect ? 1 : 0),
      totalAnswered: prev.totalAnswered + 1,
      streak: nextDStreak,
      maxStreak: Math.max(prev.maxStreak, nextDStreak),
      cityStage: nextDStage,
    }));

    if (isMCorrect || isDCorrect) {
      soundManager.playCorrectSound();
      soundManager.playBuildSound();
      triggerConstructionBurst(0.5, 0.5);
    } else {
      soundManager.playWrongSound();
    }

    if (mStreakBonus || dStreakBonus) {
      soundManager.playStreakSound();
      triggerStreakBurst();
      setIsStreakBanner(true);
      setStreakTeam(mStreakBonus ? 'mohenjo' : 'dholavira');
      setTimeout(() => setIsStreakBanner(false), 2500);
    }

    const mStageName = CITY_STAGES.find((s) => s.id === nextMStage)?.name || 'Settlement';
    const dStageName = CITY_STAGES.find((s) => s.id === nextDStage)?.name || 'Settlement';

    const evalResult: RoundEvaluation = {
      mohenjoCorrect: isMCorrect,
      dholaviraCorrect: isDCorrect,
      mohenjoStagesAdded: mStages,
      dholaviraStagesAdded: dStages,
      mohenjoMessage: isMCorrect ? `Correct! +${mStages} stage (${mStageName})` : 'Incorrect. No construction.',
      dholaviraMessage: isDCorrect ? `Correct! +${dStages} stage (${dStageName})` : 'Incorrect. No construction.',
      mohenjoBonusStreak: mStreakBonus,
      dholaviraBonusStreak: dStreakBonus,
    };
    setEvaluation(evalResult);

    if (nextMStage >= MAX_CITY_STAGES && nextDStage >= MAX_CITY_STAGES) {
      setTimeout(() => finishGame('tie'), 2000);
    } else if (nextMStage >= MAX_CITY_STAGES) {
      setTimeout(() => finishGame('mohenjo'), 2000);
    } else if (nextDStage >= MAX_CITY_STAGES) {
      setTimeout(() => finishGame('dholavira'), 2000);
    } else if (round >= TOTAL_ROUNDS) {
      setTimeout(() => {
        if (nextMStage > nextDStage) finishGame('mohenjo');
        else if (nextDStage > nextMStage) finishGame('dholavira');
        else finishGame('tie');
      }, 2000);
    } else {
      setTimeout(() => {
        setRound((prev) => prev + 1);
        loadNextQuestions();
      }, 2500);
    }
  }, [
    mohenjoQuestion,
    dholaviraQuestion,
    mohenjoSelected,
    dholaviraSelected,
    timer.isRush,
    mohenjoState.streak,
    dholaviraState.streak,
    mohenjoState.cityStage,
    dholaviraState.cityStage,
    round,
    loadNextQuestions,
    finishGame,
  ]);

  const submitAnswer = useCallback((team: TeamId) => {
    soundManager.playClickSound();
    if (team === 'mohenjo') {
      if (mohenjoSelected === null) return;
      setMohenjoSubmitted(true);
      if (dholaviraSubmitted) {
        evaluateRound();
      }
    } else {
      if (dholaviraSelected === null) return;
      setDholaviraSubmitted(true);
      if (mohenjoSubmitted) {
        evaluateRound();
      }
    }
  }, [mohenjoSelected, dholaviraSelected, mohenjoSubmitted, dholaviraSubmitted, evaluateRound]);

  const handleTimeUp = useCallback(() => {
    if (mohenjoState.cityStage > dholaviraState.cityStage) {
      finishGame('mohenjo');
    } else if (dholaviraState.cityStage > mohenjoState.cityStage) {
      finishGame('dholavira');
    } else {
      finishGame('tie');
    }
  }, [mohenjoState.cityStage, dholaviraState.cityStage, finishGame]);

  const stats: GameStats = {
    mohenjoScore: mohenjoState.score,
    dholaviraScore: dholaviraState.score,
    mohenjoCorrect: mohenjoState.correctAnswers,
    dholaviraCorrect: dholaviraState.correctAnswers,
    mohenjoAccuracy: mohenjoState.totalAnswered > 0 ? Math.round((mohenjoState.correctAnswers / mohenjoState.totalAnswered) * 100) : 0,
    dholaviraAccuracy: dholaviraState.totalAnswered > 0 ? Math.round((dholaviraState.correctAnswers / dholaviraState.totalAnswered) * 100) : 0,
    mohenjoMaxStreak: mohenjoState.maxStreak,
    dholaviraMaxStreak: dholaviraState.maxStreak,
    mohenjoCityStage: mohenjoState.cityStage,
    dholaviraCityStage: dholaviraState.cityStage,
    totalRoundsPlayed: Math.min(round, TOTAL_ROUNDS),
  };

  return {
    screen,
    setScreen,
    round,
    gameCode,
    setGameCode,
    timer,
    mohenjoState,
    dholaviraState,
    mohenjoQuestion,
    dholaviraQuestion,
    mohenjoSelected,
    dholaviraSelected,
    mohenjoSubmitted,
    dholaviraSubmitted,
    mohenjoEliminated,
    dholaviraEliminated,
    mohenjoHint,
    dholaviraHint,
    evaluation,
    feedback,
    winner,
    isStreakBanner,
    streakTeam,
    stats,
    startGame,
    selectOption,
    submitAnswer,
    useArchaeologistLens,
    useFiftyFifty,
  };
}
