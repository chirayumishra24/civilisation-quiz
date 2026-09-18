import { useState, useEffect, useCallback, useRef } from 'react';
import { GAME_DURATION_SECONDS, RUSH_THRESHOLD_SECONDS } from '../types/game';

interface UseTimerOptions {
  initialSeconds?: number;
  onTimeUp?: () => void;
  onRushStart?: () => void;
}

export function useTimer({
  initialSeconds = GAME_DURATION_SECONDS,
  onTimeUp,
  onRushStart,
}: UseTimerOptions = {}) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isRush, setIsRush] = useState(false);

  const onTimeUpRef = useRef(onTimeUp);
  const onRushStartRef = useRef(onRushStart);
  onTimeUpRef.current = onTimeUp;
  onRushStartRef.current = onRushStart;

  const isUntimed = initialSeconds <= 0;

  const start = useCallback(() => {
    if (!isUntimed) setIsRunning(true);
  }, [isUntimed]);

  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback((newSeconds = initialSeconds) => {
    setTimeLeft(newSeconds);
    setIsRunning(false);
    setIsRush(false);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || isUntimed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          onTimeUpRef.current?.();
          return 0;
        }

        const next = prev - 1;
        if (next <= RUSH_THRESHOLD_SECONDS && !isRush) {
          setIsRush(true);
          onRushStartRef.current?.();
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isRush, isUntimed]);

  const formatTime = useCallback((seconds: number = timeLeft): string => {
    if (isUntimed) return 'Untimed';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [timeLeft, isUntimed]);

  const percentage = isUntimed ? 100 : Math.max(0, Math.min(100, (timeLeft / initialSeconds) * 100));

  return {
    timeLeft,
    isRunning,
    isRush,
    start,
    pause,
    reset,
    formatTime,
    percentage,
  };
}
